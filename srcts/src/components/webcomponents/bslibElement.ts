import { LitElement, css, html } from "lit";
import type { CSSResult, CSSResultArray } from "lit";

export class BslibElement extends LitElement {
  static tagName = "bslib-element";
  static isShinyInput = false;
  static styles: CSSResult | CSSResultArray = css`
    :host {
      display: contents;
    }
  `;

  connectedCallback(): void {
    this.maybeCarryFill();
    super.connectedCallback();
  }

  render(): ReturnType<LitElement["render"]> {
    return html`<slot></slot>`;
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
