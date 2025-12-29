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
function hasDefinedProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop) && obj[prop] !== void 0;
}

// srcts/src/components/codeEditor.ts
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
    try {
      yield import(`${basePath}/prism/languages/${languageToLoad}.js`);
      loadedLanguages.add(language);
    } catch (error) {
      console.error(`Failed to load language '${language}':`, error);
      throw error;
    }
  });
}
function loadTheme(inputId, themeName, basePath) {
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
function setupThemeWatcher(el, themeLight, themeDark, basePath) {
  const inputId = el.id;
  const updateTheme = () => {
    const htmlEl = document.documentElement;
    const theme = htmlEl.getAttribute("data-bs-theme");
    const themeName = theme === "dark" ? el.dataset.themeDark || themeDark : el.dataset.themeLight || themeLight;
    loadTheme(inputId, themeName, basePath);
  };
  updateTheme();
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "data-bs-theme") {
        updateTheme();
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-bs-theme"]
  });
  el._themeObserver = observer;
}
function initializeEditor(el) {
  return __async(this, null, function* () {
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
    yield loadLanguage(language, basePath);
    const { createEditor } = yield import(`${basePath}/index.js`);
    const { copyButton } = yield import(`${basePath}/extensions/copyButton/index.js`);
    const { defaultCommands } = yield import(`${basePath}/extensions/commands.js`);
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
        }, 400);
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
    initializeEditor(codeEl).catch((error) => {
      console.error("Failed to initialize code editor:", error);
    });
    const updateCallback = () => callback(true);
    el.addEventListener("codeEditorUpdate", updateCallback);
    el._codeEditorUpdateCallback = updateCallback;
  }
  unsubscribe(el) {
    const codeEl = el;
    const updateCallback = el._codeEditorUpdateCallback;
    if (updateCallback) {
      el.removeEventListener("codeEditorUpdate", updateCallback);
      delete el._codeEditorUpdateCallback;
    }
    if (codeEl._themeObserver) {
      codeEl._themeObserver.disconnect();
      delete codeEl._themeObserver;
    }
  }
  receiveMessage(el, data) {
    const codeEl = el;
    const editor = codeEl.prismEditor;
    if (!editor) {
      console.warn("Cannot update code editor: editor not initialized");
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
        loadLanguage(newLanguage, basePath).then(() => {
          el.dataset.language = newLanguage;
          editor.setOptions({ language: newLanguage });
          editor.update();
        }).catch((error) => {
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
  getRatePolicy() {
    return {
      policy: "throttle",
      delay: 300
    };
  }
};
registerBinding(CodeEditorInputBinding, "code-editor");
//# sourceMappingURL=code-editor.js.map
