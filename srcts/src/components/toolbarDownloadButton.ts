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

    if (hasDefinedProperty(msg, "disabled")) {
      // The element is an <a> tag, not a <button>, so there is no native
      // `disabled` property — we manually manage class/aria/tabindex instead.
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

    if (hasDefinedProperty(msg, "label") && msg.label !== undefined) {
      const labelEl = el.querySelector(
        ".bslib-toolbar-label"
      ) as HTMLElement | null;
      if (!labelEl) {
        console.warn(
          "[bslib.toolbar-download-button] .bslib-toolbar-label not found"
        );
        return;
      }
      await shinyRenderContent(labelEl, msg.label);
    }

    if (hasDefinedProperty(msg, "showLabel")) {
      const labelEl = el.querySelector(
        ".bslib-toolbar-label"
      ) as HTMLElement | null;
      if (!labelEl) {
        console.warn(
          "[bslib.toolbar-download-button] .bslib-toolbar-label not found"
        );
        return;
      }
      if (msg.showLabel === false) {
        labelEl.setAttribute("hidden", "");
        el.setAttribute("data-type", "icon");
      } else {
        labelEl.removeAttribute("hidden");
        el.setAttribute("data-type", "both");
      }
    }

    if (hasDefinedProperty(msg, "icon") && msg.icon !== undefined) {
      const iconEl = el.querySelector(
        ".bslib-toolbar-icon"
      ) as HTMLElement | null;
      if (!iconEl) {
        console.warn(
          "[bslib.toolbar-download-button] .bslib-toolbar-icon not found"
        );
        return;
      }
      await shinyRenderContent(iconEl, msg.icon);
    }
  },
});
