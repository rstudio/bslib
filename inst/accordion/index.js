var accordionInputBinding = new Shiny.InputBinding();
$.extend(accordionInputBinding, {

  find: function(scope) {
    return $(scope).find(".accordion.bslib-accordion-input");
  },

  getValue: function(el) {
    var shown_items = $(el).find(".accordion-collapse.show").parents(".accordion-item");
    var vals = [];
    shown_items.each(function(i) {
      var val = $(this).attr("data-value");
      if (val) vals.push(val);
    });
    return vals.length > 0 ? vals : null;
  },

  subscribe: function(el, callback) {
    $(el).on(
      'shown.bs.collapse.accordionInputBinding hidden.bs.collapse.accordionInputBinding',
      function(event) { callback(true); }
    );
  },

  unsubscribe: function(el) {
    $(el).off(".accordionInputBinding");
  }

  // TODO: Should probably be able to update selected, and insert/remove items?
  //receiveMessage: function(el, data) {}

});

Shiny.inputBindings.register(accordionInputBinding);
