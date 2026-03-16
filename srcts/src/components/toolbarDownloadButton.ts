import { InputBinding, registerBinding, hasDefinedProperty } from "./_utils";

type ToolbarDownloadButtonMessage = {
  disabled?: boolean;
};

/**
 * Input binding for `bslib::toolbar_download_button()`.
 * This binding exists purely to receive update messages via sendInputMessage().
 * Download buttons are outputs (not inputs), but we use an input binding
 * to enable server-to-client communication for disabled state updates.
 */
class BslibToolbarDownloadButtonBinding extends InputBinding {
  find(scope: HTMLElement) {
    return $(scope).find(".bslib-toolbar-download-button");
  }

  getValue(/*el: HTMLElement*/) {
    // Not used as a true input - returns null
    return null;
  }

  subscribe(/*el: HTMLElement, callback: (x: boolean) => void*/) {
    // No-op: download buttons don't have input values to subscribe to
  }

  unsubscribe(/*el: HTMLElement*/) {
    // No-op
  }

  receiveMessage(el: HTMLElement, message: ToolbarDownloadButtonMessage) {
    if (hasDefinedProperty(message, "disabled")) {
      if (message.disabled) {
        el.classList.add("disabled");
        el.setAttribute("aria-disabled", "true");
        el.setAttribute("tabindex", "-1");
      } else {
        el.classList.remove("disabled");
        el.removeAttribute("aria-disabled");
        el.removeAttribute("tabindex");
      }
    }
  }
}

registerBinding(BslibToolbarDownloadButtonBinding, "toolbar-download-button");
