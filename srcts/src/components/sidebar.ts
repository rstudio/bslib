import {
  InputBinding,
  registerBinding,
  doWindowResizeOnElementResize,
} from "./_utils";

type SidebarMethod = "close" | "open";

type MessageData = {
  method: SidebarMethod | null;
};

type SidebarComponents = {
  container: HTMLElement;
  main: HTMLElement;
  sidebar: HTMLElement;
  toggle: HTMLElement;
  isClosed: boolean;
};

class BslibSidebar {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static readonly COLLAPSE_CLASS = "sidebar-collapsed";

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static readonly LAYOUT_CLASS = "bslib-sidebar-layout";

  public static initSidebar(el: HTMLElement): void {
    const container = BslibSidebar._findLayoutContainer(el);
    // remove script with onload attribute to signal initialization happened
    container.removeChild(el);

    const childLayouts = container.getElementsByClassName(
      BslibSidebar.LAYOUT_CLASS
    );

    if (childLayouts.length > 0) {
      BslibSidebar._initAutoCollapse(container);
      return;
    }

    // This layout is the innermost layout, so we add CSS variables to it, and
    // any direct ancestor sidebar layouts, that count the number of parent
    // layouts in this subtree. This is used to ensure the collapse toggles
    // don't overlap.

    function nextSidebarParent(el: HTMLElement | null): HTMLElement | null {
      el = el ? el.parentElement : null;
      if (el && el.classList.contains("main")) {
        // .bslib-sidebar-layout > .main > .bslib-sidedbar-layout
        el = el.parentElement;
      }
      if (el && el.classList.contains(BslibSidebar.LAYOUT_CLASS)) {
        return el;
      }
      return null;
    }

    const layouts = [container];
    let parent = nextSidebarParent(el);

    while (parent) {
      // Add parent to front of layouts array, so we sort outer -> inner
      layouts.unshift(parent);
      parent = nextSidebarParent(el);
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

    BslibSidebar._initAutoCollapse(container);
  }

  private static _initAutoCollapse(container: HTMLElement): void {
    if (!container.dataset.sidebarInitAutoCollapse) {
      return;
    }

    // If sidebar is marked open='desktop', then close sidebar on mobile
    const initCollapsed = window
      .getComputedStyle(container)
      .getPropertyValue("--bslib-sidebar-js-init-collapsed");
    if (initCollapsed === "true") {
      BslibSidebar.toggleCollapse(container, "close");
    }
  }

  private static _findLayoutContainer(el: HTMLElement): HTMLElement {
    if (el.classList.contains(BslibSidebar.LAYOUT_CLASS)) {
      return el;
    }
    const container = el.closest(`.${BslibSidebar.LAYOUT_CLASS}`);
    if (!container) {
      throw new Error(
        `Expected container or direct ancestor with class ${BslibSidebar.LAYOUT_CLASS}`
      );
    }
    return container as HTMLElement;
  }

  public static sidebarComponents(el: HTMLElement): SidebarComponents {
    el = BslibSidebar._findLayoutContainer(el);

    // sidebar components
    const main = el.querySelector(":scope > .main") as HTMLElement;
    const sidebar = el.querySelector(":scope > .sidebar") as HTMLElement;
    const toggle = el.querySelector(":scope > .collapse-toggle") as HTMLElement;

    // sidebar state
    const isClosed = el.classList.contains(BslibSidebar.COLLAPSE_CLASS);

    return { container: el, main, sidebar, toggle, isClosed };
  }

  public static toggleCollapse(el: HTMLElement, method: SidebarMethod | null) {
    const { container, main, sidebar, isClosed } =
      BslibSidebar.sidebarComponents(el);

    if (method === null) {
      method = isClosed ? "open" : "close";
    }

    if (method !== "open" && method !== "close") {
      throw new Error(`Unknown method ${method}`);
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
    container.classList.add("transitioning");
    container.classList.toggle(BslibSidebar.COLLAPSE_CLASS);
  }
}

class SidebarInputBinding extends InputBinding {
  find(scope: HTMLElement) {
    return $(scope).find(
      `.${BslibSidebar.LAYOUT_CLASS} > .bslib-sidebar-input`
    );
  }

  getValue(el: HTMLElement): boolean {
    return !$(el).parent().hasClass(BslibSidebar.COLLAPSE_CLASS);
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
    const method = data.method;
    const $container = $(el).parent();
    BslibSidebar.toggleCollapse($container[0], method);
  }
}

registerBinding(SidebarInputBinding, "sidebar");

$(document).on(
  "click",
  `.${BslibSidebar.LAYOUT_CLASS} > .collapse-toggle`,
  (e) => {
    e.preventDefault();
    BslibSidebar.toggleCollapse(e.target, null);
  }
);

// Once the collapse transition completes (on the collapse toggle icon, which is
// always guaranteed to transition), then remove the transitioning class
$(document).on(
  "transitionend",
  ".bslib-sidebar-layout > .collapse-toggle > .collapse-icon",
  (e) => {
    const { container, sidebar, toggle, isClosed } =
      BslibSidebar.sidebarComponents(e.target);
    container.classList.remove("transitioning");
    sidebar.hidden = isClosed;
    toggle.ariaExpanded = isClosed ? "false" : "true";
    $(sidebar).trigger("toggleCollapse.sidebarInputBinding");
  }
);

// attach BslibSidebar class to window for global usage
(window as any).BslibSidebar = BslibSidebar;
