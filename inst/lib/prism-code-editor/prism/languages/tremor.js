import { l as languages } from "../../index-XEj74r-1.js";
var interpolationPattern = '#\\{(?:[^"{}]|\\{[^{}]*\\}|"(?:\\\\[\\s\\S]|[^\\\\\n"])*")*\\}';
languages.trickle = languages.troy = languages.tremor = {
  "comment": /\/\*[^]*?\*\/|(?:--|\/\/|#).*/,
  "interpolated-string": {
    pattern: RegExp(
      `(^|[^\\\\])(?:"""(?:\\\\[^]|[^\\\\"#]|"(?!"")|#(?!\\{)|${interpolationPattern})*"""|"(?:\\\\[^]|[^\\\\
"#]|#(?!\\{)|${interpolationPattern})*")`,
      "g"
    ),
    lookbehind: true,
    greedy: true,
    inside: {
      "interpolation": {
        pattern: RegExp(interpolationPattern),
        inside: {
          "punctuation": /^#\{|\}$/,
          "expression": {
            pattern: /[^]+/,
            inside: "tremor"
          }
        }
      },
      "string": /[^]+/
    }
  },
  "extractor": {
    pattern: /\b[a-z_]\w*\|(?:\\[^]|[^\\\n|])*\|/gi,
    greedy: true,
    inside: {
      "regex": {
        pattern: /(^re)\|[^]+/,
        lookbehind: true
      },
      "function": /^\w+/,
      "value": /\|[^]+/
    }
  },
  "identifier": {
    pattern: /`[^`]*`/g,
    greedy: true
  },
  "function": /\b[a-z_]\w*(?=\s*(?:::\s*<|\())\b/,
  "keyword": /\b(?:args|as|by|case|config|connect|connector|const|copy|create|default|define|deploy|drop|each|emit|end|erase|event|flow|fn|for|from|group|having|insert|into|intrinsic|[ls]et|links|[mp]atch|merge|mod|move|of|operator|pipeline|recur|script|select|sliding|state|stream|to|tumbling|update|use|when|where|window|with)\b/,
  "boolean": /\b(?:false|true|null)\b/i,
  "number": /\b(?:0b[01_]*|0x[a-fA-F\d_]*|\d[\d_]*(?:\.\d[\d_]*)?(?:[Ee][+-]?[\d_]+)?)\b/,
  "pattern-punctuation": {
    pattern: /%(?=[({[])/,
    alias: "punctuation"
  },
  "operator": /=>|&&|\|\||<<=?|>>>?=?|[~%&|^!=<>/*+-]=?|(?:absent|and|not|x?or|present)\b/,
  "punctuation": /::|[()[\]{}.,:;]/
};
//# sourceMappingURL=tremor.js.map
