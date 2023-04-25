import {
  InputBinding,
  registerBinding,
  doWindowResizeOnElementResize,
} from "./_utils";

import "arrive";

type SidebarMethod = "close" | "open" | "toggle";

type MessageData = {
  method: SidebarMethod;
};

type SidebarComponents = {
  container: HTMLElement;
  main: HTMLElement;
  sidebar: HTMLElement;
  toggle: HTMLElement & {
    handlers?: { start: (ev: MouseEvent) => void; end: () => void };
  };
  isClosed: boolean;
};

class Sidebar {
  public static readonly classes = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    LAYOUT: "bslib-sidebar-layout",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    COLLAPSE: "sidebar-collapsed",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TRANSITIONING: "transitioning",
  };

  public static initCollapsible(container: HTMLElement): void {
    // Signal that this layout is initialized by removing the init attribute
    container.removeAttribute("data-bslib-sidebar-init");

    Sidebar._initEventListeners(container);
    Sidebar._initSidebarCounters(container);
    Sidebar._initDesktop(container);
  }

  private static _initEventListeners(container: HTMLElement): void {
    const { sidebar, toggle } = Sidebar.components(container);

    // We store a reference to the sidebar toggle event handlers on the toggle
    // element itself, so that we can remove them later if needed.
    toggle.handlers = {
      start: (ev) => {
        ev.preventDefault();
        Sidebar.toggle(container, "toggle");
      },
      end: () => {
        Sidebar.finalizeState(container);
        $(sidebar).trigger("toggleCollapse.sidebarInputBinding");
      },
    };

    toggle.addEventListener("click", toggle.handlers.start);

    // Once the collapse transition completes (on the collapse toggle icon, which is
    // always guaranteed to transition), then remove the transitioning class
    toggle
      .querySelector(".collapse-icon")
      ?.addEventListener("transitionend", toggle.handlers.end);
  }

  private static _initSidebarCounters(container: HTMLElement): void {
    // This function walks up the DOM tree, adding CSS variables to each
    // direct parent sidebar layout that count the layout's position in the
    // stack of nested layouts. We use these counters to keep the collapse
    // toggles from overlapping. Note that always-open sidebars that don't
    // have collapse toggles break the chain of nesting.

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

  private static _initDesktop(container: HTMLElement): void {
    // If sidebar is marked open='desktop'...
    if (container.dataset.bslibSidebarOpen?.trim() !== "desktop") {
      return;
    }

    // then close sidebar on mobile
    const initCollapsed = window
      .getComputedStyle(container)
      .getPropertyValue("--bslib-sidebar-js-init-collapsed");

    if (initCollapsed.trim() === "true") {
      Sidebar.toggle(container, "close");
    }
  }

  private static _findLayoutContainer(el: HTMLElement): HTMLElement {
    const container = el.closest(`.${Sidebar.classes.LAYOUT}`);
    if (!container) {
      throw new Error(
        `Expected container or direct ancestor with class ${Sidebar.classes.LAYOUT}`
      );
    }
    return container as HTMLElement;
  }

  public static components(el: HTMLElement): SidebarComponents {
    el = Sidebar._findLayoutContainer(el);

    // sidebar components
    const main = el.querySelector(":scope > .main") as HTMLElement;
    const sidebar = el.querySelector(":scope > .sidebar") as HTMLElement;
    const toggle = el.querySelector(":scope > .collapse-toggle") as HTMLElement;

    // sidebar state
    const isClosed = el.classList.contains(Sidebar.classes.COLLAPSE);

    return { container: el, main, sidebar, toggle, isClosed };
  }

  public static toggle(el: HTMLElement, method: SidebarMethod) {
    const { container, main, sidebar, isClosed } = Sidebar.components(el);

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

  public static finalizeState(el: HTMLElement): HTMLElement {
    const { container, sidebar, toggle, isClosed } = Sidebar.components(el);
    container.classList.remove(Sidebar.classes.TRANSITIONING);
    sidebar.hidden = isClosed;
    toggle.ariaExpanded = isClosed ? "false" : "true";
    return sidebar;
  }

  public static removeEventListeners(el: HTMLElement): void {
    // If a sidebar layout is removed from the page, we should also clean up any
    // event listeners that were added to the layout's components.
    const { toggle } = Sidebar.components(el);
    if (!toggle.handlers) return;
    toggle.removeEventListener("click", toggle.handlers.start);
    toggle
      .querySelector(".collapse-icon")
      ?.removeEventListener("transitionend", toggle.handlers.end);
  }
}

class SidebarInputBinding extends InputBinding {
  find(scope: HTMLElement) {
    return $(scope).find(`.${Sidebar.classes.LAYOUT} > .bslib-sidebar-input`);
  }

  getValue(el: HTMLElement): boolean {
    return !$(el).parent().hasClass(Sidebar.classes.COLLAPSE);
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
    Sidebar.toggle(el, data.method);
  }
}

registerBinding(SidebarInputBinding, "sidebar");

// Initialize sidebars on page load or when added to the page ----------------
document.arrive(
  `.${Sidebar.classes.LAYOUT}[data-bslib-sidebar-init]`,
  (container) => {
    console.log("arrive", container);
    Sidebar.initCollapsible(container as HTMLElement);
  }
);

document.leave(
  `.${Sidebar.classes.LAYOUT}:not([data-bslib-sidebar-open="always"])`,
  (container) => {
    console.log("leave", container);
    Sidebar.removeEventListeners(container as HTMLElement);
  }
);

// attach Sidebar class to window for global usage
(window as any).bslib = (window as any).bslib || {};
(window as any).bslib.Sidebar = Sidebar;
