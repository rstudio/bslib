import { l as languages } from "../../index-XEj74r-1.js";
languages.prolog = {
  // Syntax depends on the implementation
  "comment": {
    pattern: /\/\*[^]*?\*\/|%.*/g,
    greedy: true
  },
  // Depending on the implementation, strings may allow escaped newlines and quote-escape
  "string": {
    pattern: /(["'])(?:\1\1|\\[^]|(?!\1)[^\\\n])*\1(?!\1)/g,
    greedy: true
  },
  "builtin": /\b(?:fx|fy|xf[xy]?|yfx?)\b/,
  // FIXME: Should we list all null-ary predicates (not followed by a parenthesis) like halt, trace, etc.?
  "function": /\b[a-z]\w*(?:(?=\()|\/\d+)/,
  "number": /\b\d+(?:\.\d*)?/,
  // Custom operators are allowed
  "operator": /[\\$?@.:;|^!=<>/*+-]+|\b(?:is|mod|not|xor)\b/,
  "punctuation": /[()[\]{},]/
};
//# sourceMappingURL=prolog.js.map
