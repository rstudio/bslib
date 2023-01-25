import {
  InputBinding,
  registerBinding,
  doWindowResizeOnElementResize,
} from "./_utils";

type MessageData = {
  method: "close" | "open";
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const COLLAPSE_CLASS = "sidebar-collapsed";

class SidebarInputBinding extends InputBinding {
  find(scope: HTMLElement) {
    return $(scope).find(".bslib-sidebar-layout > .bslib-sidebar-input");
  }

  getValue(el: HTMLElement): boolean {
    return !$(el).parent().hasClass(COLLAPSE_CLASS);
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
    const $parent = $(el).parent();

    if (method === "open") {
      $parent.removeClass(COLLAPSE_CLASS);
    } else if (method === "close") {
      $parent.addClass(COLLAPSE_CLASS);
    } else {
      throw new Error(`Unknown method ${method}`);
    }

    $(el).trigger("toggleCollapse.sidebarInputBinding");
  }
}

registerBinding(SidebarInputBinding, "sidebar");

$(document).on("click", ".bslib-sidebar-layout .collapse-toggle", (e) => {
  e.preventDefault();

  const $container = $(e.target).closest(".bslib-sidebar-layout"),
    $main = $container.children(".main"),
    $side = $container.children(".sidebar");

  // Make sure outputs resize properly when the sidebar is opened/closed
  doWindowResizeOnElementResize($main[0]);

  $container.toggleClass(COLLAPSE_CLASS);
  $side.trigger("toggleCollapse.sidebarInputBinding");
});
