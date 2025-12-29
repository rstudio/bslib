import { l as languages } from "../../index-XEj74r-1.js";
import { a as clikeComment } from "../../patterns-Cp3h1ylA.js";
languages.g4 = languages.antlr4 = {
  "comment": clikeComment(),
  "string": {
    pattern: /'(?:\\.|[^\\\n'])*'/g,
    greedy: true
  },
  "character-class": {
    pattern: /\[(?:\\.|[^\\\]\n])*\]/g,
    greedy: true,
    alias: "regex",
    inside: {
      "range": {
        pattern: /([^[]|(?:^|[^\\])(?:\\\\)*\\\[)-(?!\])/,
        lookbehind: true,
        alias: "punctuation"
      },
      "escape": /\\(?:u(?:[a-fA-F\d]{4}|\{[a-fA-F\d]+\})|[pP]\{[=\w-]+\}|[^\nupP])/,
      "punctuation": /[[\]]/
    }
  },
  "action": {
    pattern: /\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\})*\}/g,
    greedy: true,
    inside: {
      "content": /(?!^)[^]+(?=.)/,
      "punctuation": /./
    }
  },
  "command": {
    pattern: /(->\s*(?!\s))(?:\s*(?:,\s*)?\b[a-z]\w*(?:\s*\([^()\n]*\))?)+(?=\s*;)/i,
    lookbehind: true,
    inside: {
      "function": /\b\w+(?!\s*[^\s,(])/,
      "punctuation": /[(),]/
    }
  },
  "annotation": {
    pattern: /@\w+(?:::\w+)*/,
    alias: "keyword"
  },
  "label": {
    pattern: /#[ 	]*\w+/,
    alias: "punctuation"
  },
  "keyword": /\b(?:catch|channels|finally|fragment|grammar|import|lexer|locals|mode|options|parser|returns|throws|tokens)\b/,
  "definition": [
    {
      pattern: /\b[a-z]\w*(?=\s*:)/,
      alias: "rule class-name"
    },
    {
      pattern: /\b[A-Z]\w*(?=\s*:)/,
      alias: "token constant"
    }
  ],
  "constant": /\b[A-Z][A-Z_]*\b/,
  "operator": /\.\.|->|[|~]|[*+?]\??/,
  "punctuation": /[():;=]/
};
//# sourceMappingURL=antlr4.js.map
