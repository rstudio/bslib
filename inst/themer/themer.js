// TODO: Invalid values shouldn't just stop event from propagating, they should
// also not be sent to the server if a different input has a validinput event.

(function($) {
  // From Shiny
  function debounce(threshold, func) {
    var timerId = null;
    var self, args;
    return function () {
      self = this;
      args = arguments;
      if (timerId !== null) {
        clearTimeout(timerId);
        timerId = null;
      }
      timerId = setTimeout(function () {
        // IE8 doesn't reliably clear timeout, so this additional
        // check is needed
        if (timerId === null) return;
        timerId = null;
        func.apply(self, args);
      }, threshold);
    };
  }

  var debouncedSetInputValue = debounce(750, function() {
    Shiny.setInputValue.apply(Shiny, arguments);
  });

  function resetColors(input) {
    $(input).css("background-color", "");
    $(input).css("color", "");
  }

  function showError(input, message) {
    resetColors(input);
    $(input).addClass("is-invalid");
  }

  function clearError(input) {
    $(input).removeClass("is-invalid");
  }

  function yiq_light(red, green, blue) {
    return (red * 299 + green * 587 + blue * 114) / 1000 >= 128;
  }

  function parseColor(color) {
    // Drop whitespace:
    color = color
      .replace(/\s*,\s*/g, ",") // around commas
      .replace(/\(\s+/g, "(")   // after open-parens
      .replace(/\s+\)/, ")")    // before close-parens
      .replace(/^\s+/, "")      // at the start
      .replace(/\s+$/, "");     // at the end

    var m;
    m = /^#([A-Za-z0-9]{2})([A-Za-z0-9]{2})([A-Za-z0-9]{2})$/.exec(color);
    if (m) {
      return {
        red: parseInt(m[1], 16),
        green: parseInt(m[2], 16),
        blue: parseInt(m[3], 16)
      };
    }
    m = /^#([A-Za-z0-9]{2})([A-Za-z0-9]{2})([A-Za-z0-9]{2})([A-Za-z0-9]{2})$/.exec(color);
    if (m) {
      return {
        red: parseInt(m[1], 16),
        green: parseInt(m[2], 16),
        blue: parseInt(m[3], 16),
        alpha: parseInt(m[4], 16) / 255
      };
    }
    m = /^#([A-Za-z0-9])([A-Za-z0-9])([A-Za-z0-9])$/.exec(color);
    if (m) {
      return {
        red: parseInt(m[1], 16) * 0x11,
        green: parseInt(m[2], 16) * 0x11,
        blue: parseInt(m[3], 16) * 0x11
      };
    }
    m = /^#([A-Za-z0-9])([A-Za-z0-9])([A-Za-z0-9])([A-Za-z0-9])$/.exec(color);
    if (m) {
      return {
        red: parseInt(m[1], 16) * 0x11,
        green: parseInt(m[2], 16) * 0x11,
        blue: parseInt(m[3], 16) * 0x11,
        alpha: parseInt(m[4], 16) * 0x11 / 255
      };
    }
    m = /^rgba?\((\d+),(\d+),(\d+)\)$/.exec(color);
    if (m) {
      if (!isNaN(parseFloat(m[4]))) {
        return {
          red: parseInt(m[1]),
          green: parseInt(m[2]),
          blue: parseInt(m[3]),
          alpha: parseFloat(m[4])
        };
      }
    }
    m = /^rgba?\((\d+),(\d+),(\d+),(\d*\.?\d*)\)$/.exec(color);
    if (m) {
      if (!isNaN(parseFloat(m[4]))) {
        return {
          red: parseInt(m[1]),
          green: parseInt(m[2]),
          blue: parseInt(m[3]),
          alpha: parseFloat(m[4])
        };
      }
    }

    return null;
  }

  function colorsEquivalent(colorStrA, colorStrB) {
    var colorA = parseColor(colorStrA);
    var colorB = parseColor(colorStrB);
    if (!colorA || !colorB) {
      // Don't consider invalid colors equivalent
      return false;
    }

    return JSON.stringify(colorA) === JSON.stringify(colorB);
  }

  function syncColors(inputEl) {
    var color = inputEl.value;

    // TODO: Trim color?
    clearError(inputEl);

    var parsedColor = parseColor(color);

    if (!parsedColor) {
      showError(inputEl, null);
      return false;
    }

    var { red, green, blue } = parsedColor;
    var text_color = yiq_light(red, green, blue) ? "#333333" : "#FFFFFF";
    $(inputEl).css("color", text_color);
    $(inputEl).css("background-color", color);
    return color;
  }

  $(document).on("colorpickerChange.bsthemer", ".bs-theme-value-color", function(e) {
    var newColor = $(e.target).colorpicker("getValue");
    if (colorsEquivalent(newColor, e.target.value)) {
      return;
    }
    e.target.value = newColor;
    syncColors(e.target);
    $(e.target).trigger("validinput");
  });
  $(document).on("input.bsthemer", ".bs-theme-value-color", function(e) {
    var origValue = e.target.value;
    var color = syncColors(e.target);
    if (color) {
      $(e.target).colorpicker("setValue", color);
      // I can't stop "setValue" from modifying e.target.value, but I can
      // immediately undo it. For example, setting color to #FFFFAA, then
      // backspacing it to #FFF, without this change it's expanded out to
      // #FFFFFF automatically which is disruptive to the user while typing.
      e.target.value = origValue;
      $(e.target).trigger("validinput");
    }
  });

  function initColorInput(el) {
    var origValue = el.value;
    syncColors(el);
    $(el).colorpicker({
      autoInputFallback: false
    });
    // needed to prevent the colorpicker() call we just performed
    // from normalizing the value, e.g. #fff becomes #FFFFFF, which
    // then makes it hard to know which values actually changed
    el.value = origValue;
    // bootstrap-colorpicker is too aggressive in handling changes to the
    // text input. It replaces #ABC with #AABBCC, and it's very hard to
    // make it stop. Instead, we just stop it from listening to the input
    // and handle the events ourselves.
    $(el).off("keyup.colorpicker");
    $(el).off("change.colorpicker");
  }


  $(document).on("change.bsthemer click.bsthemer", ".bs-theme-value-bool", function(e) {
    $(e.target).trigger("validinput");
  });

  function initBoolInput(el) {
  }


  $(document).on("input.bsthemer", ".bs-theme-value-str", function(e) {
    var value = $(e.target).val();
    $(e.target).trigger("validinput");
  });

  function initStrInput(el) {
  }


  $(document).on("input.bsthemer", ".bs-theme-value-length", function(e) {
    var value = $(e.target).val();
    // TODO: Maybe validate length?
    $(e.target).trigger("validinput");
  });

  function initLengthInput(el) {
  }


  $(function() {
    $(".bs-theme-value-color").each(function(i, el) {
      initColorInput(el);
    });
    $(".bs-theme-value-bool").each(function(i, el) {
      initBoolInput(el);
    });
    $(".bs-theme-value-str").each(function(i, el) {
      initStrInput(el);
    });
    $(".bs-theme-value-length").each(function(i, el) {
      initLengthInput(el);
    });
  });

  $(document).on("validinput", ".bs-theme-value", function(e) {
    var values = {};
    $(".bs-theme-value-color, .bs-theme-value-str, .bs-theme-value-length").each(function() {
      values[$(this).data("id")] = $(this).val();
    });
    $(".bs-theme-value-bool").each(function() {
      values[$(this).data("id")] = this.checked;
    });
    Object.keys(values).forEach(function(key) {
      if (typeof(values[key]) === "string" && /^\s*$/.test(values[key])) {
        // Empty strings cause crashes in sass; nulls are safely omitted
        values[key] = null;
      }
    });
    debouncedSetInputValue.call(Shiny, "vars", JSON.stringify(values));
  });
})(window.jQuery);
