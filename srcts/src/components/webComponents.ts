import { BslibTooltip } from "./tooltip";
import { BslibPopover } from "./popover";
import { makeInputBinding } from "./webcomponents/_makeInputBinding";
import { BslibStatusButton } from "./statusButton";

[BslibTooltip, BslibPopover, BslibStatusButton].forEach((cls) => {
  customElements.define(cls.tagName, cls);
  if (cls.isShinyInput) makeInputBinding(cls.tagName);
});
