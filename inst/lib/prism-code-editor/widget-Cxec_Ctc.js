import { a as createTemplate, i as isMac, b as addTextareaListener, d as isChrome, p as preventDefault, n as numLines, e as isWebKit } from "./index-MBlAXvVu.js";
import { getModifierCode, regexEscape } from "./utils/index.js";
import { createReplaceAPI } from "./extensions/search/api.js";
import { c as addListener, a as getLineStart, b as getLineEnd, g as getStyleValue } from "./local-BXkeW3T1.js";
const shortcut = ` (Alt+${isMac ? "Cmd+" : ""}`;
const template = createTemplate(
  `<div class=prism-search-container style=display:flex;align-items:flex-start;justify-content:flex-end><div dir=ltr class=prism-search><button type=button aria-expanded=false title="Toggle Replace" class=pce-expand></button><div spellcheck=false><div><div class="pce-input pce-find"><input autocorrect=off autocapitalize=off placeholder=Find aria-label=Find><button type=button class=prev-match title="Previous Match (Shift+Enter)"></button><button type=button class=next-match title="Next Match (Enter)"></button><div class=search-error></div></div><button type=button class=pce-close title="Close (Esc)"></button></div><div class="pce-input pce-replace"><input autocorrect=off autocapitalize=off placeholder=Replace aria-label=Replace><button type=button title=(Enter)>Replace</button><button type=button title=(${isMac ? "Cmd" : "Ctrl+Alt"}+Enter)>All</button></div><div class=pce-options><div class=pce-match-count>0<span> of </span>0</div><button type=button aria-pressed=false class=pce-regex title="RegExp Search${shortcut}R)"><span aria-hidden=true></span></button><button type=button aria-pressed=false title="Preserve Case${shortcut}P)"><span aria-hidden=true>Aa</span></button><button type=button aria-pressed=false class=pce-whole title="Match Whole Word${shortcut}W)"><span aria-hidden=true>ab</span></button><button type=button aria-pressed=false class=pce-in-selection title="Find in Selection${shortcut}L)">`
);
const toggleAttr = (el, name) => el.setAttribute(name, el.getAttribute(name) == "false");
const searchWidget = () => {
  let prevLength;
  let useRegExp;
  let matchCase;
  let wholeWord;
  let searchSelection;
  let isOpen;
  let currentSelection;
  let prevUserSelection;
  let prevMargin;
  let selectNext = false;
  let marginTop;
  const self = (editor) => {
    editor.extensions.searchWidget = self;
    const { textarea, wrapper, overlays, scrollContainer, getSelection } = editor;
    const replaceAPI = createReplaceAPI(editor);
    const startSearch = (selectMatch) => {
      if (selectMatch && !isWebKit) textarea.setSelectionRange(...prevUserSelection);
      const error = replaceAPI.search(
        findInput.value,
        matchCase,
        wholeWord,
        useRegExp,
        searchSelection
      );
      const index = error ? -1 : selectNext ? replaceAPI.next() : replaceAPI.closest();
      current.data = index + 1;
      total.data = replaceAPI.matches.length;
      findContainer.classList.toggle("pce-error", !!error);
      if (error) errorEl.textContent = error;
      else if (selectMatch || selectNext) replaceAPI.selectMatch(index, prevMargin);
    };
    const keydown = (e) => {
      if (e.keyCode >> 1 == 35 && getModifierCode(e) == (isMac ? 4 : 2)) {
        preventDefault(e);
        open();
        let [start, end] = getSelection(), value = editor.value, word = value.slice(start, end) || value.slice(0, start).match(/[_\p{N}\p{L}]*$/u)[0] + value.slice(start).match(/^[_\p{N}\p{L}]*/u)[0];
        if (/^$|\n/.test(word)) startSearch();
        else {
          if (useRegExp) word = regexEscape(word);
          document.execCommand("insertText", false, word);
          findInput.select();
        }
      }
    };
    const open = (focusInput = true) => {
      if (!isOpen) {
        isOpen = true;
        if (marginTop == null) prevMargin = marginTop = getStyleValue(wrapper, "marginTop");
        prevUserSelection = getSelection();
        overlays.append(container);
        updateMargin();
        resize();
        observer?.observe(scrollContainer);
      }
      if (focusInput) findInput.select();
    };
    const close = self.close = (focusTextarea = true) => {
      if (isOpen) {
        isOpen = false;
        replaceAPI.stopSearch();
        container.remove();
        updateMargin();
        observer?.disconnect();
        focusTextarea && textarea.focus();
      }
    };
    const move = (next) => {
      if (replaceAPI.matches[0]) {
        const index = replaceAPI[next ? "next" : "prev"]();
        replaceAPI.selectMatch(index, prevMargin);
        current.data = index + 1;
      }
    };
    const updateMargin = () => {
      const newMargin = isOpen ? getStyleValue(search, "top") + getStyleValue(search, "height") : marginTop;
      const newScroll = scrollContainer.scrollTop + newMargin - prevMargin;
      wrapper.style.marginTop = isOpen ? newMargin + "px" : "";
      scrollContainer.scrollTop = newScroll;
      prevMargin = newMargin;
    };
    const resize = () => div.style.setProperty(
      "--search-width",
      `min(${scrollContainer.clientWidth - 2}px - 2.4em - var(--padding-left),20em)`
    );
    const observer = window.ResizeObserver && new ResizeObserver(resize);
    const replace = () => {
      selectNext = true;
      const index = replaceAPI.replace(replaceInput.value);
      if (index != null) {
        current.data = index + 1;
        replaceAPI.selectMatch(index, prevMargin);
      }
      selectNext = false;
    };
    const replaceAll = () => {
      replaceAPI.replaceAll(replaceInput.value);
    };
    const keyCodeButtonMap = {
      80: matchCaseEl,
      87: wholeWordEl,
      82: useRegExpEl,
      76: inSelectionEl
    };
    const elementHandlerMap = /* @__PURE__ */ new Map([
      [nextEl, () => move(true)],
      [prevEl, move],
      [closeEl, close],
      [replaceEl, replace],
      [replaceAllEl, replaceAll],
      [
        toggle,
        () => {
          toggleAttr(toggle, "aria-expanded");
          updateMargin();
        }
      ],
      [matchCaseEl, () => matchCase = !matchCase],
      [useRegExpEl, () => useRegExp = !useRegExp],
      [wholeWordEl, () => wholeWord = !wholeWord],
      [
        inSelectionEl,
        () => {
          const value = editor.value;
          if (searchSelection) searchSelection = void 0;
          else {
            searchSelection = getSelection().slice(0, 2);
            if (numLines(value, ...searchSelection) > 1) {
              searchSelection = [
                getLineStart(value, searchSelection[0]),
                getLineEnd(value, searchSelection[1])
              ];
            }
          }
          prevLength = value.length;
        }
      ]
    ]);
    addTextareaListener(editor, "keydown", keydown);
    addTextareaListener(editor, "beforeinput", () => {
      if (isOpen && searchSelection) currentSelection = getSelection();
    });
    addListener(editor, "update", () => {
      if (!isOpen) return;
      if (searchSelection && currentSelection) {
        const diff = prevLength - (prevLength = editor.value.length);
        const end = currentSelection[1];
        if (end <= searchSelection[1]) {
          searchSelection[1] -= diff;
          if (end <= searchSelection[0] - +(diff < 0)) searchSelection[0] -= diff;
        }
      }
      startSearch();
    });
    addListener(editor, "selectionChange", (selection) => {
      if (isOpen && editor.focused) prevUserSelection = selection;
    });
    if (isChrome) {
      container.addEventListener("focusin", (e) => {
        if (!container.contains(e.relatedTarget)) {
          findInput.focus();
          e.target.focus();
        }
      });
    }
    container.addEventListener("click", (e) => {
      const target = e.target;
      const remove = addListener(editor, "update", () => target.focus());
      elementHandlerMap.get(target)?.();
      if (target.matches(".pce-options>button")) {
        toggleAttr(target, "aria-pressed");
        startSearch(true);
      }
      remove();
    });
    findInput.oninput = () => isOpen && startSearch(true);
    container.addEventListener("keydown", (e) => {
      const shortcut2 = getModifierCode(e);
      const target = e.target;
      const keyCode = e.keyCode;
      const isFind = target == findInput;
      if (shortcut2 == (isMac ? 5 : 1)) {
        if (keyCodeButtonMap[keyCode]) {
          preventDefault(e);
          keyCodeButtonMap[keyCode].click();
        }
      } else if (keyCode == 13 && target.tagName == "INPUT") {
        preventDefault(e);
        if (!shortcut2) isFind ? move(true) : replaceEl.click();
        else if (shortcut2 == 8 && isFind) move();
        else if (shortcut2 == (isMac ? 4 : 3) && !isFind) replaceAllEl.click();
        target.focus();
      } else if (!shortcut2 && keyCode == 27) close();
      else keydown(e);
    });
    self.open = (focusInput) => {
      open(focusInput);
      startSearch();
    };
    replaceAPI.container.className = "pce-matches";
  };
  const container = template();
  const search = self.element = container.firstChild;
  const [toggle, div] = search.children;
  const rows = div.children;
  const [findContainer, closeEl] = rows[0].children;
  const [findInput, prevEl, nextEl, errorEl] = findContainer.children;
  const [replaceInput, replaceEl, replaceAllEl] = rows[1].children;
  const [matchCount, useRegExpEl, matchCaseEl, wholeWordEl, inSelectionEl] = rows[2].children;
  const [current, , total] = matchCount.childNodes;
  self.open = self.close = () => {
  };
  return self;
};
export {
  searchWidget as s
};
//# sourceMappingURL=widget-Cxec_Ctc.js.map
