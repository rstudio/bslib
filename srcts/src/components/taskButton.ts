import { InputBinding, registerBinding } from "./_utils";
import type { BslibSwitchInline } from "./webcomponents/switch";

type TaskButtonMessage = {
  state: string;
};

/**
 * This is a Shiny input binding for `bslib::task_button()`. It is not a web
 * component, though one of its children is <bslib-switch-inline>. The reason it
 * is not a web component is because it is primarily a button, and I wanted to
 * use the native <button> element to ensure that all of the behaviors of a
 * native button are perfectly implemented.
 */
class BslibTaskButtonInputBinding extends InputBinding {
  #clickCount = new WeakMap<HTMLElement, number>();
  #clickListeners = new WeakMap<HTMLElement, EventListener>();

  find(scope: HTMLElement) {
    return $(scope).find(".bslib-task-button");
  }

  getValue(el: HTMLElement) {
    return {
      value: this.#clickCount.get(el) ?? 0,
      autoReset: el.hasAttribute("data-auto-reset"),
    };
  }

  getType(/*el: HTMLElement*/): string {
    return "bslib.taskbutton";
  }

  subscribe(el: HTMLElement, callback: (x: boolean) => void) {
    if (this.#clickListeners.has(el)) {
      this.unsubscribe(el);
    }

    const eventListener = (/*event: Event*/) => {
      this.#clickCount.set(el, (this.#clickCount.get(el) ?? 0) + 1);
      callback(true);
      this.#setState(el, "busy");
    };
    this.#clickListeners.set(el, eventListener);
    el.addEventListener("click", eventListener);
  }

  unsubscribe(el: HTMLElement) {
    const listener = this.#clickListeners.get(el);
    if (listener) {
      el.removeEventListener("click", listener);
    }
  }

  async receiveMessage(el: HTMLElement, { state }: TaskButtonMessage) {
    this.#setState(el, state);
  }

  /**
   * Reach into the child <bslib-switch-inline> and to switch to the state case.
   */
  #setState(el: HTMLElement, state: string) {
    (el as HTMLButtonElement).disabled = state === "busy";
    const tbc = el.querySelector(
      "bslib-switch-inline"
    ) as BslibSwitchInline | null;
    if (tbc) {
      tbc.case = state;
    }
  }
}

registerBinding(BslibTaskButtonInputBinding, "task-button");
