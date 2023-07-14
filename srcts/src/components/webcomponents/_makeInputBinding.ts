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
export function makeInputBinding<T>(
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
