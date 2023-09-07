import type { CSSResultGroup } from "lit";
import { LitElement } from "lit";
import { css, html } from "lit";
import { property } from "lit/decorators.js";

// Inspired by:
// https://web.dev/building-a-theme-switch-component/
// https://web.dev/patterns/theming/theme-switch/
// https://github.com/argyleink/gui-challenges/tree/main/theme-switch

export type DarkModeMessageToggle = {
  method: "toggle";
  value: DarkModeSwitch["mode"] | undefined;
};

export class DarkModeSwitch extends LitElement {
  static isShinyInput = true;
  static tagName = "bslib-input-dark-mode";

  private attribute = "data-shinytheme";

  @property({ type: String, reflect: true }) mode!: "dark" | "light";

  static styles: CSSResultGroup = [
    // CSS Variables
    css`
      :host {
        /* open-props.style via shinycomponent */
        --text-1: var(--text-1-light, var(--gray-8, #343a40));
        --text-2: var(--text-2-light, var(--gray-7, #495057));
        --size-xxs: var(--size-1, 0.25rem);
        --ease-in-out-1: cubic-bezier(0.1, 0, 0.9, 1);
        --ease-in-out-2: cubic-bezier(0.3, 0, 0.7, 1);

        /* shinycomponent */
        --speed-fast: 0.15s;
        --speed-normal: 0.3s;

        /* Size of the icon, uses em units so it scales to font-size */
        --size: 1.3em;

        /* Because we are (most likely) bigger than one em we will need to move
        the button up or down to keep it looking right inline */
        --vertical-correction: calc((var(--size) - 1em) / 2);
      }
    `,
    css`
      .sun-and-moon > :is(.moon, .sun, .sun-beams) {
        transform-origin: center center;
      }

      .sun-and-moon > .sun {
        fill: none;
        stroke: var(--text-1);
        stroke-width: var(--stroke-w);
      }

      button:is(:hover, :focus-visible)
        > :is(.sun-and-moon > :is(.moon, .sun)) {
        fill: var(--text-2);
      }

      .sun-and-moon > .sun-beams {
        stroke: var(--text-1);
        stroke-width: var(--stroke-w);
      }

      button:is(:hover, :focus-visible) :is(.sun-and-moon > .sun-beams) {
        background-color: var(--text-2);
      }

      [data-theme="dark"] .sun-and-moon > .sun {
        fill: var(--text-1);
        stroke: none;
        stroke-width: 0;
        transform: scale(1.6);
      }

      [data-theme="dark"] .sun-and-moon > .sun-beams {
        opacity: 0;
      }

      [data-theme="dark"] .sun-and-moon > .moon > circle {
        transform: translateX(-10px);
      }

      @supports (cx: 1) {
        [data-theme="dark"] .sun-and-moon > .moon > circle {
          transform: translateX(0);
          cx: 15;
        }
      }
    `,
    // Transitions
    css`
      .sun-and-moon > .sun {
        transition: transform var(--speed-fast) var(--ease-in-out-2)
            var(--speed-fast),
          fill var(--speed-fast) var(--ease-in-out-2) var(--speed-fast),
          stroke-width var(--speed-normal) var(--ease-in-out-2);
      }

      .sun-and-moon > .sun-beams {
        transition: transform var(--speed-fast) var(--ease-out-3),
          opacity var(--speed-fast) var(--ease-out-4);
        transition-delay: var(--speed-normal);
      }

      .sun-and-moon .moon > circle {
        transition: transform var(--speed-fast) var(--ease-in-out-2),
          fill var(--speed-fast) var(--ease-in-out-2);
        transition-delay: 0s;
      }

      @supports (cx: 1) {
        .sun-and-moon .moon > circle {
          transition: cx var(--speed-normal) var(--ease-in-out-2);
        }

        [data-theme="dark"] .sun-and-moon .moon > circle {
          transition: cx var(--speed-fast) var(--ease-in-out-2);
          transition-delay: var(--speed-fast);
        }
      }

      [data-theme="dark"] .sun-and-moon > .sun {
        transition-delay: 0s;
        transition-duration: var(--speed-normal);
        transition-timing-function: var(--ease-in-out-2);
      }

      [data-theme="dark"] .sun-and-moon > .sun-beams {
        transform: scale(0.3);
        transition: transform var(--speed-normal) var(--ease-in-out-2),
          opacity var(--speed-fast) var(--ease-out-1);
        transition-delay: 0s;
      }
    `,
    css`
      :host {
        display: inline-block;

        /* We control the stroke size manually here. We don't want it getting so
        small its not visible but also not so big it looks cartoonish */
        --stroke-w: clamp(1px, 0.1em, 6px);
      }

      button {
        /* This is needed to let the svg use the em sizes */
        font-size: inherit;

        /* Make sure the button is fully centered */
        display: grid;
        place-content: center;

        /* A little bit of padding to make it easier to press */
        padding: var(--size-xxs);
        background: none;
        border: none;
        aspect-ratio: 1;
        border-radius: 50%;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        outline-offset: var(--size-xxs);

        /* Move down to adjust for being larger than 1em */
        transform: translateY(var(--vertical-correction));
        margin-block-end: var(--vertical-correction);
      }

      /*
      button:is(:hover, :focus-visible) {
        background: var(--surface-4);
      }
      */

      button > svg {
        height: var(--size);
        width: var(--size);
        stroke-linecap: round;
        overflow: visible;
      }

      svg line,
      svg circle {
        vector-effect: non-scaling-stroke;
      }
    `,
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onChangeCallback: (x: boolean) => void = (x: boolean) => {};

  // onValueChange = makeValueChangeEmitter(this, this.id);

  connectedCallback(): void {
    super.connectedCallback();

    this.attribute = this.getAttribute("attribute") || "data-shinytheme";

    if (typeof this.mode === "undefined") {
      this.mode = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    this.reflectPreference();

    // Sync with system changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches: isDark }) => {
        this.mode = isDark ? "dark" : "light";
        this.reflectPreference();
      });

    this._observeDocumentThemeAttribute();
  }

  private _observeDocumentThemeAttribute(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target !== document.documentElement) return;
        if (mutation.attributeName !== this.attribute) return;
        const newValue = document.documentElement.getAttribute(this.attribute);
        if (!newValue || newValue === this.mode) return;
        this.mode = newValue as DarkModeSwitch["mode"];
      });
    });

    const config = {
      attributes: true,
      childList: false,
      subtree: false,
    };

    observer.observe(document.documentElement, config);
  }

  getValue(): string {
    return this.mode;
  }

  render(): ReturnType<LitElement["render"]> {
    const other = this.mode === "light" ? "dark" : "light";
    const label = `Switch from ${this.mode} to ${other} mode`;

    return html`
      <button
        title="${label}"
        aria-label="${label}"
        aria-live="polite"
        data-theme="${this.mode}"
        @click="${this.onClick}"
      >
        <svg class="sun-and-moon" aria-hidden="true" viewBox="0 0 24 24">
          <mask class="moon" id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="25" cy="10" r="6" fill="black" />
          </mask>
          <circle
            class="sun"
            cx="12"
            cy="12"
            r="6"
            mask="url(#moon-mask)"
            fill="currentColor"
          />
          <g class="sun-beams" stroke="currentColor">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      </button>
    `;
  }

  receiveMessage(el: DarkModeSwitch, data: DarkModeMessageToggle): void {
    if (data.method === "toggle") {
      if (typeof data.value === "undefined" || data.value === null) {
        data.value = this.mode === "light" ? "dark" : "light";
      }
      el.setAttribute("mode", data.value);
    }
  }

  onClick(e: MouseEvent): void {
    e.stopPropagation();
    this.mode = this.mode === "light" ? "dark" : "light";
  }

  updated(changedProperties: Map<string, any>): void {
    if (changedProperties.has("mode")) {
      this.reflectPreference();
      this.onChangeCallback(true);
    }
  }

  reflectPreference(): void {
    document.documentElement.setAttribute(this.attribute, this.mode);

    // Emit a window resize event to trigger redraw of htmlwidgets and plots
    window.dispatchEvent(new Event("resize"));
  }
}
