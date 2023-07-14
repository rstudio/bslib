import type { HtmlDep } from "rstudio-shiny/srcts/types/src/shiny/render";

import type { InputBinding as InputBindingType } from "rstudio-shiny/srcts/types/src/bindings/input";

// Exclude undefined from T
type NotUndefined<T> = T extends undefined ? never : T;

// eslint-disable-next-line @typescript-eslint/naming-convention
const InputBinding = (
  window.Shiny ? Shiny.InputBinding : class {}
) as typeof InputBindingType;

function registerBinding(
  inputBindingClass: new () => InputBindingType,
  name: string
): void {
  if (window.Shiny) {
    Shiny.inputBindings.register(new inputBindingClass(), "bslib." + name);
  }
}

// Return true if the key exists on the object and the value is not undefined.
//
// This method is mainly used in input bindings' `receiveMessage` method.
// Since we know that the values are sent by Shiny via `{jsonlite}`,
// then we know that there are no `undefined` values. `null` is possible, but not `undefined`.
function hasDefinedProperty<
  Prop extends keyof X,
  X extends { [key: string]: any }
>(
  obj: X,
  prop: Prop
): obj is X & { [key in NonNullable<Prop>]: NotUndefined<X[key]> } {
  return (
    Object.prototype.hasOwnProperty.call(obj, prop) && obj[prop] !== undefined
  );
}

// TODO: Shiny should trigger resize events when the output
// https://github.com/rstudio/shiny/pull/3682
function doWindowResizeOnElementResize(el: HTMLElement): void {
  if ($(el).data("window-resize-observer")) {
    return;
  }
  const resizeEvent = new Event("resize");
  const ro = new ResizeObserver(() => {
    window.dispatchEvent(resizeEvent);
  });
  ro.observe(el);
  $(el).data("window-resize-observer", ro);
}

// Cross-referenced with https://allyjs.io/data-tables/focusable.html
const focusSelectors = [
  "a[href]",
  "area[href]",
  "button",
  "details summary",
  "input",
  "iframe",
  "select",
  "textarea",
  '[contentEditable=""]',
  '[contentEditable="true"]',
  '[contentEditable="TRUE"]',
  "[tabindex]",
];
const modifiers = [':not([tabindex="-1"])', ":not([disabled])"];
// eslint-disable-next-line @typescript-eslint/naming-convention
const FOCUS_SELECTOR = focusSelectors
  .map((x) => x + modifiers.join(""))
  .join(", ");

function getAllFocusableChildren(el: Element): HTMLElement[] {
  return Array.from(el.querySelectorAll(FOCUS_SELECTOR));
}

function getFirstFocusableChild(el: Element): HTMLElement | null {
  return el.querySelector(FOCUS_SELECTOR);
}

export {
  InputBinding,
  registerBinding,
  hasDefinedProperty,
  doWindowResizeOnElementResize,
  getAllFocusableChildren,
  getFirstFocusableChild,
};
export type { HtmlDep };
