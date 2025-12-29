/**
 * Code Editor Input Binding for bslib
 *
 * This binding creates a code editor using prism-code-editor with syntax
 * highlighting, theme support, and bidirectional communication with R/Shiny.
 *
 * NOTE: This file uses dynamic imports (await import(...)) for lazy loading
 * of prism-code-editor and its language grammars. This requires:
 * - tsconfig.json: "module": "esnext" for type checking to accept dynamic imports
 * - tsconfig.json: ts-node section with "module": "commonjs" for the build script
 * - esbuild: "format": "esm" in build config for the output bundle
 *
 * The module settings only affect type checking and ts-node execution;
 * the actual browser output format is controlled by esbuild.
 */

import type { InputSubscribeCallback } from "rstudio-shiny/srcts/types/src/bindings/input/inputBinding";
import { registerBinding, InputBinding, hasDefinedProperty } from "./_utils";

// Default values - should match R defaults in input-code-editor.R
/* eslint-disable @typescript-eslint/naming-convention */
const DEFAULT_LANGUAGE = "sql";
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
  setOptions(options: PrismEditorOptions): void;
  update(): void;
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

// Extended HTMLElement types to include custom properties
interface CodeEditorElement extends HTMLElement {
  prismEditor?: PrismEditor;
  darkLightObserver?: MutationObserver;
  codeEditorUpdateCallback?: () => void;
  isInitialized?: Promise<PrismEditor | undefined>;
}

// Message data from R uses snake_case to match session$sendInputMessage
// eslint-disable-next-line @typescript-eslint/naming-convention
type CodeEditorReceiveMessageData = {
  code?: string;
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

// Track which languages have been loaded to avoid duplicate imports
const loadedLanguages = new Set<string>();

// Track which editor instances have been initialized
const initializedEditors = new WeakSet<HTMLElement>();

// Memoized base path for prism-code-editor files
let prismCodeEditorBasePath: string | null = null;

/**
 * Get the base path for prism-code-editor files by locating the script element.
 * @returns The base path (memoized after first call)
 * @throws Error if the prism-code-editor script cannot be found
 */
function getPrismCodeEditorBasePath(): string {
  if (prismCodeEditorBasePath !== null) {
    return prismCodeEditorBasePath;
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
  prismCodeEditorBasePath = absoluteSrc.replace(/\/index\.js$/, "");
  return prismCodeEditorBasePath;
}

async function loadLanguage(language: string, basePath: string): Promise<void> {
  if (loadedLanguages.has(language)) {
    return;
  }
  if (["plain", "plaintext", "text", "txt"].includes(language)) {
    // No grammar needed for plain text
    return;
  }
  let languageToLoad = language;
  // Handle html → markup mapping for backwards compatibility
  if (language === "html") {
    languageToLoad = "markup";
  }
  try {
    await import(`${basePath}/prism/languages/${languageToLoad}.js`);
    loadedLanguages.add(language);
  } catch (error) {
    console.error(`Failed to load language '${language}':`, error);
    throw error;
  }
}

/**
 * Load a theme stylesheet for the code editor.
 * Handles cleanup of old themes and error cases.
 */
function loadTheme(inputId: string, themeName: string, basePath: string): void {
  const linkId = `code-editor-theme-${inputId}`;
  const existingLink = document.getElementById(linkId);

  const newLink = document.createElement("link");
  newLink.id = linkId;
  newLink.rel = "stylesheet";
  newLink.href = `${basePath}/themes/${themeName}.css`;

  // Clean up existing link after new one loads (or on error to prevent accumulation)
  const cleanup = (): void => {
    existingLink?.remove();
  };

  newLink.addEventListener("load", cleanup);
  newLink.addEventListener("error", () => {
    console.error(`Failed to load code editor theme: ${themeName}`);
    cleanup();
  });

  document.head.appendChild(newLink);
}

function setupThemeWatcher(
  el: CodeEditorElement,
  themeLight: string,
  themeDark: string,
  basePath: string
): void {
  const inputId = el.id;
  const updateTheme = (): void => {
    const htmlEl = document.documentElement;
    const theme = htmlEl.getAttribute("data-bs-theme");
    const themeName =
      theme === "dark"
        ? el.dataset.themeDark || themeDark
        : el.dataset.themeLight || themeLight;
    loadTheme(inputId, themeName, basePath);
  };
  updateTheme();

  // Since we filter with attributeFilter, we know all mutations are for data-bs-theme
  const observer = new MutationObserver(() => updateTheme());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-bs-theme"],
  });
  el.darkLightObserver = observer;
}

async function initializeEditor(
  el: CodeEditorElement
): Promise<PrismEditor | undefined> {
  if (initializedEditors.has(el)) {
    return el.prismEditor;
  }
  const editorContainer = el.querySelector(".code-editor");
  if (!editorContainer) {
    console.error(
      "Could not find .code-editor inside .shiny-input-code-editor"
    );
    return;
  }
  const language = el.dataset.language || DEFAULT_LANGUAGE;
  const initialCode = el.dataset.initialCode || "";
  const themeLight = el.dataset.themeLight || DEFAULT_THEME_LIGHT;
  const themeDark = el.dataset.themeDark || DEFAULT_THEME_DARK;
  const readOnly = el.dataset.readOnly === "true";
  const lineNumbers = el.dataset.lineNumbers !== "false";
  const wordWrap = el.dataset.wordWrap === "true";
  const tabSize =
    parseInt(el.dataset.tabSize || String(DEFAULT_TAB_SIZE)) ||
    DEFAULT_TAB_SIZE;
  const insertSpaces = el.dataset.insertSpaces !== "false";

  const basePath = getPrismCodeEditorBasePath();

  // Load language grammar first, then parallelize the remaining imports
  await loadLanguage(language, basePath);
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
      el.dispatchEvent(new CustomEvent("codeEditorUpdate"));
      editorContainer.classList.add("code-editor-submit-flash");
      setTimeout(() => {
        editorContainer.classList.remove("code-editor-submit-flash");
      }, SUBMIT_FLASH_DURATION_MS);
      return true;
    }
    return oldEnterCallback?.(e, selection, value);
  };

  el.prismEditor = editor;
  initializedEditors.add(el);
  setupThemeWatcher(el, themeLight, themeDark, basePath);

  const textarea = el.querySelector("textarea");
  if (textarea) {
    textarea.addEventListener("blur", () => {
      el.dispatchEvent(new CustomEvent("codeEditorUpdate"));
    });
  }

  return editor;
}

class CodeEditorInputBinding extends InputBinding {
  find(scope: HTMLElement): JQuery<HTMLElement> {
    return $(scope).find(".shiny-input-code-editor");
  }

  getValue(el: HTMLElement): string {
    const codeEl = el as CodeEditorElement;
    if (codeEl.prismEditor) {
      return codeEl.prismEditor.value;
    }
    return el.dataset.initialCode || "";
  }

  setValue(el: HTMLElement, value: string): void {
    const codeEl = el as CodeEditorElement;
    if (codeEl.prismEditor) {
      codeEl.prismEditor.setOptions({ value: value });
    } else {
      el.dataset.initialCode = value;
    }
  }

  subscribe(el: HTMLElement, callback: InputSubscribeCallback): void {
    const codeEl = el as CodeEditorElement;

    // Store the initialization promise so receiveMessage can await it
    codeEl.isInitialized = initializeEditor(codeEl);
    codeEl.isInitialized
      .then(() => {
        // Notify Shiny that the editor is ready with its initial value
        callback(false);
      })
      .catch((error) => {
        console.error("Failed to initialize code editor:", error);
      });

    const updateCallback = (): void => callback(true);
    el.addEventListener("codeEditorUpdate", updateCallback);
    codeEl.codeEditorUpdateCallback = updateCallback;
  }

  unsubscribe(el: HTMLElement): void {
    const codeEl = el as CodeEditorElement;

    // Clean up event listener
    const updateCallback = codeEl.codeEditorUpdateCallback;
    if (updateCallback) {
      el.removeEventListener("codeEditorUpdate", updateCallback);
      delete codeEl.codeEditorUpdateCallback;
    }

    // Clean up theme observer
    if (codeEl.darkLightObserver) {
      codeEl.darkLightObserver.disconnect();
      delete codeEl.darkLightObserver;
    }

    // Clean up theme stylesheet to prevent memory leaks
    const linkId = `code-editor-theme-${el.id}`;
    document.getElementById(linkId)?.remove();
  }

  async receiveMessage(
    el: HTMLElement,
    data: CodeEditorReceiveMessageData
  ): Promise<void> {
    const codeEl = el as CodeEditorElement;

    // Wait for initialization if still pending
    if (codeEl.isInitialized) {
      await codeEl.isInitialized;
    }

    const editor = codeEl.prismEditor;
    if (!editor) {
      console.warn("Cannot update code editor: editor not initialized");
      return;
    }

    // Collect synchronous option updates
    const options: PrismEditorOptions = {};
    if (hasDefinedProperty(data, "code")) {
      options.value = data.code;
    }
    if (hasDefinedProperty(data, "tab_size")) {
      options.tabSize = data.tab_size;
    }
    if (hasDefinedProperty(data, "indentation")) {
      options.insertSpaces = data.indentation === "space";
    }
    if (hasDefinedProperty(data, "read_only")) {
      options.readOnly = data.read_only;
    }
    if (hasDefinedProperty(data, "line_numbers")) {
      options.lineNumbers = data.line_numbers;
    }
    if (hasDefinedProperty(data, "word_wrap")) {
      options.wordWrap = data.word_wrap;
    }
    if (Object.keys(options).length > 0) {
      editor.setOptions(options);
    }

    // Handle language change (async) - await before firing update event
    if (hasDefinedProperty(data, "language") && data.language) {
      const newLanguage = data.language;
      if (newLanguage !== el.dataset.language) {
        const basePath = getPrismCodeEditorBasePath();
        try {
          await loadLanguage(newLanguage, basePath);
          el.dataset.language = newLanguage;
          editor.setOptions({ language: newLanguage });
          editor.update();
        } catch (error) {
          console.error(
            `Failed to change language to '${newLanguage}':`,
            error
          );
        }
      }
    }

    // Handle theme updates
    if (hasDefinedProperty(data, "theme_light") && data.theme_light) {
      this._maybeLoadThemeForMode(el, data.theme_light, "themeLight", false);
    }
    if (hasDefinedProperty(data, "theme_dark") && data.theme_dark) {
      this._maybeLoadThemeForMode(el, data.theme_dark, "themeDark", true);
    }

    el.dispatchEvent(new CustomEvent("codeEditorUpdate"));
  }

  /**
   * Update theme dataset and load the theme if it matches the current mode.
   * @param el - The code editor element
   * @param themeValue - The theme name to set
   * @param datasetKey - The dataset key to update ("themeLight" or "themeDark")
   * @param loadForDarkMode - Whether this theme should load when in dark mode
   */
  private _maybeLoadThemeForMode(
    el: HTMLElement,
    themeValue: string,
    datasetKey: "themeDark" | "themeLight",
    loadForDarkMode: boolean
  ): void {
    el.dataset[datasetKey] = themeValue;
    const currentTheme = document.documentElement.getAttribute("data-bs-theme");
    const isDark = currentTheme === "dark";

    if (isDark === loadForDarkMode) {
      const basePath = getPrismCodeEditorBasePath();
      loadTheme(el.id, themeValue, basePath);
    }
  }

  getRatePolicy(): { policy: "throttle"; delay: number } {
    return {
      policy: "throttle",
      delay: 300,
    };
  }
}

registerBinding(CodeEditorInputBinding, "code-editor");
