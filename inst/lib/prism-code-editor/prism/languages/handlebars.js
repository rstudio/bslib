import { l as languages, t as tokenize } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
import { e as embeddedIn } from "../../templating-CGPRy7qI.js";
import "./markup.js";
languages.mustache = languages.hbs = languages.handlebars = {
  "handlebars": {
    pattern: /\{\{(?:\{[^]+?\}|[^]+?)\}\}/,
    alias: "language-handlebars",
    inside: {
      "comment": /\{\{![^]*?\}\}/,
      "delimiter": {
        pattern: /^\{\{+|\}\}+$/,
        alias: "punctuation"
      },
      "string": /(["'])(?:\\.|(?!\1)[^\\\n])*\1/,
      "number": /\b0x[a-fA-F\d]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
      "boolean": boolean,
      "block": {
        pattern: /^(\s*(?:~\s*)?)[#/]\S+?(?=\s|~?\s*$)/,
        lookbehind: true,
        alias: "keyword"
      },
      "brackets": {
        pattern: /\[[^\]]+\]/,
        inside: {
          punctuation: /[[\]]/,
          variable: /[^]+/
        }
      },
      "punctuation": /[%&|^!=<>/*+#"'()[\]{}.,:;@\\`~]/,
      "variable": /\S+/
    }
  },
  [tokenize]: embeddedIn("html")
};
//# sourceMappingURL=handlebars.js.map
