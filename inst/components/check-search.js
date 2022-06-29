var checkSearchInputBinding = new Shiny.InputBinding();
$.extend(checkSearchInputBinding, {

  find: function(scope) {
    return $(scope).find(".bslib-check-search");
  },

  getValue: function(el) {
    var inputs = $(el).find(".form-check-input");
    var vals = [];
    inputs.each(function(i) {
      if (this.checked) {
        vals.push($(this).parent(".form-check").attr("data-value"));
      }
    });
    return vals.length > 0 ? vals : null;
  },

  subscribe: function(el, callback) {
    $(el).on(
      'change.checkSearch',
      function(event) { callback(true); }
    );
  },

  unsubscribe: function(el) {
    $(el).off(".checkSearchInputBinding");
  },

  initialize: function(el) {
    el.oninput = onInput;

    function onInput(e) {
      var needle = e.target.value.toLowerCase();
      console.log("new value", needle);

      var haystack = $(e.target.parentNode).find(".form-check");
      haystack.each(function(i) {
        var val = $(this).attr("data-value").toLowerCase();
        var display = val.includes(needle) ? "" : "none";
        $(this).css("display", display);
      });
    }
  },



  // TODO: Should probably be able to update selected, and insert/remove items?
  //receiveMessage: function(el, data) {}

});

Shiny.inputBindings.register(checkSearchInputBinding);
