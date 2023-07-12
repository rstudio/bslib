import { nothing } from "lit";
import { property } from "lit/decorators.js";
import { LightElement } from "./webcomponents/_lightElement";
import type { HtmlDep } from "./_utils";
import type { Tooltip as TooltipType } from "bootstrap";

// eslint-disable-next-line @typescript-eslint/naming-convention
const Tooltip = (
  window.bootstrap ? window.bootstrap.Tooltip : class {}
) as typeof TooltipType;

type TooltipOptions = {
  title: TooltipType.Options["title"];
  placement: TooltipType.Options["placement"];
  html: boolean;
  sanitize: boolean;
};

type ToggleMessage = {
  method: "toggle";
  value: "hide" | "show" | "toggle";
};

type UpdateMessage = {
  method: "update";
  title?: { html: string; deps: HtmlDep[] };
};

type MessageData = ToggleMessage | UpdateMessage;

type TooltipTypeWithTip = TooltipType & {
  tip: HTMLElement | null;
};

export class BslibTooltip extends LightElement {
  static tagName = "bslib-tooltip";
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _tooltip!: TooltipType;

  @property({ type: String }) placement: TooltipOptions["placement"] = "auto";
  @property({ type: String }) options = "{}";

  get allOptions(): TooltipOptions {
    const opts = JSON.parse(this.options);
    return {
      title: this.title,
      placement: this.placement,
      // Bootstrap defaults to false, but we have our own HTML escaping
      html: true,
      sanitize: true,
      ...opts,
    };
  }

  get title(): string {
    return (this.children[0] as Element).innerHTML;
  }

  constructor() {
    super();
    this._onShown = this._onShown.bind(this);
    this._onHidden = this._onHidden.bind(this);
    this.style.display = "contents";
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.reference.setAttribute("data-bs-toggle", "tooltip");
    this._tooltip = new Tooltip(this.reference, this.allOptions);

    this.reference.addEventListener("shown.bs.tooltip", this._onShown);
    this.reference.addEventListener("hidden.bs.tooltip", this._onHidden);
  }

  disconnectedCallback(): void {
    this.reference.removeEventListener("shown.bs.tooltip", this._onShown);
    this.reference.removeEventListener("hidden.bs.tooltip", this._onHidden);

    super.disconnectedCallback();
  }

  render(): typeof nothing {
    return nothing;
  }

  // Find an Element to use as the reference for the tooltip
  //
  // TODO: In the future, it'd be nice if the reference was a virtual element (defining)
  // a rectangle around `this.childNodes` instead of just the last HTMLElement.
  // As of today, bootstrap.Tooltip doesn't seem to support floating-ui's virtual elements,
  // (but that should change in Bootstrap v6 https://github.com/twbs/bootstrap/pull/36683)
  get reference(): Element {
    // Note: a child template will always be present as the first child,
    // so ignore the 1st child
    if (this.children.length > 1) {
      const ref = this.children[this.children.length - 1];
      ref.setAttribute("tabindex", "0");
      return ref;
    }
    // If there are childNodes (i.e., a text node), then wrap the last one in a
    // span and use that as the reference
    if (this.childNodes.length > 1) {
      const ref = document.createElement("span");
      ref.setAttribute("tabindex", "0");
      ref.append(this.childNodes[this.childNodes.length - 1]);
      this.appendChild(ref);
      return ref;
    }
    return this;
  }

  // Visibility state management
  visible = false;
  getValue(): boolean {
    return this.visible;
  }

  private _onShown(): void {
    this.visible = true;
    this.onChangeCallback(true);
  }

  private _onHidden(): void {
    this.visible = false;
    this.onChangeCallback(true);
  }

  // Shiny-specific stuff
  static isShinyInput = true;

  // This is a placeholder function that will be overwritten by the Shiny input
  // binding. When the input value changes, it invokes this function to notify
  // Shiny that it has changed.
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onChangeCallback = (x: boolean): void => {};

  receiveMessage(el: HTMLElement, data: MessageData): void {
    const method = data.method;
    if (method === "toggle") {
      this._toggle(data.value);
    } else if (method === "update") {
      this._updateTitle(data.title);
    } else {
      throw new Error(`Unknown method ${method}`);
    }
  }

  private _toggle(x: ToggleMessage["value"]): void {
    if (x === "toggle") {
      this._tooltip.toggle();
    } else if (x === "show") {
      if (!this.visible) this._tooltip.show();
    } else if (x === "hide") {
      if (this.visible) this._tooltip.hide();
    }
  }

  private _updateTitle(title: UpdateMessage["title"]): void {
    if (!title) return;
    Shiny.renderDependencies(title.deps);
    this._setContent(title.html);
  }

  // Workaround for a bug with .setContent() where it inadverently removes a currently
  // visible tooltip. See: https://github.com/twbs/bootstrap/issues/37206#issuecomment-1259541205
  private _setContent(html: string): void {
    // Bootstrap hangs a tip element off of the tooltip instance. This doesn't appear to be
    // part of the public API, but it's a convenient way to get at the tooltip, so we'll use it
    // if available and *visible* (and fall back to the public API if not)
    const tooltip = this._tooltip as TooltipTypeWithTip;
    const tip = tooltip.tip;
    if (tip && tip.offsetParent !== null) {
      const inner = tip.querySelector(".tooltip-inner");
      if (inner) inner.innerHTML = html;
      this._tooltip.update();
    } else {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      this._tooltip.setContent({ ".tooltip-inner": html });
    }
  }
}
