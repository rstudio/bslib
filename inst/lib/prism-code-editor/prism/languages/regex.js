import { l as languages } from "../../index-XEj74r-1.js";
var specialEscape = {
  pattern: /\\[\\()[\]{}^$+*?|.]/,
  alias: "escape"
};
var escape = /\\(?:x[a-fA-F\d]{2}|u[a-fA-F\d]{4}|u\{[a-fA-F\d]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/;
var charSet = {
  pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i,
  alias: "class-name"
};
var charSetWithoutDot = {
  pattern: /\\[wsd]|\\p\{[^{}]+\}/i,
  alias: "class-name"
};
var rangeChar = "(?:[^\\\\-]|" + escape.source + ")";
var range = RegExp(rangeChar + "-" + rangeChar);
var groupName = {
  pattern: /(<|')[^<>']+(?=[>']$)/,
  lookbehind: true,
  alias: "variable"
};
languages.regex = {
  "char-class": {
    pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:\\[^]|[^\\\]])*\]/,
    lookbehind: true,
    inside: {
      "char-class-punctuation": {
        pattern: /^.|.$/g,
        greedy: true,
        alias: "punctuation"
      },
      "char-class-negation": {
        pattern: /^\^/,
        alias: "operator"
      },
      "range": {
        pattern: range,
        inside: {
          "escape": escape,
          "range-punctuation": {
            pattern: /-/,
            alias: "operator"
          }
        }
      },
      "special-escape": specialEscape,
      "char-set": charSetWithoutDot,
      "escape": escape
    }
  },
  "special-escape": specialEscape,
  "char-set": charSet,
  "backreference": [
    {
      // a backreference which is not an octal escape
      pattern: /\\(?![123][0-7]{2})[1-9]/,
      alias: "keyword"
    },
    {
      pattern: /\\k<[^<>']+>/,
      alias: "keyword",
      inside: {
        "group-name": groupName
      }
    }
  ],
  "anchor": {
    pattern: /[$^]|\\[ABbGZz]/,
    alias: "function"
  },
  "escape": escape,
  "group": [
    {
      // https://docs.oracle.com/javase/10/docs/api/java/util/regex/Pattern.html
      // https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference?view=netframework-4.7.2#grouping-constructs
      // (), (?<name>), (?'name'), (?>), (?:), (?=), (?!), (?<=), (?<!), (?is-m), (?i-m:)
      pattern: /(\()\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[!=]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?)/,
      lookbehind: true,
      inside: {
        "group-name": groupName
      }
    },
    {
      pattern: /[()]/,
      alias: "punctuation"
    }
  ],
  "quantifier": {
    pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/,
    alias: "number"
  },
  "alternation": {
    pattern: /\|/,
    alias: "keyword"
  }
};
//# sourceMappingURL=regex.js.map
