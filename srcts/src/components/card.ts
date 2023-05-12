import type { Tooltip as TooltipType } from "bootstrap";
import { getAllFocusableChildren } from "./_utils";
import { ShinyResizeObserver } from "./_shinyResizeObserver";

// eslint-disable-next-line @typescript-eslint/naming-convention
const Tooltip = (
  window.bootstrap ? window.bootstrap.Tooltip : class {}
) as typeof TooltipType;

interface CardFullScreenOverlay {
  container: HTMLDivElement;
  anchor: HTMLAnchorElement;
}

class Card {
  private container: HTMLElement;
  private overlay: CardFullScreenOverlay;
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

  /**
   * A Shiny-specific resize observer that ensures Shiny outputs in the main
   * content areas of the sidebar resize appropriately.
   * @private
   * @type {ShinyResizeObserver}
   * @static
   */
  private static shinyResizeObserver = new ShinyResizeObserver();

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
    Card.shinyResizeObserver.observe(this.container);

    this._addEventListeners();
    this._enableTooltips();
    this.overlay = this._createOverlay();

    // bind event handler methods to this card instance
    this._exitFullScreenOnEscape = this._exitFullScreenOnEscape.bind(this);
    this._trapFocusExit = this._trapFocusExit.bind(this);
  }

  enterFullScreen(event?: Event): void {
    if (event) event.preventDefault();

    this.overlay.container.addEventListener("click", () =>
      this.exitFullScreen()
    );

    document.addEventListener("keydown", this._exitFullScreenOnEscape, false);

    // trap focus in the fullscreen container, listening for Tab key on the
    // capture phase so we have a better chance of preventing other handlers
    document.addEventListener("keydown", this._trapFocusExit, true);

    // Set initial focus on the card, if not already
    if (!this.container.contains(document.activeElement)) {
      this.container.setAttribute("tabindex", "-1");
      this.container.focus();
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

    document.removeEventListener(
      "keydown",
      this._exitFullScreenOnEscape,
      false
    );
    document.removeEventListener("keydown", this._trapFocusExit, true);

    // Remove overlay and remove full screen classes from card
    this.overlay.container.remove();
    this.container.classList.remove(Card.attr.CLASS_FULL_SCREEN);
    this.container.removeAttribute("tabindex");
    document.body.classList.remove(Card.attr.CLASS_HAS_FULL_SCREEN);

    // Reset focus tracking state
    this.prevFocusExterior = undefined;
  }

  private _addEventListeners(): void {
    const btnFullScreen = this.container.querySelector(
      `:scope > .${Card.attr.CLASS_FULL_SCREEN_ENTER}`
    );
    if (!btnFullScreen) return;
    btnFullScreen.addEventListener("click", (ev) => this.enterFullScreen(ev));
  }

  private _enableTooltips(): void {
    const selector = `.${Card.attr.CLASS_FULL_SCREEN_ENTER}[data-bs-toggle='tooltip']`;
    if (!this.container.querySelector(selector)) {
      return;
    }
    const tooltipList = this.container.querySelectorAll(selector);
    tooltipList.forEach((tt) => new Tooltip(tt));
  }

  private _exitFullScreenOnEscape(event: KeyboardEvent): void {
    if (!(event.target instanceof HTMLElement)) return;
    // If the user is in the middle of a select input choice, don't exit
    const selOpenSelectInput = ["select[open]", "input[aria-expanded='true']"];
    if (event.target.matches(selOpenSelectInput.join(", "))) return;

    if (event.key === "Escape") {
      this.exitFullScreen();
    }
  }

  private _trapFocusExit(event: KeyboardEvent): void {
    if (!(event instanceof KeyboardEvent)) return;
    if (event.key !== "Tab") return;

    const isFocusedContainer = event.target === this.container;
    const isFocusedAnchor = event.target === this.overlay.anchor;
    const isFocusedWithin = this.container.contains(event.target as Node);

    if (!(isFocusedWithin || isFocusedContainer || isFocusedAnchor)) {
      // If focus is outside the card, return to the card
      event.preventDefault();
      event.stopImmediatePropagation();
      this.container.focus();
      return;
    }

    // Check focusables every time because the card contents may have changed
    const focusableElements = getAllFocusableChildren(this.container);
    const hasFocusableElements = focusableElements.length > 0;

    // We need to handle four cases:
    // 1. The card has no focusable elements --> focus the anchor
    // 2. Focus is on the card container (do nothing, natural tab order)
    // 3. Focus is on the anchor and the user pressed Tab + Shift (backwards)
    //    -> Move to the last focusable element (end of card)
    // 4. Focus is on the last focusable element and the user pressed Tab
    //    (forwards) -> Move to the anchor (top of card)
    // 5. otherwise we don't interfere

    if (!hasFocusableElements) {
      // case 1
      event.preventDefault();
      event.stopImmediatePropagation();
      this.overlay.anchor.focus();
      return;
    }

    // case 2
    if (isFocusedContainer) return;

    const lastFocusable = focusableElements[focusableElements.length - 1];
    const isFocusedLast = event.target === lastFocusable;

    const needsFocusMgmt =
      (isFocusedAnchor && event.shiftKey) || (isFocusedLast && !event.shiftKey);

    // case 5 (no focus management needed)
    if (!needsFocusMgmt) return;

    // We're going to take control over tab focus now
    event.preventDefault();
    event.stopImmediatePropagation();

    if (isFocusedAnchor) {
      // case 3
      lastFocusable.focus();
      return;
    }

    if (isFocusedLast) {
      // case 4
      this.overlay.anchor.focus();
      return;
    }
  }

  private _createOverlay(): CardFullScreenOverlay {
    const container = document.createElement("div");
    container.id = Card.attr.ID_FULL_SCREEN_OVERLAY;

    const anchor = this._createOverlayCloseAnchor();
    container.appendChild(anchor);

    return { container, anchor };
  }

  private _createOverlayCloseAnchor(): HTMLAnchorElement {
    const anchor = document.createElement("a");
    anchor.classList.add(Card.attr.CLASS_FULL_SCREEN_EXIT);
    anchor.tabIndex = 0;
    anchor.onclick = () => this.exitFullScreen();
    anchor.onkeydown = (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        this.exitFullScreen();
      }
    };
    anchor.innerHTML = this._overlayCloseHtml();

    return anchor;
  }

  private _overlayCloseHtml(): string {
    return (
      "Close " +
      "<svg width='20' height='20' fill='currentColor' class='bi bi-x-lg' " +
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

  public static initializeAllCards(flushResizeObserver = true): void {
    if (document.readyState === "loading") {
      if (!Card.onReadyScheduled) {
        Card.onReadyScheduled = true;
        document.addEventListener("DOMContentLoaded", () => {
          Card.initializeAllCards(false);
        });
      }
      return;
    }

    if (flushResizeObserver) {
      // Trigger a recheck of observed cards to unobserve non-existent cards
      Card.shinyResizeObserver.flush();
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
