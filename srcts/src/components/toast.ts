import type { HtmlDep } from "./_utils";
import type { Toast as ToastType } from "bootstrap";
import { shinyAddCustomMessageHandlers } from "./_shinyAddCustomMessageHandlers";
import { shinyRenderContent, showShinyClientMessage } from "./_utils";

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

/**
 * Manages toast containers for different screen positions.
 *
 * Creates and maintains DOM containers for toast notifications, ensuring
 * each position has only one container that gets reused across toasts.
 * Containers are automatically positioned using Bootstrap utility classes.
 */
class ToastContainerManager {
  private containers: Map<ToastPosition, HTMLElement> = new Map();

  /**
   * Gets an existing container for the position or creates a new one.
   *
   * @param position - The toast position (e.g., "top-right", "bottom-center")
   * @returns The DOM container element for the specified position
   */
  getOrCreateContainer(position: ToastPosition): HTMLElement {
    let container = this.containers.get(position);

    if (!container || !document.body.contains(container)) {
      container = this._createContainer(position);
      this.containers.set(position, container);
    }

    return container;
  }

  /**
   * Creates a new toast container DOM element for the specified position.
   *
   * @param position - The toast position to create a container for
   * @returns A new DOM container element positioned and styled for toasts
   * @private
   */
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

  /**
   * Maps toast positions to their corresponding Bootstrap utility classes.
   *
   * @param position - The toast position
   * @returns Array of CSS class names for positioning the container
   * @private
   */
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

/**
 * Manages the lifecycle and state of an individual toast notification.
 *
 * Encapsulates all toast-specific behavior including progress bar animation,
 * hover pause/resume functionality, and Bootstrap Toast integration.
 */
class BslibToastInstance {
  private element: HTMLElement;
  private bsToast: typeof bootstrapToast.prototype;
  private progressBar: HTMLElement | null = null;
  private startTime = 0;
  private duration = 0;
  private hideTimeoutId: number | null = null;

  constructor(element: HTMLElement, options: ToastOptions) {
    this.element = element;

    // Add progress bar for autohiding toasts
    if (options.autohide) {
      const delay = options.delay || 5000;
      this.duration = delay;
      this._addProgressBar(delay);

      // Initialize Bootstrap toast with autohide disabled (we manage manually)
      const bsOptions = { ...options, autohide: false };
      this.bsToast = new bootstrapToast(element, bsOptions);

      this._setupHoverPause();
    } else {
      this.bsToast = new bootstrapToast(element, options);
    }
  }

  /**
   * Shows the toast notification.
   */
  show(): void {
    this.bsToast.show();
  }

  /**
   * Hides the toast notification.
   */
  hide(): void {
    if (this.hideTimeoutId !== null) {
      clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = null;
    }

    this.bsToast.hide();
  }

  /**
   * Adds an animated progress bar to the toast element.
   * @private
   */
  private _addProgressBar(duration: number): void {
    this.progressBar = document.createElement("div");
    this.progressBar.className = "bslib-toast-progress-bar";
    this.progressBar.style.cssText = `
      animation: bslib-toast-progress ${duration}ms linear forwards;
      animation-play-state: running;
    `;

    // Insert as first child of toast header, or of toast container
    const toastHeader = this.element.querySelector(".toast-header");
    if (toastHeader) {
      toastHeader.insertBefore(this.progressBar, toastHeader.firstChild);
    } else {
      this.element.insertBefore(this.progressBar, this.element.firstChild);
    }

    this.startTime = Date.now();
  }

  /**
   * Sets up hover pause behavior for autohiding toasts.
   * @private
   */
  private _setupHoverPause(): void {
    // Start the initial hide timeout and mark when it started
    this.startTime = Date.now();
    this._startHideTimeout(this.duration);

    this.element.addEventListener("mouseenter", () => this._handleMouseEnter());
    this.element.addEventListener("mouseleave", () => this._handleMouseLeave());
  }

  /**
   * Handles mouse enter event - pauses the auto-hide timer and progress bar.
   * @private
   */
  private _handleMouseEnter(): void {
    // Calculate elapsed time and update duration to remaining time
    const elapsed = Date.now() - this.startTime;
    this.duration = Math.max(100, this.duration - elapsed);

    // Clear any existing timeout
    if (this.hideTimeoutId !== null) {
      clearTimeout(this.hideTimeoutId);
    }

    // Pause progress bar animation
    if (this.progressBar) {
      this.progressBar.style.animationPlayState = "paused";
    }
  }

  /**
   * Handles mouse leave event - resumes the auto-hide timer and progress bar.
   * @private
   */
  private _handleMouseLeave(): void {
    this.startTime = Date.now();
    this._startHideTimeout(this.duration);

    // Resume progress bar animation
    if (this.progressBar) {
      this.progressBar.style.animationPlayState = "running";
    }
  }

  /**
   * Starts or restarts the hide timeout.
   * @private
   */
  private _startHideTimeout(delay: number): void {
    if (this.hideTimeoutId !== null) {
      clearTimeout(this.hideTimeoutId);
    }
    this.hideTimeoutId = window.setTimeout(() => {
      this.bsToast.hide();
    }, delay);
  }
}

// Track toast instances by their DOM elements
const toastInstances = new WeakMap<HTMLElement, BslibToastInstance>();

async function showToast(message: ShowToastMessage): Promise<void> {
  const { html, deps, options, position, id } = message;

  if (!window.bootstrap || !window.bootstrap.Toast) {
    showShinyClientMessage({
      headline: "Bootstrap 5 Required",
      message: "Toast notifications require Bootstrap 5.",
      status: "error",
    });
    return;
  }

  // Check if a toast with the same ID already exists
  const existingToastEl = document.getElementById(id);
  if (existingToastEl) {
    // Hide and remove existing toast without animation
    const existingInstance = toastInstances.get(existingToastEl);
    if (existingInstance) {
      // Force immediate hide by clearing timeout
      existingInstance.hide();
      toastInstances.delete(existingToastEl);
    }
    // Unbind Shiny bindings and remove immediately
    window?.Shiny?.unbindAll?.(existingToastEl);
    existingToastEl.remove();
  }

  // Get or create container for this position
  const container = containerManager.getOrCreateContainer(position);

  await shinyRenderContent(container, { html, deps }, "beforeEnd");

  const toastEl = document.getElementById(id);
  if (!toastEl) {
    showShinyClientMessage({
      headline: "Toast Creation Failed",
      message: `Failed to create toast with id "${id}".`,
      status: "error",
    });
    return;
  }

  const toastInstance = new BslibToastInstance(toastEl, options);
  toastInstances.set(toastEl, toastInstance);

  toastInstance.show();

  // Clean up after toast is hidden
  toastEl.addEventListener("hidden.bs.toast", () => {
    window?.Shiny?.unbindAll?.(toastEl);
    toastEl.remove();
    toastInstances.delete(toastEl);

    // Remove empty toast position containers
    if (container.children.length === 0) {
      container.remove();
    }
  });
}

function hideToast(message: HideToastMessage): void {
  const { id } = message;
  const toastEl = document.getElementById(id);

  if (!toastEl) {
    showShinyClientMessage({
      headline: "Toast Not Found",
      message: `No toast with id "${id}" was found.`,
      status: "warning",
    });
    return;
  }

  const toastInstance = toastInstances.get(toastEl);

  if (toastInstance) {
    toastInstance.hide();
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
