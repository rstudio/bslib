var toggleButtonsInputBinding = new Shiny.InputBinding();
$.extend(toggleButtonsInputBinding, {

  find: function(scope) {
    return $(scope).find(".btn-group.bslib-toggle-buttons");
  },

  getValue: function(el) {
    var inputs = $(el).find("input.btn-check");
    var vals = [];
    inputs.each(function(i) {
      if (this.checked) {
        vals.push($(this).attr("data-value"));
      }
    });
    return vals.length > 0 ? vals : null;
  },

  subscribe: function(el, callback) {
    $(el).on(
      'change.toggleButtonsInputBinding',
      function(event) { callback(true); }
    );
  },

  unsubscribe: function(el) {
    $(el).off(".toggleButtonsInputBinding");
  },

  receiveMessage: function(el, data) {
    if (data.hasOwnProperty("choices")) {
      Shiny.renderContent(el, data.choices);
    } else if (data.hasOwnProperty("selected")) {
      const inputs = $(el).find("input");
      inputs.each(function(i) {
        const val = $(this).attr("data-value");
        const checked = data.selected.indexOf(val) > -1;
        this.checked = checked;
      });
    }
  }

});

Shiny.inputBindings.register(toggleButtonsInputBinding);
