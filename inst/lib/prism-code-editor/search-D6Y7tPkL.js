import { regexEscape } from "./utils/index.js";
import { a as createTemplate } from "./index-MBlAXvVu.js";
const searchTemplate = createTemplate(
  '<div style="color:#0000;contain:strict;padding:0 var(--_pse) 0 var(--padding-left)" aria-hidden=true> '
);
const matchTemplate = createTemplate("<span> ");
const testBoundary = (str, position, pattern = /[_\p{N}\p{L}]{2}/u) => {
  if (!position) return false;
  return pattern.test(
    str.slice(
      position - (str.codePointAt(position - 2) > 65535 ? 2 : 1),
      position + (str.codePointAt(position) > 65535 ? 2 : 1)
    )
  );
};
const createSearchAPI = (editor) => {
  const container = searchTemplate();
  const nodes = [container.firstChild];
  const nodeValues = [" "];
  const matchPositions = [];
  const stopSearch = () => {
    if (matchPositions[0]) {
      matchPositions.length = 0;
      container.remove();
    }
  };
  let regex;
  let nodeCount = 1;
  return {
    search(str, caseSensitive, wholeWord, useRegExp, selection, filter, pattern) {
      if (!str) return stopSearch();
      if (!useRegExp) str = regexEscape(str);
      const value = editor.value;
      const searchStr = selection ? value.slice(...selection) : value;
      const offset = selection ? selection[0] : 0;
      let match;
      let l;
      let index;
      let i = 0;
      try {
        regex = RegExp(str, `gum${caseSensitive ? "" : "i"}`);
        while (match = regex.exec(searchStr)) {
          l = match[0].length;
          index = match.index + offset;
          if (!l) regex.lastIndex += value.codePointAt(index) > 65535 ? 2 : 1;
          if (wholeWord && (testBoundary(value, index, pattern) || testBoundary(value, index + l, pattern)))
            continue;
          if (!filter || filter(index, index + l)) matchPositions[i++] = [index, index + l];
        }
      } catch (e) {
        stopSearch();
        return e.message;
      }
      if (i) {
        matchPositions.length = i;
        l = Math.min(i * 2, 2e4);
        for (i = nodes.length; i <= l; ) {
          nodes[i++] = matchTemplate();
          nodes[i++] = new Text();
        }
        for (i = nodeCount - 1; i > l; ) nodes[i--].remove();
        if (nodeCount <= l) container.append(...nodes.slice(nodeCount, l + 1));
        let prevEnd = 0;
        for (i = 0; i < l; ++i) {
          const [start, end] = matchPositions[i / 2];
          const before = value.slice(prevEnd, start);
          const match2 = value.slice(start, prevEnd = end);
          if (before != nodeValues[i]) nodes[i].data = nodeValues[i] = before;
          if (match2 != nodeValues[++i]) nodes[i].firstChild.data = nodeValues[i] = match2;
        }
        nodes[l].data = nodeValues[l] = value.slice(prevEnd);
        if (!container.parentNode) editor.overlays.append(container);
        nodeCount = l + 1;
      } else stopSearch();
    },
    container,
    get regex() {
      return regex;
    },
    matches: matchPositions,
    stopSearch
  };
};
export {
  createSearchAPI as c,
  matchTemplate as m,
  searchTemplate as s
};
//# sourceMappingURL=search-D6Y7tPkL.js.map
