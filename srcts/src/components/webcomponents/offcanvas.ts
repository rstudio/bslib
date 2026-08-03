import { css, html } from "lit";
import { BslibElement } from "./_bslibElement";
import type { Offcanvas as OffcanvasType } from "bootstrap";

const bsOffcanvas = (
  window.bootstrap ? window.bootstrap.Offcanvas : class {}
) as typeof OffcanvasType;

type ToggleValue = "hide" | "show" | "toggle";

type HideMessage = {
  method: "hide";
};

type ToggleMessage = {
  method: "toggle";
  value: ToggleValue;
};

type MessageData = HideMessage | ToggleMessage;

export class BslibOffcanvas extends BslibElement {
  static tagName = "bslib-offcanvas";
  static isShinyInput = true;

  static styles = css`
    :host {
      /* Bootstrap's .offcanvas class (display: flex) takes over once its CSS is
         loaded; this is just a sensible fallback for the host element. */
      display: block;
    }
  `;

  private visible = false;

  constructor() {
    super();
    this._onShown = this._onShown.bind(this);
    this._onHidden = this._onHidden.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();
    bsOffcanvas.getOrCreateInstance(this);
    this.addEventListener("shown.bs.offcanvas", this._onShown);
    this.addEventListener("hidden.bs.offcanvas", this._onHidden);
    this.visible = this.classList.contains("show");
  }

  disconnectedCallback(): void {
    this.removeEventListener("shown.bs.offcanvas", this._onShown);
    this.removeEventListener("hidden.bs.offcanvas", this._onHidden);
    bsOffcanvas.getInstance(this)?.dispose();
    super.disconnectedCallback();
  }

  render(): ReturnType<BslibElement["render"]> {
    return html`<slot></slot>`;
  }

  private _onShown(): void {
    this.visible = true;
    this.onChangeCallback(true);
  }

  private _onHidden(): void {
    this.visible = false;
    this.onChangeCallback(true);
  }

  getValue(): boolean {
    return this.visible;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onChangeCallback = (x: boolean): void => {};

  receiveMessage(el: HTMLElement, data: MessageData): void {
    if (data.method === "hide") {
      bsOffcanvas.getOrCreateInstance(this).hide();
    } else if (data.method === "toggle") {
      this._toggle(data.value);
    } else {
      throw new Error(`Unknown method ${(data as { method: string }).method}`);
    }
  }

  private _toggle(x?: ToggleValue): void {
    if (x === "toggle" || x === undefined) {
      x = this.visible ? "hide" : "show";
    }
    if (x === "hide") {
      bsOffcanvas.getOrCreateInstance(this).hide();
    }
    if (x === "show") {
      bsOffcanvas.getOrCreateInstance(this).show();
    }
  }
}
