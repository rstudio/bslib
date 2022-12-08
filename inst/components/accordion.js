const accordionInputBinding = window.Shiny ? new Shiny.InputBinding() : {};

$.extend(accordionInputBinding, {

  find: function(scope) {
    return $(scope).find(".accordion.bslib-accordion-input");
  },

  getValue: function(el) {
    const shown_items = $(el).find(".accordion-collapse.show").parent(".accordion-item");
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

  receiveMessage: function(el, data) {
    if (data.method === "select") {
      this._selectItems(el, data);
    } else if (data.method === "remove") {
      this._removeItem(el, data);
    } else if (data.method === "insert") {
      this._insertItem(el, data);
    } else if (data.method === "mutate") {
      this._mutateItem(el, data);
    } else {
      throw new Error(`Method not yet implemented: ${data.method}`);
    }
  },

  _selectItems: function(el, data) {
    // should always be an array
    let vals = data.value;

    // If this accordion is autoclosing, it's only possible to show/select
    // one item at a time anyway, so just select the last item in the list.
    const autoclose = this._isAutoClosing(el);
    if (autoclose) {
      vals = vals.slice(vals.length - 1, vals.length);
    }

    $(el).find(".accordion-item").each(function (i) {
      const val = $(this).attr("data-value");
      const show = vals.indexOf(val) > -1;

      if (show) {
        $(this).find(".accordion-collapse").collapse("show");
      } else if (!autoclose && data.close) {
        $(this).find(".accordion-collapse").collapse("hide");
      }
    });
  },

  _removeItem: function(el, data) {
    // should always be an array
    let targets = data.target;

    $(el).find(".accordion-item").each(function (i) {
      const val = $(this).attr("data-value");
      if (targets.indexOf(val) > -1) {
        $(this).remove();
      }
    });
  },

  _insertItem: function(el, data) {
    const items = $(el).find(".accordion-item");

    let index = -1;
    if (data.target) {
      items.each(function (i) {
        if (index > -1) return;
        if ($(this).attr("data-value") === data.target) {
          index = i;
        }
      });
    }

    // If no target was specified, or the target was not found, then default
    // to the first or last item, depending on the position
    if (index === -1) {
      index = (data.position === "before") ? 0 : (items.length - 1);
    }

    // Only use index if there are items to insert before/after
    if (items.length) {
      Shiny.renderContent(
        items[index], data.item,
        (data.position === "before") ? "beforebegin" : "afterend"
      );
    } else {
      Shiny.renderContent(el, data.item);
    }

    // Need to add a reference to the parent id that makes autoclose to work
    if (this._isAutoClosing(el)) {
      const val = $(data.item.html).attr("data-value");
      $(el).find(`[data-value="${val}"] .accordion-collapse`).attr("data-bs-parent", "#" + el.id);
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
  },

  _isAutoClosing: function(el) {
    return el.classList.contains("autoclose");
  }
});


if (window.Shiny) Shiny.inputBindings.register(accordionInputBinding);
