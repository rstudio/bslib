import {
  InputBinding,
  registerBinding,
  doWindowResizeOnElementResize,
} from "./_utils";

type SidebarMethod = "close" | "open" | "toggle";

type MessageData = {
  method: SidebarMethod;
};

interface SidebarComponents {
  container: HTMLElement;
  main: HTMLElement;
  sidebar: HTMLElement;
  toggle: HTMLElement;
}

class Sidebar {
  private layout: SidebarComponents;
  constructor(container: HTMLElement) {
    container.removeAttribute("data-bslib-sidebar-init");

    Sidebar.instanceMap.set(container, this);
    this.layout = {
      container,
      main: container.querySelector(":scope > .main") as HTMLElement,
      sidebar: container.querySelector(":scope > .sidebar") as HTMLElement,
      toggle: container.querySelector(
        ":scope > .collapse-toggle"
      ) as HTMLElement,
    } as SidebarComponents;

    if (!this.layout.toggle) {
      throw new Error("Tried to initialize a non-collapsible sidebar.");
    }

    this._initEventListeners();
    this._initSidebarCounters();
    this._initDesktop();
  }

  get isClosed(): boolean {
    return this.layout.container.classList.contains(Sidebar.classes.COLLAPSE);
  }

  public static readonly classes = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    LAYOUT: "bslib-sidebar-layout",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    COLLAPSE: "sidebar-collapsed",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TRANSITIONING: "transitioning",
  };

  private static onReadyScheduled = false;
  private static instanceMap: WeakMap<HTMLElement, Sidebar> = new WeakMap();

  public static getInstance(el: HTMLElement): Sidebar | undefined {
    return Sidebar.instanceMap.get(el);
  }

  public static initCollapsibleAll(scope: Document | HTMLElement): void {
    if (document.readyState === "loading") {
      if (!Sidebar.onReadyScheduled) {
        Sidebar.onReadyScheduled = true;
        document.addEventListener("DOMContentLoaded", () =>
          Sidebar.initCollapsibleAll(document)
        );
      }
      return;
    }

    const initSelector = "[data-bslib-sidebar-init]";
    let scopeMatches = false;
    if (scope instanceof HTMLElement) {
      scopeMatches = scope.matches(initSelector);
    }
    if (!(scopeMatches || scope.querySelector(initSelector))) {
      // no sidebars to initialize
      return;
    }

    const containers = Array.from(scope.querySelectorAll(initSelector));
    if (scopeMatches && scope instanceof HTMLElement) {
      containers.unshift(scope);
    }

    containers.forEach((container) => new Sidebar(container as HTMLElement));
  }

  private _initEventListeners(): void {
    const { sidebar, toggle } = this.layout;

    toggle.addEventListener("click", (ev) => {
      ev.preventDefault();
      this.toggle("toggle");
    });

    // Once the collapse transition completes (on the collapse toggle icon, which is
    // always guaranteed to transition), then remove the transitioning class
    toggle
      .querySelector(".collapse-icon")
      ?.addEventListener("transitionend", () => {
        this._finalizeState();
        $(sidebar).trigger("toggleCollapse.sidebarInputBinding");
      });
  }

  private _initSidebarCounters(): void {
    // This function walks up the DOM tree, adding CSS variables to each
    // direct parent sidebar layout that count the layout's position in the
    // stack of nested layouts. We use these counters to keep the collapse
    // toggles from overlapping. Note that always-open sidebars that don't
    // have collapse toggles break the chain of nesting.
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
        // .bslib-sidebar-layout > .main > .bslib-sidedbar-layout
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
    layouts.forEach(function (x: HTMLElement, i: number): void {
      x.style.setProperty("--bslib-sidebar-counter", i.toString());
      const isRight = x.classList.contains("sidebar-right");
      const thisCount = isRight ? count.right++ : count.left++;
      x.style.setProperty(
        "--bslib-sidebar-overlap-counter",
        thisCount.toString()
      );
    });
  }

  private _initDesktop(): void {
    const { container } = this.layout;
    // If sidebar is marked open='desktop'...
    if (container.dataset.bslibSidebarOpen?.trim() !== "desktop") {
      return;
    }

    // then close sidebar on mobile
    const initCollapsed = window
      .getComputedStyle(container)
      .getPropertyValue("--bslib-sidebar-js-init-collapsed");

    if (initCollapsed.trim() === "true") {
      this.toggle("close");
    }
  }

  public toggle(method: SidebarMethod) {
    const { container, main, sidebar } = this.layout;
    const isClosed = this.isClosed;

    if (["open", "close", "toggle"].indexOf(method) === -1) {
      throw new Error(`Unknown method ${method}`);
    }

    if (method === "toggle") {
      method = isClosed ? "open" : "close";
    }

    if ((isClosed && method === "close") || (!isClosed && method === "open")) {
      // nothing to do, sidebar is already in the desired state
      return;
    }

    // Make sure outputs resize properly when the sidebar is opened/closed
    doWindowResizeOnElementResize(main);

    if (method === "open") {
      // unhide sidebar immediately when opening,
      // otherwise the sidebar is hidden on transitionend
      sidebar.hidden = false;
    }

    // Add a transitioning class just before adding COLLAPSE_CLASS since we want
    // some of the transitioning styles to apply before the collapse state
    container.classList.add(Sidebar.classes.TRANSITIONING);
    container.classList.toggle(Sidebar.classes.COLLAPSE);
  }

  private _finalizeState(): void {
    const { container, sidebar, toggle } = this.layout;
    container.classList.remove(Sidebar.classes.TRANSITIONING);
    sidebar.hidden = this.isClosed;
    toggle.ariaExpanded = this.isClosed ? "false" : "true";
  }
}

class SidebarInputBinding extends InputBinding {
  find(scope: HTMLElement) {
    return $(scope).find(`.${Sidebar.classes.LAYOUT} > .bslib-sidebar-input`);
  }

  getValue(el: HTMLElement): boolean {
    const sb = Sidebar.getInstance(el.parentElement as HTMLElement);
    return sb ? sb.isClosed : false;
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

  receiveMessage(el: HTMLElement, data: MessageData) {
    const sb = Sidebar.getInstance(el.parentElement as HTMLElement);
    if (sb) sb.toggle(data.method);
  }
}

registerBinding(SidebarInputBinding, "sidebar");

// attach Sidebar class to window for global usage
(window as any).bslib = (window as any).bslib || {};
(window as any).bslib.Sidebar = Sidebar;
