import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { InputBinding, registerBinding } from "../_utils";

export class BslibTaskButtonContents extends LitElement {
  static tagName = "bslib-task-button-contents";
  static isShinyInput = false;

  static styles = css`
    :host {
      display: inline;
    }
  `;

  @property({ type: String }) busy = false;

  render(): ReturnType<LitElement["render"]> {
    if (this.busy) {
      return html`<slot name="busy"></slot>`;
    } else {
      return html`<slot name="ready"></slot>`;
    }
  }
}

type TaskButtonMessage = {
  busy: boolean;
};

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
    return "shiny.action";
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

  #setBusy(el: HTMLElement, busy: boolean) {
    (el as HTMLButtonElement).disabled = busy;
    const tbc = el.querySelector(
      "bslib-task-button-contents"
    ) as BslibTaskButtonContents | null;
    if (tbc) {
      tbc.busy = busy;
    }
  }
}

registerBinding(BslibTaskButtonInputBinding, "task-button");
