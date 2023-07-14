import { nothing } from "lit";
import { property } from "lit/decorators.js";
import { LightElement } from "./webcomponents/_lightElement";
import { getOrCreateTriggerEl, setContentCarefully } from "./_utilsTooltip";
import { getFirstFocusableChild, type HtmlDep } from "./_utils";
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
  title?: { html: string; deps: HtmlDep[] };
};

type MessageData = ToggleMessage | UpdateMessage;

export class BslibPopover extends LightElement {
  static tagName = "bslib-popover";
  // Although it isn't included in the type, Bootstrap hangs a tip element off
  // of the popover instance, which provides a convenient way to find where the
  // popover is located in the DOM.
  private pop!: PopoverType & { tip?: HTMLElement };

  @property({ type: String }) placement: PopoverOptions["placement"] = "auto";
  @property({ type: Boolean }) closeButton = false;
  @property({ type: String }) bsOptions = "{}";

  private get options(): PopoverOptions {
    const opts = JSON.parse(this.bsOptions);
    const header = this.header.childNodes.length > 0 ? this.header : "";
    return {
      content: this.content,
      title: header,
      placement: this.placement,
      // Bootstrap defaults to false, but we have our own HTML escaping
      html: true,
      sanitize: false,
      trigger: "click",
      ...opts,
    };
  }

  private get content(): HTMLElement {
    return this.contentContainer.children[0] as HTMLElement;
  }

  private get header(): HTMLElement {
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
    this._onHidden = this._onHidden.bind(this);
    this._hide = this._hide.bind(this);
    this.style.display = "contents";
  }

  connectedCallback(): void {
    super.connectedCallback();

    // The user-supplied content & header are both wrapped up into an additional
    // <div> (this guarantees that we can pass an _Element_ to
    // bootstrap.Popover(), which moves the content/header from within this
    // component to the popover's location). These inline styles are here
    // to prevent any styling suprises caused by the wrapping <div>.
    this.content.style.display = "contents";
    if (this.header instanceof HTMLElement) {
      this.header.style.display = "contents";
    }

    if (this.closeButton) {
      const btn = document.createElement("button");
      btn.classList.add("btn-close");
      btn.setAttribute("aria-label", "Close");
      btn.onclick = this._hide;
      this.header.append(btn);
    }

    const el = this.triggerElement as HTMLElement;
    el.setAttribute("data-bs-toggle", "popover");
    el.setAttribute("tabindex", "0");
    this.pop = new bsPopover(el, this.options);

    if (this.isButtonLike) {
      el.setAttribute("role", "button");
      el.setAttribute("aria-pressed", "false");
      el.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          this._toggle();
        }
      };
      el.style.cursor = "pointer";
    }

    el.addEventListener("shown.bs.popover", this._onShown);
    el.addEventListener("hidden.bs.popover", this._onHidden);
  }

  disconnectedCallback(): void {
    const el = this.triggerElement;
    el.removeEventListener("shown.bs.popover", this._onShown);
    el.removeEventListener("hidden.bs.popover", this._onHidden);

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
    this._maybeFocusInput();
    this._maybeCloseonEscape = this._maybeCloseonEscape.bind(this);
    window.addEventListener("keydown", this._maybeCloseonEscape);
  }

  private _onHidden(): void {
    this.visible = false;
    this.onChangeCallback(true);
    this._restoreContent();
    window.removeEventListener("keydown", this._maybeCloseonEscape);
  }

  // If there is focusable input in a shown popover, move focus there
  private _maybeFocusInput(): void {
    const { tip } = this.pop;
    if (!tip) return;
    const input = tip.querySelector(".shiny-input-container");
    if (!input) return;
    const el = getFirstFocusableChild(input);
    if (el) (el as HTMLElement).focus();
  }

  // Allow ESC to close the popover when:
  // - the trigger is the active element
  // - the activeElement is inside the popover
  private _maybeCloseonEscape(e: KeyboardEvent): void {
    if (e.key === "Escape") {
      const active = document.activeElement;
      if (active === this.triggerElement || this.pop.tip?.contains(active)) {
        this._hide();
      }
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
    setContentCarefully(this.pop, title.html, ".popover-header", "popover");
  }

  private _updateContent(content: UpdateMessage["content"]): void {
    if (!content) return;
    Shiny.renderDependencies(content.deps);
    setContentCarefully(this.pop, content.html, ".popover-body", "popover");
  }
}
