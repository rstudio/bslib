import { HtmlDep } from "rstudio-shiny/srcts/types/src/shiny/render";

const InputBinding = (window.Shiny ? Shiny.InputBinding : class {}) as typeof Shiny.InputBinding;

type AccordionItem = {
  item: Element,
  value: string,
  selected: boolean,
  show?: boolean,
};

type HTMLContent = {
  html: string,
  deps?: HtmlDep[]
};

type SelectMessage = {
  method: "select",
  value: string[] | true,
  close: boolean,
};

type InsertMessage = {
  method: "insert",
  panel: HTMLContent,
  target: string,
  position: "after" | "before",
};

type RemoveMessage =  { 
  method: "remove",
  target: string[] 
}

type UpdateMessage = {
  method: "update",
  target: string,
  value: string,
  body: HTMLContent,
  title: HTMLContent,
  icon: HTMLContent,
}

type MessageData = SelectMessage | InsertMessage | RemoveMessage | UpdateMessage;


class accordionInputBinding extends InputBinding {

  find(scope: HTMLElement) {
    return $(scope).find(".accordion.bslib-accordion-input");
  }

  getValue(el: HTMLElement): string[] | null {
    const items = this._getItems(el)
    const selected = items.filter(x => x.selected).map(x => x.value);
    return selected.length === 0 ? null : selected;
  }

  subscribe(el: HTMLElement, callback: (x: boolean) => void) {
    $(el).on(
      "shown.bs.collapse.accordionInputBinding hidden.bs.collapse.accordionInputBinding",
      function (event) {
        callback(true);
      }
    );
  }

  unsubscribe(el: HTMLElement) {
    $(el).off(".accordionInputBinding");
  }

  receiveMessage(el: HTMLElement, data: MessageData) {
    const method = data.method;
    if (method === "select") {
      this._selectItems(el, data);
    } else if (method === "remove") {
      this._removeItem(el, data);
    } else if (method === "insert") {
      this._insertItem(el, data);
    } else if (method === "update") {
      this._updateItem(el, data);
    } else {
      throw new Error(`Method not yet implemented: ${method}`);
    }
  }

  protected _selectItems(el: HTMLElement, data: SelectMessage) {
    let items = this._getItems(el);

    let selectVals = data.value !== true ? data.value : items.map(x => x.value);

    // If this accordion is autoclosing, it's only possible to show/select
    // one item at a time anyway, so just select the last item in the list.
    const autoclose = this._isAutoClosing(el);
    if (autoclose) {
      selectVals = selectVals.slice(selectVals.length - 1, selectVals.length);
    }

    items = items.map(x => {
      return {...x, show: selectVals.indexOf(x.value) > -1}
    });

    const willShow = items.some(x => x.show);

    items.forEach(x => {
      if (x.show) {

        const toShow = x.item.querySelector(".accordion-collapse:not(.show)");
        if (toShow) $(toShow).collapse("show");

      } else {

        if (!data.close) {
          return;
        }

        if (autoclose && willShow) {
          return;
        }

        const toHide = x.item.querySelector(".accordion-collapse.show");
        if (toHide) $(toHide).collapse("hide");

      }
    });
  }


  protected _insertItem(el: HTMLElement, data: InsertMessage) {
    let targetItem = this._findItem(el, data.target);

    // If no target was specified, or the target was not found, then default
    // to the first or last item, depending on the position
    if (!targetItem) {
      targetItem = (data.position === "before" ? el.firstElementChild : el.lastElementChild) as HTMLElement;
    }

    const panel = data.panel;
    
    // If there is still no targetItem, then there are no items in the accordion
    if (targetItem) {
      Shiny.renderContent(
        targetItem, panel,
        data.position === "before" ? "beforeBegin" : "afterEnd"
      );
    } else {
      Shiny.renderContent(el, panel);
    }

    // Need to add a reference to the parent id that makes autoclose to work
    if (this._isAutoClosing(el)) {
      const val = $(panel.html).attr("data-value");
      $(el)
        .find(`[data-value="${val}"] .accordion-collapse`)
        .attr("data-bs-parent", "#" + el.id);
    }
  }

  protected _removeItem(el: HTMLElement, data: RemoveMessage) {
    const targetItems = this._getItems(el).filter(x => data.target.indexOf(x.value) > -1);

    targetItems.forEach(x => x.item.remove());
  }

  protected _updateItem(el: HTMLElement, data: UpdateMessage) {
    const target = this._findItem(el, data.target);

    if (!target) {
      throw new Error(`Unable to find an accordion_panel() with a value of ${data.target}`);
    }

    if (data.hasOwnProperty("value")) {
      target.dataset.value = data.value;
    }
    if (data.hasOwnProperty("body")) {
      const body = target.querySelector(":scope > .accordion-body") as HTMLElement; // always exists
      Shiny.renderContent(body, data.body);
    }

    const header = target.querySelector(":scope > .accordion-header") as HTMLElement; // always exists

    if (data.hasOwnProperty("title")) {
      const title = header.querySelector(".accordion-title") as HTMLElement; // always exists
      Shiny.renderContent(title, data.title);
    }

    if (data.hasOwnProperty("icon")) {
      const icon = header.querySelector(".accordion-button > .accordion-icon") as HTMLElement; // always exists
      Shiny.renderContent(icon, data.icon);
    }
  }

  protected _getItems(el: HTMLElement): AccordionItem[] {
    const items = Array.from(el.querySelectorAll(":scope > .accordion-item")) as HTMLElement[];
    return items.length === 0 ? [] : items.map(x => this._getItemInfo(x));
  }

  protected _findItem(el: HTMLElement, value: string): HTMLElement | null {
    return el.querySelector(`[data-value="${value}"]`);
  }

  protected _getItemInfo(x: HTMLElement): AccordionItem {
    const collapse = x.querySelector(":scope > .accordion-collapse") as HTMLElement;
    return {
      item: x,
      value: x.dataset.value as string,
      selected: collapse.classList.contains("show"),
    };
  }

  protected _isAutoClosing(el: HTMLElement): boolean {
    return el.classList.contains("autoclose");
  }
}

if (window.Shiny) {
  Shiny.inputBindings.register(new accordionInputBinding(), "bslib.accordion");
}