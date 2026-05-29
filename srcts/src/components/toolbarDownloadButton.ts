import { shinyAddCustomMessageHandlers } from "./_shinyAddCustomMessageHandlers";
import { shinyRenderContent, hasDefinedProperty } from "./_utils";
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

    // Update disabled state.
    // The element is an <a> tag, not a <button>, so there is no native
    // `disabled` property — we manually manage class/aria/tabindex instead.
    if (hasDefinedProperty(msg, "disabled")) {
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

    // Hoist label element lookup — shared by label and showLabel blocks.
    const labelEl = el.querySelector(
      ".bslib-toolbar-label"
    ) as HTMLElement | null;

    // Update label
    if (hasDefinedProperty(msg, "label") && msg.label !== undefined) {
      if (!labelEl) {
        console.warn(
          "[bslib.toolbar-download-button] .bslib-toolbar-label not found"
        );
      } else {
        await shinyRenderContent(labelEl, msg.label);
      }
    }

    // Update show_label visibility
    if (hasDefinedProperty(msg, "showLabel")) {
      if (!labelEl) {
        console.warn(
          "[bslib.toolbar-download-button] .bslib-toolbar-label not found"
        );
      } else if (msg.showLabel === false) {
        labelEl.setAttribute("hidden", "");
        el.setAttribute("data-type", "icon");
      } else {
        labelEl.removeAttribute("hidden");
        el.setAttribute("data-type", "both");
      }
    }

    // Update icon
    if (hasDefinedProperty(msg, "icon") && msg.icon !== undefined) {
      const iconEl = el.querySelector(
        ".bslib-toolbar-icon"
      ) as HTMLElement | null;
      if (!iconEl) {
        console.warn(
          "[bslib.toolbar-download-button] .bslib-toolbar-icon not found"
        );
      } else {
        await shinyRenderContent(iconEl, msg.icon);
      }
    }
  },
});
