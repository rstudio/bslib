/*! bslib 0.9.0.9002 | (c) 2012-2025 RStudio, PBC. | License: MIT + file LICENSE */
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// srcts/src/components/_utils.ts
var Shiny = window.Shiny;
var InputBinding = Shiny ? Shiny.InputBinding : class {
};
function registerBinding(inputBindingClass, name) {
  if (Shiny) {
    Shiny.inputBindings.register(new inputBindingClass(), "bslib." + name);
  }
}
function showShinyClientMessage({
  headline = "",
  message,
  status = "warning"
}) {
  document.dispatchEvent(
    new CustomEvent("shiny:client-message", {
      detail: { headline, message, status }
    })
  );
}
function hasDefinedProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop) && obj[prop] !== void 0;
}

// srcts/src/components/codeEditor.ts
var DEFAULT_LANGUAGE = "sql";
var DEFAULT_TAB_SIZE = 2;
var DEFAULT_THEME_LIGHT = "github-light";
var DEFAULT_THEME_DARK = "github-dark";
var SUBMIT_FLASH_DURATION_MS = 400;
var loadedLanguages = /* @__PURE__ */ new Set();
var initializedEditors = /* @__PURE__ */ new WeakSet();
var prismCodeEditorBasePath = null;
function getPrismCodeEditorBasePath() {
  if (prismCodeEditorBasePath !== null) {
    return prismCodeEditorBasePath;
  }
  const scriptElement = document.querySelector(
    'script[src*="prism-code-editor"][src$="index.js"]'
  );
  if (!scriptElement) {
    throw new Error(
      "Could not find prism-code-editor script element. Ensure the prism-code-editor dependency is properly loaded."
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
function loadLanguage(language, basePath) {
  return __async(this, null, function* () {
    if (loadedLanguages.has(language)) {
      return;
    }
    if (["plain", "plaintext", "text", "txt"].includes(language)) {
      return;
    }
    let languageToLoad = language;
    if (language === "html") {
      languageToLoad = "markup";
    }
    yield import(`${basePath}/prism/languages/${languageToLoad}.js`);
    loadedLanguages.add(language);
  });
}
var loadedThemes = /* @__PURE__ */ new Set();
function loadTheme(themeName, basePath) {
  if (loadedThemes.has(themeName)) {
    return;
  }
  const linkId = `code-editor-theme-${themeName}`;
  if (document.getElementById(linkId)) {
    loadedThemes.add(themeName);
    return;
  }
  const newLink = document.createElement("link");
  newLink.id = linkId;
  newLink.rel = "stylesheet";
  newLink.href = `${basePath}/themes/${themeName}.css`;
  newLink.addEventListener("load", () => {
    loadedThemes.add(themeName);
  });
  newLink.addEventListener("error", () => {
    console.error(`Failed to load code editor theme: ${themeName}`);
  });
  document.head.appendChild(newLink);
}
function setupThemeWatcher(el, themeLight, themeDark, basePath) {
  const updateTheme = () => {
    const htmlEl = document.documentElement;
    const theme = htmlEl.getAttribute("data-bs-theme");
    const themeName = theme === "dark" ? el.dataset.themeDark || themeDark : el.dataset.themeLight || themeLight;
    loadTheme(themeName, basePath);
  };
  updateTheme();
  const observer = new MutationObserver(() => updateTheme());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-bs-theme"]
  });
  el.darkLightObserver = observer;
}
function initializeEditor(el) {
  return __async(this, null, function* () {
    if (initializedEditors.has(el)) {
      return el.prismEditor;
    }
    const editorContainer = el.querySelector(".code-editor");
    if (!editorContainer) {
      showShinyClientMessage({
        headline: "Code Editor Initialization Error",
        message: "Expected to find `.code-editor` inside `.shiny-input-code-editor` container element.",
        status: "error"
      });
      return;
    }
    const language = el.dataset.language || DEFAULT_LANGUAGE;
    const initialCode = el.dataset.initialCode || "";
    const themeLight = el.dataset.themeLight || DEFAULT_THEME_LIGHT;
    const themeDark = el.dataset.themeDark || DEFAULT_THEME_DARK;
    const readOnly = el.dataset.readOnly === "true";
    const lineNumbers = el.dataset.lineNumbers !== "false";
    const wordWrap = el.dataset.wordWrap === "true";
    const tabSize = parseInt(el.dataset.tabSize || String(DEFAULT_TAB_SIZE)) || DEFAULT_TAB_SIZE;
    const insertSpaces = el.dataset.insertSpaces !== "false";
    const basePath = getPrismCodeEditorBasePath();
    yield loadLanguage(language, basePath);
    const [{ createEditor }, { copyButton }, { defaultCommands }] = yield Promise.all([
      import(`${basePath}/index.js`),
      import(`${basePath}/extensions/copyButton/index.js`),
      import(`${basePath}/extensions/commands.js`)
    ]);
    const editor = createEditor(
      editorContainer,
      {
        language,
        value: initialCode,
        tabSize,
        insertSpaces,
        lineNumbers,
        wordWrap,
        readOnly
      },
      copyButton(),
      defaultCommands()
    );
    const oldEnterCallback = editor.keyCommandMap.Enter;
    editor.keyCommandMap.Enter = (e, selection, value) => {
      if (e.metaKey || e.ctrlKey) {
        el.dispatchEvent(new CustomEvent("codeEditorUpdate"));
        editorContainer.classList.add("code-editor-submit-flash");
        setTimeout(() => {
          editorContainer.classList.remove("code-editor-submit-flash");
        }, SUBMIT_FLASH_DURATION_MS);
        return true;
      }
      return oldEnterCallback == null ? void 0 : oldEnterCallback(e, selection, value);
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
  });
}
var CodeEditorInputBinding = class extends InputBinding {
  find(scope) {
    return $(scope).find(".shiny-input-code-editor");
  }
  getValue(el) {
    const codeEl = el;
    if (codeEl.prismEditor) {
      return codeEl.prismEditor.value;
    }
    return el.dataset.initialCode || "";
  }
  setValue(el, value) {
    const codeEl = el;
    if (codeEl.prismEditor) {
      codeEl.prismEditor.setOptions({ value });
    } else {
      el.dataset.initialCode = value;
    }
  }
  subscribe(el, callback) {
    const codeEl = el;
    codeEl.isInitialized = initializeEditor(codeEl);
    codeEl.isInitialized.then(() => {
      callback(false);
    }).catch((error) => {
      showShinyClientMessage({
        headline: "Code Editor Initialization Error",
        message: "An error occurred while initializing the code editor. See console for details.",
        status: "error"
      });
      console.error("Failed to initialize code editor:", error);
    });
    const updateCallback = () => callback(true);
    el.addEventListener("codeEditorUpdate", updateCallback);
    codeEl.codeEditorUpdateCallback = updateCallback;
  }
  unsubscribe(el) {
    const codeEl = el;
    const updateCallback = codeEl.codeEditorUpdateCallback;
    if (updateCallback) {
      el.removeEventListener("codeEditorUpdate", updateCallback);
      delete codeEl.codeEditorUpdateCallback;
    }
    if (codeEl.darkLightObserver) {
      codeEl.darkLightObserver.disconnect();
      delete codeEl.darkLightObserver;
    }
  }
  receiveMessage(el, data) {
    return __async(this, null, function* () {
      const codeEl = el;
      if (codeEl.isInitialized) {
        yield codeEl.isInitialized;
      }
      const editor = codeEl.prismEditor;
      if (!editor) {
        showShinyClientMessage({
          headline: "Code Editor could not update",
          message: "An update was ignored because the editor is not yet initialized.",
          status: "warning"
        });
        return;
      }
      const options = {};
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
          try {
            yield loadLanguage(newLanguage, basePath);
            el.dataset.language = newLanguage;
            editor.setOptions({ language: newLanguage });
            editor.update();
          } catch (error) {
            showShinyClientMessage({
              headline: "Code Editor Language Load Error",
              message: `Failed to load language '${newLanguage}'. See console for details.`,
              status: "error"
            });
          }
        }
      }
      if (hasDefinedProperty(data, "theme_light") && data.theme_light) {
        this._maybeLoadThemeForMode(el, data.theme_light, "themeLight", false);
      }
      if (hasDefinedProperty(data, "theme_dark") && data.theme_dark) {
        this._maybeLoadThemeForMode(el, data.theme_dark, "themeDark", true);
      }
      el.dispatchEvent(new CustomEvent("codeEditorUpdate"));
    });
  }
  /**
   * Update theme dataset and load the theme if it matches the current mode.
   * @param el - The code editor element
   * @param themeValue - The theme name to set
   * @param datasetKey - The dataset key to update ("themeLight" or "themeDark")
   * @param loadForDarkMode - Whether this theme should load when in dark mode
   */
  _maybeLoadThemeForMode(el, themeValue, datasetKey, loadForDarkMode) {
    el.dataset[datasetKey] = themeValue;
    const currentTheme = document.documentElement.getAttribute("data-bs-theme");
    const isDark = currentTheme === "dark";
    if (isDark === loadForDarkMode) {
      const basePath = getPrismCodeEditorBasePath();
      loadTheme(themeValue, basePath);
    }
  }
  getRatePolicy() {
    return {
      policy: "throttle",
      delay: 300
    };
  }
};
registerBinding(CodeEditorInputBinding, "code-editor");
//# sourceMappingURL=code-editor.js.map
