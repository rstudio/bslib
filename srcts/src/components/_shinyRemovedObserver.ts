type Callback<T> = (el: T) => void;

/**
 * Watch for the removal of specific elements from regions of the page.
 */
export class ShinyRemovedObserver {
  private observer: MutationObserver;
  private watching: Set<HTMLElement>;

  /**
   * Creates a new instance of the `ShinyRemovedObserver` class to watch for the
   * removal of specific elements from part of the DOM.
   *
   * @param selector A CSS selector to identify elements to watch for removal.
   * @param callback The function to be called on a matching element when it
   * is removed.
   */
  constructor(selector: string, callback: Callback<HTMLElement>) {
    this.watching = new Set<HTMLElement>();
    this.observer = new MutationObserver((mutations) => {
      const found = new Set<HTMLElement>();
      for (const { type, removedNodes } of mutations) {
        if (type !== "childList") continue;
        if (removedNodes.length === 0) continue;

        for (const node of removedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches(selector)) {
            found.add(node);
          }
          if (node.querySelector(selector)) {
            node
              .querySelectorAll<HTMLElement>(selector)
              .forEach((el) => found.add(el));
          }
        }
      }
      if (found.size === 0) return;
      for (const el of found) {
        try {
          callback(el);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  /**
   * Starts observing the specified element for removal of its children. If the
   * element is already being observed, no change is made to the mutation
   * observer.
   * @param el The element to observe.
   */
  observe(el: HTMLElement): void {
    const changed = this._flush();
    if (this.watching.has(el)) {
      if (!changed) return;
    } else {
      this.watching.add(el);
    }

    if (changed) {
      this._restartObserver();
    } else {
      this.observer.observe(el, { childList: true, subtree: true });
    }
  }

  /**
   * Stops observing the specified element for removal.
   * @param el The element to unobserve.
   */
  unobserve(el: HTMLElement): void {
    if (!this.watching.has(el)) return;
    // MutationObserver doesn't have an "unobserve" method, so we have to
    // disconnect and re-observe all elements that are still being watched.
    this.watching.delete(el);
    this._flush();
    this._restartObserver();
  }

  /**
   * Restarts the mutation observer, observing all elements in the `watching`
   * and implicitly unobserving any elements that are no longer in the
   * watchlist.
   * @private
   */
  private _restartObserver(): void {
    this.observer.disconnect();
    for (const el of this.watching) {
      this.observer.observe(el, { childList: true, subtree: true });
    }
  }

  /**
   * Flushes the set of watched elements, removing any elements that are no
   * longer in the DOM, but it does not modify the mutation observer.
   * @private
   * @returns A boolean indicating whether the watched elements have changed.
   */
  private _flush(): boolean {
    let watchedChanged = false;
    const watched = Array.from(this.watching);
    for (const el of watched) {
      if (document.body.contains(el)) continue;
      this.watching.delete(el);
      watchedChanged = true;
    }
    return watchedChanged;
  }
}
