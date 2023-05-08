/**
 * A resize observer that ensures Shiny outputs resize during or just after
 * their parent container size changes. Useful, in particular, for sidebar
 * transitions or for full-screen card transitions.
 *
 * @class ShinyResizeObserver
 * @typedef {ShinyResizeObserver}
 */
class ShinyResizeObserver {
  /**
   * The actual ResizeObserver instance.
   * @private
   * @type {ResizeObserver}
   */
  private resizeObserver: ResizeObserver;
  /**
   * An array of elements that are currently being watched by the Resize
   * Observer.
   *
   * @details
   * We don't currently have lifecycle hooks that allow us to unobserve elements
   * when they are removed from the DOM. As a result, we need to manually check
   * that the elements we're watching still exist in the DOM. This array keeps
   * track of the elements we're watching so that we can check them later.
   * @private
   * @type {HTMLElement[]}
   */
  private resizeObserverEntries: HTMLElement[];

  /**
   * Watch containers for size changes and ensure that Shiny outputs and
   * htmlwidgets within resize appropriately.
   *
   * @details
   * The ShinyResizeObserver is used to watch the containers, such as Sidebars
   * and Cards for size changes, in particular when the sidebar state is toggled
   * or the card body is expanded full screen. It performs two primary tasks:
   *
   * 1. Dispatches a `resize` event on the window object. This is necessary to
   *    ensure that Shiny outputs resize appropriately. In general, the window
   *    resizing is throttled and the output update occurs when the transition
   *    is complete.
   * 2. If an output with a resize method on the output binding is detected, we
   *    directly call the `.onResize()` method of the binding. This ensures that
   *    htmlwidgets transition smoothly. In static mode, htmlwidgets does this
   *    already.
   *
   * @note
   * This resize observer also handles race conditions in some complex
   * fill-based layouts with multiple outputs (e.g., plotly), where shiny
   * initializes with the correct sizing, but in-between the 1st and last
   * renderValue(), the size of the output containers can change, meaning every
   * output but the 1st gets initialized with the wrong size during their
   * renderValue(). Then, after the render phase, shiny won't know trigger a
   * resize since all the widgets will return to their original size (and thus,
   * Shiny thinks there isn't any resizing to do). The resize observer works
   * around this by ensuring that the output is resized whenever its container
   * size changes.
   * @constructor
   */
  constructor() {
    this.resizeObserverEntries = [];
    this.resizeObserver = new ResizeObserver((entries) => {
      const resizeEvent = new Event("resize");
      window.dispatchEvent(resizeEvent);

      // the rest of this callback is only relevant in Shiny apps
      if (!window.Shiny) return;

      const resized = [] as HTMLElement[];

      for (const entry of entries) {
        if (!(entry.target instanceof HTMLElement)) continue;
        if (!entry.target.querySelector(".shiny-bound-output")) continue;

        entry.target
          .querySelectorAll<HTMLElement>(".shiny-bound-output")
          .forEach((el) => {
            if (resized.includes(el)) return;

            const { binding, onResize } = $(el).data("shinyOutputBinding");
            if (!binding || !binding.resize) return;

            // if this output is owned by another observer, skip it
            const owner = (el as any).shinyResizeObserver;
            if (owner && owner !== this) return;
            // mark this output as owned by this shinyResizeObserver instance
            (el as any).shinyResizeObserver = this;

            // trigger immediate resizing of outputs with a resize method
            onResize(el);
            // only once per output and resize event
            resized.push(el);
          });

        // set plot images to 100% width temporarily during the transition
        entry.target
          .querySelectorAll<HTMLImageElement>(
            '.shiny-plot-output img:not([width="100%"])'
          )
          .forEach((el) => {
            el.setAttribute("width", "100%");
          });
      }
    });
  }

  /**
   * Observe an element for size changes.
   * @param {HTMLElement} el - The element to observe.
   */
  observe(el: HTMLElement): void {
    this.resizeObserver.observe(el);
    this.resizeObserverEntries.push(el);
  }

  /**
   * Stop observing an element for size changes.
   * @param {HTMLElement} el - The element to stop observing.
   */
  unobserve(el: HTMLElement): void {
    const idxEl = this.resizeObserverEntries.indexOf(el);
    if (idxEl < 0) return;

    this.resizeObserver.unobserve(el);
    this.resizeObserverEntries.splice(idxEl, 1);
  }

  /**
   * This method checks that we're not continuing to watch elements that no
   * longer exist in the DOM. If any are found, we stop observing them and
   * remove them from our array of observed elements.
   *
   * @private
   * @static
   */
  flush(): void {
    if (this.resizeObserverEntries.length == 0) return;

    // Find the elements in the ResizeObserver that no longer exist in the DOM
    const missing = this.resizeObserverEntries.filter((el) => {
      return !document.body.contains(el);
    });

    // Remove the non-existent elements from the ResizeObserver
    missing.forEach((el) => {
      this.unobserve(el);
    });
  }
}

export { ShinyResizeObserver };
