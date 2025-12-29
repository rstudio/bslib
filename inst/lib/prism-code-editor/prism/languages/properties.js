import { l as languages } from "../../index-XEj74r-1.js";
languages.properties = {
  "comment": /^[ 	]*[#!].*/m,
  "value": {
    pattern: /(^[ 	]*(?:\\[^]|[^\\\s:=])+(?: *[=:] *(?! )| ))(?:\\[^]|[^\\\n])+/m,
    lookbehind: true,
    alias: "attr-value"
  },
  "key": {
    pattern: /^[ 	]*(?:\\[^]|[^\\\s:=])+(?= *[=:]| )/m,
    alias: "attr-name"
  },
  "punctuation": /[=:]/
};
//# sourceMappingURL=properties.js.map
