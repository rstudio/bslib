import { shinyAddCustomMessageHandlers } from "./_shinyAddCustomMessageHandlers";
import { shinyRenderContent, hasDefinedProperty } from "./_utils";
import type { HtmlDep } from "./_utils";

interface UpdateToolbarBadgeMessage {
  id: string;
  label?: string | { html: string; deps: HtmlDep[] };
  icon?: string | { html: string; deps: HtmlDep[] };
  showLabel?: boolean;
  color?: string;
  pill?: boolean;
}

const badgeColorClasses = [
  "text-bg-primary",
  "text-bg-secondary",
  "text-bg-success",
  "text-bg-danger",
  "text-bg-warning",
  "text-bg-info",
  "text-bg-light",
  "text-bg-dark",
];

async function updateToolbarBadge(
  message: UpdateToolbarBadgeMessage
): Promise<void> {
  const el = document.getElementById(message.id);
  if (!el) return;

  if (hasDefinedProperty(message, "label") && message.label !== undefined) {
    const labelEl = el.querySelector(".bslib-toolbar-label") as HTMLElement;
    if (labelEl) await shinyRenderContent(labelEl, message.label);
  }

  if (hasDefinedProperty(message, "icon") && message.icon !== undefined) {
    const iconEl = el.querySelector(".bslib-toolbar-icon") as HTMLElement;
    if (iconEl) await shinyRenderContent(iconEl, message.icon);
  }

  if (hasDefinedProperty(message, "showLabel")) {
    const labelEl = el.querySelector(".bslib-toolbar-label") as HTMLElement;
    if (labelEl) {
      if (message.showLabel === false) {
        labelEl.setAttribute("hidden", "");
      } else {
        labelEl.removeAttribute("hidden");
      }
    }
  }

  if (hasDefinedProperty(message, "color") && message.color !== undefined) {
    el.classList.remove(...badgeColorClasses);
    el.classList.add(`text-bg-${message.color}`);
  }

  if (hasDefinedProperty(message, "pill")) {
    if (message.pill) {
      el.classList.add("rounded-pill");
    } else {
      el.classList.remove("rounded-pill");
    }
  }
}

shinyAddCustomMessageHandlers({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "bslib.update-toolbar-badge": updateToolbarBadge,
});
