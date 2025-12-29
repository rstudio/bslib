import { l as languages } from "../../index-XEj74r-1.js";
languages["ld"] = languages["linker-script"] = {
  "identifier": /"[^\n"]*"/,
  "comment": {
    pattern: /(^|\s)\/\*[^]*?(?:$|\*\/)/g,
    lookbehind: true,
    greedy: true
  },
  "location-counter": {
    pattern: /\B\.\B/,
    alias: "important"
  },
  "section": {
    pattern: /(^|[^\w*])\.\w+/,
    lookbehind: true,
    alias: "keyword"
  },
  "function": /\b[A-Z][A-Z_]*(?=\s*\()/,
  "number": /\b(?:0[xX][a-fA-F\d]+|\d+)[KM]?\b/,
  "operator": /->|--|\+\+|&&|\|\||::|[?:~]|>>=?|<<=?|[%&|^!=<>/*+-]=?/,
  "punctuation": /[(){},;]/
};
//# sourceMappingURL=linker-script.js.map
