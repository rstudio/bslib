import { nothing } from "lit";
import { property } from "lit/decorators.js";
import { LightElement } from "./webcomponents/_lightElement";
import { getOrCreateTriggerEl, setContentCarefully } from "./_utilsTooltip";
import type { HtmlDep } from "./_utils";
import type { Tooltip as TooltipType } from "bootstrap";

const bsTooltip = (
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

export class BslibTooltip extends LightElement {
  static tagName = "bslib-tooltip";
  private tooltip!: TooltipType;
  private observer!: IntersectionObserver;

  @property({ type: String }) placement: TooltipOptions["placement"] = "auto";
  @property({ type: String }) bsOptions = "{}";

  private get options(): TooltipOptions {
    const opts = JSON.parse(this.bsOptions);
    return {
      title: this.content,
      placement: this.placement,
      // Bootstrap defaults to false, but we have our own HTML escaping
      html: true,
      sanitize: true,
      ...opts,
    };
  }

  private get content(): string {
    return (this.children[0] as Element).innerHTML;
  }

  // The element that triggers the tooltip to be shown
  private get triggerElement(): ReturnType<typeof getOrCreateTriggerEl> {
    return getOrCreateTriggerEl(this);
  }

  // Is the trigger element visible?
  get visibleTrigger(): boolean {
    const el = this.triggerElement as HTMLElement;
    return el && el.offsetParent !== null;
  }

  ///////////////////////////////////////////////////////////////
  // Methods
  ///////////////////////////////////////////////////////////////

  constructor() {
    super();
    this._onShown = this._onShown.bind(this);
    this._onHidden = this._onHidden.bind(this);
    this.style.display = "contents";
  }

  connectedCallback(): void {
    super.connectedCallback();

    const el = this.triggerElement;
    el.setAttribute("data-bs-toggle", "tooltip");
    el.setAttribute("tabindex", "0");
    this.tooltip = new bsTooltip(el, this.options);

    // This observer watches for changes in the trigger element's visibility
    // (only when the tooltip is visible). If the trigger element is no longer
    // visible, then we hide the tooltip (Bootstrap doesn't do this automatically
    // when programmatically showing a tooltip)
    this.observer = this._createVisibilityObserver();

    el.addEventListener("shown.bs.tooltip", this._onShown);
    el.addEventListener("hidden.bs.tooltip", this._onHidden);
  }

  disconnectedCallback(): void {
    const el = this.triggerElement;
    el.removeEventListener("shown.bs.tooltip", this._onShown);
    el.removeEventListener("hidden.bs.tooltip", this._onHidden);

    super.disconnectedCallback();
  }

  render(): typeof nothing {
    return nothing;
  }

  // Visibility state management
  visible = false;
  getValue(): boolean {
    return this.visible;
  }

  private _onShown(): void {
    this.visible = true;
    this.onChangeCallback(true);
    this.observer.observe(this.triggerElement);
  }

  private _onHidden(): void {
    this.visible = false;
    this.onChangeCallback(true);
    this.observer.unobserve(this.triggerElement);
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
      x = this.visible ? "hide" : "show";
    }
    if (x === "hide") {
      this.tooltip.hide();
    }
    if (x === "show") {
      this._show();
    }
  }

  // No-op if the tooltip is already visible or if the trigger element is not visible
  // (in either case the tooltip likely won't be positioned correctly)
  private _show(): void {
    if (!this.visible && this.visibleTrigger) {
      this.tooltip.show();
    }
  }

  private _updateTitle(title: UpdateMessage["title"]): void {
    if (!title) return;
    Shiny.renderDependencies(title.deps);
    setContentCarefully(this.tooltip, title.html, ".tooltip-inner", "tooltip");
  }

  private _createVisibilityObserver(): IntersectionObserver {
    const handler = (entries: IntersectionObserverEntry[]) => {
      if (!this.visible) return;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) this.tooltip.hide();
      });
    };
    return new IntersectionObserver(handler);
  }
}
