import { BslibTooltip } from "./tooltip";
import { BslibPopover } from "./popover";
import { DarkModeSwitch } from "./darkModeSwitch";
import { makeInputBinding } from "./webcomponents/_makeInputBinding";

[BslibTooltip, BslibPopover, DarkModeSwitch].forEach((cls) => {
  customElements.define(cls.tagName, cls);
  if (cls.isShinyInput) makeInputBinding(cls.tagName);
});
