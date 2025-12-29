import { l as languages } from "../../index-XEj74r-1.js";
languages.nevod = {
  "comment": /\/\/.*|\/\*[^]*?(?:\*\/|$)/,
  "string": {
    pattern: /(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!'))!?\*?/g,
    greedy: true,
    inside: {
      "string-attrs": /!$|!?\*$/
    }
  },
  "namespace": {
    pattern: /(@namespace\s+)[a-zA-Z\d.-]+(?=\s*\{)/,
    lookbehind: true
  },
  "pattern": {
    pattern: /(@pattern\s+)?#?[a-zA-Z\d.-]+(?:\s*\(\s*(?:~\s*)?[a-zA-Z\d.-]+\s*(?:,\s*(?:~\s*)?[a-zA-Z\d.-]*)*\))?(?=\s*=)/,
    lookbehind: true,
    inside: {
      "pattern-name": {
        pattern: /^#?[a-zA-Z\d.-]+/,
        alias: "class-name"
      },
      "fields": {
        pattern: /\(.*\)/,
        inside: {
          "field-name": {
            pattern: /[a-zA-Z\d.-]+/,
            alias: "variable"
          },
          "punctuation": /[(),]/,
          "operator": {
            pattern: /~/,
            alias: "field-hidden-mark"
          }
        }
      }
    }
  },
  "search": {
    pattern: /(@search\s+|#)[a-zA-Z\d.-]+(?:\.\*)?(?=\s*;)/,
    alias: "function",
    lookbehind: true
  },
  "keyword": /@(?:having|inside|namespace|outside|pattern|require|search|where)\b/,
  "standard-pattern": {
    pattern: /\b(?:Alpha|AlphaNum|Any|Blank|End|LineBreak|Num|NumAlpha|Punct|Space|Start|Symbol|Word|WordBreak)\b(?:\([a-zA-Z\d.,\s+-]*\))?/,
    inside: {
      "standard-pattern-name": {
        pattern: /^[a-zA-Z\d.-]+/,
        alias: "builtin"
      },
      "quantifier": {
        pattern: /\b\d+(?:\s*\+|\s*-\s*\d+)?(?!\w)/,
        alias: "number"
      },
      "standard-pattern-attr": {
        pattern: /[a-zA-Z\d.-]+/,
        alias: "builtin"
      },
      "punctuation": /[(),]/
    }
  },
  "quantifier": {
    pattern: /\b\d+(?:\s*\+|\s*-\s*\d+)?(?!\w)/,
    alias: "number"
  },
  "operator": [
    {
      pattern: /=/,
      alias: "pattern-def"
    },
    {
      pattern: /&/,
      alias: "conjunction"
    },
    {
      pattern: /~/,
      alias: "exception"
    },
    {
      pattern: /\?/,
      alias: "optionality"
    },
    {
      pattern: /[[\]]/,
      alias: "repetition"
    },
    {
      pattern: /[{}]/,
      alias: "variation"
    },
    {
      pattern: /[+_]/,
      alias: "sequence"
    },
    {
      pattern: /\.{2,3}/,
      alias: "span"
    }
  ],
  "field-capture": [
    {
      pattern: /([a-zA-Z\d.-]+\s*\()\s*[a-zA-Z\d.-]+\s*:\s*[a-zA-Z\d.-]+(?:\s*,\s*[a-zA-Z\d.-]+\s*:\s*[a-zA-Z\d.-]+)*(?=\s*\))/,
      lookbehind: true,
      inside: {
        "field-name": {
          pattern: /[a-zA-Z\d.-]+/,
          alias: "variable"
        },
        "colon": /:/
      }
    },
    {
      pattern: /[a-zA-Z\d.-]+\s*:/,
      inside: {
        "field-name": {
          pattern: /[a-zA-Z\d.-]+/,
          alias: "variable"
        },
        "colon": /:/
      }
    }
  ],
  "punctuation": /[(),:;]/,
  "name": /[a-zA-Z\d.-]+/
};
//# sourceMappingURL=nevod.js.map
