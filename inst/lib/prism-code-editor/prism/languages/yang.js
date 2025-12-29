import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
languages.yang = {
  // https://tools.ietf.org/html/rfc6020#page-34
  // http://www.yang-central.org/twiki/bin/view/Main/YangExamples
  "comment": clikeComment(),
  "string": {
    pattern: /"(?:\\.|[^\\"])*"|'[^']*'/g,
    greedy: true
  },
  "keyword": {
    pattern: /(^|[{};\n][ 	]*)[a-z_][\w.-]*/i,
    lookbehind: true
  },
  "namespace": {
    pattern: /(\s)[a-z_][\w.-]*(?=:)/i,
    lookbehind: true
  },
  "boolean": boolean,
  "operator": /\+/,
  "punctuation": /[{}:;]/
};
//# sourceMappingURL=yang.js.map
