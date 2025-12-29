import { l as languages } from "../../index-XEj74r-1.js";
languages.editorconfig = {
  // https://editorconfig-specification.readthedocs.io
  "comment": /[;#].*/,
  "section": {
    pattern: /(^[ 	]*)\[.+\]/m,
    lookbehind: true,
    alias: "selector",
    inside: {
      "regex": /\\\\[[\]{}.,?!*]/,
      // Escape special characters with '\\'
      "operator": /[!?]|\.\.|\*\*?/,
      "punctuation": /[[\]{},]/
    }
  },
  "key": {
    pattern: /(^[ 	]*)[^\s=]+(?=[ 	]*=)/m,
    lookbehind: true,
    alias: "attr-name"
  },
  "value": {
    pattern: /=.*/,
    alias: "attr-value",
    inside: {
      "punctuation": /^=/
    }
  }
};
//# sourceMappingURL=editorconfig.js.map
