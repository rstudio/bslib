/*! bslib 0.5.1.9000 | (c) 2012-2023 RStudio, PBC. | License: MIT + file LICENSE */
"use strict";
(() => {
  // srcts/src/components/_utils.ts
  var InputBinding = window.Shiny ? Shiny.InputBinding : class {
  };

  // srcts/src/components/webcomponents/_shinyAddCustomMessageHandlers.ts
  function shinyAddCustomMessageHandlers(handlers) {
    if (!window.Shiny) {
      return;
    }
    for (const [name, handler] of Object.entries(handlers)) {
      Shiny.addCustomMessageHandler(name, handler);
    }
  }

  // srcts/src/components/bslibShiny.ts
  var bslibMessageHandlers = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "bslib.toggle-input-binary": (msg) => {
      const el = document.getElementById(msg.id);
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
      binding.receiveMessage(el, { value });
    }
  };
  if (window.Shiny) {
    shinyAddCustomMessageHandlers(bslibMessageHandlers);
  }
})();
//# sourceMappingURL=bslibShiny.js.map
