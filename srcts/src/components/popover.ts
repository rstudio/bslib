import { nothing } from "lit";
import { property } from "lit/decorators.js";
import { LightElement } from "./webcomponents/_lightElement";
import { getOrCreateTriggerEl, setContentCarefully } from "./_utilsTooltip";
import { getFirstFocusableChild, type HtmlDep } from "./_utils";
import type { Popover as PopoverType } from "bootstrap";
import { ShinyResizeObserver } from "./_shinyResizeObserver";

const bsPopover = (
  window.bootstrap ? window.bootstrap.Popover : class {}
) as typeof PopoverType;

type PopoverOptions = {
  content: PopoverType.Options["content"];
  title: PopoverType.Options["title"];
  placement: PopoverType.Options["placement"];
  html: boolean;
  sanitize: boolean;
  trigger: PopoverType.Options["trigger"];
};

type ToggleMessage = {
  method: "toggle";
  value: "hide" | "show" | "toggle";
};

type UpdateMessage = {
  method: "update";
  content?: { html: string; deps: HtmlDep[] };
  title?: { html: string; deps: HtmlDep[] };
};

type MessageData = ToggleMessage | UpdateMessage;

export class BslibPopover extends LightElement {
  static tagName = "bslib-popover";
  // Although it isn't included in the type, Bootstrap hangs a tip element off
  // of the popover instance, which provides a convenient way to find where the
  // popover is located in the DOM.
  private pop!: PopoverType & { tip?: HTMLElement };
  private visibilityObserver!: IntersectionObserver;
  private static shinyResizeObserver = new ShinyResizeObserver();

  @property({ type: String }) placement: PopoverOptions["placement"] = "auto";
  @property({ type: Boolean }) closeButton = false;
  @property({ type: String }) bsOptions = "{}";

  private get options(): PopoverOptions {
    const opts = JSON.parse(this.bsOptions);
    const hasHeader = this.header && this.header.childNodes.length > 0;
    return {
      content: this.content,
      title: hasHeader ? this.header : "",
      placement: this.placement,
      // Bootstrap defaults to false, but we have our own HTML escaping
      html: true,
      sanitize: false,
      trigger: "click",
      ...opts,
    };
  }

  private get content(): HTMLElement | undefined {
    return this.contentContainer.children[0] as HTMLElement;
  }

  private get header(): HTMLElement | undefined {
    return this.contentContainer.children[1] as HTMLElement;
  }

  private get contentContainer(): HTMLElement {
    return this.children[0] as HTMLElement;
  }

  // The element that triggers the popover to be shown
  private get triggerElement(): ReturnType<typeof getOrCreateTriggerEl> {
    return getOrCreateTriggerEl(this);
  }

  // Is the trigger element visible?
  private get visibleTrigger(): boolean {
    const el = this.triggerElement;
    return el && el.offsetParent !== null;
  }

  // By default (when trigger is "click"), treat the trigger element like a
  // button (even if it's not a <button> element). Meaning mostly that we'll
  // manage aria-pressed and Enter/Space keydown events.
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
  private get isButtonLike(): boolean {
    return (
      this.options.trigger === "click" &&
      this.triggerElement.tagName !== "BUTTON"
    );
  }

  ///////////////////////////////////////////////////////////////
  // Methods
  ///////////////////////////////////////////////////////////////

  constructor() {
    super();
    this._onShown = this._onShown.bind(this);
    this._onInsert = this._onInsert.bind(this);
    this._onHidden = this._onHidden.bind(this);
    this._hide = this._hide.bind(this);
    this._handleTabKey = this._handleTabKey.bind(this);
    this._handleEscapeKey = this._handleEscapeKey.bind(this);
    this.style.display = "contents";
  }

  connectedCallback(): void {
    super.connectedCallback();

    // The user-supplied content & header are both wrapped up into an additional
    // <div> (this guarantees that we can pass an _Element_ to
    // bootstrap.Popover(), which moves the content/header from within this
    // component to the popover's location). These inline styles are here
    // to prevent any styling suprises caused by the wrapping <div>.
    if (this.content) this.content.style.display = "contents";
    if (this.header instanceof HTMLElement) {
      this.header.style.display = "contents";
    }

    if (this.closeButton) {
      const btn = document.createElement("button");
      btn.classList.add("btn-close");
      btn.setAttribute("aria-label", "Close");
      btn.onclick = () => {
        this._hide();
        this.triggerElement.focus();
      };
      btn.style.marginLeft = "auto";
      if (this.header) this.header.append(btn);
    }

    const trigger = this.triggerElement;
    trigger.setAttribute("data-bs-toggle", "popover");
    trigger.setAttribute("tabindex", "0");
    this.pop = new bsPopover(trigger, this.options);

    if (this.isButtonLike) {
      trigger.setAttribute("role", "button");
      trigger.setAttribute("aria-pressed", "false");
      trigger.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          this._toggle();
        }
      };
      trigger.style.cursor = "pointer";
    }

    this.visibilityObserver = this._createVisibilityObserver();
    trigger.addEventListener("shown.bs.popover", this._onShown);
    trigger.addEventListener("hidden.bs.popover", this._onHidden);
    trigger.addEventListener("inserted.bs.popover", this._onInsert);
  }

  disconnectedCallback(): void {
    const trigger = this.triggerElement;
    trigger.removeEventListener("shown.bs.popover", this._onShown);
    trigger.removeEventListener("hidden.bs.popover", this._onHidden);
    trigger.removeEventListener("inserted.bs.popover", this._onInsert);

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

    document.addEventListener("keydown", this._handleTabKey);
    document.addEventListener("keydown", this._handleEscapeKey);
  }

  private _onHidden(): void {
    this.visible = false;
    this.onChangeCallback(true);

    this.visibilityObserver.unobserve(this.triggerElement);
    this._restoreContent();

    document.removeEventListener("keydown", this._handleTabKey);
    document.removeEventListener("keydown", this._handleEscapeKey);
  }

  private _onInsert(): void {
    const { tip } = this.pop;
    if (!tip) return;

    tip.setAttribute("tabindex", "0");

    const header = tip.querySelector(".popover-header") as HTMLElement;
    if (header) {
      header.style.display = "flex";
      header.style.alignItems = "center";
    }
    BslibPopover.shinyResizeObserver.observe(tip);
  }

  // 1. Tab on an active trigger focuses the popover.
  // 2. Shift+Tab on active popover focuses the trigger.
  private _handleTabKey(e: KeyboardEvent): void {
    if (e.key !== "Tab") return;
    const { tip } = this.pop;
    if (!tip) return;

    const stopEvent = () => {
      e.preventDefault();
      e.stopImmediatePropagation();
    };

    const active = document.activeElement;
    if (active === this.triggerElement && !e.shiftKey) {
      stopEvent();
      tip.focus();
    }

    if (active === tip && e.shiftKey) {
      stopEvent();
      this.triggerElement.focus();
    }
  }

  // Allow ESC to close the popover when:
  // - the trigger is the active element
  // - the activeElement is inside the popover
  private _handleEscapeKey(e: KeyboardEvent): void {
    if (e.key !== "Escape") return;
    const { tip } = this.pop;
    if (!tip) return;

    const active = document.activeElement;
    if (active === this.triggerElement || tip.contains(active)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      this._hide();
      this.triggerElement.focus();
    }
  }

  // Since this.content is an HTMLElement, when it's shown bootstrap.Popover()
  // will move the DOM element from this web container to the popover's
  // container (which, by default, is the body, but can also be customized). So,
  // when the popover is hidden, we're responsible for moving it back to this
  // element.
  private _restoreContent(): void {
    const { tip } = this.pop;
    if (!tip) {
      throw new Error(
        "Failed to find the popover's DOM element. Please report this bug."
      );
    }
    const body = tip.querySelector(".popover-body");
    if (body) this.contentContainer.append(body?.firstChild as HTMLElement);
    const header = tip.querySelector(".popover-header");
    if (header) this.contentContainer.append(header?.firstChild as HTMLElement);
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
      this._updateContent(data.content);
    } else {
      throw new Error(`Unknown method ${method}`);
    }
  }

  private _toggle(x?: ToggleMessage["value"]): void {
    if (x === "toggle" || x === undefined) {
      x = this.visible ? "hide" : "show";
    }
    if (x === "hide") {
      this._hide();
    }
    if (x === "show") {
      this._show();
    }
  }

  private _hide(): void {
    this.pop.hide();
    if (this.isButtonLike) {
      this.triggerElement.setAttribute("aria-pressed", "false");
    }
  }

  // No-op if the popover is already visible or if the trigger element is not visible
  // (in either case the tooltip likely won't be positioned correctly)
  private _show(): void {
    if (!this.visible && this.visibleTrigger) {
      this.pop.show();
      if (this.isButtonLike) {
        this.triggerElement.setAttribute("aria-pressed", "true");
      }
    }
  }

  private _updateTitle(title: UpdateMessage["title"]): void {
    if (!title) return;
    Shiny.renderDependencies(title.deps);
    setContentCarefully(
      this.pop,
      this.triggerElement,
      title.html,
      ".popover-header",
      "popover"
    );
  }

  private _updateContent(content: UpdateMessage["content"]): void {
    if (!content) return;
    Shiny.renderDependencies(content.deps);
    setContentCarefully(
      this.pop,
      this.triggerElement,
      content.html,
      ".popover-body",
      "popover"
    );
  }

  // While the popover is shown, watches for changes in the _trigger_
  // visibility. If the trigger element becomes no longer visible, then we hide
  // the popover (Bootstrap doesn't do this automatically when showing
  // programmatically)
  private _createVisibilityObserver(): IntersectionObserver {
    const handler = (entries: IntersectionObserverEntry[]) => {
      if (!this.visible) return;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) this._hide();
      });
    };
    return new IntersectionObserver(handler);
  }
}
