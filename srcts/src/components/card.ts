import type { Tooltip as TooltipType } from "bootstrap";
import type { ShinyEventValue } from "rstudio-shiny/srcts/types/src/events/shinyEvents";
import { getAllFocusableChildren } from "./_utils";

// eslint-disable-next-line @typescript-eslint/naming-convention
const Tooltip = (
  window.bootstrap ? window.bootstrap.Tooltip : class {}
) as typeof TooltipType;

interface CardOverlay {
  container: HTMLDivElement;
  anchor: HTMLAnchorElement;
}

class Card {
  private container: HTMLElement;
  private overlay: CardOverlay;
  private cardResizeObserver: ResizeObserver;
  private shinyOutputResizeObserver: ResizeObserver | undefined;
  private lastFocusInterior: HTMLElement | undefined;
  private prevFocusExterior: HTMLElement | undefined;

  private static attr = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ATTR_INIT: "data-bslib-card-init",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CLASS_CARD: "bslib-card",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CLASS_FULL_SCREEN: "bslib-full-screen",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CLASS_HAS_FULL_SCREEN: "bslib-has-full-screen",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CLASS_FULL_SCREEN_ENTER: "bslib-full-screen-enter",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CLASS_FULL_SCREEN_EXIT: "bslib-full-screen-exit",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ID_FULL_SCREEN_OVERLAY: "bslib-full-screen-overlay",
  };

  constructor(el: HTMLElement) {
    // remove initialization attribute and script
    el.removeAttribute(Card.attr.ATTR_INIT);
    el.querySelector<HTMLScriptElement>(
      `script[${Card.attr.ATTR_INIT}]`
    )?.remove();

    this.container = el;
    Card.instanceMap.set(el, this);

    // Let Shiny know to trigger resize when the card size changes
    // TODO: shiny could/should do this itself (rstudio/shiny#3682)
    const resizeEvent = new Event("resize");
    this.cardResizeObserver = new ResizeObserver(() => {
      window.dispatchEvent(resizeEvent);
    });
    this.cardResizeObserver.observe(this.container);

    this._addEventListeners();
    this._enableTooltips();
    this._startShinyOutputResizeObserver();
    this.overlay = this._createOverlay();
  }

  enterFullScreen(event?: Event): void {
    if (event) event.preventDefault();

    this.overlay.container.addEventListener("click", () =>
      this.exitFullScreen()
    );
    document.addEventListener(
      "keyup",
      (ev) => this._exitFullScreenOnEscape(ev),
      false
    );

    const focusableElements = getAllFocusableChildren(this.container);
    if (focusableElements.length > 0) {
      // set focus on first focusable element in the card
      focusableElements[0].focus();
      // store the last focusable element so we can cycle focus
      this.lastFocusInterior = focusableElements[focusableElements.length - 1];
    } else {
      // this card doesn't have any focusable elements, so focus is vaguely
      // within the card (having clicked the full screen button). We're can't
      // know exactly where focus is located (we've hidden the button), so we
      // attach a listener to the next Tab keydown event to entrap focus within
      // the full screen card.
      this.lastFocusInterior = this.overlay.anchor;
      if (!this.container.contains(document.activeElement)) {
        this.prevFocusExterior = document.activeElement as HTMLElement;
        this.prevFocusExterior.addEventListener(
          "keydown",
          (ev) => this._entrapFocus(ev),
          { once: true }
        );
      }
    }

    if (this.lastFocusInterior) {
      this.lastFocusInterior.onkeydown = (ev) => {
        // If tabbing forwards out of the card, return to close button
        if (ev.key === "Tab" && !ev.shiftKey) {
          ev.preventDefault();
          this.overlay.anchor.focus();
        }
      };
    }

    this.container.classList.add(Card.attr.CLASS_FULL_SCREEN);
    document.body.classList.add(Card.attr.CLASS_HAS_FULL_SCREEN);
    this.container.insertAdjacentElement("beforebegin", this.overlay.container);
  }

  exitFullScreen(): void {
    // Remove event listeners that were added when entering full screen
    this.overlay.container.removeEventListener("click", () =>
      this.exitFullScreen()
    );

    if (this.lastFocusInterior) {
      this.lastFocusInterior.onkeydown = null;
    }

    document.removeEventListener(
      "keyup",
      (ev) => this._exitFullScreenOnEscape(ev),
      false
    );

    // Remove overlay and remove full screen classes from card
    this.overlay.container.remove();
    this.container.classList.remove(Card.attr.CLASS_FULL_SCREEN);
    document.body.classList.remove(Card.attr.CLASS_HAS_FULL_SCREEN);

    // Reset focus tracking state
    this.lastFocusInterior = undefined;
    this.prevFocusExterior = undefined;
  }

  destroy(): void {
    this._removeEventListeners();
    this.cardResizeObserver.disconnect();
    if (this.shinyOutputResizeObserver) {
      this.shinyOutputResizeObserver.disconnect();
    }
    Card.instanceMap.delete(this.container);
  }

  private _addEventListeners(): void {
    const btnFullScreen = this.container.querySelector(
      `:scope > .${Card.attr.CLASS_FULL_SCREEN_ENTER}`
    );
    if (!btnFullScreen) return;
    btnFullScreen.addEventListener("click", (ev) => this.enterFullScreen(ev));
  }

  private _removeEventListeners(): void {
    const btnFullScreen = this.container.querySelector(
      `:scope > .${Card.attr.CLASS_FULL_SCREEN_ENTER}`
    );
    if (!btnFullScreen) return;
    btnFullScreen.removeEventListener("click", (ev) =>
      this.enterFullScreen(ev)
    );
  }

  private _enableTooltips(): void {
    const selector = `.${Card.attr.CLASS_FULL_SCREEN_ENTER}[data-bs-toggle='tooltip']`;
    if (!this.container.querySelector(selector)) {
      return;
    }
    const tooltipList = this.container.querySelectorAll(selector);
    tooltipList.forEach((tt) => new Tooltip(tt));
  }

  private _startShinyOutputResizeObserver(): void {
    // In some complex fill-based layouts with multiple outputs (e.g., plotly),
    // shiny initializes with the correct sizing, but in-between the 1st and last
    // renderValue(), the size of the output containers can change, meaning every
    // output but the 1st gets initialized with the wrong size during their
    // renderValue(); and then after the render phase, shiny won't know trigger a
    // resize since all the widgets will return to their original size
    // (and thus, Shiny thinks there isn't any resizing to do).
    // We workaround that situation by manually triggering a resize on the binding
    // when the output container changes (this way, if the size is different during
    // the render phase, Shiny will know about it)

    // TODO: Remove disable/ignore comments when rstudio/shiny#3815 is available
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore; Type definitions are not found. This occurs when `strict: true`
    $(document).on("shiny:value", (x: ShinyEventValue) => {
      const el = x.binding.el;
      if (!this.container.contains(el)) return;
      if (el.dataset.bslibOutputObserver) return;

      this.shinyOutputResizeObserver = new ResizeObserver(x.binding.onResize);
      this.shinyOutputResizeObserver.observe(el);
      el.dataset.bslibOutputObserver = "true";
    });
  }

  private _exitFullScreenOnEscape(event: KeyboardEvent): void {
    // if a select input element has focus, then don't exit full screen
    if (document.activeElement instanceof HTMLSelectElement) {
      return;
    }

    if (event.key === "Escape") {
      this.exitFullScreen();
    }
  }

  private _entrapFocus(event: KeyboardEvent): void {
    // This event handler is only enabled when the card doesn't have any
    // focusable elements. If the user presses Tab, we want to trap focus in the
    // full screen card, so we move focus to the close button.
    if (!(event instanceof KeyboardEvent)) return;
    if (!this.container.matches(`.${Card.attr.CLASS_FULL_SCREEN}`)) return;
    if (event.key === "Tab") {
      event.preventDefault();
      this.overlay.anchor.focus();
    }
  }

  private _createOverlay(): CardOverlay {
    const container = document.createElement("div");
    container.id = Card.attr.ID_FULL_SCREEN_OVERLAY;
    container.classList.add(Card.attr.ID_FULL_SCREEN_OVERLAY);

    const anchor = document.createElement("a");
    anchor.classList.add(Card.attr.CLASS_FULL_SCREEN_EXIT);
    anchor.tabIndex = 0;
    anchor.onclick = () => this.exitFullScreen();
    anchor.onkeyup = (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        this.exitFullScreen();
      }
    };
    anchor.onkeydown = (ev) => {
      // if tabbing backwards out of the card,
      // cycle focus back to last focus element within the card
      if (ev.key === "Tab" && ev.shiftKey) {
        ev.preventDefault();
        this.lastFocusInterior?.focus();
      }
    };
    anchor.innerHTML = this._overlayCloseHtml();

    container.appendChild(anchor);
    return { container, anchor };
  }

  private _overlayCloseHtml(): string {
    return (
      "Close " +
      "<svg width:'20' height='20' fill='currentColor' class='bi bi-x-lg' " +
      "viewBox='0 0 16 16'>" +
      "<path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 " +
      "0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 " +
      "5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z'/></svg>"
    );
  }

  private static instanceMap: WeakMap<HTMLElement, Card> = new WeakMap();

  public static getInstance(el: HTMLElement): Card | undefined {
    return Card.instanceMap.get(el);
  }

  /**
   * If cards are initialized before the DOM is ready, we re-schedule the
   * initialization to occur on DOMContentLoaded.
   * @private
   * @static
   * @type {boolean}
   */
  private static onReadyScheduled = false;

  public static initializeAllCards(): void {
    if (document.readyState === "loading") {
      if (!Card.onReadyScheduled) {
        Card.onReadyScheduled = true;
        document.addEventListener("DOMContentLoaded", () => {
          Card.initializeAllCards();
        });
      }
      return;
    }

    const initSelector = `.${Card.attr.CLASS_CARD}[${Card.attr.ATTR_INIT}]`;
    if (!document.querySelector(initSelector)) {
      // no cards to initialize
      return;
    }

    const cards = document.querySelectorAll(initSelector);
    cards.forEach((card) => new Card(card as HTMLElement));
  }
}

// attach Sidebar class to window for global usage
(window as any).bslib = (window as any).bslib || {};
(window as any).bslib.Card = Card;

export { Card };
