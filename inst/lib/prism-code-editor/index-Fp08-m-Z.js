import { l as languageMap } from "./index-MBlAXvVu.js";
import { getClosestToken, getLineBefore } from "./utils/index.js";
const clikeIndent = /[([{][^)\]}]*$|^[^.]*\b(?:case .+?|default):\s*$/, isBracketPair = /\[]|\(\)|{}/, xmlOpeningTag = /<(?![?!\d#@])([^\s/=>$<%]+)(?:\s(?:\s*[^\s/"'=>]+(?:\s*=\s*(?!\s)(?:"[^"]*"|'[^']*'|[^\s"'=>]+(?=[\s>]))?|(?=[\s/>])))+)?\s*>[ 	]*$/, xmlClosingTag = /^<\/(?!\d)[^\s/=>$<%]+\s*>/, openBracket = /[([{][^)\]}]*$/;
const testBracketPair = ([start, end], value) => {
  return isBracketPair.test(value[start - 1] + value[end]);
};
const clikeComment = {
  line: "//",
  block: ["/*", "*/"]
};
const voidTags = /^(?:area|base|w?br|col|embed|hr|img|input|link|meta|source|track)$/i;
const isOpen = (match, voidTags2) => !!match && !voidTags2?.test(match[1]);
const htmlAutoIndent = (tagPattern, voidTags2) => [
  ([start], value) => isOpen(value.slice(0, start).match(tagPattern), voidTags2) || openBracket.test(getLineBefore(value, start)),
  (selection, value) => testBracketPair(selection, value) || isOpen(value.slice(0, selection[0]).match(tagPattern), voidTags2) && xmlClosingTag.test(value.slice(selection[1]))
];
const markupComment = {
  block: ["<!--", "-->"]
};
const markupLanguage = (comment = markupComment, tagPattern = xmlOpeningTag, voidTags2) => ({
  comments: comment,
  autoIndent: htmlAutoIndent(tagPattern, voidTags2),
  autoCloseTags: ([start, end], value, editor) => {
    return autoCloseTags(editor, start, end, value, tagPattern, voidTags2);
  }
});
const autoCloseTags = (editor, start, end, value, tagPattern, voidTags2) => {
  if (start == end) {
    let match = tagPattern.exec(value.slice(0, start) + ">");
    let tagMatcher = editor.extensions.matchTags;
    if (match && (match = match[1] || "", !voidTags2?.test(match))) {
      if (tagMatcher) {
        let { pairs, tags } = tagMatcher;
        for (let i = tags.length; i; ) {
          let tag = tags[--i];
          if (tag[1] >= start && tag[4] && tag[5] && tag[3] == match && pairs[i] == null) {
            return;
          }
        }
      }
      return `</${match}>`;
    }
  }
};
const bracketIndenting = (comments = clikeComment, indentPattern = openBracket) => ({
  comments,
  autoIndent: [
    ([start], value) => indentPattern.test(getLineBefore(value, start)),
    testBracketPair
  ]
});
const markupTemplateLang = (name, comments) => languageMap[name] = {
  comments,
  autoIndent: htmlAutoIndent(xmlClosingTag, voidTags),
  autoCloseTags: ([start, end], value, editor) => {
    return getClosestToken(editor, "." + name, 0, 0, start) ? "" : autoCloseTags(editor, start, end, value, xmlOpeningTag, voidTags);
  }
};
export {
  clikeIndent as a,
  bracketIndenting as b,
  clikeComment as c,
  markupComment as d,
  autoCloseTags as e,
  markupTemplateLang as f,
  htmlAutoIndent as h,
  markupLanguage as m,
  testBracketPair as t,
  voidTags as v,
  xmlOpeningTag as x
};
//# sourceMappingURL=index-Fp08-m-Z.js.map
