import { l as languageMap } from "../index-MBlAXvVu.js";
import { r as re } from "../shared-Sq5P6lf6.js";
import { s as space, b as braces, c as spread } from "../jsx-shared-C8dTPQ4U.js";
import { getLineBefore, getClosestToken } from "../utils/index.js";
import { a as clikeIndent, t as testBracketPair, c as clikeComment, e as autoCloseTags } from "../index-Fp08-m-Z.js";
const openingTag = re(
  `(?:^|[^$\\w])<(?:(?!\\d)([^\\s/=><%]+)(?:<0>(?:<0>*(?:[^\\s"'{=<>/*]+(?:<0>*=<0>*(?!\\s)(?:"[^"]*"|'[^']*'|<1>)?|(?=[\\s/>]))|<2>))+)?<0>*)?>[ 	]*$`,
  [space, braces, spread]
);
const closingTag = /^<\/(?!\d)[^\s/=><%]*\s*>/;
const inJsxContext = ({ tags, pairs }, { brackets, pairs: bracketPairs }, position) => {
  for (let i = tags.length, tag, min = 0; tag = tags[--i]; ) {
    if (tag[2] > position && tag[1] < position) min = tag[1];
    else if (!tag[4] && tag[5] && tag[1] >= min && tag[2] <= position && !(tags[pairs[i]]?.[1] < position)) {
      for (let i2 = brackets.length, bracket; bracket = brackets[--i2]; ) {
        if (bracket[1] >= tag[2] && bracket[1] < position && bracket[3] == "{" && !(brackets[bracketPairs[i2]]?.[1] < position)) {
          return;
        }
      }
      return true;
    }
  }
};
const jsxComment = {
  block: ["{/*", "*/}"]
};
languageMap.jsx = languageMap.tsx = {
  comments: clikeComment,
  getComments(editor, position) {
    const { matchBrackets, matchTags } = editor.extensions;
    const inJsx = matchBrackets && matchTags ? inJsxContext(matchTags, matchBrackets, position) : getClosestToken(editor, ".plain-text", 0, 0, position);
    return inJsx ? jsxComment : clikeComment;
  },
  autoIndent: [
    ([start], value) => openingTag.test(value.slice(0, start)) || clikeIndent.test(getLineBefore(value, start)),
    (selection, value) => testBracketPair(selection, value) || openingTag.test(value.slice(0, selection[0])) && closingTag.test(value.slice(selection[1]))
  ],
  autoCloseTags: ([start, end], value, editor) => {
    return autoCloseTags(editor, start, end, value, openingTag);
  }
};
//# sourceMappingURL=jsx.js.map
