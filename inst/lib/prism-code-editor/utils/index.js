import { n as numLines, d as isChrome, e as isWebKit } from "../index-MBlAXvVu.js";
import { b as getLineEnd, a as getLineStart, c as addListener } from "../local-BXkeW3T1.js";
let prevSelection;
const regexEscape = (str) => str.replace(/[$+?|.^*()[\]{}\\]/g, "\\$&");
const getLineBefore = (text, position) => text.slice(getLineStart(text, position), position);
const getLines = (text, start, end = start) => [
  text.slice(start = getLineStart(text, start), end = getLineEnd(text, end)).split("\n"),
  start,
  end
];
const getClosestToken = (editor, selector, marginLeft = 0, marginRight = marginLeft, position = editor.getSelection()[0]) => {
  const value = editor.value;
  const line = editor.wrapper.children[numLines(value, 0, position)];
  const walker = document.createTreeWalker(line, 5);
  let node = walker.lastChild();
  let offset = getLineEnd(value, position) + 1 - position - node.length;
  while (-offset <= marginRight && (node = walker.previousNode())) {
    if (node.lastChild) continue;
    offset -= node.length || 0;
    if (offset <= marginLeft) {
      for (; node != line; node = node.parentNode) {
        if (node.matches?.(selector)) return node;
      }
    }
  }
};
const getLanguage = (editor, position) => getClosestToken(editor, '[class*="language-"]', 0, 0, position)?.className.match(
  /language-(\S*)/
)[1] || editor.options.language;
const insertText = (editor, text, start, end, newCursorStart, newCursorEnd) => {
  if (editor.options.readOnly) return;
  prevSelection = editor.getSelection();
  end ?? (end = start);
  let textarea = editor.textarea;
  let value = editor.value;
  let avoidBug = isChrome && !value[end ?? prevSelection[1]] && /\n$/.test(text) && /^$|\n$/.test(value);
  let removeListener;
  editor.focused || textarea.focus();
  if (start != null) textarea.setSelectionRange(start, end);
  if (newCursorStart != null) {
    removeListener = addListener(editor, "update", () => {
      textarea.setSelectionRange(
        newCursorStart,
        newCursorEnd ?? newCursorStart,
        prevSelection[2]
      );
      removeListener();
    });
  }
  isWebKit || textarea.dispatchEvent(new InputEvent("beforeinput", { data: text }));
  if (isChrome || isWebKit) {
    if (avoidBug) {
      textarea.selectionEnd--;
      text = text.slice(0, -1);
    }
    if (isWebKit) text += "\n";
    document.execCommand(
      text ? "insertHTML" : "delete",
      false,
      text.replace(/&/g, "&amp;").replace(/</g, "&lt;")
    );
    if (avoidBug) textarea.selectionStart++;
  } else document.execCommand(text ? "insertText" : "delete", false, text);
  prevSelection = 0;
};
const getModifierCode = (e) => e.altKey + e.ctrlKey * 2 + e.metaKey * 4 + e.shiftKey * 8;
export {
  getClosestToken,
  getLanguage,
  getLineBefore,
  getLines,
  getModifierCode,
  insertText,
  prevSelection,
  regexEscape
};
//# sourceMappingURL=index.js.map
