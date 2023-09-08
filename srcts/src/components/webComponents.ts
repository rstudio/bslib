import { BslibTooltip } from "./tooltip";
import { BslibPopover } from "./popover";
import { BslibInputDarkMode } from "./inputDarkMode";
import { makeInputBinding } from "./webcomponents/_makeInputBinding";
import { shinyAddCustomMessageHandlers } from "./webcomponents/_shinyAddCustomMessageHandlers";

[BslibTooltip, BslibPopover, BslibInputDarkMode].forEach((cls) => {
  customElements.define(cls.tagName, cls);
  if (window.Shiny) {
    if (cls.isShinyInput) makeInputBinding(cls.tagName);
    if ("shinyCustomMessageHandlers" in cls) {
      shinyAddCustomMessageHandlers(cls["shinyCustomMessageHandlers"]);
    }
  }
});
