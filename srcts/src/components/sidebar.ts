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

$(document).on("click", ".bslib-sidebar-layout > .collapse-toggle", (e) => {
  e.preventDefault();

  const $toggle = $(e.target).closest(".collapse-toggle"),
    $container = $toggle.parent(),
    $main = $container.children(".main"),
    $side = $container.children(".sidebar");

  // Make sure outputs resize properly when the sidebar is opened/closed
  doWindowResizeOnElementResize($main[0]);

  // Add a transitioning class just before adding COLLAPSE_CLASS since we want
  // some of the transitioning styles to apply before the collapse state
  $container.addClass("transitioning");
  $container.toggleClass(COLLAPSE_CLASS);

  // Update the aria-expanded attribute
  $toggle.attr(
    "aria-expanded",
    $container.hasClass(COLLAPSE_CLASS) ? "false" : "true"
  );

  $side.trigger("toggleCollapse.sidebarInputBinding");
});

// Once the collapse transition completes (on the collapse toggle, which is
// always guaranteed to transition), then remove the transitioning class
$(document).on(
  "transitionend",
  ".bslib-sidebar-layout > .collapse-toggle > .collapse-icon",
  (e) => {
    $(e.target).closest('.bslib-sidebar-layout').removeClass("transitioning");
  }
);
