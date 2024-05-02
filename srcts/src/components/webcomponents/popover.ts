import { nothing, html, render } from "lit";
import { property } from "lit/decorators.js";
import { BslibElement } from "./_bslibElement";
import {
  createWrapperElement,
  getOrCreateTriggerEl,
  setContentCarefully,
} from "../_utilsTooltip";
import { ShinyResizeObserver } from "../_shinyResizeObserver";
import type { HtmlDep } from "../_utils";
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

export class BslibPopover extends BslibElement {
  static tagName = "bslib-popover";
  private bsPopover!: PopoverType & { tip?: HTMLElement };
  private bsPopoverEl: HTMLElement | undefined;
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
      trigger: this.isHyperLink ? "focus hover" : "click",
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

  // If the visibility of the popover is _not_ triggered via focus (i.e., it's
  // triggered by clicking a button), then we make the popover focusable (so that
  // the user can tab to it).
  private get focusablePopover(): boolean {
    return !this.options.trigger.includes("focus");
  }

  private get isHyperLink(): boolean {
    const trigger = this.triggerElement;
    return (
      trigger.tagName === "A" &&
      trigger.hasAttribute("href") &&
      trigger.getAttribute("href") !== "#" &&
      trigger.getAttribute("href") !== "" &&
      trigger.getAttribute("href") !== "javascript:void(0)"
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
    this._closeButton = this._closeButton.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();

    // Use <template> as a way to protect these children from potentially being
    // pulled outside this element (the browser's parser does this to, for
    // example, block elements inside a <p> tag)
    const template = this.querySelector("template") as HTMLTemplateElement;
    // Change the <template> to a <div style="display:none"> so that the
    // children become part of the DOM, but still aren't visible.
    // Note, it's possible for connectedCallback() to be called multiple times
    // so template might not exist (it may already be a div). (#1019)
    if (template) {
      this.prepend(createWrapperElement(template.content, "none"));
      template.remove();
    }

    // Append the close button
    if (this.content) {
      render(this._closeButton(this.header), this.content);
    }

    // Create the popover (and make sure it's focusable)
    const trigger = this.triggerElement;
    trigger.setAttribute("data-bs-toggle", "popover");

    if (this.isButtonLike) {
      trigger.setAttribute("role", "button");
      trigger.setAttribute("tabindex", "0");
      trigger.setAttribute("aria-pressed", "false");
      // An <a> trigger can already be shown via Enter (since that simulates a click)
      if (this.triggerElement.tagName !== "A") {
        trigger.onkeydown = (e) => {
          if (e.key === "Enter" || e.key === " ") {
            this._toggle();
          }
        };
      }
      trigger.style.cursor = "pointer";
    }

    this.bsPopover = new bsPopover(trigger, this.options);

    trigger.addEventListener("shown.bs.popover", this._onShown);
    trigger.addEventListener("hidden.bs.popover", this._onHidden);
    trigger.addEventListener("inserted.bs.popover", this._onInsert);
    this.visibilityObserver = this._createVisibilityObserver();
  }

  disconnectedCallback(): void {
    const trigger = this.triggerElement;
    trigger.removeEventListener("shown.bs.popover", this._onShown);
    trigger.removeEventListener("hidden.bs.popover", this._onHidden);
    trigger.removeEventListener("inserted.bs.popover", this._onInsert);
    this.visibilityObserver.disconnect();

    this.bsPopover.dispose();

    super.disconnectedCallback();
  }

  ///////////////////////////////////////////////////////////////
  // Visibility state management
  ///////////////////////////////////////////////////////////////
  visible = false;
  getValue(): boolean {
    return this.visible;
  }

  private _onShown(): void {
    this.visible = true;
    this.onChangeCallback(true);

    this.visibilityObserver.observe(this.triggerElement);

    if (this.focusablePopover) {
      document.addEventListener("keydown", this._handleTabKey);
      document.addEventListener("keydown", this._handleEscapeKey);
    }
    if (this.isButtonLike) {
      this.triggerElement.setAttribute("aria-pressed", "true");
    }
  }

  private _onHidden(): void {
    this.visible = false;
    this.onChangeCallback(true);

    this._restoreContent();
    this.visibilityObserver.unobserve(this.triggerElement);
    BslibPopover.shinyResizeObserver.flush();

    if (this.focusablePopover) {
      document.removeEventListener("keydown", this._handleTabKey);
      document.removeEventListener("keydown", this._handleEscapeKey);
    }
    if (this.isButtonLike) {
      this.triggerElement.setAttribute("aria-pressed", "false");
    }
  }

  private _onInsert(): void {
    const { tip } = this.bsPopover;
    if (!tip) {
      throw new Error(
        "Failed to find the popover's DOM element. Please report this bug."
      );
    }

    // If outputs happen to be in the tooltip, make sure they sized correctly
    BslibPopover.shinyResizeObserver.observe(tip);

    // Make the popover focusable
    if (this.focusablePopover) {
      tip.setAttribute("tabindex", "0");
    }

    // Keep a reference to the DOM element so that we can use it later to
    // _restoreContent() (i.e., bring the contents, as they currently exist,
    // back to this element)
    this.bsPopoverEl = tip;
  }

  // 1. Tab on an active trigger focuses the popover.
  // 2. Shift+Tab on active popover focuses the trigger.
  private _handleTabKey(e: KeyboardEvent): void {
    if (e.key !== "Tab") return;
    const { tip } = this.bsPopover;
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
    const { tip } = this.bsPopover;
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
    const el = this.bsPopoverEl;
    if (!el) return;

    this.contentContainer.innerHTML = "";
    const body = el.querySelector(".popover-body");
    if (body) this.contentContainer.append(body?.firstChild as HTMLElement);
    const header = el.querySelector(".popover-header");
    if (header) this.contentContainer.append(header?.firstChild as HTMLElement);
    this.bsPopoverEl = undefined;
  }

  ///////////////////////////////////////////////////////////////
  // Shiny-specific stuff
  ///////////////////////////////////////////////////////////////
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
    this.bsPopover.hide();
  }

  // No-op if the popover is already visible or if the trigger element is not visible
  // (in either case the tooltip likely won't be positioned correctly)
  private _show(): void {
    if (!this.visible && this.visibleTrigger) {
      this.bsPopover.show();
    }
  }

  private _updatePopover(data: UpdateMessage): void {
    const { content, header } = data;

    // First, render any HTMLDependency()s
    const deps = [];
    if (content) deps.push(...content.deps);
    if (header) deps.push(...header.deps);
    Shiny.renderDependencies(deps);

    const { tip } = this.bsPopover;

    // If the user hasn't supplied new content/header, we still need to find and pass
    // along the current content/header (so they don't get removed on update).
    // Also, since the user content is always wrapped in a <div
    // style="display:contents">, we can just take the first child of the
    // relevant Bootstrap popover containers
    const currentHeader = this.visible
      ? (tip?.querySelector(".popover-header")?.children[0] as HTMLElement)
      : (this.header as HTMLElement);

    const currentContent = this.visible
      ? (tip?.querySelector(".popover-body")?.children[0] as HTMLElement)
      : (this.content as HTMLElement);

    // If user does supply new content/header, then we wrap it in a
    // <div style="display:contents"> so that the markup structure mirrors
    // what bslib::popover() uses for markup
    const newHeader = header
      ? createWrapperElement(header.html, "contents")
      : currentHeader;

    const newContent = content
      ? createWrapperElement(content.html, "contents")
      : currentContent;

    // If user has supplied new content, then add the close button
    // (if not, it's already there since we added it in connectedCallback)
    if (content) {
      render(this._closeButton(newHeader), newContent);
    }

    // Only render a header if the newHeader has actual contents
    // (i.e., if header.html is an empty string, then we don't render it)
    const actualHeader = hasHeader(newHeader) ? newHeader : "";

    setContentCarefully({
      instance: this.bsPopover,
      trigger: this.triggerElement,
      content: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ".popover-header": actualHeader,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ".popover-body": newContent,
      },
      type: "popover",
    });
  }

  private _closeButton(
    header: HTMLElement | undefined
  ): ReturnType<typeof html> | typeof nothing {
    if (!this.focusablePopover) {
      return nothing;
    }

    const onclick = () => {
      this._hide();
      if (this.focusablePopover) this.triggerElement.focus();
    };
    const top = hasHeader(header) ? "0.6rem" : "0.25rem";
    return html`<button
      type="button"
      aria-label="Close"
      class="btn-close"
      @click=${onclick}
      style="position:absolute; top:${top}; right:0.25rem; width:0.55rem; height:0.55rem; background-size:0.55rem;"
    ></button>`;
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
