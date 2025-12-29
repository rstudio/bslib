import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
languages.jexl = {
  "string": /(["'])(?:\\[^]|(?!\1)[^\\])*\1/,
  "transform": {
    pattern: /(\|\s*)[a-zA-Zа-яА-Я_\xc0-\xd6\xd8-\xf6\xf8-\xff$][\wа-яА-Я\xc0-\xd6\xd8-\xf6\xf8-\xff$]*/,
    alias: "function",
    lookbehind: true
  },
  "function": /[a-zA-Zа-яА-Я_\xc0-\xd6\xd8-\xf6\xf8-\xff$][\wа-яА-Я\xc0-\xd6\xd8-\xf6\xf8-\xff$]*\s*(?=\()/,
  "number": /\b\d+(?:\.\d+)?\b|\B\.\d+\b/,
  "operator": /[!<>]=?|&&|==|\|\||\/\/|[?:%|^/*+-]/,
  "boolean": boolean,
  "keyword": /\bin\b/,
  "punctuation": /[()[\]{}.,]/
};
//# sourceMappingURL=jexl.js.map
