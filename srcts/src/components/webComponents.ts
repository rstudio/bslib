import { BslibTooltip } from "./tooltip";
import { makeInputBinding } from "./_utils";

[BslibTooltip].forEach((cls) => {
  customElements.define(cls.tagName, cls);
  if (cls.isShinyInput) makeInputBinding(cls.tagName);
});
