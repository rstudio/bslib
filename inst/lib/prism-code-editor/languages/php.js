import { l as languageMap } from "../index-MBlAXvVu.js";
import { getClosestToken } from "../utils/index.js";
import { h as htmlAutoIndent, c as clikeComment, e as autoCloseTags, v as voidTags, x as xmlOpeningTag, d as markupComment } from "../index-Fp08-m-Z.js";
languageMap.php = {
  comments: clikeComment,
  getComments: (editor, position) => {
    if (getClosestToken(editor, ".php", 0, 0, position)) return clikeComment;
    return markupComment;
  },
  autoIndent: htmlAutoIndent(xmlOpeningTag, voidTags),
  autoCloseTags: ([start, end], value, editor) => {
    return !value.includes("<?") || getClosestToken(editor, ".php", 0, 0, start) ? "" : autoCloseTags(editor, start, end, value, xmlOpeningTag, voidTags);
  }
};
//# sourceMappingURL=php.js.map
