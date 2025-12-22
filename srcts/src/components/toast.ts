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

interface ShowToastMessage {
  html: string;
  deps: HtmlDep[];
  autohide: boolean;
  duration?: number;
  position: ToastPosition;
  id: string;
}

interface ToastOptions {
  autohide: boolean;
  duration?: number;
}

interface HideToastMessage {
  id: string;
}

// Container management

/**
 * Manages toasters (containers) for different screen positions.
 *
 * Creates and maintains DOM containers for toast notifications (toasters),
 * ensuring each position has only one container that gets reused across toasts.
 * Containers are positioned in the (top, middle, bottom) or (left, center,
 * right) using Bootstrap utility classes.
 */
class ToasterManager {
  private containers: Map<ToastPosition, HTMLElement> = new Map();

  /**
   * Gets an existing toaster for the position or creates a new one.
   *
   * @param position - The toast position (e.g., "top-right", "bottom-center")
   * @returns The DOM container element for the specified position
   */
  getOrCreateToaster(position: ToastPosition): HTMLElement {
    let toaster = this.containers.get(position);

    if (!toaster || !document.body.contains(toaster)) {
      toaster = ToasterManager._createToaster(position);
      document.body.appendChild(toaster);
      this.containers.set(position, toaster);
    }

    return toaster;
  }

  /**
   * Creates a new toast container (toaster) DOM element for the specified
   * position.
   *
   * @param position - The toast position to create a container for
   * @returns A new DOM container element positioned and styled for toasts
   * @private
   */
  private static _createToaster(position: ToastPosition): HTMLElement {
    const toaster = document.createElement("div");
    toaster.className = "toast-container position-fixed p-1 p-md-2";
    toaster.setAttribute("data-bslib-toast-container", position);
    toaster.classList.add(...ToasterManager._positionClasses(position));

    return toaster;
  }

  /**
   * Maps toast positions to their corresponding Bootstrap utility classes.
   *
   * @param position - The toast position
   * @returns Array of CSS class names for positioning the container
   * @private
   */
  private static _positionClasses(position: ToastPosition): string[] {
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

const toasterManager = new ToasterManager();

/**
 * Manages the lifecycle and state of an individual toast notification.
 *
 * Encapsulates all toast-specific behavior including progress bar animation,
 * interaction-based pause/resume functionality (pointer and focus events),
 * and Bootstrap Toast integration.
 */
class BslibToastInstance {
  private element: HTMLElement;
  private bsToast: typeof bootstrapToast.prototype;
  private progressBar: HTMLElement | null = null;
  private timeStart = 0;
  private timeRemaining = 0;
  private hideTimeoutId: number | null = null;
  private isPaused = false;
  private isPointerOver = false;
  private hasFocus = false;

  constructor(element: HTMLElement, options: ToastOptions) {
    this.element = element;
    this.timeRemaining = options.duration || 5000;

    // `autohide` is a Bootstrap option, but we manage autohiding ourselves so
    // that we can pause/resume on user interaction (pointer and focus).
    const bsOptions = { animation: true, autohide: false };
    this.bsToast = new bootstrapToast(element, bsOptions);

    if (options.autohide) {
      // Add progress bar for autohiding toasts
      this._addProgressBar();
      this._setupInteractionPause();
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
  private _addProgressBar(): void {
    this.progressBar = document.createElement("div");
    this.progressBar.className = "bslib-toast-progress-bar";
    this.progressBar.style.cssText = `
      animation: bslib-toast-progress ${this.timeRemaining}ms linear forwards;
      animation-play-state: running;
    `;

    // Insert as first child of toast header, or of toast container
    const toastHeader = this.element.querySelector(".toast-header");
    if (toastHeader) {
      toastHeader.insertBefore(this.progressBar, toastHeader.firstChild);
    } else {
      this.element.insertBefore(this.progressBar, this.element.firstChild);
    }
  }

  /**
   * Sets up interaction-based pause behavior for autohiding toasts.
   * Pauses auto-hide when user interacts via pointer (mouse/touch) or keyboard focus.
   * @private
   */
  private _setupInteractionPause(): void {
    // Start the initial hide timeout and mark when it started
    this.timeStart = Date.now();
    this._startHideTimeout(this.timeRemaining);

    // Pointer events (mouse, touch, pen)
    this.element.addEventListener("pointerenter", () =>
      this._handlePointerEnter()
    );
    this.element.addEventListener("pointerleave", () =>
      this._handlePointerLeave()
    );

    // Focus events (keyboard navigation, screen readers)
    this.element.addEventListener("focusin", () => this._handleFocusIn());
    this.element.addEventListener("focusout", () => this._handleFocusOut());
  }

  /**
   * Handles pointer enter event - pauses the auto-hide timer.
   * @private
   */
  private _handlePointerEnter(): void {
    this.isPointerOver = true;
    this._pause();
  }

  /**
   * Handles pointer leave event - resumes the auto-hide timer if not focused.
   * @private
   */
  private _handlePointerLeave(): void {
    this.isPointerOver = false;
    if (!this.hasFocus) {
      this._resume();
    }
  }

  /**
   * Handles focus in event - pauses the auto-hide timer.
   * @private
   */
  private _handleFocusIn(): void {
    this.hasFocus = true;
    this._pause();
  }

  /**
   * Handles focus out event - resumes the auto-hide timer if pointer not over.
   * @private
   */
  private _handleFocusOut(): void {
    this.hasFocus = false;
    if (!this.isPointerOver) {
      this._resume();
    }
  }

  /**
   * Pauses the auto-hide timer and progress bar animation.
   * @private
   */
  private _pause(): void {
    if (this.isPaused) return;

    this.isPaused = true;

    // Calculate elapsed time and update duration to remaining time
    const elapsed = Date.now() - this.timeStart;
    this.timeRemaining = Math.max(100, this.timeRemaining - elapsed);

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
   * Resumes the auto-hide timer and progress bar animation.
   * @private
   */
  private _resume(): void {
    if (!this.isPaused) return;

    this.isPaused = false;
    this.timeStart = Date.now();
    this._startHideTimeout(this.timeRemaining);

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
  const { html, deps, autohide, duration, position, id } = message;

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
  const toaster = toasterManager.getOrCreateToaster(position);

  await shinyRenderContent(toaster, { html, deps }, "beforeEnd");

  const toastEl = document.getElementById(id);
  if (!toastEl) {
    showShinyClientMessage({
      headline: "Toast Creation Failed",
      message: `Failed to create toast with id "${id}".`,
      status: "error",
    });
    return;
  }

  const toastInstance = new BslibToastInstance(toastEl, { autohide, duration });
  toastInstances.set(toastEl, toastInstance);

  toastInstance.show();

  // Clean up after toast is hidden
  toastEl.addEventListener("hidden.bs.toast", () => {
    window?.Shiny?.unbindAll?.(toastEl);
    toastEl.remove();
    toastInstances.delete(toastEl);

    // Remove empty toast position containers
    if (toaster.children.length === 0) {
      toaster.remove();
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
