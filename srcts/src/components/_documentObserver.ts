/**
 * The DocumentObserver class creates an observer detecting all DOM changes,
 * watching for added or removed elements (or their children) that match
 * the specified selectors. When a matching element is added or removed, the
 * respective callback function is called. The DocumentObserver is insensitive
 * to when it's instantiated; it always runs `added.callback()` once on the
 * document body (waiting for DOMContentLoaded if necessary) and then starts
 * watching the DOM for added/removed elements.
 */

interface DocumentObserverConfig {
  added: {
    selector: string;
    callback: (node: HTMLElement) => void;
  };
  removed: {
    selector: string;
    callback: (node: HTMLElement) => void;
  };
}

class DocumentObserver {
  private observer: MutationObserver;
  private config: DocumentObserverConfig;

  constructor(config: DocumentObserverConfig) {
    const mutationObserverCallback = (mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          for (const addedNode of mutation.addedNodes) {
            if (addedNode.nodeType !== Node.ELEMENT_NODE) continue;
            this._callback(addedNode as HTMLElement, this.config.added);
          }
          for (const removedNode of mutation.removedNodes) {
            if (removedNode.nodeType !== Node.ELEMENT_NODE) continue;
            this._callback(removedNode as HTMLElement, this.config.removed);
          }
        }
      }
    };

    this.config = config;
    this.observer = new MutationObserver(mutationObserverCallback);
    if (document.readyState === "complete") {
      this.connect();
    } else {
      document.addEventListener("DOMContentLoaded", () => this.connect());
    }
  }

  private _callback(
    el: HTMLElement,
    {
      selector,
      callback,
    }: { selector: string; callback: (node: HTMLElement) => void }
  ) {
    const elMatches = el.matches(selector);
    const hasMatchingChild = el.querySelector(selector);
    if (!elMatches && !hasMatchingChild) return;
    if (elMatches) callback(el);
    if (!hasMatchingChild) return;
    el.querySelectorAll(selector).forEach((node) =>
      callback(node as HTMLElement)
    );
  }

  connect(): void {
    this._callback(document.body, this.config.added);
    this.observer.observe(document, { childList: true, subtree: true });
  }

  disconnect(): void {
    this.observer.disconnect();
  }
}

export { DocumentObserver };
export type { DocumentObserverConfig };
