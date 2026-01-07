/**
 * @fileoverview Code Editor Web Component for bslib
 *
 * A Shiny input binding that creates a code editor using prism-code-editor
 * with syntax highlighting, theme support, and bidirectional communication
 * with R/Shiny.
 *
 * This file is built as a separate ES module bundle (code-editor.js) to
 * enable lazy loading - prism-code-editor and language grammars are only
 * loaded when the editor is used.
 */

import type { CustomElementInputGetValue } from "./webcomponents/_makeInputBinding";
import { makeInputBinding } from "./webcomponents/_makeInputBinding";
import {
  hasDefinedProperty,
  showShinyClientMessage,
  updateLabel,
} from "./_utils";

// Default values - should match input_code_editor() defaults
/* eslint-disable @typescript-eslint/naming-convention */
const DEFAULT_LANGUAGE = "plain";
const DEFAULT_TAB_SIZE = 2;
const DEFAULT_THEME_LIGHT = "github-light";
const DEFAULT_THEME_DARK = "github-dark";
const SUBMIT_FLASH_DURATION_MS = 400;
/* eslint-enable @typescript-eslint/naming-convention */

// Type definitions for prism-code-editor
interface PrismEditor {
  value: string;
  keyCommandMap: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Enter?: (
      e: KeyboardEvent,
      selection: unknown,
      value: string
    ) => boolean | undefined;
    [key: string]: unknown;
  };
  textarea: HTMLTextAreaElement;
  setOptions(options: PrismEditorOptions): void;
  update(): void;
  on(event: string, callback: () => void): void;
}

interface PrismEditorOptions {
  language?: string;
  value?: string;
  tabSize?: number;
  insertSpaces?: boolean;
  lineNumbers?: boolean;
  wordWrap?: boolean;
  readOnly?: boolean;
}

interface PrismCodeEditorModule {
  createEditor: (
    element: HTMLElement,
    options: PrismEditorOptions,
    ...extensions: any[]
  ) => PrismEditor;
}

interface CopyButtonModule {
  copyButton: () => any;
}

interface CommandsModule {
  defaultCommands: () => any;
}

interface TooltipsModule {
  addTooltip: (
    editor: PrismEditor,
    tooltip: HTMLElement,
    autoHide: boolean
  ) => [() => void, () => void];
}

interface CursorModule {
  cursorPosition: () => (editor: PrismEditor) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
type CodeEditorReceiveMessageData = {
  value?: string;
  label?: string;
  /* eslint-disable @typescript-eslint/naming-convention */
  tab_size?: number;
  indentation?: "space" | "tab";
  read_only?: boolean;
  line_numbers?: boolean;
  word_wrap?: boolean;
  language?: string;
  theme_light?: string;
  theme_dark?: string;
  /* eslint-enable @typescript-eslint/naming-convention */
};

/**
 * A code editor web component with syntax highlighting and Shiny integration.
 *
 * Uses prism-code-editor internally. Supports 20+ languages, light/dark themes,
 * and automatic theme switching based on Bootstrap's `data-bs-theme` attribute.
 *
 * @example
 * ```html
 * <bslib-code-editor
 *   id="my-editor"
 *   language="python"
 *   value="print('hello')"
 *   theme-light="github-light"
 *   theme-dark="github-dark"
 * ></bslib-code-editor>
 * ```
 */
export class BslibCodeEditor
  extends HTMLElement
  implements CustomElementInputGetValue<string>
{
  static tagName = "bslib-code-editor";
  static isShinyInput = true;

  static observedAttributes = [
    "language",
    "readonly",
    "line-numbers",
    "word-wrap",
    "tab-size",
    "insert-spaces",
    "theme-light",
    "theme-dark",
  ];

  // Shared state across all instances
  static #loadedLanguages = new Set<string>();
  static #loadedThemes = new Set<string>();
  static #basePath: string | null = null;

  /** Locates and caches the base path for prism-code-editor assets. */
  static #getBasePath(): string {
    if (BslibCodeEditor.#basePath !== null) {
      return BslibCodeEditor.#basePath;
    }

    const scriptElement = document.querySelector(
      'script[src*="prism-code-editor"][src$="index.js"]'
    );

    if (!scriptElement) {
      throw new Error(
        "Could not find prism-code-editor script element. " +
          "Ensure the prism-code-editor dependency is properly loaded."
      );
    }

    const src = scriptElement.getAttribute("src");
    if (!src) {
      throw new Error("prism-code-editor script element has no src attribute");
    }

    const absoluteSrc = new URL(src, document.baseURI).href;
    BslibCodeEditor.#basePath = absoluteSrc.replace(/\/index\.js$/, "");
    return BslibCodeEditor.#basePath;
  }

  /** Dynamically imports a language grammar. Cached after first load. */
  static async #loadLanguage(language: string): Promise<void> {
    if (BslibCodeEditor.#loadedLanguages.has(language)) {
      return;
    }
    if (["plain", "plaintext", "text", "txt"].includes(language)) {
      return;
    }
    let languageToLoad = language;
    if (language === "html") {
      languageToLoad = "markup";
    }
    const basePath = BslibCodeEditor.#getBasePath();
    await import(`${basePath}/prism/languages/${languageToLoad}.js`);
    BslibCodeEditor.#loadedLanguages.add(language);
  }

  /** Loads a theme stylesheet. Themes are cached and never unloaded. */
  static #loadTheme(themeName: string): void {
    if (BslibCodeEditor.#loadedThemes.has(themeName)) {
      return;
    }

    const linkId = `code-editor-theme-${themeName}`;
    if (document.getElementById(linkId)) {
      BslibCodeEditor.#loadedThemes.add(themeName);
      return;
    }

    const basePath = BslibCodeEditor.#getBasePath();
    const newLink = document.createElement("link");
    newLink.id = linkId;
    newLink.rel = "stylesheet";
    newLink.href = `${basePath}/themes/${themeName}.css`;

    newLink.addEventListener("load", () => {
      BslibCodeEditor.#loadedThemes.add(themeName);
    });

    newLink.addEventListener("error", () => {
      console.error(`Failed to load code editor theme: ${themeName}`);
    });

    document.head.appendChild(newLink);
  }

  private prismEditor?: PrismEditor;
  private darkLightObserver?: MutationObserver;
  private initPromise?: Promise<PrismEditor | undefined>;
  private languageChangePromise?: Promise<void>;
  private readonlyTooltipCleanup?: () => void;

  // Properties that reflect to/from HTML attributes
  get language(): string {
    return this.getAttribute("language") ?? DEFAULT_LANGUAGE;
  }
  set language(val: string) {
    this.setAttribute("language", val);
  }

  get readonly(): boolean {
    return (
      this.hasAttribute("readonly") && this.getAttribute("readonly") !== "false"
    );
  }
  set readonly(val: boolean) {
    this.setAttribute("readonly", String(val));
  }

  get lineNumbers(): boolean {
    return this.getAttribute("line-numbers") !== "false";
  }
  set lineNumbers(val: boolean) {
    this.setAttribute("line-numbers", String(val));
  }

  get wordWrap(): boolean {
    return this.getAttribute("word-wrap") === "true";
  }
  set wordWrap(val: boolean) {
    this.setAttribute("word-wrap", String(val));
  }

  get tabSize(): number {
    const val = this.getAttribute("tab-size");
    const parsed = val ? parseInt(val) : DEFAULT_TAB_SIZE;
    return isNaN(parsed) ? DEFAULT_TAB_SIZE : parsed;
  }
  set tabSize(val: number) {
    this.setAttribute("tab-size", String(val));
  }

  get insertSpaces(): boolean {
    return this.getAttribute("insert-spaces") !== "false";
  }
  set insertSpaces(val: boolean) {
    this.setAttribute("insert-spaces", String(val));
  }

  get themeLight(): string {
    return this.getAttribute("theme-light") ?? DEFAULT_THEME_LIGHT;
  }
  set themeLight(val: string) {
    this.setAttribute("theme-light", val);
  }

  get themeDark(): string {
    return this.getAttribute("theme-dark") ?? DEFAULT_THEME_DARK;
  }
  set themeDark(val: string) {
    this.setAttribute("theme-dark", val);
  }

  /** The current editor content. */
  get value(): string {
    return this.prismEditor?.value ?? "";
  }
  set value(val: string) {
    if (this.prismEditor) {
      this.prismEditor.setOptions({ value: val });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChangeCallback: (x: boolean) => void = () => {};

  /** Returns the current editor content for Shiny. */
  getValue(): string {
    return this.value;
  }

  /** Initializes the editor when the element is added to the DOM. */
  connectedCallback(): void {
    // Guard against re-initialization (e.g., element moved in DOM)
    if (this.prismEditor) return;

    this.initPromise = this._initializeEditor();
    this.initPromise
      .then(() => {
        this.onChangeCallback(false);
      })
      .catch((error) => {
        showShinyClientMessage({
          headline: "Code Editor Initialization Error",
          message:
            "An error occurred while initializing the code editor. See console for details.",
          status: "error",
        });
        console.error("Failed to initialize code editor:", error);
      });

    const updateCallback = (): void => this.onChangeCallback(true);
    this.addEventListener("bslibCodeEditorUpdate", updateCallback);
  }

  /** Cleans up observers when the element is removed from the DOM. */
  disconnectedCallback(): void {
    this.darkLightObserver?.disconnect();
    this.darkLightObserver = undefined;
    this.readonlyTooltipCleanup?.();
    this.readonlyTooltipCleanup = undefined;
    // Theme stylesheets are intentionally kept (shared across editors)
  }

  /** Responds to attribute changes by updating the prism-code-editor instance. */
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    if (oldValue === newValue || !this.prismEditor) return;

    const editor = this.prismEditor;

    switch (name) {
      case "language":
        if (newValue) {
          // Store promise so receiveMessage() can await language loading
          this.languageChangePromise = this._handleLanguageChange(newValue);
        }
        break;
      case "readonly": {
        const isReadOnly = newValue === "true";
        editor.setOptions({ readOnly: isReadOnly });

        // Setup or cleanup tooltip based on readonly state
        if (isReadOnly && !this.readonlyTooltipCleanup) {
          // Setup tooltip when changing to readonly
          void this._setupReadOnlyTooltip(editor);
        } else if (!isReadOnly && this.readonlyTooltipCleanup) {
          // Cleanup tooltip when changing to editable
          this.readonlyTooltipCleanup();
          this.readonlyTooltipCleanup = undefined;
        }
        break;
      }
      case "line-numbers":
        editor.setOptions({ lineNumbers: newValue !== "false" });
        break;
      case "word-wrap":
        editor.setOptions({ wordWrap: newValue === "true" });
        break;
      case "tab-size": {
        const tabSize = newValue ? parseInt(newValue) : DEFAULT_TAB_SIZE;
        if (!isNaN(tabSize)) {
          editor.setOptions({ tabSize });
        }
        break;
      }
      case "insert-spaces":
        editor.setOptions({ insertSpaces: newValue !== "false" });
        break;
      case "theme-light":
        if (newValue) BslibCodeEditor.#loadTheme(newValue);
        break;
      case "theme-dark":
        if (newValue) BslibCodeEditor.#loadTheme(newValue);
        break;
      default:
        break;
    }
  }

  /** Creates the prism-code-editor instance and sets up event handlers. */
  private async _initializeEditor(): Promise<PrismEditor | undefined> {
    const editorContainer = this.querySelector(".code-editor");
    if (!editorContainer) {
      showShinyClientMessage({
        headline: "Code Editor Initialization Error",
        message:
          "Expected to find `.code-editor` inside `<bslib-code-editor>` container element.",
        status: "error",
      });
      return;
    }

    const language = this.language;
    const initialCode = this.getAttribute("value") ?? "";
    this.removeAttribute("value"); // Clean up; value now lives in prismEditor
    const readOnly = this.readonly;
    const lineNumbers = this.lineNumbers;
    const wordWrap = this.wordWrap;
    const tabSize = this.tabSize;
    const insertSpaces = this.insertSpaces;

    const basePath = BslibCodeEditor.#getBasePath();

    // Language grammar must load before editor creation
    await BslibCodeEditor.#loadLanguage(language);
    const [{ createEditor }, { copyButton }, { defaultCommands }] =
      await Promise.all([
        import(`${basePath}/index.js`) as Promise<PrismCodeEditorModule>,
        import(
          `${basePath}/extensions/copyButton/index.js`
        ) as Promise<CopyButtonModule>,
        import(`${basePath}/extensions/commands.js`) as Promise<CommandsModule>,
      ]);

    const editor = createEditor(
      editorContainer as HTMLElement,
      {
        language: language,
        value: initialCode,
        tabSize: tabSize,
        insertSpaces: insertSpaces,
        lineNumbers: lineNumbers,
        wordWrap: wordWrap,
        readOnly: readOnly,
      },
      copyButton(),
      defaultCommands()
    );

    const oldEnterCallback = editor.keyCommandMap.Enter;
    editor.keyCommandMap.Enter = (
      e: KeyboardEvent,
      selection: unknown,
      value: string
    ) => {
      if (e.metaKey || e.ctrlKey) {
        this.dispatchEvent(new CustomEvent("bslibCodeEditorUpdate"));
        editorContainer.classList.add("code-editor-submit-flash");
        setTimeout(() => {
          editorContainer.classList.remove("code-editor-submit-flash");
        }, SUBMIT_FLASH_DURATION_MS);
        return true;
      }
      return oldEnterCallback?.(e, selection, value);
    };

    this.prismEditor = editor;
    this.darkLightObserver = this._setupThemeWatcher();

    const textarea = this.querySelector("textarea");
    if (textarea) {
      textarea.addEventListener("blur", () => {
        this.dispatchEvent(new CustomEvent("bslibCodeEditorUpdate"));
      });
    }

    // Setup read-only tooltip if editor is read-only
    if (readOnly) {
      void this._setupReadOnlyTooltip(editor);
    }

    return editor;
  }

  /** Watches `data-bs-theme` on `<html>` to switch syntax highlighting themes. */
  private _setupThemeWatcher(): MutationObserver {
    const updateTheme = (): void => {
      const htmlEl = document.documentElement;
      const theme = htmlEl.getAttribute("data-bs-theme");
      const themeName = theme === "dark" ? this.themeDark : this.themeLight;
      BslibCodeEditor.#loadTheme(themeName);
    };
    updateTheme();

    const observer = new MutationObserver(() => updateTheme());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-bs-theme"],
    });
    return observer;
  }

  /** Loads a new language grammar and updates the editor. */
  private async _handleLanguageChange(newLanguage: string): Promise<void> {
    const editor = this.prismEditor;
    if (!editor) return;

    try {
      await BslibCodeEditor.#loadLanguage(newLanguage);
      editor.setOptions({ language: newLanguage });
      editor.update();
    } catch (error) {
      showShinyClientMessage({
        headline: "Code Editor Language Load Error",
        message: `Failed to load language '${newLanguage}'. See console for details.`,
        status: "error",
      });
      console.error(`Failed to load language '${newLanguage}':`, error);
    }
  }

  /**
   * Sets up a tooltip that appears when user tries to type in a read-only editor.
   * Stores cleanup function in readonlyTooltipCleanup.
   * @param editor - The PrismEditor instance
   */
  private async _setupReadOnlyTooltip(editor: PrismEditor): Promise<void> {
    try {
      const basePath = BslibCodeEditor.#getBasePath();
      const [{ addTooltip }, { cursorPosition }] = await Promise.all([
        import(`${basePath}/tooltips.js`) as Promise<TooltipsModule>,
        import(`${basePath}/extensions/cursor.js`) as Promise<CursorModule>,
      ]);

      // Apply cursor position extension (required for tooltips)
      cursorPosition()(editor);

      // Create tooltip element
      const tooltip = document.createElement("div");
      tooltip.className = "code-editor-readonly-tooltip alert alert-danger";
      tooltip.textContent = "Cannot edit read-only editor.";

      const [show, hide] = addTooltip(editor, tooltip, false);

      // Event handlers
      const onBeforeInput = (): void => {
        this.classList.add("is-invalid");
        show();
      };
      const onHide = (): void => {
        this.classList.remove("is-invalid");
        hide();
      };

      // Show tooltip when user tries to type (use capture phase)
      editor.textarea.addEventListener("beforeinput", onBeforeInput, true);

      // Hide tooltip on cursor movement or click
      editor.on("selectionChange", onHide);
      editor.textarea.addEventListener("click", onHide);

      // Store cleanup function
      this.readonlyTooltipCleanup = (): void => {
        editor.textarea.removeEventListener("beforeinput", onBeforeInput, true);
        editor.textarea.removeEventListener("click", onHide);
        // Note: Cannot easily remove 'on' listener, but editor cleanup will handle it
        hide();
      };
    } catch (error) {
      console.error("Failed to setup read-only tooltip:", error);
    }
  }

  /**
   * Handles messages from Shiny's `update_code_editor()`.
   * @param el - The element (unused, required by interface)
   * @param data - Update data from R
   */
  async receiveMessage(
    el: HTMLElement,
    data: CodeEditorReceiveMessageData
  ): Promise<void> {
    if (this.initPromise) {
      await this.initPromise;
    }

    if (!this.prismEditor) {
      showShinyClientMessage({
        headline: "Code Editor could not update",
        message:
          "An update was ignored because the editor is not yet initialized.",
        status: "warning",
      });
      return;
    }

    if (hasDefinedProperty(data, "value")) {
      this.value = data.value ?? "";
    }

    if (hasDefinedProperty(data, "label")) {
      const labelEl = $(this).find("label");
      await updateLabel(data.label, labelEl);
    }

    // Properties set via setters trigger attributeChangedCallback
    if (hasDefinedProperty(data, "tab_size") && data.tab_size !== undefined) {
      this.tabSize = data.tab_size;
    }
    if (hasDefinedProperty(data, "indentation")) {
      this.insertSpaces = data.indentation === "space";
    }
    if (hasDefinedProperty(data, "read_only") && data.read_only !== undefined) {
      this.readonly = data.read_only;
    }
    if (
      hasDefinedProperty(data, "line_numbers") &&
      data.line_numbers !== undefined
    ) {
      this.lineNumbers = data.line_numbers;
    }
    if (hasDefinedProperty(data, "word_wrap") && data.word_wrap !== undefined) {
      this.wordWrap = data.word_wrap;
    }
    if (hasDefinedProperty(data, "language") && data.language) {
      this.language = data.language;
      // Wait for async language loading before notifying Shiny
      if (this.languageChangePromise) {
        await this.languageChangePromise;
        this.languageChangePromise = undefined;
      }
    }
    if (hasDefinedProperty(data, "theme_light") && data.theme_light) {
      this.themeLight = data.theme_light;
    }
    if (hasDefinedProperty(data, "theme_dark") && data.theme_dark) {
      this.themeDark = data.theme_dark;
    }

    this.dispatchEvent(new CustomEvent("bslibCodeEditorUpdate"));
  }
}

customElements.define(BslibCodeEditor.tagName, BslibCodeEditor);

if (window.Shiny) {
  makeInputBinding<string>(BslibCodeEditor.tagName);
}
