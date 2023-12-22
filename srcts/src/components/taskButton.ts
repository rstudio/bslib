import { InputBinding, registerBinding } from "./_utils";
import type { BslibSwitchInline } from "./webcomponents/switch";

type TaskButtonMessage = {
  busy: boolean;
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
    return this.#clickCount.get(el) ?? 0;
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
      this.#setBusy(el, true);
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

  async receiveMessage(el: HTMLElement, { busy }: TaskButtonMessage) {
    this.#setBusy(el, busy);
  }

  /**
   * Reach into the child <bslib-switch-inline> and set case="busy" or "ready".
   */
  #setBusy(el: HTMLElement, busy: boolean) {
    (el as HTMLButtonElement).disabled = busy;
    const tbc = el.querySelector(
      "bslib-switch-inline"
    ) as BslibSwitchInline | null;
    if (tbc) {
      tbc.case = busy ? "busy" : "ready";
    }
  }
}

registerBinding(BslibTaskButtonInputBinding, "task-button");
