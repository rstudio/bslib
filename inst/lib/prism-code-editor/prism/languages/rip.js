import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
languages.rip = {
  "comment": {
    pattern: /#.*/g,
    greedy: true
  },
  "char": {
    pattern: /\B`[^\s"'`#/\\<>()[\]{}.,:;]\b/g,
    greedy: true
  },
  "string": {
    pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
    greedy: true
  },
  "regex": {
    pattern: /(^|[^/])\/(?!\/)(?:\[[^\n\]]*\]|\\.|[^\\\n/[])+\/(?=\s*(?:$|[\n.,;})]))/g,
    lookbehind: true,
    greedy: true
  },
  "keyword": /(?:=>|->)|\b(?:case|catch|class|else|exit|finally|if|raise|return|switch|try)\b/,
  "builtin": /@|\bSystem\b/,
  "boolean": boolean,
  "date": /\b\d{4}-\d\d-\d\d\b/,
  "time": /\b\d\d:\d\d:\d\d\b/,
  "datetime": /\b\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\b/,
  "symbol": /:(?!\d)[^\s"'`#/\\<>()[\]{}.,:;]+/,
  "number": /[+-]?\b(?:\d+\.\d+|\d+)\b/,
  "punctuation": /\.{2,3}|[`\\<>=/()[\]{}.,:;]/,
  "reference": /(?!\d)[^\s"'`#/\\<>()[\]{}.,:;]+/
};
//# sourceMappingURL=rip.js.map
