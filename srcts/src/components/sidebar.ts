import { InputBinding, registerBinding, registerBslibGlobal } from "./_utils";
import { ShinyResizeObserver } from "./_shinyResizeObserver";

/**
 * Methods for programmatically toggling the state of the sidebar. These methods
 * describe the desired state of the sidebar: `"close"` and `"open"` transition
 * the sidebar to the desired state, unless the sidebar is already in that
 * state. `"toggle"` transitions the sidebar to the state opposite of its
 * current state.
 * @typedef {SidebarToggleMethod}
 */
type SidebarToggleMethod = "close" | "closed" | "open" | "toggle";

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
  /**
   * The resize handle for resizing the sidebar (optional).
   * @type {HTMLElement | null}
   */
  resizeHandle?: HTMLElement | null;
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
   * Resize state tracking
   * @private
   */
  private resizeState = {
    isResizing: false,
    startX: 0,
    startWidth: 0,
    minWidth: 150,
    maxWidth: () => window.innerWidth - 50,
    constrainedWidth: (width: number): number => {
      return Math.max(
        this.resizeState.minWidth,
        Math.min(this.resizeState.maxWidth(), width)
      );
    },
  };

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

    // Initialize resize functionality
    this._initResizeHandle();

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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    RESIZE_HANDLE: "bslib-sidebar-resize-handle",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    RESIZING: "sidebar-resizing",
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
   * Initialize sidebar resize functionality.
   * @private
   */
  private _initResizeHandle(): void {
    if (!this.layout.resizeHandle) {
      const handle = this._createResizeHandle();
      // Insert handle into the layout container
      this.layout.container.appendChild(handle);
      this.layout.resizeHandle = handle;

      this._attachResizeEventListeners(handle);
    }
    this._updateResizeAvailability();
  }

  /**
   * Create the resize handle element.
   * @private
   */
  private _createResizeHandle(): HTMLDivElement {
    const handle = document.createElement("div");
    handle.className = Sidebar.classes.RESIZE_HANDLE;
    handle.setAttribute("role", "separator");
    handle.setAttribute("aria-orientation", "vertical");
    handle.setAttribute("aria-label", "Resize sidebar");
    handle.setAttribute("tabindex", "0");
    handle.setAttribute("aria-keyshortcuts", "ArrowLeft ArrowRight Home End");
    handle.title = "Drag to resize sidebar";

    const indicator = document.createElement("div");
    indicator.className = "resize-indicator";
    handle.appendChild(indicator);

    const instructions = document.createElement("div");
    instructions.className = "visually-hidden";
    instructions.textContent =
      "Use arrow keys to resize the sidebar, Shift for larger steps, Home/End for min/max width.";
    handle.appendChild(instructions);

    return handle;
  }

  /**
   * Attach event listeners for resize functionality.
   * @private
   */
  private _attachResizeEventListeners(handle: HTMLDivElement): void {
    // Mouse events
    handle.addEventListener("mousedown", this._onResizeStart.bind(this));
    document.addEventListener("mousemove", this._onResizeMove.bind(this));
    document.addEventListener("mouseup", this._onResizeEnd.bind(this));

    // Touch events for mobile devices
    handle.addEventListener("touchstart", this._onResizeStart.bind(this), {
      passive: false,
    });
    document.addEventListener("touchmove", this._onResizeMove.bind(this), {
      passive: false,
    });
    document.addEventListener("touchend", this._onResizeEnd.bind(this));

    // Keyboard events for accessibility
    handle.addEventListener("keydown", this._onResizeKeyDown.bind(this));

    window.addEventListener(
      "resize",
      whenChangedCallback(
        () => this._getWindowSize(),
        () => this._updateResizeAvailability()
      )
    );
  }

  /**
   * Check if the sidebar should be resizable in the current state.
   * @private
   * @returns {boolean}
   */
  private _shouldEnableResize(): boolean {
    const isDesktop = this._getWindowSize() === "desktop";
    const notTransitioning = !this.layout.container.classList.contains(
      Sidebar.classes.TRANSITIONING
    );
    const notClosed = !this.isClosed;

    return (
      // Allow resizing only when the sidebar...
      isDesktop && notTransitioning && notClosed
    );
  }

  /**
   * Handle resize start (mouse/touch down).
   * @private
   * @param {MouseEvent | TouchEvent} event
   */
  private _onResizeStart(event: MouseEvent | TouchEvent): void {
    if (!this._shouldEnableResize()) return;

    event.preventDefault();

    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;

    this.resizeState.isResizing = true;
    this.resizeState.startX = clientX;
    this.resizeState.startWidth = this._getCurrentSidebarWidth();

    // Disable transitions during resize for smooth interaction
    this.layout.container.style.setProperty("--_transition-duration", "0ms");
    this.layout.container.classList.add(Sidebar.classes.RESIZING);

    document.documentElement.setAttribute(
      `data-bslib-${Sidebar.classes.RESIZING}`,
      "true"
    );

    this._dispatchResizeEvent("start", this.resizeState.startWidth);
  }

  /**
   * Handle resize move (mouse/touch move).
   * @private
   * @param {MouseEvent | TouchEvent} event
   */
  private _onResizeMove(event: MouseEvent | TouchEvent): void {
    if (!this.resizeState.isResizing) return;

    event.preventDefault();

    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - this.resizeState.startX;

    // Calculate new width based on sidebar position
    const isRight = this._isRightSidebar();
    const newWidth = isRight
      ? this.resizeState.startWidth - deltaX
      : this.resizeState.startWidth + deltaX;

    // Constrain within bounds
    const constrainedWidth = this.resizeState.constrainedWidth(newWidth);

    this._updateSidebarWidth(constrainedWidth);
    this._dispatchResizeEvent("move", constrainedWidth);
  }

  /**
   * Handle resize end (mouse/touch up).
   * @private
   */
  private _onResizeEnd(): void {
    if (!this.resizeState.isResizing) return;

    this.resizeState.isResizing = false;

    // Re-enable transitions
    this.layout.container.style.removeProperty("--_transition-duration");
    this.layout.container.classList.remove(Sidebar.classes.RESIZING);

    // Reset cursor and text selection resizing changes
    document.documentElement.removeAttribute(
      `data-bslib-${Sidebar.classes.RESIZING}`
    );

    // Dispatch resize end event
    Sidebar.shinyResizeObserver.flush();
    this._dispatchResizeEvent("end", this._getCurrentSidebarWidth());
  }

  /**
   * Handle keyboard events for resize accessibility.
   * @private
   * @param {KeyboardEvent} event
   */
  private _onResizeKeyDown(event: KeyboardEvent): void {
    if (!this._shouldEnableResize()) return;

    const step = event.shiftKey ? 50 : 10; // Larger steps with Shift
    let newWidth = this._getCurrentSidebarWidth();

    switch (event.key) {
      case "ArrowLeft":
        newWidth = this._isRightSidebar() ? newWidth + step : newWidth - step;
        break;
      case "ArrowRight":
        newWidth = this._isRightSidebar() ? newWidth - step : newWidth + step;
        break;
      case "Home":
        newWidth = this.resizeState.minWidth;
        break;
      case "End":
        newWidth = this.resizeState.maxWidth();
        break;
      default:
        return; // Don't prevent default for other keys
    }

    event.preventDefault();

    // Constrain within bounds
    newWidth = this.resizeState.constrainedWidth(newWidth);

    this._updateSidebarWidth(newWidth);
    Sidebar.shinyResizeObserver.flush();
    this._dispatchResizeEvent("keyboard", newWidth);
  }

  /**
   * Get the current sidebar width in pixels.
   * @private
   * @returns {number}
   */
  private _getCurrentSidebarWidth(): number {
    const sidebarWidth = this.layout.sidebar.getBoundingClientRect().width;
    return sidebarWidth || 250;
  }

  /**
   * Update the sidebar width.
   * @private
   * @param {number} newWidth
   */
  private _updateSidebarWidth(newWidth: number): void {
    const { container, resizeHandle } = this.layout;

    container.style.setProperty("--_sidebar-width", `${newWidth}px`);

    // Update min, max and current width attributes on the resize handle
    if (resizeHandle) {
      resizeHandle.setAttribute("aria-valuenow", newWidth.toString());
      resizeHandle.setAttribute(
        "aria-valuemin",
        this.resizeState.minWidth.toString()
      );
      resizeHandle.setAttribute(
        "aria-valuemax",
        this.resizeState.maxWidth().toString()
      );
    }
  }

  /**
   * Check if this is a right-aligned sidebar.
   * @private
   * @returns {boolean}
   */
  private _isRightSidebar(): boolean {
    return this.layout.container.classList.contains("sidebar-right");
  }

  /**
   * Update resize handle availability based on current state.
   * @private
   */
  private _updateResizeAvailability(): void {
    if (!this.layout.resizeHandle) return;

    const shouldEnable = this._shouldEnableResize();

    this.layout.resizeHandle.style.display = shouldEnable ? "" : "none";
    this.layout.resizeHandle.setAttribute(
      "aria-hidden",
      shouldEnable ? "false" : "true"
    );

    if (shouldEnable) {
      this.layout.resizeHandle.setAttribute("tabindex", "0");
    } else {
      this.layout.resizeHandle.removeAttribute("tabindex");
    }
  }

  /**
   * Dispatch a custom resize event.
   * @private
   * @param {string} phase The phase of the resize event lifecycle, e.g.
   *   "start", "move", "end", or "keyboard".
   * @param {number} width The new width of the sidebar in pixels.
   */
  private _dispatchResizeEvent(phase: string, width: number): void {
    const event = new CustomEvent("bslib.sidebar.resize", {
      bubbles: true,
      detail: { phase, width, sidebar: this },
    });
    this.layout.sidebar.dispatchEvent(event);
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
      ?.addEventListener("transitionend", () => {
        this._finalizeState();
      });

    if (this._isCollapsible("desktop") && this._isCollapsible("mobile")) {
      return;
    }

    // The sidebar is *sometimes* collapsible, so we need to handle window
    // resize events to ensure visibility and expected behavior.
    window.addEventListener(
      "resize",
      whenChangedCallback(
        () => this._getWindowSize(),
        () => this._initSidebarState()
      )
    );
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
    } else if (method === "closed") {
      method = "close";
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

    // Update resize handle availability
    this._updateResizeAvailability();

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

function whenChangedCallback(
  watchFn: () => unknown,
  callback: () => void
): () => void {
  let lastValue = watchFn();

  return () => {
    const currentValue = watchFn();

    if (currentValue !== lastValue) {
      callback();
    }

    lastValue = currentValue;
  };
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
registerBslibGlobal("Sidebar", Sidebar);
