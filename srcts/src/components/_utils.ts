
import { HtmlDep } from "rstudio-shiny/srcts/types/src/shiny/render";

// TODO: Is there a way to get an actual type for Shiny.InputBinding without having to import it?
import type { InputBinding as InputBindingType } from "rstudio-shiny/srcts/types/src/bindings/input";
const InputBinding = (window.Shiny ? Shiny.InputBinding : class {}) as typeof InputBindingType;

function registerBinding(inputBindingClass: new () => InputBindingType, name: string) {
  if (window.Shiny) {
    Shiny.inputBindings.register(new inputBindingClass(), "bslib." + name);
  }
}

export { InputBinding, registerBinding };
export type { HtmlDep };