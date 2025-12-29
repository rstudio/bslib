import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
languages.go = {
  "comment": clikeComment(),
  "char": {
    pattern: /'(?:\\.|[^\\\n']){0,10}'/g,
    greedy: true
  },
  "string": {
    pattern: /(^|[^\\])"(?:\\.|[^\\\n"])*"|`[^`]*`/g,
    lookbehind: true,
    greedy: true
  },
  "keyword": /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  "boolean": /\b(?:_|false|true|iota|nil)\b/,
  "function": /\b\w+(?=\()/,
  "number": [
    // binary and octal integers
    /\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
    // hexadecimal integers and floats
    /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
    // decimal integers and floats
    /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i
  ],
  "operator": /--|\+\+|&&|\|\||&\^=?|<-|<<=?|>>=?|[%&|^!=<>/*+-]=?|:=|\.{3}/,
  "punctuation": clikePunctuation,
  "builtin": /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
};
//# sourceMappingURL=go.js.map
