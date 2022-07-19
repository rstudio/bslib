const accordionInputBinding = new Shiny.InputBinding();
$.extend(accordionInputBinding, {

  find: function(scope) {
    return $(scope).find(".accordion.bslib-accordion-input");
  },

  getValue: function(el) {
    const shown_items = $(el).find(".accordion-collapse.show").parents(".accordion-item");
    let vals = [];
    shown_items.each(function(i) {
      const val = $(this).attr("data-value");
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
  },

  // TODO: Should probably be able to update selected, and insert/remove items?
  receiveMessage: function(el, data) {
    if (data.method === "mutate") {
      this._mutateItem(el, data);
    } else {
      throw new Error(`Method not yet implemented: ${data.method}`);
    }
  },

  _mutateItem: function(el, data) {
    const target = $(el).find(`[data-value="${data.target}"]`);
    if (target.length != 1) {
      throw new Error(`Unable to find an accordion item with a value of ${data.target}`);
    }
    if (data.hasOwnProperty("value")) {
      target.attr("data-value", value);
    }
    if (data.hasOwnProperty("icon")) {
      const icon = target.find('.accordion-button > .accordion-icon');
      Shiny.renderContent(icon, data.icon);
    }
    if (data.hasOwnProperty("title")) {
      const title = target.find('.accordion-button > .accordion-title');

      Shiny.renderContent(title, data.title);
    }
    if (data.hasOwnProperty("body")) {
      const body = target.find(".accordion-body");
      Shiny.renderContent(body, data.body);
    }
  }

});

Shiny.inputBindings.register(accordionInputBinding);
