import { BslibTooltip } from "./tooltip";
import { makeInputBinding } from "./webcomponents/_makeInputBinding";

[BslibTooltip].forEach((cls) => {
  customElements.define(cls.tagName, cls);
  if (cls.isShinyInput) makeInputBinding(cls.tagName);
});
