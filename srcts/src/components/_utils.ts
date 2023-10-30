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

function getAllFocusableChildren(el: HTMLElement): HTMLElement[] {
  // Cross-referenced with https://allyjs.io/data-tables/focusable.html
  const base = [
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
  const selectors = base.map((b) => b + modifiers.join(""));
  const focusable = el.querySelectorAll(selectors.join(", "));
  return Array.from(focusable) as HTMLElement[];
}

async function shinyRenderContent(
  ...args: Parameters<Shiny["renderContentAsync"]>
): ReturnType<Shiny["renderContentAsync"]> {
  if (!window.Shiny) {
    throw new Error("This function must be called in a Shiny app.");
  }
  if (Shiny.renderContentAsync) {
    return await Shiny.renderContentAsync.apply(null, args);
  } else {
    return await Shiny.renderContent.apply(null, args);
  }
}

export {
  InputBinding,
  registerBinding,
  hasDefinedProperty,
  doWindowResizeOnElementResize,
  getAllFocusableChildren,
  shinyRenderContent,
};
export type { HtmlDep };
