import type { HtmlDep } from "./_utils";
import { InputBinding, registerBinding, hasOwnProperty } from "./_utils";

type AccordionItem = {
  item: Element;
  value: string;
  isOpen: () => boolean;
  show: () => void;
  hide: () => void;
};

type HTMLContent = {
  html: string;
  deps?: HtmlDep[];
};

type SetMessage = {
  method: "set";
  values: string[];
};

type OpenMessage = {
  method: "open";
  values: string[] | true;
};

type CloseMessage = {
  method: "close";
  values: string[] | true;
};

type InsertMessage = {
  method: "insert";
  panel: HTMLContent;
  target: string;
  position: "after" | "before";
};

type RemoveMessage = {
  method: "remove";
  target: string[];
};

type UpdateMessage = {
  method: "update";
  target: string;
  value: string;
  body: HTMLContent;
  title: HTMLContent;
  icon: HTMLContent;
};

type MessageData =
  | CloseMessage
  | InsertMessage
  | OpenMessage
  | RemoveMessage
  | SetMessage
  | UpdateMessage;

class AccordionInputBinding extends InputBinding {
  find(scope: HTMLElement) {
    return $(scope).find(".accordion.bslib-accordion-input");
  }

  getValue(el: HTMLElement): string[] | null {
    const items = this._getItemInfo(el);
    const selected = items.filter((x) => x.isOpen()).map((x) => x.value);
    return selected.length === 0 ? null : selected;
  }

  subscribe(el: HTMLElement, callback: (x: boolean) => void) {
    $(el).on(
      "shown.bs.collapse.accordionInputBinding hidden.bs.collapse.accordionInputBinding",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    if (method === "set") {
      this._setItems(el, data);
    } else if (method === "open") {
      this._openItems(el, data);
    } else if (method === "close") {
      this._closeItems(el, data);
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

  protected _setItems(el: HTMLElement, data: SetMessage) {
    const items = this._getItemInfo(el);
    const vals = this._getValues(el, items, data.values);
    items.forEach((x) => {
      vals.indexOf(x.value) > -1 ? x.show() : x.hide();
    });
  }

  protected _openItems(el: HTMLElement, data: OpenMessage) {
    const items = this._getItemInfo(el);
    const vals = this._getValues(el, items, data.values);
    items.forEach((x) => {
      if (vals.indexOf(x.value) > -1) x.show();
    });
  }

  protected _closeItems(el: HTMLElement, data: CloseMessage) {
    const items = this._getItemInfo(el);
    const vals = this._getValues(el, items, data.values);
    items.forEach((x) => {
      if (vals.indexOf(x.value) > -1) x.hide();
    });
  }

  protected _insertItem(el: HTMLElement, data: InsertMessage) {
    let targetItem = this._findItem(el, data.target);

    // If no target was specified, or the target was not found, then default
    // to the first or last item, depending on the position
    if (!targetItem) {
      targetItem = (
        data.position === "before" ? el.firstElementChild : el.lastElementChild
      ) as HTMLElement;
    }

    const panel = data.panel;

    // If there is still no targetItem, then there are no items in the accordion
    if (targetItem) {
      Shiny.renderContent(
        targetItem,
        panel,
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
    const targetItems = this._getItemInfo(el).filter(
      (x) => data.target.indexOf(x.value) > -1
    );

    targetItems.forEach((x) => x.item.remove());
  }

  protected _updateItem(el: HTMLElement, data: UpdateMessage) {
    const target = this._findItem(el, data.target);

    if (!target) {
      throw new Error(
        `Unable to find an accordion_panel() with a value of ${data.target}`
      );
    }

    if (hasOwnProperty(data, "value")) {
      target.dataset.value = data.value;
    }

    if (hasOwnProperty(data, "body")) {
      const body = target.querySelector(".accordion-body") as HTMLElement; // always exists
      Shiny.renderContent(body, data.body);
    }

    const header = target.querySelector(".accordion-header") as HTMLElement; // always exists

    if (hasOwnProperty(data, "title")) {
      const title = header.querySelector(".accordion-title") as HTMLElement; // always exists
      Shiny.renderContent(title, data.title);
    }

    if (hasOwnProperty(data, "icon")) {
      const icon = header.querySelector(
        ".accordion-button > .accordion-icon"
      ) as HTMLElement; // always exists
      Shiny.renderContent(icon, data.icon);
    }
  }

  protected _getItemInfo(el: HTMLElement): AccordionItem[] {
    const items = Array.from(
      el.querySelectorAll(":scope > .accordion-item")
    ) as HTMLElement[];
    return items.map((x) => this._getSingleItemInfo(x));
  }

  protected _getSingleItemInfo(x: HTMLElement): AccordionItem {
    const collapse = x.querySelector(".accordion-collapse") as HTMLElement;
    const isOpen = () => $(collapse).hasClass("show");
    return {
      item: x,
      value: x.dataset.value as string,
      isOpen: isOpen,
      show: () => {
        if (!isOpen()) $(collapse).collapse("show");
      },
      hide: () => {
        if (isOpen()) $(collapse).collapse("hide");
      },
    };
  }

  protected _getValues(
    el: HTMLElement,
    items: AccordionItem[],
    values: string[] | true
  ): string[] {
    let vals = values !== true ? values : items.map((x) => x.value);
    const autoclose = this._isAutoClosing(el);
    if (autoclose) {
      vals = vals.slice(vals.length - 1, vals.length);
    }
    return vals;
  }

  protected _findItem(el: HTMLElement, value: string): HTMLElement | null {
    return el.querySelector(`[data-value="${value}"]`);
  }

  protected _isAutoClosing(el: HTMLElement): boolean {
    return el.classList.contains("autoclose");
  }
}

registerBinding(AccordionInputBinding, "accordion");
