import type { Tooltip as TooltipType } from "bootstrap";
import type { ShinyEventValue } from "rstudio-shiny/srcts/types/src/events/shinyEvents";
import { DocumentObserver } from "./_documentObserver";

// eslint-disable-next-line @typescript-eslint/naming-convention
const Tooltip = (
  window.bootstrap ? window.bootstrap.Tooltip : class {}
) as typeof TooltipType;

class Card {
  private static instanceMap: WeakMap<HTMLElement, Card> = new WeakMap();

  private container: HTMLElement;
  cardResizeObserver: ResizeObserver;
  shinyOutputResizeObserver: ResizeObserver | undefined;

  constructor(el: HTMLElement) {
    el.removeAttribute("data-bslib-card-needs-init");

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
  }

  private _addEventListeners(): void {
    const btnFullScreen = this.container.querySelector(
      ".bslib-full-screen-enter"
    );
    if (!btnFullScreen) return;
    btnFullScreen.addEventListener("click", (ev) => this.enterFullScreen(ev));
  }

  private _removeEventListeners(): void {
    const btnFullScreen = this.container.querySelector(
      ".bslib-full-screen-enter"
    );
    if (!btnFullScreen) return;
    btnFullScreen.removeEventListener("click", (ev) =>
      this.enterFullScreen(ev)
    );
  }

  private _enableTooltips(): void {
    if (!this.container.querySelector('[data-bs-toggle="tooltip"]')) {
      return;
    }
    const tooltipList = this.container.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
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

  enterFullScreen(event?: Event): void {
    if (event) event.preventDefault();

    const overlay = this._createOverlay();
    overlay.addEventListener("click", () => this.exitFullScreen());
    document.addEventListener("keyup", this._exitFullScreenOnEscape, false);

    this.container.classList.add("bslib-full-screen");
    this.container.insertAdjacentElement("beforebegin", overlay);
  }

  exitFullScreen(): void {
    const overlay = document.getElementById("bslib-full-screen-overlay");
    overlay?.removeEventListener("click", () => this.exitFullScreen());
    document.removeEventListener("keyup", this._exitFullScreenOnEscape, false);
    overlay ? overlay.remove() : null;

    this.container.classList.remove("bslib-full-screen");
  }

  private _exitFullScreenOnEscape(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      this.exitFullScreen();
    }
  }

  destroy(): void {
    this._removeEventListeners();
    this.cardResizeObserver.disconnect();
    if (this.shinyOutputResizeObserver) {
      this.shinyOutputResizeObserver.disconnect();
    }
    Card.instanceMap.delete(this.container);
  }

  private _createOverlay(): HTMLElement {
    const overlay = document.createElement("div");
    overlay.id = "bslib-full-screen-overlay";
    overlay.classList.add("bslib-full-screen-overlay");

    const overlayAnchor = document.createElement("a");
    overlayAnchor.classList.add("bslib-full-screen-exit");
    overlayAnchor.innerHTML = this._overlayCloseHtml();

    overlay.appendChild(overlayAnchor);
    return overlay;
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

  public static getInstance(el: HTMLElement): Card | undefined {
    return Card.instanceMap.get(el);
  }

  public static observer: DocumentObserver = new DocumentObserver({
    added: {
      selector: ".bslib-card[data-bslib-card-needs-init]",
      callback: (card: HTMLElement) => {
        new Card(card);
      },
    },
    removed: {
      selector: ".bslib-card",
      callback: (card: HTMLElement) => {
        Card.getInstance(card)?.destroy();
      },
    },
  });
}

// attach Sidebar class to window for global usage
(window as any).bslib = (window as any).bslib || {};
(window as any).bslib.Card = Card;

export { Card };
