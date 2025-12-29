import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
languages.llvm = {
  "comment": /;.*/,
  "string": {
    pattern: /"[^"]*"/g,
    greedy: true
  },
  "boolean": boolean,
  "variable": /[%@!#](?:(?!\d)(?:[-\w$.]|\\[a-f\d]{2})+|\d+)/i,
  "label": /(?!\d)(?:[-\w$.]|\\[a-f\d]{2})+:/i,
  "type": {
    pattern: /\b(?:double|float|fp128|half|i[1-9]\d*|label|metadata|ppc_fp128|token|void|x86_fp80|x86_mmx)\b/,
    alias: "class-name"
  },
  "keyword": /\b[a-z_][a-z_\d]*\b/,
  "number": /[+-]?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|\b0x[a-fA-F\d]+\b|\b0xK[a-fA-F\d]{20}\b|\b0x[ML][a-fA-F\d]{32}\b|\b0xH[a-fA-F\d]{4}\b/,
  "punctuation": /[()[\]{}.,;!=<>*]/
};
//# sourceMappingURL=llvm.js.map
