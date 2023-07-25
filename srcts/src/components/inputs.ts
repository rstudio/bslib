//import { html } from "lit";
//import { property, query } from "lit/decorators.js";
//
//import { LightElement } from "./_utils";
//
//export class InputElement extends LightElement {
//  static tagName = "input-element";
//
//  @property({ type: String }) value = "";
//
//  @query("input") input!: HTMLInputElement;
//
//  handleChange(): void {
//    const container = this.input.parentElement as HTMLElement;
//    container.classList.remove("was-validated");
//
//    if (this.input.validity.valid) {
//      this.value = this.input.value;
//      this.onChangeCallback(true);
//    } else {
//      container.classList.add("was-validated");
//
//      const feedback = container.querySelector(
//        ".invalid-feedback"
//      ) as HTMLElement;
//      feedback.textContent = this.input.validationMessage;
//    }
//
//    this.value = this.input.value;
//    this.onChangeCallback(true);
//  }
//
//  connectedCallback(): void {
//    super.connectedCallback();
//    this.input.addEventListener("change", this.handleChange.bind(this));
//  }
//
//  disconnectedCallback(): void {
//    this.input.removeEventListener("change", this.handleChange.bind(this));
//    super.disconnectedCallback();
//  }
//
//  render(): any {
//    return html`<slot></slot>`;
//  }
//
//  // This is a placeholder function that will be overwritten by the Shiny input
//  // binding. When the input value changes, it invokes this function to notify
//  // Shiny that it has changed.
//  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
//  onChangeCallback = (x: boolean): void => {};
//}
//
export {};
