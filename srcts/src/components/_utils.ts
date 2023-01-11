import type { HtmlDep } from "rstudio-shiny/srcts/types/src/shiny/render";

import type { InputBinding as InputBindingType } from "rstudio-shiny/srcts/types/src/bindings/input";

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

// Inspiration from https://fettblog.eu/typescript-hasownproperty/
// But mixing with "NonNullable key of Obj" instead of "key to unknown values"
function hasOwnProperty<Prop extends keyof X, X extends { [key: string]: any }>(
  obj: X,
  prop: Prop
): obj is X & { [key in NonNullable<Prop>]: X[key] } {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export { InputBinding, registerBinding, hasOwnProperty };
export type { HtmlDep };
