import {
  InputBinding,
  registerBinding,
  doWindowResizeOnElementResize,
} from "./_utils";

type SidebarMethod = "close" | "open";

type MessageData = {
  method: SidebarMethod;
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

  public static toggleCollapse(el: HTMLElement, method?: SidebarMethod) {
    const { container, main, sidebar, isClosed } =
      BslibSidebar.sidebarComponents(el);

    if (typeof method === "undefined") {
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
    BslibSidebar.toggleCollapse(e.target);
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
