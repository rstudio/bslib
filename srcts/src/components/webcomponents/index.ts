import { BslibTooltip } from "./tooltip";
import { BslibPopover } from "./popover";
import { BslibInputDarkMode } from "./inputDarkMode";
import { makeInputBinding } from "./_makeInputBinding";
import { shinyAddCustomMessageHandlers } from "../_shinyAddCustomMessageHandlers";
import { BslibLayoutColumns } from "./layoutColumns";
import { BslibSwitch, BslibSwitchInline } from "./switch";

[
  BslibTooltip,
  BslibPopover,
  BslibInputDarkMode,
  BslibLayoutColumns,
  BslibSwitch,
  BslibSwitchInline,
].forEach((cls) => {
  customElements.define(cls.tagName, cls);
  if (window.Shiny) {
    if (cls.isShinyInput) makeInputBinding(cls.tagName);
    if ("shinyCustomMessageHandlers" in cls) {
      shinyAddCustomMessageHandlers(cls["shinyCustomMessageHandlers"]);
    }
  }
});
