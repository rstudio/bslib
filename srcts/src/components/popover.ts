import { nothing } from "lit";
import { property } from "lit/decorators.js";
import { LightElement } from "./webcomponents/_lightElement";
import { getOrCreateTriggerEl, setContentCarefully } from "./_utilsTooltip";
import { ShinyResizeObserver } from "./_shinyResizeObserver";
import type { HtmlDep } from "./_utils";
import type { Popover as PopoverType } from "bootstrap";

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
  header?: { html: string; deps: HtmlDep[] };
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
  @property({ type: String }) bsOptions = "{}";

  private get options(): PopoverOptions {
    const opts = JSON.parse(this.bsOptions);
    return {
      content: this.content,
      title: hasHeader(this.header) ? this.header : "",
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
    this._handleTabKey = this._handleTabKey.bind(this);
    this._handleEscapeKey = this._handleEscapeKey.bind(this);
    this._createCloseButton = this._createCloseButton.bind(this);
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

    // Append the close button
    this.content?.append(this._createCloseButton(this.header));

    // Create the popover (and make sure it's focusable)
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

    // If outputs happen to be in the tooltip, make sure they sized correctly
    BslibPopover.shinyResizeObserver.observe(tip);

    // Make the popover focusable
    tip.setAttribute("tabindex", "0");
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
      this._updatePopover(data);
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

  private _updatePopover(data: UpdateMessage): void {
    const { content, header } = data;

    const deps = [];
    if (content) deps.push(...content.deps);
    if (header) deps.push(...header.deps);
    Shiny.renderDependencies(deps);

    // Since we may need to add a close button (with event handlers),
    // parse the string into an HTMLElement. And, since .setContent() is less
    // error-prone if we pass _both_ the header and content, we fallback to the
    // existing header/content if the user didn't supply one.
    const htmlToElement = (
      x: typeof content | typeof header,
      fallback: HTMLElement | undefined,
      selector: string
    ): HTMLElement => {
      if (x) return this._htmlToElement(x.html);
      if (fallback) return fallback;
      return this.pop.tip?.querySelector(selector) as HTMLElement;
    };

    const newHeader = htmlToElement(header, this.header, ".popover-header");
    const newContent = htmlToElement(content, this.content, ".popover-body");
    newContent.append(this._createCloseButton(newHeader));

    setContentCarefully(
      this.pop,
      this.triggerElement,
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ".popover-header": hasHeader(newHeader) ? newHeader : "",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ".popover-body": newContent,
      },
      "popover"
    );
  }

  private _htmlToElement(html: string): HTMLElement {
    const div = document.createElement("div");
    div.style.display = "contents";
    div.innerHTML = html;
    return div;
  }

  private _createCloseButton(header: HTMLElement | undefined): HTMLElement {
    const btn = document.createElement("button");
    btn.classList.add("btn-close");
    btn.setAttribute("aria-label", "Close");
    btn.onclick = () => {
      this._hide();
      this.triggerElement.focus();
    };
    const width = "0.65rem";
    btn.style.position = "absolute";
    btn.style.width = width;
    btn.style.height = width;
    btn.style.backgroundSize = width;
    btn.style.top = hasHeader(header) ? "0.75rem" : "0.25rem";
    btn.style.right = hasHeader(header) ? "0.5rem" : "0.25rem";
    return btn;
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

function hasHeader(header: HTMLElement | undefined): boolean {
  return !!header && header.childNodes.length > 0;
}
