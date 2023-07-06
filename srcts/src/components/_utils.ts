import type { HtmlDep } from "rstudio-shiny/srcts/types/src/shiny/render";

import type { InputBinding as InputBindingType } from "rstudio-shiny/srcts/types/src/bindings/input";

import { LitElement } from "lit";
import type { BindScope } from "rstudio-shiny/srcts/types/src/shiny/bind";

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

class LightElement extends LitElement {
  elementChildren: ChildNode[] = [];
  slotContents: any;

  static isShinyInput = false;

  connectedCallback(): void {
    this.elementChildren = Array.from(this.childNodes);
    this.maybeCarryFill();
    super.connectedCallback();
  }

  get slotElements(): ChildNode[] {
    return this.elementChildren;
  }

  createRenderRoot(): this {
    return this;
  }

  maybeCarryFill(): void {
    if (this.isFillCarrier) {
      this.classList.add("html-fill-container");
      this.classList.add("html-fill-item");
    } else {
      this.classList.remove("html-fill-container");
      this.classList.remove("html-fill-item");
    }
  }

  get isFillCarrier(): boolean {
    if (!this.parentElement) {
      return false;
    }

    const inContainer = this.parentElement.classList.contains(
      "html-fill-container"
    );
    const hasFillItem = Array.from(this.children).some((x: Element) =>
      x.classList.contains("html-fill-item")
    );

    return inContainer && hasFillItem;
  }
}

export interface CustomElementInputValue<T> extends HTMLElement {
  id: string;
  value: T;
  onChangeCallback: (x: boolean) => void;
  receiveMessage: (el: HTMLElement, data: { [key: string]: any }) => void;
}

export interface CustomElementInputGetValue<T> extends HTMLElement {
  id: string;
  getValue: () => T;
  onChangeCallback: (x: boolean) => void;
  receiveMessage: (el: HTMLElement, data: { [key: string]: any }) => void;
}

export type CustomElementInput<T> =
  | CustomElementInputGetValue<T>
  | CustomElementInputValue<T>;

/**
 * Given a tag name for a custom element that is a CustomElementInput<T>, this
 * will hook up the proper input binding and register it with Shiny.
 * @param tagName Name of the tag that corresponds to the input binding
 * @returns Nothing
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function makeInputBinding<T>(
  tagName: string,
  { type = null }: { type?: string | null } = {}
) {
  if (!window.Shiny) {
    return;
  }

  class NewCustomBinding extends Shiny["InputBinding"] {
    constructor() {
      super();
    }

    find(scope: HTMLElement): JQuery<CustomElementInput<T>> {
      return $(scope).find(tagName) as JQuery<CustomElementInput<T>>;
    }

    getValue(el: CustomElementInputGetValue<T> | CustomElementInputValue<T>) {
      if ("getValue" in el) {
        return el.getValue();
      } else {
        return el.value;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getType(el: CustomElementInput<T>): string | null {
      return type;
    }

    subscribe(el: CustomElementInput<T>, callback: (x: boolean) => void): void {
      el.onChangeCallback = callback;
    }

    unsubscribe(el: CustomElementInput<T>): void {
      // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
      el.onChangeCallback = (x: boolean) => {};
    }

    receiveMessage(
      el: CustomElementInput<T>,
      data: { [key: string]: any }
    ): void {
      el.receiveMessage(el, data);
    }
  }

  Shiny.inputBindings.register(new NewCustomBinding(), `${tagName}-Binding`);
}

function bindAll(scope: BindScope): void {
  if (Shiny && Shiny.bindAll) Shiny.bindAll(scope);
}

function unbindAll(scope: BindScope): void {
  if (Shiny && Shiny.unbindAll) Shiny.unbindAll(scope);
}

export {
  InputBinding,
  registerBinding,
  hasDefinedProperty,
  doWindowResizeOnElementResize,
  getAllFocusableChildren,
  LightElement,
  makeInputBinding,
  bindAll,
  unbindAll,
};

export type { HtmlDep };
