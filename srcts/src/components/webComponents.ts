import { BslibTooltip } from "./tooltip";
import { BslibPopover } from "./popover";
import { BslibElement } from "./webcomponents/bslibElement";
import { makeInputBinding } from "./webcomponents/_makeInputBinding";

[BslibTooltip, BslibPopover, BslibElement].forEach((cls) => {
  customElements.define(cls.tagName, cls);
  if (cls.isShinyInput) makeInputBinding(cls.tagName);
});
