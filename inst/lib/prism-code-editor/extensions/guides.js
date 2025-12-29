import { a as createTemplate } from "../index-MBlAXvVu.js";
const template = createTemplate(
  "<div class=guide-indents style=left:var(--padding-left);bottom:auto;right:auto> "
);
const indentTemplate = createTemplate(
  "<div style=width:1px;position:absolute;background:var(--bg-guide-indent)>"
);
const indentGuides = () => {
  let tabSize;
  let prevLength = 0;
  let lineIndentMap;
  let active = -1;
  let currentEditor;
  const lines = [];
  const indents = [];
  const container = template();
  const indentLevels = [];
  const update = (code) => {
    lineIndentMap = [];
    const newIndents = getIndents(code.split("\n"));
    const l = newIndents.length;
    for (let i = 0, prev = [], next = newIndents[0]; next; i++) {
      const style = (lines[i] || (lines[i] = indentTemplate())).style;
      const [top, height, left] = next;
      const old = indents[i];
      next = newIndents[i + 1];
      if (top != old?.[0]) style.top = top + "00%";
      if (height != old?.[1]) style.height = height + "00%";
      if (left != old?.[2]) style.left = left * 100 + "%";
      const isSingleIndent = prev[0] != top && next?.[0] != top, isSingleOutdent = prev[0] + prev[1] != top + height && next?.[0] + next?.[1] != top + height;
      for (let j = -isSingleIndent, l2 = height + isSingleOutdent; j < l2; j++)
        lineIndentMap[j + top] = i;
      prev = indents[i] = newIndents[i];
    }
    for (let i = prevLength; i > l; ) lines[--i].remove();
    container.append(...lines.slice(prevLength, prevLength = l));
  };
  const updateActive = () => {
    const newActive = lineIndentMap[currentEditor.activeLineNumber - 1] ?? -1;
    if (newActive != active) {
      active > -1 && (lines[active].className = "");
      newActive > -1 && (lines[newActive].className = "active");
    }
    active = newActive;
  };
  const getIndents = (lines2) => {
    const l = lines2.length;
    const stack = [];
    const results = [];
    for (let prevIndent = 0, emptyPos = -1, i = 0, p = 0; ; i++) {
      const last = i == l;
      const indent = last ? 0 : indentLevels[i] = getIndentCount(lines2[i]);
      if (indent < 0) {
        if (emptyPos < 0) emptyPos = i;
      } else {
        for (let j = indent; j < prevIndent; j++) {
          stack[j][1] = (emptyPos < 0 || j == indent && !last ? i : emptyPos) - stack[j][0];
        }
        for (let j = prevIndent; j < indent; ) {
          results[p++] = stack[j] = [
            emptyPos < 0 || j > prevIndent ? i : emptyPos,
            0,
            j++ * tabSize
          ];
        }
        emptyPos = -1;
        prevIndent = indent;
      }
      if (last) break;
    }
    indentLevels.length = l;
    return results;
  };
  const getIndentCount = (text) => {
    let l = text.search(/\S/);
    let result = 0;
    if (l < 0) return l;
    for (let i = 0; i < l; ) {
      result += text[i++] == "	" ? tabSize - result % tabSize : 1;
    }
    return Math.ceil(result / tabSize);
  };
  return {
    lines: container.children,
    indentLevels,
    update(editor, options) {
      if (!currentEditor) {
        currentEditor = editor;
        editor.extensions.indentGuides = this;
        editor.overlays.append(container);
        editor.addListener("update", update);
        editor.addListener("selectionChange", updateActive);
      }
      container.style.display = options.wordWrap ? "none" : "";
      if (tabSize != (tabSize = options.tabSize || 2)) update(editor.value), updateActive();
    }
  };
};
export {
  indentGuides
};
//# sourceMappingURL=guides.js.map
