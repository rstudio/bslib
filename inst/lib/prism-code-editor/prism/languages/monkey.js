import { l as languages } from "../../index-XEj74r-1.js";
languages.monkey = {
  "comment": {
    pattern: /^#rem\s[^]*?^#end|'.+/img,
    greedy: true
  },
  "string": {
    pattern: /"[^\n"]*"/g,
    greedy: true
  },
  "preprocessor": {
    pattern: /(^[ 	]*)#.+/mg,
    lookbehind: true,
    greedy: true,
    alias: "property"
  },
  "function": /\b\w+(?=\()/,
  "type-char": {
    pattern: /\b[?%#$]/,
    alias: "class-name"
  },
  "number": {
    pattern: /(\.\.)?(?:(?:\b|\B-\.?|\B\.)\d+(?:(?!\.\.)\.\d*)?|\$[a-f\d]+)/i,
    lookbehind: true
  },
  "keyword": /\b(?:abstract|array|bool|case|catch|class|const|continue|default|eachin|else|elseif|end|endif|exit|extends|extern|false|true|field|final|float|for|forever|function|global|if|implements|import|inline|int|interface|local|method|module|new|next|null|object|private|property|public|repeat|return|select|self|step|strict|string|super|then|throw|to|try|until|void|wend|while)\b/i,
  "operator": /\.\.|<[=>]?|>=?|:?=|(?:[~&|/*+-]|\b(?:mod|shl|shr)\b)=?|\b(?:and|not|or)\b/i,
  "punctuation": /[()[\].,:;]/
};
//# sourceMappingURL=monkey.js.map
