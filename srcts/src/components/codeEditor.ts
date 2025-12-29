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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _themeObserver?: MutationObserver;
}

// Message data from R uses snake_case to match session$sendInputMessage
// eslint-disable-next-line @typescript-eslint/naming-convention
type CodeEditorReceiveMessageData = {
  code?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  tab_size?: number;
  indentation?: "space" | "tab";
  // eslint-disable-next-line @typescript-eslint/naming-convention
  read_only?: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  line_numbers?: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  word_wrap?: boolean;
  language?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  theme_light?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  theme_dark?: string;
};

// Track which languages have been loaded to avoid duplicate imports
const loadedLanguages = new Set<string>();

// Track which editor instances have been initialized
const initializedEditors = new WeakSet<HTMLElement>();

// Memoized base path for prism-code-editor files
let prismCodeEditorBasePath: string | null = null;

function getPrismCodeEditorBasePath(): string {
  if (prismCodeEditorBasePath !== null) {
    return prismCodeEditorBasePath;
  }
  const scriptElement = document.querySelector(
    'script[src*="prism-code-editor"][src$="index.js"]'
  );
  if (!scriptElement) {
    console.error("Could not find prism-code-editor script element");
    prismCodeEditorBasePath = "";
    return prismCodeEditorBasePath;
  }
  const src = scriptElement.getAttribute("src");
  if (!src) {
    console.error("prism-code-editor script element has no src attribute");
    prismCodeEditorBasePath = "";
    return prismCodeEditorBasePath;
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

function loadTheme(inputId: string, themeName: string, basePath: string): void {
  const linkId = `code-editor-theme-${inputId}`;
  const existingLink = document.getElementById(linkId);
  const newLink = document.createElement("link");
  newLink.id = linkId;
  newLink.rel = "stylesheet";
  newLink.href = `${basePath}/themes/${themeName}.css`;
  document.head.appendChild(newLink);
  if (existingLink) {
    newLink.addEventListener("load", () => {
      existingLink.remove();
    });
  }
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
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-bs-theme"
      ) {
        updateTheme();
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-bs-theme"],
  });
  el._themeObserver = observer;
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
  const language = el.dataset.language || "sql";
  const initialCode = el.dataset.initialCode || "";
  const themeLight = el.dataset.themeLight || "github-light";
  const themeDark = el.dataset.themeDark || "github-dark";
  const readOnly = el.dataset.readOnly === "true";
  const lineNumbers = el.dataset.lineNumbers !== "false";
  const wordWrap = el.dataset.wordWrap === "true";
  const tabSize = parseInt(el.dataset.tabSize || "2") || 2;
  const insertSpaces = el.dataset.insertSpaces !== "false";

  const basePath = getPrismCodeEditorBasePath();
  await loadLanguage(language, basePath);
  const { createEditor } = (await import(
    `${basePath}/index.js`
  )) as PrismCodeEditorModule;
  const { copyButton } = (await import(
    `${basePath}/extensions/copyButton/index.js`
  )) as CopyButtonModule;
  const { defaultCommands } = (await import(
    `${basePath}/extensions/commands.js`
  )) as CommandsModule;

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
      }, 400);
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
    initializeEditor(codeEl).catch((error) => {
      console.error("Failed to initialize code editor:", error);
    });
    const updateCallback = (): void => callback(true);
    el.addEventListener("codeEditorUpdate", updateCallback);
    // Store the callback on the element for unsubscribe
    (el as any)._codeEditorUpdateCallback = updateCallback;
  }

  unsubscribe(el: HTMLElement): void {
    const codeEl = el as CodeEditorElement;
    const updateCallback = (el as any)._codeEditorUpdateCallback;
    if (updateCallback) {
      el.removeEventListener("codeEditorUpdate", updateCallback);
      delete (el as any)._codeEditorUpdateCallback;
    }
    if (codeEl._themeObserver) {
      codeEl._themeObserver.disconnect();
      delete codeEl._themeObserver;
    }
  }

  receiveMessage(el: HTMLElement, data: CodeEditorReceiveMessageData): void {
    const codeEl = el as CodeEditorElement;
    const editor = codeEl.prismEditor;
    if (!editor) {
      console.warn("Cannot update code editor: editor not initialized");
      return;
    }
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
    if (hasDefinedProperty(data, "language") && data.language) {
      const newLanguage = data.language;
      if (newLanguage !== el.dataset.language) {
        const basePath = getPrismCodeEditorBasePath();
        loadLanguage(newLanguage, basePath)
          .then(() => {
            el.dataset.language = newLanguage;
            editor.setOptions({ language: newLanguage });
            editor.update();
          })
          .catch((error) => {
            console.error(
              `Failed to change language to '${newLanguage}':`,
              error
            );
          });
      }
    }
    if (hasDefinedProperty(data, "theme_light") && data.theme_light) {
      const newThemeLight = data.theme_light;
      el.dataset.themeLight = newThemeLight;
      const htmlEl = document.documentElement;
      const currentTheme = htmlEl.getAttribute("data-bs-theme");
      if (currentTheme !== "dark") {
        const basePath = getPrismCodeEditorBasePath();
        loadTheme(el.id, newThemeLight, basePath);
      }
    }
    if (hasDefinedProperty(data, "theme_dark") && data.theme_dark) {
      const newThemeDark = data.theme_dark;
      el.dataset.themeDark = newThemeDark;
      const htmlEl = document.documentElement;
      const currentTheme = htmlEl.getAttribute("data-bs-theme");
      if (currentTheme === "dark") {
        const basePath = getPrismCodeEditorBasePath();
        loadTheme(el.id, newThemeDark, basePath);
      }
    }
    el.dispatchEvent(new CustomEvent("codeEditorUpdate"));
  }

  getRatePolicy(): { policy: "throttle"; delay: number } {
    return {
      policy: "throttle",
      delay: 300,
    };
  }
}

registerBinding(CodeEditorInputBinding, "code-editor");
