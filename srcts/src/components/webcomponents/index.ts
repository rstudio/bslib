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
  if (!customElements.get(cls.tagName)) {
    customElements.define(cls.tagName, cls);
  } else {
    console.error(
      `[bslib] Custom element ${cls.tagName} was already defined, using previous definition.`
    );
  }
  if (window.Shiny) {
    if (cls.isShinyInput) makeInputBinding(cls.tagName);
    if ("shinyCustomMessageHandlers" in cls) {
      shinyAddCustomMessageHandlers(cls["shinyCustomMessageHandlers"]);
    }
  }
});
