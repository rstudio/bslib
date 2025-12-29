import { l as languageMap } from "../index-MBlAXvVu.js";
import { getClosestToken } from "../utils/index.js";
import { m as markupLanguage } from "../index-Fp08-m-Z.js";
const comment = ["(:", ":)"];
const xquery = languageMap.xquery = markupLanguage(
  { block: comment },
  /<(?!!|\d)([^\s/=>$<%]+)(?:\s+[^\s/=>]+(?:\s*=\s*(["'])(?:\{\{|\{(?!\{)(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}|(?!\2)[^{])*\2)?)*\s*>[ 	]*$/
);
xquery.getComments = (editor, position) => ({
  block: getClosestToken(editor, ".plain-text", 0, 0, position) ? ["{(:", ":)}"] : comment
});
//# sourceMappingURL=xquery.js.map
