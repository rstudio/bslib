import { m as matchTemplate } from "./search-D6Y7tPkL.js";
const optionsFromKeys = (obj, icon) => Object.keys(obj).map((tag) => ({ label: tag, icon }));
const updateNode = (node, text) => {
  if (node.data != text) node.data = text;
};
const updateMatched = (container, matched, text) => {
  let nodes = container.childNodes;
  let nodeCount = nodes.length - 1;
  let pos = 0;
  let i = 0;
  let l = matched.length;
  for (; i < l; ) {
    if (i >= nodeCount) {
      nodes[i].before("", matchTemplate());
    }
    updateNode(nodes[i], text.slice(pos, pos = matched[i++]));
    updateNode(nodes[i].firstChild, text.slice(pos, pos = matched[i++]));
  }
  for (; nodeCount > i; ) {
    nodes[--nodeCount].remove();
  }
  updateNode(nodes[l], text.slice(pos));
};
const completeSnippets = (snippets) => {
  return ({ path, explicit, pos }) => {
    if (path?.length == 1 && (path[0] || explicit)) {
      return {
        from: pos - path[0].length,
        options: snippets
      };
    }
  };
};
const findWords = (context, editor, filter, pattern, init, tokensOnly) => {
  const cursorPos = context.pos;
  const language = context.language;
  const result = new Set(init);
  const search = (tokens, pos, isCorrectLang) => {
    let i = 0;
    let token;
    if (isCorrectLang) {
      for (; token = tokens[i++]; ) {
        if (typeof token == "string") {
          if (!tokensOnly) match(token, pos);
        } else {
          const type = token.type;
          const content = token.content;
          if ((token.alias || type).slice(0, 9) != "language-" && filter(type, pos)) {
            if (Array.isArray(content)) {
              search(content, pos, true);
            } else match(content, pos);
          }
        }
        pos += token.length;
      }
    } else {
      for (; token = tokens[i++]; ) {
        if (typeof token != "string") {
          const type = token.type;
          const content = token.content;
          if (Array.isArray(content)) {
            const aliasType = token.alias || type;
            search(
              content,
              pos,
              aliasType.slice(0, 9) == "language-" ? aliasType.slice(9) == language : false
            );
          }
        }
        pos += token.length;
      }
    }
  };
  const match = (token, pos) => {
    let match2;
    while (match2 = pattern.exec(token)) {
      let start = pos + match2.index;
      let str = match2[0];
      if (start > cursorPos || start + str.length < cursorPos) result.add(str);
    }
  };
  search(editor.tokens, 0, language == editor.options.language);
  return [...result];
};
export {
  updateNode as a,
  completeSnippets as c,
  findWords as f,
  optionsFromKeys as o,
  updateMatched as u
};
//# sourceMappingURL=utils-BaUO7djC.js.map
