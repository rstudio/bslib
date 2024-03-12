import { BslibElement } from "./_bslibElement";
import { getAllFocusableChildren } from "../_utils";
import { ShinyResizeObserver } from "../_shinyResizeObserver";

/**
 * The overlay element that is placed behind the card when expanded full screen.
 *
 * @interface CardFullScreenOverlay
 * @typedef {CardFullScreenOverlay}
 */
interface CardFullScreenOverlay {
  /**
   * The full screen overlay container.
   * @type {HTMLDivElement}
   */
  container: HTMLDivElement;
  /**
   * The anchor element used to close the full screen overlay.
   * @type {HTMLAnchorElement}
   */
  anchor: HTMLAnchorElement;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ATTR_FULL_SCREEN = "data-full-screen";
// eslint-disable-next-line @typescript-eslint/naming-convention
const CLASS_HAS_FULL_SCREEN = "bslib-has-full-screen";
// eslint-disable-next-line @typescript-eslint/naming-convention
const CLASS_FULL_SCREEN_ENTER = "bslib-full-screen-enter";
// eslint-disable-next-line @typescript-eslint/naming-convention
const CLASS_FULL_SCREEN_EXIT = "bslib-full-screen-exit";
// eslint-disable-next-line @typescript-eslint/naming-convention
const ID_FULL_SCREEN_OVERLAY = "bslib-full-screen-overlay";

export class BslibCard extends BslibElement {
  static tagName = "bslib-card";

  /**
   * The card container element.
   * @private
   * @type {HTMLElement}
   */
  private get card(): HTMLElement {
    return this.querySelector("> .card.bslib-card") as HTMLElement;
  }

  /**
   * The card's full screen overlay element. We create this element once and add
   * and remove it from the DOM as needed (this simplifies focus management
   * while in full screen mode).
   * @private
   * @type {CardFullScreenOverlay}
   */
  private overlay!: CardFullScreenOverlay;

  /**
   * A Shiny-specific resize observer that ensures Shiny outputs in within the
   * card resize appropriately.
   * @private
   * @type {ShinyResizeObserver}
   * @static
   */
  private static shinyResizeObserver = new ShinyResizeObserver();

  constructor() {
    super();

    // bind event handler methods to this card instance
    this._exitFullScreenOnEscape = this._exitFullScreenOnEscape.bind(this);
    this._trapFocusExit = this._trapFocusExit.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();

    this._addEventListeners();
    this.overlay = this._createOverlay();

    // Let Shiny know to trigger resize when the card size changes
    BslibCard.shinyResizeObserver.observe(this.card);
  }

  disconnectedCallback(): void {
    BslibCard.shinyResizeObserver.unobserve(this.card);

    super.disconnectedCallback();
  }

  /**
   * Enter the card's full screen mode, either programmatically or via an event
   * handler. Full screen mode is activated by adding a class to the card that
   * positions it absolutely and expands it to fill the viewport. In addition,
   * we add a full screen overlay element behind the card and we trap focus in
   * the expanded card while in full screen mode.
   *
   * @param {?Event} [event]
   */
  enterFullScreen(event?: Event): void {
    if (event) event.preventDefault();

    // Update close anchor to control current expanded card
    if (this.card.id) {
      this.overlay.anchor.setAttribute("aria-controls", this.card.id);
    }

    document.addEventListener("keydown", this._exitFullScreenOnEscape, false);

    // trap focus in the fullscreen container, listening for Tab key on the
    // capture phase so we have the best chance of preventing other handlers
    document.addEventListener("keydown", this._trapFocusExit, true);

    this.card.setAttribute(ATTR_FULL_SCREEN, "true");
    document.body.classList.add(CLASS_HAS_FULL_SCREEN);
    this.card.insertAdjacentElement("beforebegin", this.overlay.container);

    // Set initial focus on the card, if not already
    if (
      !this.card.contains(document.activeElement) ||
      document.activeElement?.classList.contains(CLASS_FULL_SCREEN_ENTER)
    ) {
      this.card.setAttribute("tabindex", "-1");
      this.card.focus();
    }

    this._emitFullScreenEvent(true);
  }

  /**
   * Exit full screen mode. This removes the full screen overlay element,
   * removes the full screen class from the card, and removes the keyboard event
   * listeners that were added when entering full screen mode.
   */
  exitFullScreen(): void {
    document.removeEventListener(
      "keydown",
      this._exitFullScreenOnEscape,
      false
    );
    document.removeEventListener("keydown", this._trapFocusExit, true);

    // Remove overlay and remove full screen classes from card
    this.overlay.container.remove();
    this.card.setAttribute(ATTR_FULL_SCREEN, "false");
    this.card.removeAttribute("tabindex");
    document.body.classList.remove(CLASS_HAS_FULL_SCREEN);
    this._emitFullScreenEvent(false);
  }

  /**
   * Emits a custom event to communicate the card's full screen state change.
   * @private
   * @param {boolean} fullScreen
   */
  private _emitFullScreenEvent(fullScreen: boolean): void {
    const event = new CustomEvent("bslib.card", {
      bubbles: true,
      detail: { fullScreen },
    });
    this.card.dispatchEvent(event);
  }

  /**
   * Adds general card-specific event listeners.
   * @private
   */
  private _addEventListeners(): void {
    const btnFullScreen = this.card.querySelector(
      `:scope > * > .${CLASS_FULL_SCREEN_ENTER}`
    );
    if (!btnFullScreen) return;
    btnFullScreen.addEventListener("click", (ev) => this.enterFullScreen(ev));
  }

  /**
   * An event handler to exit full screen mode when the Escape key is pressed.
   * @private
   * @param {KeyboardEvent} event
   */
  private _exitFullScreenOnEscape(event: KeyboardEvent): void {
    if (!(event.target instanceof HTMLElement)) return;
    // If the user is in the middle of a select input choice, don't exit
    const selOpenSelectInput = ["select[open]", "input[aria-expanded='true']"];
    if (event.target.matches(selOpenSelectInput.join(", "))) return;

    if (event.key === "Escape") {
      this.exitFullScreen();
    }
  }

  /**
   * An event handler to trap focus within the card when in full screen mode.
   *
   * @description
   * This keyboard event handler ensures that tab focus stays within the card
   * when in full screen mode. When the card is first expanded,
   * we move focus to the card element itself. If focus somehow leaves the card,
   * we returns focus to the card container.
   *
   * Within the card, we handle only tabbing from the close anchor or the last
   * focusable element and only when tab focus would have otherwise left the
   * card. In those cases, we cycle focus to the last focusable element or back
   * to the anchor. If the card doesn't have any focusable elements, we move
   * focus to the close anchor.
   *
   * @note
   * Because the card contents may change, we check for focusable elements
   * every time the handler is called.
   *
   * @private
   * @param {KeyboardEvent} event
   */
  private _trapFocusExit(event: KeyboardEvent): void {
    if (!(event instanceof KeyboardEvent)) return;
    if (event.key !== "Tab") return;

    const isFocusedContainer = event.target === this.card;
    const isFocusedAnchor = event.target === this.overlay.anchor;
    const isFocusedWithin = this.card.contains(event.target as Node);

    const stopEvent = () => {
      event.preventDefault();
      event.stopImmediatePropagation();
    };

    if (!(isFocusedWithin || isFocusedContainer || isFocusedAnchor)) {
      // If focus is outside the card, return to the card
      stopEvent();
      this.card.focus();
      return;
    }

    // Check focusables every time because the card contents may have changed
    // but exclude the full screen enter button from this list of elements
    const focusableElements = getAllFocusableChildren(this.card).filter(
      (el) => !el.classList.contains(CLASS_FULL_SCREEN_ENTER)
    );
    const hasFocusableElements = focusableElements.length > 0;

    // We need to handle five cases:
    // 1. The card has no focusable elements --> focus the anchor
    // 2. Focus is on the card container (do nothing, natural tab order)
    // 3. Focus is on the anchor and the user pressed Tab + Shift (backwards)
    //    -> Move to the last focusable element (end of card)
    // 4. Focus is on the last focusable element and the user pressed Tab
    //    (forwards) -> Move to the anchor (top of card)
    // 5. otherwise we don't interfere

    if (!hasFocusableElements) {
      // case 1
      stopEvent();
      this.overlay.anchor.focus();
      return;
    }

    // case 2
    if (isFocusedContainer) return;

    const lastFocusable = focusableElements[focusableElements.length - 1];
    const isFocusedLast = event.target === lastFocusable;

    if (isFocusedAnchor && event.shiftKey) {
      stopEvent();
      lastFocusable.focus();
      return;
    }

    if (isFocusedLast && !event.shiftKey) {
      stopEvent();
      this.overlay.anchor.focus();
      return;
    }
  }

  /**
   * Creates the full screen overlay.
   * @private
   * @returns {CardFullScreenOverlay}
   */
  private _createOverlay(): CardFullScreenOverlay {
    const container = document.createElement("div");
    container.id = ID_FULL_SCREEN_OVERLAY;
    container.onclick = this.exitFullScreen.bind(this);

    const anchor = this._createOverlayCloseAnchor();
    container.appendChild(anchor);

    return { container, anchor };
  }

  /**
   * Creates the anchor element used to exit the full screen mode.
   * @private
   * @returns {CardFullScreenOverlay["anchor"]}
   */
  private _createOverlayCloseAnchor(): CardFullScreenOverlay["anchor"] {
    const anchor = document.createElement("a");
    anchor.classList.add(CLASS_FULL_SCREEN_EXIT);
    anchor.tabIndex = 0;
    anchor.setAttribute("aria-expanded", "true");
    anchor.setAttribute("aria-label", "Close card");
    anchor.setAttribute("role", "button");
    anchor.onclick = (ev) => {
      this.exitFullScreen();
      ev.stopPropagation();
    };
    anchor.onkeydown = (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        this.exitFullScreen();
      }
    };
    anchor.innerHTML = this._overlayCloseHtml();

    return anchor;
  }

  /**
   * Returns the HTML for the close icon.
   * @private
   * @returns {string}
   */
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
}
