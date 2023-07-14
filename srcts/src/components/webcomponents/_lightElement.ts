import { LitElement } from "lit";

export class LightElement extends LitElement {
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
