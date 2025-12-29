import { d as isChrome } from "./index-MBlAXvVu.js";
const scrollToEl = (editor, el, paddingTop = 0) => {
  const style1 = editor.scrollContainer.style, style2 = document.documentElement.style;
  style1.scrollPaddingBlock = style2.scrollPaddingBlock = `${paddingTop}px ${isChrome && !el.textContent ? el.offsetHeight : 0}px`;
  el.scrollIntoView({ block: "nearest" });
  style1.scrollPaddingBlock = style2.scrollPaddingBlock = "";
};
const getLineStart = (text, position) => position ? text.lastIndexOf("\n", position - 1) + 1 : 0;
const getLineEnd = (text, position) => (position = text.indexOf("\n", position)) + 1 ? position : text.length;
const addListener = (editor, type, listener) => {
  editor.addListener(type, listener);
  return () => editor.removeListener(type, listener);
};
const getStyleValue = (el, prop) => parseFloat(getComputedStyle(el)[prop]);
export {
  getLineStart as a,
  getLineEnd as b,
  addListener as c,
  getStyleValue as g,
  scrollToEl as s
};
//# sourceMappingURL=local-BXkeW3T1.js.map
