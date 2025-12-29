import { a as createTemplate, b as addTextareaListener } from "../index-MBlAXvVu.js";
import { getLineBefore } from "../utils/index.js";
import { s as scrollToEl, b as getLineEnd } from "../local-BXkeW3T1.js";
const cursorTemplate = createTemplate(
  "<div style=position:absolute;top:0;opacity:0;padding:inherit> <span><span></span> "
);
const cursorPosition = () => {
  let cEditor;
  let prevBefore = " ";
  let prevAfter = " ";
  const cursorContainer = cursorTemplate();
  const [before, span] = cursorContainer.childNodes;
  const [cursor, after] = span.childNodes;
  const selectionChange = (selection) => {
    let { value, activeLine } = cEditor;
    let position = selection[selection[2] < "f" ? 0 : 1];
    let newBefore = getLineBefore(value, position);
    let newAfter = value.slice(position, getLineEnd(value, position));
    if (!newBefore && !newAfter) newAfter = " ";
    if (prevBefore != newBefore) before.data = prevBefore = newBefore;
    if (prevAfter != newAfter) after.data = prevAfter = newAfter;
    if (cursorContainer.parentNode != activeLine) activeLine.prepend(cursorContainer);
  };
  const scrollIntoView = () => scrollToEl(cEditor, cursor);
  const self = (editor) => {
    editor.addListener("selectionChange", selectionChange);
    cEditor = editor;
    editor.extensions.cursor = self;
    addTextareaListener(editor, "input", (e) => {
      if (/history/.test(e.inputType)) scrollIntoView();
    });
    if (editor.activeLine) selectionChange(editor.getSelection());
  };
  self.getPosition = () => {
    const rect1 = cursor.getBoundingClientRect();
    const rect2 = cEditor.overlays.getBoundingClientRect();
    return {
      top: rect1.y - rect2.y,
      bottom: rect2.bottom - rect1.bottom,
      left: rect1.x - rect2.x,
      right: rect2.right - rect1.x,
      height: rect1.height
    };
  };
  self.scrollIntoView = scrollIntoView;
  self.element = cursor;
  return self;
};
export {
  cursorPosition
};
//# sourceMappingURL=cursor.js.map
