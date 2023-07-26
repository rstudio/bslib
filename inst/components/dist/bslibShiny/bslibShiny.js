/*! bslib 0.5.0.9000 | (c) 2012-2023 RStudio, PBC. | License: MIT + file LICENSE */
"use strict";
(() => {
  // srcts/src/components/_utils.ts
  var InputBinding = window.Shiny ? Shiny.InputBinding : class {
  };

  // srcts/src/components/bslibShiny.ts
  function getShinyInputBinding(id) {
    const ret = {};
    ret.element = document.getElementById(id);
    if (!ret.element) {
      console.warn("[bslib] No input element found", { id });
      return ret;
    }
    ret.binding = $(ret.element).data("shiny-input-binding");
    if (!(ret.binding instanceof InputBinding)) {
      console.warn("[bslib] No input binding found", { id });
      return ret;
    }
    return ret;
  }
  Shiny.addCustomMessageHandler("bslib.toggle-input-binary", function(msg) {
    const { element, binding } = getShinyInputBinding(msg.id);
    if (typeof element === "undefined" || typeof binding === "undefined")
      return;
    let value = msg.value;
    if (typeof value === "undefined") {
      value = !binding.getValue(element);
    }
    binding.receiveMessage(element, { value });
  });
  Shiny.addCustomMessageHandler(
    "bslib.disable-input",
    function({ id, disable }) {
      const element = document.getElementById(id);
      if (!(element instanceof HTMLElement))
        return;
      if (typeof disable === "undefined") {
        disable = !(element.hasAttribute("disabled") || element.classList.contains("disabled"));
      }
      if (disable) {
        element.setAttribute("disabled", "");
        element.classList.add("disabled");
      } else {
        element.removeAttribute("disabled");
        element.classList.remove("disabled");
      }
    }
  );
})();
//# sourceMappingURL=bslibShiny.js.map
