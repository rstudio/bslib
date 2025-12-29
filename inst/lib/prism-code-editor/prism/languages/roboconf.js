import { l as languages } from "../../index-XEj74r-1.js";
languages.roboconf = {
  "comment": /#.*/,
  "keyword": {
    "pattern": /(^|\s)(?:(?:external|import)\b|(?:facet|instance of)(?=[ 	]+[\w-]+[ 	]*\{))/,
    lookbehind: true
  },
  "component": {
    pattern: /[\w-]+(?=[ 	]*\{)/,
    alias: "variable"
  },
  "property": /[\w.-]+(?=[ 	]*:)/,
  "value": {
    pattern: /(=[ 	]*(?![ 	]))[^,;]+/,
    lookbehind: true,
    alias: "attr-value"
  },
  "optional": {
    pattern: /\(optional\)/,
    alias: "builtin"
  },
  "wildcard": {
    pattern: /(\.)\*/,
    lookbehind: true,
    alias: "operator"
  },
  "punctuation": /[{}.,:;=]/
};
//# sourceMappingURL=roboconf.js.map
