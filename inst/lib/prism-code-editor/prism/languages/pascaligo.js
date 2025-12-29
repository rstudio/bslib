import { l as languages } from "../../index-XEj74r-1.js";
import { a as replace, r as re } from "../../shared-Sq5P6lf6.js";
var type = replace("(?:\\b\\w+<0>?|<0>)", ["\\((?:[^()]|\\((?:[^()]|\\([^)]*\\))*\\))*\\)"]);
var classNameInside = {};
var className = [
  {
    pattern: re("(\\btype\\s+\\w+\\s+is\\s+)<0>", [type], "i"),
    lookbehind: true,
    inside: classNameInside
  },
  {
    pattern: re("<0>(?=\\s+is\\b)", [type], "i"),
    inside: classNameInside
  },
  {
    pattern: re("(:\\s*)<0>", [type]),
    lookbehind: true,
    inside: classNameInside
  }
];
var pascaligo = languages.pascaligo = {
  "comment": /\(\*[^]+?\*\)|\/\/.*/,
  "string": {
    pattern: /(["'`])(?:\\[^]|(?!\1)[^\\])*\1|\^[a-z]/gi,
    greedy: true
  },
  "class-name": className,
  "keyword": {
    pattern: /(^|[^&])\b(?:begin|block|case|const|else|end|fail|for|from|function|if|is|nil|of|remove|return|skip|then|type|var|while|with)\b/i,
    lookbehind: true
  },
  "boolean": {
    pattern: /(^|[^&])\b(?:false|true)\b/i,
    lookbehind: true
  },
  "builtin": {
    pattern: /(^|[^&])\b(?:bool|int|list|map|nat|record|string|unit)\b/i,
    lookbehind: true
  },
  "function": /\b\w+(?=\s*\()/,
  "number": [
    // Hexadecimal, octal and binary
    /%[01]+|&[0-7]+|\$[a-f\d]+/i,
    // Decimal
    /\b\d+(?:\.\d+)?(?:e[+-]?\d+)?(?:mtz|n)?/i
  ],
  "operator": /->|=\/=|\.\.|\*\*|:=|<>|>>|<<|[<>/*+-]=?|[@|^=]|\b(?:and|mod|or)\b/,
  "punctuation": /\(\.|\.\)|[()[\]{}.,:;]/
};
["comment", "keyword", "builtin", "operator", "punctuation"].forEach((key) => {
  classNameInside[key] = pascaligo[key];
});
//# sourceMappingURL=pascaligo.js.map
