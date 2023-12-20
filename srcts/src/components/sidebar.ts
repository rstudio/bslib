import { InputBinding, registerBinding } from "./_utils";
import { ShinyResizeObserver } from "./_shinyResizeObserver";

/**
 * Methods for programmatically toggling the state of the sidebar. These methods
 * describe the desired state of the sidebar: `"close"` and `"open"` transition
 * the sidebar to the desired state, unless the sidebar is already in that
 * state. `"toggle"` transitions the sidebar to the state opposite of its
 * current state.
 * @typedef {SidebarToggleMethod}
 */
type SidebarToggleMethod = "close" | "open" | "toggle";

/**
 * Data received by the input binding's `receiveMessage` method.
 * @typedef {SidebarMessageData}
 */
type SidebarMessageData = {
  method: SidebarToggleMethod;
};

/**
 * Represents the size of the sidebar window either: "desktop" or "mobile".
 */
type SidebarWindowSize = "desktop" | "mobile";

/**
 * The DOM elements that make up the sidebar. `main`, `sidebar`, and `toggle`
 * are all direct children of `container` (in that order).
 * @interface SidebarComponents
 * @typedef {SidebarComponents}
 */
interface SidebarComponents {
  /**
   * The `layout_sidebar()` parent container, with class
   * `Sidebar.classes.LAYOUT`.
   * @type {HTMLElement}
   */
  container: HTMLElement;
  /**
   * The main content area of the sidebar layout.
   * @type {HTMLElement}
   */
  main: HTMLElement;
  /**
   * The sidebar container of the sidebar layout.
   * @type {HTMLElement}
   */
  sidebar: HTMLElement;
  /**
   * The toggle button that is used to toggle the sidebar state.
   * @type {HTMLElement}
   */
  toggle: HTMLElement;
}

/**
 * The bslib sidebar component class. This class is only used for collapsible
 * sidebars.
 *
 * @class Sidebar
 * @typedef {Sidebar}
 */
class Sidebar {
  /**
   * The DOM elements that make up the sidebar, see `SidebarComponents`.
   * @private
   * @type {SidebarComponents}
   */
  private layout: SidebarComponents;

  /**
   * A Shiny-specific resize observer that ensures Shiny outputs in the main
   * content areas of the sidebar resize appropriately.
   * @private
   * @type {ShinyResizeObserver}
   * @static
   */
  private static shinyResizeObserver = new ShinyResizeObserver();

  /**
   * Creates an instance of a collapsible bslib Sidebar.
   * @constructor
   * @param {HTMLElement} container
   */
  constructor(container: HTMLElement) {
    Sidebar.instanceMap.set(container, this);
    this.layout = {
      container,
      main: container.querySelector(":scope > .main") as HTMLElement,
      sidebar: container.querySelector(":scope > .sidebar") as HTMLElement,
      toggle: container.querySelector(
        ":scope > .collapse-toggle"
      ) as HTMLElement,
    } as SidebarComponents;

    const sideAccordion = this.layout.sidebar.querySelector(
      ":scope > .sidebar-content > .accordion"
    );
    if (sideAccordion) {
      // Add `.has-accordion` class to `.sidebar-content` container
      sideAccordion?.parentElement?.classList.add("has-accordion");
      sideAccordion.classList.add("accordion-flush");
    }

    this._initSidebarCounters();
    this._initSidebarState();

    if (this._isCollapsible("desktop") || this._isCollapsible("mobile")) {
      this._initEventListeners();
    }

    // Start watching the main content area for size changes to ensure Shiny
    // outputs resize appropriately during sidebar transitions.
    Sidebar.shinyResizeObserver.observe(this.layout.main);

    container.removeAttribute("data-bslib-sidebar-init");
    const initScript = container.querySelector(
      ":scope > script[data-bslib-sidebar-init]"
    );
    if (initScript) {
      container.removeChild(initScript);
    }
  }

  /**
   * Read the current state of the sidebar. Note that, when calling this method,
   * the sidebar may be transitioning into the state returned by this method.
   *
   * @description
   * The sidebar state works as follows, starting from the open state. When the
   * sidebar is closed:
   * 1. We add both the `COLLAPSE` and `TRANSITIONING` classes to the sidebar.
   * 2. The sidebar collapse begins to animate. In general,  where it is
   *    supported, we transition the `grid-template-columns` property of the
   *    sidebar layout. We also rotate the collapse icon and we use this
   *    rotation to determine when the transition is complete.
   * 3. If another sidebar state toggle is requested while closing the sidebar,
   *    we remove the `COLLAPSE` class and the animation immediately starts to
   *    reverse.
   * 4. When the `transition` is complete, we remove the `TRANSITIONING` class.
   * @readonly
   * @type {boolean}
   */
  get isClosed(): boolean {
    return this.layout.container.classList.contains(Sidebar.classes.COLLAPSE);
  }

  /**
   * Static classes related to the sidebar layout or state.
   * @public
   * @static
   * @readonly
   * @type {{ LAYOUT: string; COLLAPSE: string; TRANSITIONING: string; }}
   */
  public static readonly classes = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    LAYOUT: "bslib-sidebar-layout",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    COLLAPSE: "sidebar-collapsed",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TRANSITIONING: "transitioning",
  };

  /**
   * If sidebars are initialized before the DOM is ready, we re-schedule the
   * initialization to occur on DOMContentLoaded.
   * @private
   * @static
   * @type {boolean}
   */
  private static onReadyScheduled = false;
  /**
   * A map of initialized sidebars to their respective Sidebar instances.
   * @private
   * @static
   * @type {WeakMap<HTMLElement, Sidebar>}
   */
  private static instanceMap: WeakMap<HTMLElement, Sidebar> = new WeakMap();

  /**
   * Given a sidebar container, return the Sidebar instance associated with it.
   * @public
   * @static
   * @param {HTMLElement} el
   * @returns {(Sidebar | undefined)}
   */
  public static getInstance(el: HTMLElement): Sidebar | undefined {
    return Sidebar.instanceMap.get(el);
  }

  /**
   * Determine whether the sidebar is collapsible at a given screen size.
   * @private
   * @param {SidebarWindowSize} [size="desktop"]
   * @returns {boolean}
   */
  private _isCollapsible(size: SidebarWindowSize = "desktop"): boolean {
    const { container } = this.layout;

    const attr =
      size === "desktop" ? "collapsibleDesktop" : "collapsibleMobile";

    const isCollapsible = container.dataset[attr];

    if (isCollapsible === undefined) {
      return true;
    }

    return isCollapsible.trim().toLowerCase() !== "false";
  }

  /**
   * Initialize all collapsible sidebars on the page.
   * @public
   * @static
   * @param {boolean} [flushResizeObserver=true] When `true`, we remove
   * non-existent elements from the ResizeObserver. This is required
   * periodically to prevent memory leaks. To avoid over-checking, we only flush
   * the ResizeObserver when initializing sidebars after page load.
   */
  public static initCollapsibleAll(flushResizeObserver = true): void {
    if (document.readyState === "loading") {
      if (!Sidebar.onReadyScheduled) {
        Sidebar.onReadyScheduled = true;
        document.addEventListener("DOMContentLoaded", () => {
          Sidebar.initCollapsibleAll(false);
        });
      }
      return;
    }

    const initSelector = `.${Sidebar.classes.LAYOUT}[data-bslib-sidebar-init]`;
    if (!document.querySelector(initSelector)) {
      // no sidebars to initialize
      return;
    }

    if (flushResizeObserver) Sidebar.shinyResizeObserver.flush();

    const containers = document.querySelectorAll(initSelector);
    containers.forEach((container) => new Sidebar(container as HTMLElement));
  }

  /**
   * Initialize event listeners for the sidebar toggle button.
   * @private
   */
  private _initEventListeners(): void {
    const { toggle } = this.layout;

    toggle.addEventListener("click", (ev) => {
      ev.preventDefault();
      this.toggle("toggle");
    });

    // Remove the transitioning class when the transition ends. We watch the
    // collapse toggle icon because it's guaranteed to transition, whereas not
    // all browsers support animating grid-template-columns.
    toggle
      .querySelector(".collapse-icon")
      ?.addEventListener("transitionend", () => this._finalizeState());

    if (this._isCollapsible("desktop") && this._isCollapsible("mobile")) {
      return;
    }

    // The sidebar is *sometimes* collapsible, so we need to handle window
    // resize events to ensure visibility and expected behavior.
    window.addEventListener("resize", () => this._handleWindowResizeEvent());
  }

  /**
   * Initialize nested sidebar counters.
   *
   * @description
   * This function walks up the DOM tree, adding CSS variables to each direct
   * parent sidebar layout that count the layout's position in the stack of
   * nested layouts. We use these counters to keep the collapse toggles from
   * overlapping. Note that always-open sidebars that don't have collapse
   * toggles break the chain of nesting.
   * @private
   */
  private _initSidebarCounters(): void {
    const { container } = this.layout;

    const selectorChildLayouts =
      `.${Sidebar.classes.LAYOUT}` +
      "> .main > " +
      `.${Sidebar.classes.LAYOUT}:not([data-bslib-sidebar-open="always"])`;

    const isInnermostLayout =
      container.querySelector(selectorChildLayouts) === null;

    if (!isInnermostLayout) {
      // There are sidebar layouts nested within this layout; defer to children
      return;
    }

    function nextSidebarParent(el: HTMLElement | null): HTMLElement | null {
      el = el ? el.parentElement : null;
      if (el && el.classList.contains("main")) {
        // .bslib-sidebar-layout > .main > .bslib-sidebar-layout
        el = el.parentElement;
      }
      if (el && el.classList.contains(Sidebar.classes.LAYOUT)) {
        return el;
      }
      return null;
    }

    const layouts = [container];
    let parent = nextSidebarParent(container);

    while (parent) {
      // Add parent to front of layouts array, so we sort outer -> inner
      layouts.unshift(parent);
      parent = nextSidebarParent(parent);
    }

    const count = { left: 0, right: 0 };
    layouts.forEach(function (x: HTMLElement): void {
      const isRight = x.classList.contains("sidebar-right");
      const thisCount = isRight ? count.right++ : count.left++;
      x.style.setProperty("--_js-toggle-count-this-side", thisCount.toString());
      x.style.setProperty(
        "--_js-toggle-count-max-side",
        Math.max(count.right, count.left).toString()
      );
    });
  }

  /**
   * Retrieves the current window size by reading a CSS variable whose value is
   * toggled via media queries.
   * @returns The window size as `"desktop"` or `"mobile"`, or `""` if not
   * available.
   */
  private _getWindowSize(): SidebarWindowSize | "" {
    const { container } = this.layout;

    return window
      .getComputedStyle(container)
      .getPropertyValue("--bslib-sidebar-js-window-size")
      .trim() as SidebarWindowSize | "";
  }

  /**
   * Determine the initial toggle state of the sidebar at a current screen size.
   * It always returns whether we should `"open"` or `"close"` the sidebar.
   *
   * @private
   * @returns {("close" | "open")}
   */
  private _initialToggleState(): "close" | "open" {
    const { container } = this.layout;

    const attr = this.windowSize === "desktop" ? "openDesktop" : "openMobile";

    const initState = container.dataset[attr]?.trim()?.toLowerCase();

    if (initState === undefined) {
      return "open";
    }

    if (["open", "always"].includes(initState)) {
      return "open";
    }

    if (["close", "closed"].includes(initState)) {
      return "close";
    }

    return "open";
  }

  /**
   * Initialize the sidebar's initial state when `open = "desktop"`.
   * @private
   */
  private _initSidebarState(): void {
    // Check the CSS variable to find out which mode we're in right now
    this.windowSize = this._getWindowSize();

    const initState = this._initialToggleState();
    this.toggle(initState, true);
  }

  /**
   * The current window size, either `"desktop"` or `"mobile"`.
   * @private
   * @type {SidebarWindowSize | ""}
   */
  private windowSize: SidebarWindowSize | "" = "";

  /**
   * Updates the sidebar state when the window is resized across the mobile-
   * desktop boundary.
   */
  private _handleWindowResizeEvent(): void {
    const newSize = this._getWindowSize();
    if (!newSize || newSize == this.windowSize) {
      return;
    }

    // Re-initializing for the new size also updates the tracked window size
    this._initSidebarState();
  }

  /**
   * Toggle the sidebar's open/closed state.
   * @public
   * @param {SidebarToggleMethod | undefined} method Whether to `"open"`,
   * `"close"` or `"toggle"` the sidebar. If `.toggle()` is called without an
   * argument, it will toggle the sidebar's state.
   * @param {boolean} [immediate=false] If `true`, the sidebar state will be
   * set immediately, without a transition. This is primarily used when the
   * sidebar is initialized.
   */
  public toggle(
    method: SidebarToggleMethod | undefined,
    immediate = false
  ): void {
    if (typeof method === "undefined") {
      method = "toggle";
    }

    const { container, sidebar } = this.layout;
    const isClosed = this.isClosed;

    if (["open", "close", "toggle"].indexOf(method) === -1) {
      throw new Error(`Unknown method ${method}`);
    }

    if (method === "toggle") {
      method = isClosed ? "open" : "close";
    }

    if ((isClosed && method === "close") || (!isClosed && method === "open")) {
      // nothing to do, sidebar is already in the desired state
      if (immediate) this._finalizeState();
      return;
    }

    if (method === "open") {
      // unhide sidebar immediately when opening,
      // otherwise the sidebar is hidden on transitionend
      sidebar.hidden = false;
    }

    // If not immediate, add the .transitioning class to the sidebar for smooth
    // transitions. This class is removed when the transition ends.
    container.classList.toggle(Sidebar.classes.TRANSITIONING, !immediate);
    container.classList.toggle(Sidebar.classes.COLLAPSE);

    if (immediate) {
      // When transitioning, state is finalized on transitionend, otherwise we
      // need to manually and immediately finalize the state.
      this._finalizeState();
    }
  }

  /**
   * When the sidebar open/close transition ends, finalize the sidebar's state.
   * @private
   */
  private _finalizeState(): void {
    const { container, sidebar, toggle } = this.layout;
    container.classList.remove(Sidebar.classes.TRANSITIONING);
    sidebar.hidden = this.isClosed;
    toggle.setAttribute("aria-expanded", this.isClosed ? "false" : "true");

    // Send browser-native event with updated sidebar state
    const event = new CustomEvent("bslib.sidebar", {
      bubbles: true,
      detail: { open: !this.isClosed },
    });
    sidebar.dispatchEvent(event);

    // Trigger Shiny input and output binding events
    $(sidebar).trigger("toggleCollapse.sidebarInputBinding");
    $(sidebar).trigger(this.isClosed ? "hidden" : "shown");
  }
}

/**
 * A Shiny input binding for a sidebar.
 * @class SidebarInputBinding
 * @typedef {SidebarInputBinding}
 * @extends {InputBinding}
 */
class SidebarInputBinding extends InputBinding {
  find(scope: HTMLElement) {
    return $(scope).find(`.${Sidebar.classes.LAYOUT} > .bslib-sidebar-input`);
  }

  getValue(el: HTMLElement): boolean {
    const sb = Sidebar.getInstance(el.parentElement as HTMLElement);
    if (!sb) return false;
    return !sb.isClosed;
  }

  setValue(el: HTMLElement, value: boolean): void {
    const method = value ? "open" : "close";
    this.receiveMessage(el, { method });
  }

  subscribe(el: HTMLElement, callback: (x: boolean) => void) {
    $(el).on(
      "toggleCollapse.sidebarInputBinding",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function (event) {
        callback(true);
      }
    );
  }

  unsubscribe(el: HTMLElement) {
    $(el).off(".sidebarInputBinding");
  }

  receiveMessage(el: HTMLElement, data: SidebarMessageData) {
    const sb = Sidebar.getInstance(el.parentElement as HTMLElement);
    if (sb) sb.toggle(data.method);
  }
}

registerBinding(SidebarInputBinding, "sidebar");

// attach Sidebar class to window for global usage
(window as any).bslib = (window as any).bslib || {};
(window as any).bslib.Sidebar = Sidebar;
