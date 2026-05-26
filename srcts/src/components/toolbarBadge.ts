import { shinyAddCustomMessageHandlers } from "./_shinyAddCustomMessageHandlers";
import { shinyRenderContent, hasDefinedProperty } from "./_utils";
import type { HtmlDep } from "./_utils";

interface UpdateToolbarBadgeMessage {
  id: string;
  label?: string | { html: string; deps: HtmlDep[] };
  icon?: string | { html: string; deps: HtmlDep[] };
  showLabel?: boolean;
  color?: string;
  border?: boolean;
  pill?: boolean;
}

const badgeColorNames = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];

function applyColorStyle(
  el: HTMLElement,
  color: string,
  border: boolean
): void {
  el.classList.remove(
    ...badgeColorNames.map((c) => `text-bg-${c}`),
    ...badgeColorNames.map((c) => `border-${c}`),
    ...badgeColorNames.map((c) => `text-${c}`),
    "border"
  );
  if (border) {
    el.classList.add("border", `border-${color}`, `text-${color}`);
    el.dataset.bslibBorder = "true";
  } else {
    el.classList.add(`text-bg-${color}`);
    delete el.dataset.bslibBorder;
  }
  el.dataset.bslibColor = color;
}

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

  if (
    hasDefinedProperty(message, "color") ||
    hasDefinedProperty(message, "border")
  ) {
    const newColor = message.color ?? el.dataset.bslibColor ?? "secondary";
    const newOutline =
      message.border !== undefined
        ? message.border
        : el.dataset.bslibBorder === "true";
    applyColorStyle(el, newColor, newOutline);
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
