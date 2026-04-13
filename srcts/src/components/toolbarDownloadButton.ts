import { shinyAddCustomMessageHandlers } from "./_shinyAddCustomMessageHandlers";

type ToolbarDownloadButtonMessage = {
  id: string;
  disabled?: boolean;
};

shinyAddCustomMessageHandlers({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "bslib.toolbar-download-button": (msg: ToolbarDownloadButtonMessage) => {
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
  },
});
