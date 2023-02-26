const checkSearchInputBinding = new Shiny.InputBinding();
$.extend(checkSearchInputBinding, {

  find: function(scope) {
    return $(scope).find(".bslib-check-search");
  },

  getValue: function(el) {
    const inputs = $(el).find(".form-check-input");
    let vals = [];
    inputs.each(function(i) {
      if (this.checked) {
        vals.push($(this).parent(".form-check").attr("data-value"));
      }
    });
    return vals.length > 0 ? vals : null;
  },

  subscribe: function(el, callback) {
    const self = this;
    $(el).on('change.checkSearch', function(event) {

      const choices = $(event.target).parents(".check-search-choices");

      // Move new selections to the top
      const firstNotChecked = choices
        .find("input:not(:checked)")
        .parents(".form-check")
        .last();
      const thisForm = $(event.target).parent(".form-check");
      firstNotChecked.before(thisForm);

      // TODO: if we're unchecking a box, should we move it back to it's "original" position???

      self._resolveClearVisibility(el);

      callback(true);
    });
  },

  unsubscribe: function(el) {
    $(el).off(".checkSearchInputBinding");
  },

  initialize: function(el) {
    el.oninput = onInput;

    function onInput(e) {
      const needle = e.target.value.toLowerCase();

      const haystack = $(e.target.parentNode).find(".form-check");
      haystack.each(function(i) {
        const val = $(this).attr("data-value").toLowerCase();
        const display = val.includes(needle) ? "" : "none";
        $(this).css("display", display);
      });
    }

    const clear = $(el).find(".clear-options");
    const self = this;
    clear.click(function() {
      self.receiveMessage(el, {selected: []});
    });

    this._resolveClearVisibility(el);
  },

  receiveMessage: function(el, data) {
    const $el = $(el);
    if (data.hasOwnProperty("placeholder")) {
      $el.find("input").attr("placeholder", data.placeholder);
      return;
    }
    if (data.hasOwnProperty("height")) {
      $el.css("height", data.height);
      return;
    }
    // In this case, selected is already handled in the markup
    if (data.hasOwnProperty("choices")) {
      const choices = $el.find(".check-search-choices");
      Shiny.renderContent(choices, data.choices);
    } else if (data.hasOwnProperty("selected")) {
      const checks = $el.find(".form-check");
      checks.each(function(i) {
        const val = $(this).attr("data-value");
        const checked = data.selected.indexOf(val) > -1;
        this.querySelector("input").checked = checked;
      });
    }

    // Since we're possibly changed the input value at this point,
    // trigger a subscribe() event, so that the input value will actually update
    $el.trigger("change.checkSearch");

    this._resolveClearVisibility(el);
  },

  _resolveClearVisibility: function(el) {
    const clear = $(el).find(".clear-options");
    const anySelected = $(el).find("input:checked").length > 0;
    clear.css("visibility", anySelected ? "visible" : "hidden");
  }

});

Shiny.inputBindings.register(checkSearchInputBinding);
