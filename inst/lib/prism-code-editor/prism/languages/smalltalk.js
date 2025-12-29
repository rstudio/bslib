import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
languages.smalltalk = {
  "comment": {
    pattern: /"(?:""|[^"])*"/g,
    greedy: true
  },
  "char": {
    pattern: /\$./g,
    greedy: true
  },
  "string": {
    pattern: /'(?:''|[^'])*'/g,
    greedy: true
  },
  "symbol": /#[a-z\d]+|#(?:-|([+/\\*~<>=@%|&?!])\1?)|#(?=\()/i,
  "block-arguments": {
    pattern: /(\[\s*):[^\[|]*\|/,
    lookbehind: true,
    inside: {
      "variable": /:[a-z\d]+/i,
      "punctuation": /\|/
    }
  },
  "temporary-variables": {
    pattern: /\|[^|]+\|/,
    inside: {
      "variable": /[a-z\d]+/i,
      "punctuation": /\|/
    }
  },
  "keyword": /\b(?:new|nil|self|super)\b/,
  "boolean": boolean,
  "number": [
    /\d+r-?[A-Z\d]+(?:\.[A-Z\d]+)?(?:e-?\d+)?/,
    /\b\d+(?:\.\d+)?(?:e-?\d+)?/
  ],
  "operator": /[<=]=?|:=|~[~=]|\/\/?|\\\\|>[>=]?|[,@&|^!*+-]/,
  "punctuation": /[()[\]{}.:;?]/
};
//# sourceMappingURL=smalltalk.js.map
