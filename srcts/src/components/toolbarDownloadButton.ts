import { shinyAddCustomMessageHandlers, shinyRenderContent } from "./_utils";
import type { HtmlDep } from "./_utils";

type ToolbarDownloadButtonMessage = {
  id: string;
  disabled?: boolean;
  label?: string | { html: string; deps: HtmlDep[] };
  showLabel?: boolean;
  icon?: string | { html: string; deps: HtmlDep[] };
};

shinyAddCustomMessageHandlers({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "bslib.toolbar-download-button": async (
    msg: ToolbarDownloadButtonMessage
  ) => {
    const el = document.getElementById(msg.id);
    if (!el) {
      console.warn("[bslib.toolbar-download-button] No element found", msg);
      return;
    }

    if (typeof msg.disabled !== "undefined") {
      if (msg.disabled) {
        el.classList.add("disabled");
        el.setAttribute("aria-disabled", "true");
        el.setAttribute("tabindex", "-1");
      } else {
        el.classList.remove("disabled");
        el.removeAttribute("aria-disabled");
        el.removeAttribute("tabindex");
      }
    }

    if (msg.label !== undefined) {
      const labelEl = el.querySelector(".bslib-toolbar-label") as HTMLElement;
      await shinyRenderContent(labelEl, msg.label);
    }

    if (typeof msg.showLabel !== "undefined") {
      const labelEl = el.querySelector(".bslib-toolbar-label") as HTMLElement;
      if (msg.showLabel === false) {
        labelEl.setAttribute("hidden", "");
        el.setAttribute("data-type", "icon");
      } else {
        labelEl.removeAttribute("hidden");
        el.setAttribute("data-type", "both");
      }
    }

    if (msg.icon !== undefined) {
      const iconEl = el.querySelector(".bslib-toolbar-icon") as HTMLElement;
      await shinyRenderContent(iconEl, msg.icon);
    }
  },
});
