import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
var keywords = /\b(?:about|and|animate|as|at|attributes|by|case|catch|collect|continue|coordsys|do|else|exit|fn|f?or|from|function|global|if|in|local|macroscript|mapped|max|not|off?|on|parameters|persistent|plugin|rcmenu|return|rollout|set|struct|[tw]hen|throw|to|tool|try|undo|utility|where|while|with)\b/i;
languages.maxscript = {
  "comment": {
    pattern: /\/\*[^]*?(?:\*\/|$)|--.*/g,
    greedy: true
  },
  "string": {
    pattern: /(^|[^\\"@])(?:"(?:\\[^]|[^\\"])*"|@"[^"]*")/g,
    lookbehind: true,
    greedy: true
  },
  "path": {
    pattern: /\$(?:[\w/\\.*?]|'[^']*')*/g,
    greedy: true,
    alias: "string"
  },
  "function-call": {
    pattern: RegExp(`((?:^|[;=<>+\\-*/^({\\[]|\\b(?:and|by|case|catch|collect|do|else|if|in|not|or|return|then|to|try|where|while|with)\\b)[ 	]*)(?!${keywords.source})[a-z_]\\w*\\b(?=[ 	]*(?:(?!${keywords.source})[a-z_]|\\d|-\\.?\\d|[({"'$@#?]))`, "img"),
    lookbehind: true,
    greedy: true,
    alias: "function"
  },
  "function-definition": {
    pattern: /(\b(?:fn|function)\s+)\w+/i,
    lookbehind: true,
    alias: "function"
  },
  "argument": {
    pattern: /\b[a-z_]\w*(?=:)/i,
    alias: "attr-name"
  },
  "keyword": keywords,
  "boolean": boolean,
  "time": {
    pattern: /(^|[^\w.])(?:(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eEdD][+-]\d+|[LP])?[msft])+|\d+:\d+(?:\.\d*)?)(?![\w.:])/,
    lookbehind: true,
    alias: "number"
  },
  "number": [
    {
      pattern: /(^|[^\w.])(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eEdD][+-]\d+|[LP])?|0x[a-fA-F\d]+)(?![\w.:])/,
      lookbehind: true
    },
    /\b(?:e|pi)\b/
  ],
  "constant": /\b(?:dontcollect|ok|silentValue|undefined|unsupplied)\b/,
  "color": {
    pattern: /\b(?:black|blue|brown|gray|green|orange|red|white|yellow)\b/i,
    alias: "constant"
  },
  "operator": /[!=<>/*+-]=?|[&^?]|#(?!\()/,
  "punctuation": /[()[\]{}.,:;]|#(?=\()|\\$/m
};
//# sourceMappingURL=maxscript.js.map
