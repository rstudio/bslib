import { l as languages, r as rest } from "../../index-XEj74r-1.js";
import { c as clone } from "../../language-DxUX0ITY.js";
import "./c.js";
languages.bison = Object.assign({
  "bison": {
    // This should match all the beginning of the file
    // including the prologue(s), the bison declarations and
    // the grammar rules.
    pattern: /^(?:[^%]|%(?!%))*%%[^]*?%%/,
    inside: {
      "c": {
        // Allow for one level of nested braces
        pattern: /%\{[^]*?%\}|\{(?:[^{}]|\{[^}]*\})*\}/,
        inside: {
          "delimiter": {
            pattern: /^%?\{|%?\}$/,
            alias: "punctuation"
          },
          "bison-variable": {
            pattern: /[$@](?:<[^\s>]+>)?[$\w]+/,
            alias: "variable",
            inside: {
              "punctuation": /<|>/
            }
          },
          [rest]: languages.c
        }
      },
      "comment": languages.c.comment,
      "string": languages.c.string,
      "property": /\S+(?=:)/,
      "keyword": /%\w+/,
      "number": {
        pattern: /(^|[^@])\b(?:0x[a-f\d]+|\d+)/i,
        lookbehind: true
      },
      "punctuation": /%[%?]|[|:;[\]<>]/
    }
  }
}, clone(languages.c));
//# sourceMappingURL=bison.js.map
