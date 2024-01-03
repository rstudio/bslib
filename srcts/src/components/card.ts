import { getAllFocusableChildren } from "./_utils";
import { ShinyResizeObserver } from "./_shinyResizeObserver";

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

/**
 * The bslib card component class.
 *
 * @class Card
 * @typedef {Card}
 */
class Card {
  /**
   * The card container element.
   * @private
   * @type {HTMLElement}
   */
  private card: HTMLElement;
  /**
   * The card's full screen overlay element. We create this element once and add
   * and remove it from the DOM as needed (this simplifies focus management
   * while in full screen mode).
   * @private
   * @type {CardFullScreenOverlay}
   */
  private overlay: CardFullScreenOverlay;

  /**
   * Key bslib-specific classes and attributes used by the card component.
   * @private
   * @static
   * @type {{ ATTR_INIT: string; CLASS_CARD: string; CLASS_FULL_SCREEN: string; CLASS_HAS_FULL_SCREEN: string; CLASS_FULL_SCREEN_ENTER: string; CLASS_FULL_SCREEN_EXIT: string; ID_FULL_SCREEN_OVERLAY: string; }}
   */
  private static attr = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ATTR_INIT: "data-bslib-card-init",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CLASS_CARD: "bslib-card",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ATTR_FULL_SCREEN: "data-full-screen",
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
   * A Shiny-specific resize observer that ensures Shiny outputs in within the
   * card resize appropriately.
   * @private
   * @type {ShinyResizeObserver}
   * @static
   */
  private static shinyResizeObserver = new ShinyResizeObserver();

  /**
   * Creates an instance of a bslib Card component.
   *
   * @constructor
   * @param {HTMLElement} card
   */
  constructor(card: HTMLElement) {
    // remove initialization attribute and script
    card.removeAttribute(Card.attr.ATTR_INIT);
    card
      .querySelector<HTMLScriptElement>(`script[${Card.attr.ATTR_INIT}]`)
      ?.remove();

    this.card = card;
    Card.instanceMap.set(card, this);

    // Let Shiny know to trigger resize when the card size changes
    // TODO: shiny could/should do this itself (rstudio/shiny#3682)
    Card.shinyResizeObserver.observe(this.card);

    this._addEventListeners();
    this.overlay = this._createOverlay();

    // bind event handler methods to this card instance
    this._exitFullScreenOnEscape = this._exitFullScreenOnEscape.bind(this);
    this._trapFocusExit = this._trapFocusExit.bind(this);
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

    this.card.setAttribute(Card.attr.ATTR_FULL_SCREEN, "true");
    document.body.classList.add(Card.attr.CLASS_HAS_FULL_SCREEN);
    this.card.insertAdjacentElement("beforebegin", this.overlay.container);

    // Set initial focus on the card, if not already
    if (
      !this.card.contains(document.activeElement) ||
      document.activeElement?.classList.contains(
        Card.attr.CLASS_FULL_SCREEN_ENTER
      )
    ) {
      this.card.setAttribute("tabindex", "-1");
      this.card.focus();
    }
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
    this.card.setAttribute(Card.attr.ATTR_FULL_SCREEN, "false");
    this.card.removeAttribute("tabindex");
    document.body.classList.remove(Card.attr.CLASS_HAS_FULL_SCREEN);
  }

  /**
   * Adds general card-specific event listeners.
   * @private
   */
  private _addEventListeners(): void {
    const btnFullScreen = this.card.querySelector(
      `:scope > * > .${Card.attr.CLASS_FULL_SCREEN_ENTER}`
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
      (el) => !el.classList.contains(Card.attr.CLASS_FULL_SCREEN_ENTER)
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
    container.id = Card.attr.ID_FULL_SCREEN_OVERLAY;
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
    anchor.classList.add(Card.attr.CLASS_FULL_SCREEN_EXIT);
    anchor.tabIndex = 0;
    anchor.setAttribute("aria-expanded", "true");
    anchor.setAttribute("aria-label", "Close card");
    anchor.setAttribute("role", "button");
    anchor.onclick = () => this.exitFullScreen();
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

  /**
   * The registry of card instances and their associated DOM elements.
   * @private
   * @static
   * @type {WeakMap<HTMLElement, Card>}
   */
  private static instanceMap: WeakMap<HTMLElement, Card> = new WeakMap();

  /**
   * Returns the card instance associated with the given element, if any.
   * @public
   * @static
   * @param {HTMLElement} el
   * @returns {(Card | undefined)}
   */
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

  /**
   * Initializes all cards that require initialization on the page, or schedules
   * initialization if the DOM is not yet ready.
   * @public
   * @static
   * @param {boolean} [flushResizeObserver=true]
   */
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
