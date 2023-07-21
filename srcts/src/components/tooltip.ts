import { nothing } from "lit";
import { property } from "lit/decorators.js";
import { LightElement } from "./webcomponents/_lightElement";
import { getOrCreateTriggerEl, setContentCarefully } from "./_utilsTooltip";
import type { HtmlDep } from "./_utils";
import type { Tooltip as TooltipType } from "bootstrap";
import { ShinyResizeObserver } from "./_shinyResizeObserver";

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
  private tooltip!: TooltipType & { tip?: HTMLElement };
  private visibilityObserver!: IntersectionObserver;
  private static shinyResizeObserver = new ShinyResizeObserver();

  @property({ type: String }) placement: TooltipOptions["placement"] = "auto";
  @property({ type: String }) bsOptions = "{}";

  private get options(): TooltipOptions {
    const opts = JSON.parse(this.bsOptions);
    return {
      title: this.content,
      placement: this.placement,
      // Bootstrap defaults to false, but we have our own HTML escaping
      html: true,
      sanitize: false,
      ...opts,
    };
  }

  private get content(): HTMLElement | undefined {
    return this.children[0] as HTMLElement;
  }

  // The element that triggers the tooltip to be shown
  private get triggerElement(): ReturnType<typeof getOrCreateTriggerEl> {
    return getOrCreateTriggerEl(this);
  }

  // Is the trigger element visible?
  get visibleTrigger(): boolean {
    const el = this.triggerElement;
    return el && el.offsetParent !== null;
  }

  ///////////////////////////////////////////////////////////////
  // Methods
  ///////////////////////////////////////////////////////////////

  constructor() {
    super();
    this._onShown = this._onShown.bind(this);
    this._onInsert = this._onInsert.bind(this);
    this._onHidden = this._onHidden.bind(this);
    this.style.display = "contents";
  }

  connectedCallback(): void {
    super.connectedCallback();

    const trigger = this.triggerElement;
    trigger.setAttribute("data-bs-toggle", "tooltip");
    trigger.setAttribute("tabindex", "0");
    this.tooltip = new bsTooltip(trigger, this.options);

    this.visibilityObserver = this._createVisibilityObserver();
    trigger.addEventListener("shown.bs.tooltip", this._onShown);
    trigger.addEventListener("hidden.bs.tooltip", this._onHidden);
    trigger.addEventListener("inserted.bs.tooltip", this._onInsert);
  }

  disconnectedCallback(): void {
    const trigger = this.triggerElement;
    trigger.removeEventListener("shown.bs.tooltip", this._onShown);
    trigger.removeEventListener("hidden.bs.tooltip", this._onHidden);
    trigger.removeEventListener("inserted.bs.tooltip", this._onInsert);

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
    this.visibilityObserver.observe(this.triggerElement);
  }

  private _onHidden(): void {
    this.visible = false;
    this.onChangeCallback(true);
    this.visibilityObserver.unobserve(this.triggerElement);
    this._restoreContent();
  }

  private _onInsert(): void {
    const { tip } = this.tooltip;
    if (!tip) return;

    // If outputs happen to be in the tooltip, make sure they sized correctly
    BslibTooltip.shinyResizeObserver.observe(tip);

    // The user-supplied content is wrapped up in to an additional <div> (this
    // guarantees that we can pass an _Element_ to bootstrap.Tooltip(), which
    // moves the content from within this component to the tooltip's location).
    // These inline styles are here to prevent any styling suprises caused by
    // the wrapping <div>.
    const content = tip.querySelector(".tooltip-inner")?.firstChild;
    if (content instanceof HTMLElement) {
      content.style.display = "contents";
    }
  }

  // Since this.content is an HTMLElement, when it's shown bootstrap.Popover()
  // will move the DOM element from this web container to the popover's
  // container (which, by default, is the body, but can also be customized). So,
  // when the popover is hidden, we're responsible for moving it back to this
  // element.
  private _restoreContent(): void {
    const { tip } = this.tooltip;
    if (!tip) {
      throw new Error(
        "Failed to find the popover's DOM element. Please report this bug."
      );
    }
    const content = tip.querySelector(".tooltip-inner")?.firstChild;
    if (content instanceof HTMLElement) {
      content.style.display = "none";
      this.append(content);
    }
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

  private _toggle(x?: ToggleMessage["value"]): void {
    if (x === "toggle" || x === undefined) {
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
    setContentCarefully(
      this.tooltip,
      this.triggerElement,
      title.html,
      ".tooltip-inner",
      "tooltip"
    );
  }

  // While the tooltip is shown, watches for changes in the _trigger_
  // visibility. If the trigger element becomes no longer visible, then we hide
  // the tooltip (Bootstrap doesn't do this automatically when showing
  // programmatically)
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
