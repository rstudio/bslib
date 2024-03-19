import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

/**
 * A block-level custom element that renders one of its children based on the
 * value of a `case` attribute/property.
 *
 * Example:
 *
 * <bslib-switch case="ok"> <span slot="good">Things are going very well
 *   indeed!</span> <span slot="ok">Things are going fine</span> <span
 *   slot="bad">Things are going terrible!</span> </bslib-switch>
 */
export class BslibSwitch extends LitElement {
  static tagName = "bslib-switch";
  static isShinyInput = false;

  static styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: String, reflect: true }) case = "";

  render(): ReturnType<LitElement["render"]> {
    if (!this.case) {
      return html``;
    }

    return html`<slot name="${this.case}"></slot>`;
  }
}

/**
 * Like <bslib-switch>, but `display: inline` instead of `display: block`.
 */
export class BslibSwitchInline extends BslibSwitch {
  static tagName = "bslib-switch-inline";
  static isShinyInput = false;

  static styles = css`
    :host {
      display: inline;
    }
  `;
}
