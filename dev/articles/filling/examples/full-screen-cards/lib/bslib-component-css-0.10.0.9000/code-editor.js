/*! bslib 0.10.0 | (c) 2012-2026 RStudio, PBC. | License: MIT + file LICENSE */
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
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

// srcts/src/components/webcomponents/_makeInputBinding.ts
function makeInputBinding(tagName, { type = null } = {}) {
  if (!window.Shiny) {
    return;
  }
  class NewCustomBinding extends window.Shiny["InputBinding"] {
    constructor() {
      super();
    }
    find(scope) {
      return $(scope).find(tagName);
    }
    getValue(el) {
      if ("getValue" in el) {
        return el.getValue();
      } else {
        return el.value;
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getType(el) {
      return type;
    }
    subscribe(el, callback) {
      el.onChangeCallback = callback;
    }
    unsubscribe(el) {
      el.onChangeCallback = (x) => {
      };
    }
    receiveMessage(el, data) {
      el.receiveMessage(el, data);
    }
  }
  window.Shiny.inputBindings.register(
    new NewCustomBinding(),
    `${tagName}-Binding`
  );
}

// srcts/src/components/_utils.ts
var Shiny = window.Shiny;
var InputBinding = Shiny ? Shiny.InputBinding : class {
};
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
function shinyRenderContent(...args) {
  return __async(this, null, function* () {
    if (!Shiny) {
      throw new Error("This function must be called in a Shiny app.");
    }
    if (Shiny.renderContentAsync) {
      return yield Shiny.renderContentAsync.apply(null, args);
    } else {
      return yield Shiny.renderContent.apply(null, args);
    }
  });
}
function updateLabel(labelContent, labelNode) {
  return __async(this, null, function* () {
    if (typeof labelContent === "undefined")
      return;
    if (labelNode.length !== 1) {
      throw new Error("labelNode must be of length 1");
    }
    if (typeof labelContent === "string") {
      labelContent = {
        html: labelContent,
        deps: []
      };
    }
    if (labelContent.html === "") {
      labelNode.addClass("shiny-label-null");
    } else {
      yield shinyRenderContent(labelNode, labelContent);
      labelNode.removeClass("shiny-label-null");
    }
  });
}

// srcts/src/components/codeEditor.ts
var DEFAULT_LANGUAGE = "plain";
var DEFAULT_TAB_SIZE = 2;
var DEFAULT_THEME_LIGHT = "github-light";
var DEFAULT_THEME_DARK = "github-dark";
var SUBMIT_FLASH_DURATION_MS = 400;
var _loadedLanguages, _loadedThemes, _basePath, _getBasePath, getBasePath_fn, _loadLanguage, loadLanguage_fn, _loadTheme, loadTheme_fn;
var _BslibCodeEditor = class extends HTMLElement {
  constructor() {
    super(...arguments);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.onChangeCallback = () => {
    };
  }
  // Properties that reflect to/from HTML attributes
  get language() {
    var _a;
    return (_a = this.getAttribute("language")) != null ? _a : DEFAULT_LANGUAGE;
  }
  set language(val) {
    this.setAttribute("language", val);
  }
  get readonly() {
    return this.hasAttribute("readonly") && this.getAttribute("readonly") !== "false";
  }
  set readonly(val) {
    this.setAttribute("readonly", String(val));
  }
  get lineNumbers() {
    return this.getAttribute("line-numbers") !== "false";
  }
  set lineNumbers(val) {
    this.setAttribute("line-numbers", String(val));
  }
  get wordWrap() {
    return this.getAttribute("word-wrap") === "true";
  }
  set wordWrap(val) {
    this.setAttribute("word-wrap", String(val));
  }
  get tabSize() {
    const val = this.getAttribute("tab-size");
    const parsed = val ? parseInt(val) : DEFAULT_TAB_SIZE;
    return isNaN(parsed) ? DEFAULT_TAB_SIZE : parsed;
  }
  set tabSize(val) {
    this.setAttribute("tab-size", String(val));
  }
  get insertSpaces() {
    return this.getAttribute("insert-spaces") !== "false";
  }
  set insertSpaces(val) {
    this.setAttribute("insert-spaces", String(val));
  }
  get themeLight() {
    var _a;
    return (_a = this.getAttribute("theme-light")) != null ? _a : DEFAULT_THEME_LIGHT;
  }
  set themeLight(val) {
    this.setAttribute("theme-light", val);
  }
  get themeDark() {
    var _a;
    return (_a = this.getAttribute("theme-dark")) != null ? _a : DEFAULT_THEME_DARK;
  }
  set themeDark(val) {
    this.setAttribute("theme-dark", val);
  }
  /** The current editor content. */
  get value() {
    var _a, _b;
    return (_b = (_a = this.prismEditor) == null ? void 0 : _a.value) != null ? _b : "";
  }
  set value(val) {
    if (this.prismEditor) {
      this.prismEditor.setOptions({ value: val });
    }
  }
  /** Returns the current editor content for Shiny. */
  getValue() {
    if (!this.prismEditor) {
      return;
    }
    return this.value;
  }
  /** Initializes the editor when the element is added to the DOM. */
  connectedCallback() {
    if (this.prismEditor)
      return;
    this.initPromise = this._initializeEditor();
    this.initPromise.then(() => {
      this.onChangeCallback(false);
    }).catch((error) => {
      showShinyClientMessage({
        headline: "Code Editor Initialization Error",
        message: "An error occurred while initializing the code editor. See console for details.",
        status: "error"
      });
      console.error("Failed to initialize code editor:", error);
    });
    const updateCallback = () => this.onChangeCallback(true);
    this.addEventListener("bslibCodeEditorUpdate", updateCallback);
  }
  /** Cleans up observers when the element is removed from the DOM. */
  disconnectedCallback() {
    var _a, _b;
    (_a = this.darkLightObserver) == null ? void 0 : _a.disconnect();
    this.darkLightObserver = void 0;
    (_b = this.readonlyTooltipCleanup) == null ? void 0 : _b.call(this);
    this.readonlyTooltipCleanup = void 0;
  }
  /** Responds to attribute changes by updating the prism-code-editor instance. */
  attributeChangedCallback(name, oldValue, newValue) {
    var _a, _b;
    if (oldValue === newValue || !this.prismEditor)
      return;
    const editor = this.prismEditor;
    switch (name) {
      case "language":
        if (newValue) {
          this.languageChangePromise = this._handleLanguageChange(newValue);
        }
        break;
      case "readonly": {
        const isReadOnly = newValue === "true";
        editor.setOptions({ readOnly: isReadOnly });
        if (isReadOnly && !this.readonlyTooltipCleanup) {
          void this._setupReadOnlyTooltip(editor);
        } else if (!isReadOnly && this.readonlyTooltipCleanup) {
          this.readonlyTooltipCleanup();
          this.readonlyTooltipCleanup = void 0;
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
        if (newValue)
          __privateMethod(_a = _BslibCodeEditor, _loadTheme, loadTheme_fn).call(_a, newValue);
        break;
      case "theme-dark":
        if (newValue)
          __privateMethod(_b = _BslibCodeEditor, _loadTheme, loadTheme_fn).call(_b, newValue);
        break;
      default:
        break;
    }
  }
  /** Creates the prism-code-editor instance and sets up event handlers. */
  _initializeEditor() {
    return __async(this, null, function* () {
      var _a, _b, _c;
      const editorContainer = this.querySelector(".code-editor");
      if (!editorContainer) {
        showShinyClientMessage({
          headline: "Code Editor Initialization Error",
          message: "Expected to find `.code-editor` inside `<bslib-code-editor>` container element.",
          status: "error"
        });
        return;
      }
      const language = this.language;
      const initialCode = (_a = this.getAttribute("value")) != null ? _a : "";
      this.removeAttribute("value");
      const readOnly = this.readonly;
      const lineNumbers = this.lineNumbers;
      const wordWrap = this.wordWrap;
      const tabSize = this.tabSize;
      const insertSpaces = this.insertSpaces;
      const basePath = __privateMethod(_b = _BslibCodeEditor, _getBasePath, getBasePath_fn).call(_b);
      yield __privateMethod(_c = _BslibCodeEditor, _loadLanguage, loadLanguage_fn).call(_c, language);
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
          this.dispatchEvent(new CustomEvent("bslibCodeEditorUpdate"));
          editorContainer.classList.add("code-editor-submit-flash");
          setTimeout(() => {
            editorContainer.classList.remove("code-editor-submit-flash");
          }, SUBMIT_FLASH_DURATION_MS);
          return true;
        }
        return oldEnterCallback == null ? void 0 : oldEnterCallback(e, selection, value);
      };
      this.prismEditor = editor;
      this.darkLightObserver = this._setupThemeWatcher();
      const textarea = this.querySelector("textarea");
      if (textarea) {
        textarea.addEventListener("blur", () => {
          this.dispatchEvent(new CustomEvent("bslibCodeEditorUpdate"));
        });
      }
      if (readOnly) {
        void this._setupReadOnlyTooltip(editor);
      }
      return editor;
    });
  }
  /** Watches `data-bs-theme` on `<html>` to switch syntax highlighting themes. */
  _setupThemeWatcher() {
    const updateTheme = () => {
      var _a;
      const htmlEl = document.documentElement;
      const theme = htmlEl.getAttribute("data-bs-theme");
      const themeName = theme === "dark" ? this.themeDark : this.themeLight;
      __privateMethod(_a = _BslibCodeEditor, _loadTheme, loadTheme_fn).call(_a, themeName);
    };
    updateTheme();
    const observer = new MutationObserver(() => updateTheme());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-bs-theme"]
    });
    return observer;
  }
  /** Loads a new language grammar and updates the editor. */
  _handleLanguageChange(newLanguage) {
    return __async(this, null, function* () {
      var _a;
      const editor = this.prismEditor;
      if (!editor)
        return;
      try {
        yield __privateMethod(_a = _BslibCodeEditor, _loadLanguage, loadLanguage_fn).call(_a, newLanguage);
        editor.setOptions({ language: newLanguage });
        editor.update();
      } catch (error) {
        showShinyClientMessage({
          headline: "Code Editor Language Load Error",
          message: `Failed to load language '${newLanguage}'. See console for details.`,
          status: "error"
        });
        console.error(`Failed to load language '${newLanguage}':`, error);
      }
    });
  }
  /**
   * Sets up a tooltip that appears when user tries to type in a read-only editor.
   * Stores cleanup function in readonlyTooltipCleanup.
   * @param editor - The PrismEditor instance
   */
  _setupReadOnlyTooltip(editor) {
    return __async(this, null, function* () {
      var _a;
      try {
        const basePath = __privateMethod(_a = _BslibCodeEditor, _getBasePath, getBasePath_fn).call(_a);
        const [{ addTooltip }, { cursorPosition }] = yield Promise.all([
          import(`${basePath}/tooltips.js`),
          import(`${basePath}/extensions/cursor.js`)
        ]);
        cursorPosition()(editor);
        const tooltip = document.createElement("div");
        tooltip.className = "code-editor-readonly-tooltip alert alert-danger";
        tooltip.textContent = "Cannot edit read-only editor.";
        const [show, hide] = addTooltip(editor, tooltip, false);
        const onBeforeInput = () => {
          this.classList.add("is-invalid");
          show();
        };
        const onHide = () => {
          this.classList.remove("is-invalid");
          hide();
        };
        editor.textarea.addEventListener("beforeinput", onBeforeInput, true);
        editor.on("selectionChange", onHide);
        editor.textarea.addEventListener("click", onHide);
        this.readonlyTooltipCleanup = () => {
          editor.textarea.removeEventListener("beforeinput", onBeforeInput, true);
          editor.textarea.removeEventListener("click", onHide);
          hide();
        };
      } catch (error) {
        console.error("Failed to setup read-only tooltip:", error);
      }
    });
  }
  /**
   * Handles messages from Shiny's `update_code_editor()`.
   * @param el - The element (unused, required by interface)
   * @param data - Update data from R
   */
  receiveMessage(el, data) {
    return __async(this, null, function* () {
      var _a;
      if (this.initPromise) {
        yield this.initPromise;
      }
      if (!this.prismEditor) {
        showShinyClientMessage({
          headline: "Code Editor could not update",
          message: "An update was ignored because the editor is not yet initialized.",
          status: "warning"
        });
        return;
      }
      if (hasDefinedProperty(data, "value")) {
        this.value = (_a = data.value) != null ? _a : "";
      }
      if (hasDefinedProperty(data, "label")) {
        const labelEl = $(this).find("label");
        yield updateLabel(data.label, labelEl);
      }
      if (hasDefinedProperty(data, "tab_size") && data.tab_size !== void 0) {
        this.tabSize = data.tab_size;
      }
      if (hasDefinedProperty(data, "indentation")) {
        this.insertSpaces = data.indentation === "space";
      }
      if (hasDefinedProperty(data, "read_only") && data.read_only !== void 0) {
        this.readonly = data.read_only;
      }
      if (hasDefinedProperty(data, "line_numbers") && data.line_numbers !== void 0) {
        this.lineNumbers = data.line_numbers;
      }
      if (hasDefinedProperty(data, "word_wrap") && data.word_wrap !== void 0) {
        this.wordWrap = data.word_wrap;
      }
      if (hasDefinedProperty(data, "language") && data.language) {
        this.language = data.language;
        if (this.languageChangePromise) {
          yield this.languageChangePromise;
          this.languageChangePromise = void 0;
        }
      }
      if (hasDefinedProperty(data, "theme_light") && data.theme_light) {
        this.themeLight = data.theme_light;
      }
      if (hasDefinedProperty(data, "theme_dark") && data.theme_dark) {
        this.themeDark = data.theme_dark;
      }
      this.dispatchEvent(new CustomEvent("bslibCodeEditorUpdate"));
    });
  }
};
var BslibCodeEditor = _BslibCodeEditor;
_loadedLanguages = new WeakMap();
_loadedThemes = new WeakMap();
_basePath = new WeakMap();
_getBasePath = new WeakSet();
getBasePath_fn = function() {
  if (__privateGet(_BslibCodeEditor, _basePath) !== null) {
    return __privateGet(_BslibCodeEditor, _basePath);
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
  __privateSet(_BslibCodeEditor, _basePath, absoluteSrc.replace(/\/index\.js$/, ""));
  return __privateGet(_BslibCodeEditor, _basePath);
};
_loadLanguage = new WeakSet();
loadLanguage_fn = function(language) {
  return __async(this, null, function* () {
    var _a;
    if (__privateGet(_BslibCodeEditor, _loadedLanguages).has(language)) {
      return;
    }
    if (["plain", "plaintext", "text", "txt"].includes(language)) {
      return;
    }
    let languageToLoad = language;
    if (language === "html") {
      languageToLoad = "markup";
    }
    const basePath = __privateMethod(_a = _BslibCodeEditor, _getBasePath, getBasePath_fn).call(_a);
    yield import(`${basePath}/prism/languages/${languageToLoad}.js`);
    __privateGet(_BslibCodeEditor, _loadedLanguages).add(language);
  });
};
_loadTheme = new WeakSet();
loadTheme_fn = function(themeName) {
  var _a;
  if (__privateGet(_BslibCodeEditor, _loadedThemes).has(themeName)) {
    return;
  }
  const linkId = `code-editor-theme-${themeName}`;
  if (document.getElementById(linkId)) {
    __privateGet(_BslibCodeEditor, _loadedThemes).add(themeName);
    return;
  }
  const basePath = __privateMethod(_a = _BslibCodeEditor, _getBasePath, getBasePath_fn).call(_a);
  const newLink = document.createElement("link");
  newLink.id = linkId;
  newLink.rel = "stylesheet";
  newLink.href = `${basePath}/themes/${themeName}.css`;
  newLink.addEventListener("load", () => {
    __privateGet(_BslibCodeEditor, _loadedThemes).add(themeName);
  });
  newLink.addEventListener("error", () => {
    console.error(`Failed to load code editor theme: ${themeName}`);
  });
  document.head.appendChild(newLink);
};
/** Locates and caches the base path for prism-code-editor assets. */
__privateAdd(BslibCodeEditor, _getBasePath);
/** Dynamically imports a language grammar. Cached after first load. */
__privateAdd(BslibCodeEditor, _loadLanguage);
/** Loads a theme stylesheet. Themes are cached and never unloaded. */
__privateAdd(BslibCodeEditor, _loadTheme);
BslibCodeEditor.tagName = "bslib-code-editor";
BslibCodeEditor.isShinyInput = true;
BslibCodeEditor.observedAttributes = [
  "language",
  "readonly",
  "line-numbers",
  "word-wrap",
  "tab-size",
  "insert-spaces",
  "theme-light",
  "theme-dark"
];
// Shared state across all instances
__privateAdd(BslibCodeEditor, _loadedLanguages, /* @__PURE__ */ new Set());
__privateAdd(BslibCodeEditor, _loadedThemes, /* @__PURE__ */ new Set());
__privateAdd(BslibCodeEditor, _basePath, null);
customElements.define(BslibCodeEditor.tagName, BslibCodeEditor);
if (window.Shiny) {
  makeInputBinding(BslibCodeEditor.tagName);
}
export {
  BslibCodeEditor
};
//# sourceMappingURL=code-editor.js.map
