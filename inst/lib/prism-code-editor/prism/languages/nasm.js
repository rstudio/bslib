import { l as languages } from "../../index-XEj74r-1.js";
languages.nasm = {
  "comment": /;.*/,
  "string": /(["'`])(?:\\.|(?!\1)[^\\\n])*\1/,
  "label": {
    pattern: /(^\s*)[A-Za-z._?$][\w.?$@~#]*:/m,
    lookbehind: true,
    alias: "function"
  },
  "keyword": [
    /\[?BITS (?:16|32|64)\]?/,
    {
      pattern: /(^\s*)section\s*[a-z.]+:?/im,
      lookbehind: true
    },
    /(?:extern|global)[^\n;]*/i,
    /(?:CPU|DEFAULT|FLOAT).*/
  ],
  "register": {
    pattern: /\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|di|si|sp)|[cdefgs]s)\b/i,
    alias: "variable"
  },
  "number": /(?:\b|(?=\$))(?:0[hx](?:\.[a-f\d]+|[a-f\d]+(?:\.[a-f\d]+)?)(?:p[+-]?\d+)?|\d[a-f\d]+[hx]|\$\d[a-f\d]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\d+|(?:\d+(?:\.\d+)?|\.\d+)(?:\.?e[+-]?\d+)?[dt]?)\b/i,
  "operator": /[[\]%&|$!=<>/*+-]/
};
//# sourceMappingURL=nasm.js.map
