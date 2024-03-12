// ----------------------------------------------------------------------------
// First, bring in non-webcomponent (legacy) components (they attach to the window)
// ----------------------------------------------------------------------------
import "./accordion";
import "./sidebar";
import "./taskButton";

// ----------------------------------------------------------------------------
// Register custom message handlers for Shiny
// ----------------------------------------------------------------------------
import { InputBinding } from "./_utils";
import { shinyAddCustomMessageHandlers } from "./_shinyAddCustomMessageHandlers";

const bslibMessageHandlers = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "bslib.toggle-input-binary": async (msg: any) => {
    // This handler was written for `toggle_switch()`, but could be used for any
    // binary Shiny input, e.g. checkbox.
    const el = document.getElementById(msg.id) as HTMLElement;
    if (!el) {
      console.warn("[bslib.toggle-input-binary] No element found", msg);
    }

    const binding = $(el).data("shiny-input-binding");
    if (!(binding instanceof InputBinding)) {
      console.warn("[bslib.toggle-input-binary] No input binding found", msg);
      return;
    }

    let value = msg.value;
    if (typeof value === "undefined") {
      value = !binding.getValue(el);
    }

    await binding.receiveMessage(el, { value });
  },
};

if (window.Shiny) {
  shinyAddCustomMessageHandlers(bslibMessageHandlers);
}

// ----------------------------------------------------------------------
// Append the (global) SVG linearGradient to the body.
// value_box() uses this (i.e., bslib---icon-gradient element) to apply a
// gradient to the icon when bs_theme(preset="shiny").
// ----------------------------------------------------------------------

function insertSvgGradient() {
  const temp = document.createElement("div");
  temp.innerHTML = `
  <svg aria-hidden="true" focusable="false" style="width:0;height:0;position:absolute;">
    <!-- ref: https://fvsch.com/svg-gradient-fill -->
    <linearGradient id='bslib---icon-gradient' x1='0' y1='0' x2='1.6' y2='2.4'>
      <stop offset='0%' stop-color='var(--bslib-icon-gradient-0, #007bc2)' />
      <stop offset='14.29%' stop-color='var(--bslib-icon-gradient-1, #0770c9)' />
      <stop offset='28.57%' stop-color='var(--bslib-icon-gradient-2, #0d63da)' />
      <stop offset='42.86%' stop-color='var(--bslib-icon-gradient-3, #2b4af9)' />
      <stop offset='57.14%' stop-color='var(--bslib-icon-gradient-4, #5e29f7)' />
      <stop offset='71.43%' stop-color='var(--bslib-icon-gradient-5, #7217d7)' />
      <stop offset='100%' stop-color='var(--bslib-icon-gradient-6, #74149c)' />
    </linearGradient>
  </svg>`;
  document.body.appendChild(temp.children[0] as Node);
}

if (document.readyState === "complete") {
  insertSvgGradient();
} else {
  document.addEventListener("DOMContentLoaded", insertSvgGradient);
}
