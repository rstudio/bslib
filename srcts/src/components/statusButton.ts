import { css, nothing } from "lit";
import { property } from "lit/decorators.js";
import { LightElement } from "./webcomponents/_lightElement";

// type TooltipOptions = {
//   title: TooltipType.Options["title"];
//   placement: TooltipType.Options["placement"];
//   html: boolean;
//   sanitize: boolean;
// };

// type ToggleMessage = {
//   method: "toggle";
//   value: "hide" | "show" | "toggle";
// };

// type UpdateMessage = {
//   method: "update";
//   title?: { html: string; deps: HtmlDep[] };
// };

// type MessageData = ToggleMessage | UpdateMessage;

interface BslibStatusState {
  label?: string;
  icon?: string;
  class?: string;
  spinner?: string;
  disable: boolean;
  delay?: number;
  help?: string;
}

export class BslibStatusButton extends LightElement {
  static tagName = "bslib-status-button";
  static isShinyInput = true;

  private label = "";
  private icon = "";
  private class = "";
  private help = "";
  private autoDisable = false;

  private iconElement: HTMLElement;
  private labelElement: HTMLElement;
  private buttonElement: HTMLElement;
  private helpElement: HTMLElement;

  private timer: NodeJS.Timeout | undefined;

  private pending: BslibStatusState = { disable: true };
  private success: BslibStatusState = { disable: false };
  private failure: BslibStatusState = { disable: false };

  @property({ type: String }) state = "ready";

  static get styles() {
    return css`
      .bslib-status-button {
        position: relative;
        display: flex;
        gap: 0.5em;
        flex-direction: row;
        text-align: start;
        transition: all 250ms ease-in-out;
        overflow: hidden;
      }
      .bslib-status-button > .bslib-status-icon {
        align-self: center;
      }
      .bslib-status-button > .bslib-status-icon > .bi {
        position: relative;
        top: -0.125em;
      }
      .bslib-status-label {
        flex: 1 1 auto;
      }
    `;
  }

  constructor() {
    super();

    this.buttonElement = this.children[0] as HTMLElement;
    this.iconElement = this.querySelector(".bslib-status-icon") as HTMLElement;
    this.labelElement = this.querySelector(
      ".bslib-status-label"
    ) as HTMLElement;
    this.helpElement = this.querySelector(".bslib-status-help") as HTMLElement;

    this.autoDisable = this.hasAttribute("auto-disable");
    if (this.autoDisable) {
      this.buttonElement.addEventListener(
        "click",
        this._handleAutoDisable.bind(this)
      );
    }

    if (this.hasAttribute("pending")) {
      this.pending = JSON.parse(this.getAttribute("pending") || "{}");
      this.removeAttribute("pending");
    }

    if (this.hasAttribute("success")) {
      this.success = JSON.parse(this.getAttribute("success") || "{}");
      this.removeAttribute("success");
    }

    if (this.hasAttribute("failure")) {
      this.failure = JSON.parse(this.getAttribute("failure") || "{}");
      this.removeAttribute("failure");
    }

    this.icon = this.getAttribute("icon") || "";
    this.removeAttribute("icon");

    this.label = this.getAttribute("label") || "";
    this.removeAttribute("label");

    this.help = this.helpElement.innerHTML;
    this.class = this.buttonElement.classList.toString();
  }

  connectedCallback(): void {
    super.connectedCallback();

    const minWidth = this.buttonElement.getBoundingClientRect().width;
    this.buttonElement.style.minWidth = `${minWidth}px`;
  }

  disconnectedCallback(): void {
    // destroy event listeners or do other things?
    super.disconnectedCallback();

    if (this.autoDisable) {
      this.buttonElement.removeEventListener(
        "click",
        this._handleAutoDisable.bind(this)
      );
    }
  }

  render(): typeof nothing {
    return nothing;
  }

  // State //
  updated(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has("state")) {
      this._handleStateChange();
    }
  }

  private _handleStateChange() {
    console.log(`Setting button to ${this.state} state`);
    switch (this.state) {
      case "ready":
        this._handleReadyState();
        break;
      case "disabled":
        this._handleDisabledState(true);
        break;
      case "pending":
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(
          () => this._handleGenericStateChange(this.pending),
          500
        );
        break;
      case "success":
        this._handleGenericStateChange(this.success);
        break;
      case "failure":
        this._handleGenericStateChange(this.failure);
        break;
      default:
        console.error(`Unknown state: ${this.state}`);
        break;
    }
  }

  private _handleAutoDisable() {
    if (this.state != "pending") {
      this._handleDisabledState(true);
    }
  }

  private _handleGenericStateChange(state: BslibStatusState) {
    this._cancelTimer();
    this._setClass(state.class || "");

    if (state.label) {
      this.labelElement.innerHTML = state.label;
    }

    if (state.delay) {
      this.timer = setTimeout(() => (this.state = "ready"), state.delay * 1000);
    }

    if (state.spinner) {
      this.iconElement.innerHTML = "";
      state.spinner.split(" ").forEach((cls) => {
        this.iconElement.classList.add(cls);
      });
    } else if (state.icon) {
      this.iconElement.setAttribute("class", "bslib-status-icon");
      this.iconElement.innerHTML = state.icon;
    }

    if (state.help) {
      this.helpElement.innerHTML = state.help;
    } else {
      this.helpElement.innerHTML = "";
    }

    this._handleDisabledState(state.disable);
  }

  private _handleDisabledState(disable = true) {
    if (disable) {
      this.buttonElement.setAttribute("disabled", "");
      this.buttonElement.classList.add("disabled");
    } else {
      this.buttonElement.removeAttribute("disabled");
      this.buttonElement.classList.remove("disabled");
    }
  }

  private _handleReadyState() {
    console.log("Returning to ready state");
    this._cancelTimer();
    this._setClass("");

    this.labelElement.innerHTML = this.label;
    this.helpElement.innerHTML = this.help;

    if (this.icon) {
      this.iconElement.innerHTML = this.icon;
    }

    this._handleDisabledState(false);
  }

  private _setClass(cls: string) {
    console.log(`Resetting class to '${this.class}'`);
    this.buttonElement.setAttribute("class", this.class);
    if (!cls || cls === "") return;
    console.log(`Adding classes '${cls}'`);
    cls.split(" ").forEach((c) => this.buttonElement.classList.add(c));
  }

  private _cancelTimer() {
    if (this.timer) clearTimeout(this.timer);
  }
}

type BslibStatusButtonMessage = {
  id: string;
  type: "settings" | "state";
  data: BslibStatusState | string;
};

if (window.Shiny) {
  console.log("Set Shiny message handlers!");

  window.Shiny.addCustomMessageHandler(
    "bslib-status-button",
    function (message: BslibStatusButtonMessage) {
      console.log("received message", { message });
      let el = document.getElementById(message.id);
      if (!el) return;
      el = el.parentElement as BslibStatusButton;
      if (!(el instanceof BslibStatusButton)) return;

      if (message.type === "state") {
        if (el.state === message.data) {
          el.state = "";
        }
        el.state = message.data as string;
      }
    }
  );
}
