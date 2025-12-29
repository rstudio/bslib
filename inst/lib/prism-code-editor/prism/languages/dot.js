import { l as languages } from "../../index-XEj74r-1.js";
import { r as re } from "../../shared-Sq5P6lf6.js";
var ID = `(?:(?!d)[\\w\\x80-\\uffff]+|-?(?:\\.\\d+|\\d+(?:\\.\\d*)?)|"[^\\\\"]*(?:\\\\[\\s\\S][^\\\\"]*)*"|<(?:[^<>]|(?!<!--)<(?:[^<>"']|"[^"]*"|'[^']*')+>|<!--(?:[^-]|-(?!->))*-->)*>)`;
var IDInside = {
  "markup": {
    pattern: /(^<)[^]+(?=>)/,
    lookbehind: true,
    alias: "language-markup",
    inside: "markup"
  }
};
languages.gv = languages.dot = {
  "comment": {
    pattern: /\/\/.*|\/\*[^]*?\*\/|^#.*/mg,
    greedy: true
  },
  "graph-name": {
    pattern: re("(\\b(?:digraph|graph|subgraph)[ 	\n]+)<0>", [ID], "gi"),
    lookbehind: true,
    greedy: true,
    alias: "class-name",
    inside: IDInside
  },
  "attr-value": {
    pattern: re("(=[ 	\n]*)<0>", [ID], "g"),
    lookbehind: true,
    greedy: true,
    inside: IDInside
  },
  "attr-name": {
    pattern: re("([\\[;, 	\n])<0>(?=[ 	\n]*=)", [ID], "g"),
    lookbehind: true,
    greedy: true,
    inside: IDInside
  },
  "keyword": /\b(?:digraph|edge|graph|node|strict|subgraph)\b/i,
  "compass-point": {
    pattern: /(:[ 	\n]*)(?:[ewc_]|[ns][ew]?)(?![\w\x80-\uffff])/,
    lookbehind: true,
    alias: "builtin"
  },
  "node": {
    pattern: re("(^|[^-.\\w\\x80-\\uffff\\\\])<0>", [ID], "g"),
    lookbehind: true,
    greedy: true,
    inside: IDInside
  },
  "operator": /[=:]|-[->]/,
  "punctuation": /[[\]{},;]/
};
//# sourceMappingURL=dot.js.map
