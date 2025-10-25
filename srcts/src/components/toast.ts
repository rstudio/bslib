import type { HtmlDep } from "./_utils";
import type { Toast as ToastType } from "bootstrap";
import { shinyAddCustomMessageHandlers } from "./_shinyAddCustomMessageHandlers";
import { shinyRenderDependencies } from "./_utils";

const bootstrapToast = (
  window.bootstrap ? window.bootstrap.Toast : class {}
) as typeof ToastType;

type ToastPosition =
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "middle-center"
  | "middle-left"
  | "middle-right"
  | "top-center"
  | "top-left"
  | "top-right";

interface ToastOptions {
  animation?: boolean;
  autohide?: boolean;
  delay?: number;
}

interface ShowToastMessage {
  html: string;
  deps: HtmlDep[];
  options: ToastOptions;
  position: ToastPosition;
  id: string;
}

interface HideToastMessage {
  id: string;
}

// Container management
class ToastContainerManager {
  private containers: Map<ToastPosition, HTMLElement> = new Map();

  getOrCreateContainer(position: ToastPosition): HTMLElement {
    let container = this.containers.get(position);

    if (!container || !document.body.contains(container)) {
      container = this._createContainer(position);
      this.containers.set(position, container);
    }

    return container;
  }

  private _createContainer(position: ToastPosition): HTMLElement {
    const container = document.createElement("div");
    container.className = "toast-container position-fixed p-1 p-md-2";
    container.setAttribute("data-bslib-toast-container", position);

    // Apply position classes
    const positionClasses = this._getPositionClasses(position);
    container.classList.add(...positionClasses);

    document.body.appendChild(container);

    return container;
  }

  private _getPositionClasses(position: ToastPosition): string[] {
    const classMap: { [key in ToastPosition]: string[] } = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "top-left": ["top-0", "start-0"],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "top-center": ["top-0", "start-50", "translate-middle-x"],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "top-right": ["top-0", "end-0"],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "middle-left": ["top-50", "start-0", "translate-middle-y"],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "middle-center": ["top-50", "start-50", "translate-middle"],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "middle-right": ["top-50", "end-0", "translate-middle-y"],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "bottom-left": ["bottom-0", "start-0"],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "bottom-center": ["bottom-0", "start-50", "translate-middle-x"],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "bottom-right": ["bottom-0", "end-0"],
    };

    return classMap[position];
  }
}

const containerManager = new ToastContainerManager();

// Add animated progress bar to toast
function addProgressBar(toastEl: HTMLElement, duration: number): void {
  const progressBar = document.createElement("div");
  progressBar.className = "bslib-toast-progress-bar";
  progressBar.style.cssText = `
    animation: bslib-toast-progress ${duration}ms linear forwards;
    animation-play-state: running;
  `;

  // Insert as first child of toast header, or of toast container
  const toastHeader = toastEl.querySelector(".toast-header");
  if (toastHeader) {
    toastHeader.insertBefore(progressBar, toastHeader.firstChild);
  } else {
    toastEl.insertBefore(progressBar, toastEl.firstChild);
  }

  // Store progress bar reference and timing info for hover pause
  (toastEl as any)._bslibProgressBar = progressBar;
  (toastEl as any)._bslibStartTime = Date.now();
  (toastEl as any)._bslibDuration = duration;
  (toastEl as any)._bslibRemainingTime = duration;
  (toastEl as any)._bslibElapsedBeforePause = 0; // Time elapsed before pause
}

// Setup hover pause behavior
function setupHoverPause(
  toastEl: HTMLElement,
  bsToast: typeof bootstrapToast.prototype
): void {
  const progressBar = (toastEl as any)._bslibProgressBar as
    | HTMLElement
    | undefined;

  // Create a custom timeout to replace Bootstrap's internal one
  let hideTimeoutId: number | null = null;

  function startHideTimeout(delay: number): void {
    if (hideTimeoutId !== null) {
      clearTimeout(hideTimeoutId);
    }
    hideTimeoutId = window.setTimeout(() => {
      // Only call the original hide if not in mouseover state
      if (!(toastEl as any)._bslibMouseover) {
        originalHide();
      }
    }, delay);
  }

  // Start the initial hide timeout
  if ((toastEl as any)._bslibDuration && (toastEl as any)._bslibRemainingTime) {
    startHideTimeout((toastEl as any)._bslibRemainingTime);
  }

  toastEl.addEventListener("mouseenter", () => {
    // Calculate elapsed time before pause and remaining time
    const pauseTime = Date.now();
    const timeElapsedSinceStart = pauseTime - (toastEl as any)._bslibStartTime;
    (toastEl as any)._bslibElapsedBeforePause = timeElapsedSinceStart;
    (toastEl as any)._bslibRemainingTime = Math.max(
      0,
      (toastEl as any)._bslibDuration - timeElapsedSinceStart
    );

    // Pause the auto-hide timer
    (toastEl as any)._bslibMouseover = true;

    // Clear any existing timeout
    if (hideTimeoutId !== null) {
      clearTimeout(hideTimeoutId);
    }

    // Pause progress bar animation
    if (progressBar) {
      progressBar.style.animationPlayState = "paused";
    }
  });

  toastEl.addEventListener("mouseleave", () => {
    // Resume the auto-hide timer with remaining time
    (toastEl as any)._bslibMouseover = false;

    // Update start time to now, accounting for time already elapsed
    (toastEl as any)._bslibStartTime =
      Date.now() - (toastEl as any)._bslibElapsedBeforePause;

    // If there's still time remaining, restart the timer
    if ((toastEl as any)._bslibRemainingTime > 0) {
      startHideTimeout((toastEl as any)._bslibRemainingTime);

      // Simply resume the animation without restarting it
      if (progressBar) {
        progressBar.style.animationPlayState = "running";
      }
    }
  });

  // Override Bootstrap's auto-hide behavior to respect our custom timing
  const originalHide = bsToast.hide.bind(bsToast);
  bsToast.hide = function () {
    if ((toastEl as any)._bslibMouseover) {
      // If mouse is over, don't hide yet
      return;
    }

    // Clear our custom timeout since we're hiding now
    if (hideTimeoutId !== null) {
      clearTimeout(hideTimeoutId);
      hideTimeoutId = null;
    }

    originalHide();
  };
}

// Show toast handler
async function showToast(message: ShowToastMessage): Promise<void> {
  const { html, deps, options, position } = message;

  // Check if Bootstrap is available
  if (!window.bootstrap || !window.bootstrap.Toast) {
    console.warn(
      "Toast requires Bootstrap 5 to be available on window.bootstrap.Toast"
    );
    return;
  }

  // Render dependencies
  await shinyRenderDependencies(deps);

  // Get or create container for this position
  const container = containerManager.getOrCreateContainer(position);

  // Create temporary div to parse HTML
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const toastEl = temp.firstElementChild as HTMLElement;

  if (!toastEl) {
    console.error("Failed to create toast element");
    return;
  }

  // Append to container
  container.appendChild(toastEl);

  // Initialize Bootstrap toast
  let bsToast: typeof bootstrapToast.prototype;

  // Add progress bar for autohiding toasts
  if (options.autohide) {
    // Get delay with fallback to default
    const delay = options.delay || 5000;
    addProgressBar(toastEl, delay);

    // Create a modified options object to prevent Bootstrap's autohide from interfering
    const modifiedOptions = { ...options, autohide: false };

    // Initialize Bootstrap toast with modified options
    bsToast = new bootstrapToast(toastEl, modifiedOptions);

    // Add hover pause behavior for autohiding toasts
    setupHoverPause(toastEl, bsToast);
  } else {
    // Initialize Bootstrap toast with original options
    bsToast = new bootstrapToast(toastEl, options);
  }

  // Show the toast
  bsToast.show();

  // Clean up after toast is hidden
  toastEl.addEventListener("hidden.bs.toast", () => {
    toastEl.remove();

    // Remove empty containers
    if (container.children.length === 0) {
      container.remove();
    }
  });
}

// Hide toast handler
function hideToast(message: HideToastMessage): void {
  const { id } = message;
  const toastEl = document.getElementById(id);

  if (!toastEl) {
    console.warn(`Toast with id "${id}" not found`);
    return;
  }

  const bsToast = bootstrapToast.getInstance(toastEl);

  if (bsToast) {
    bsToast.hide();
  }
}

// Register message handlers
shinyAddCustomMessageHandlers({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "bslib.show-toast": showToast,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "bslib.hide-toast": hideToast,
});

export type { ToastPosition, ToastOptions, ShowToastMessage, HideToastMessage };
