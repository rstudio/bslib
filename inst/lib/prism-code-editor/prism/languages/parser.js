import { l as languages } from "../../index-XEj74r-1.js";
import { e as extend, i as insertBefore } from "../../language-DxUX0ITY.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
import "./markup.js";
var keyword = {
  pattern: /(^|[^^])(?:\^(?:case|eval|for|if|switch|throw)\b|@(?:BASE|CLASS|GET(?:_DEFAULT)?|OPTIONS|SET_DEFAULT|USE)\b)/,
  lookbehind: true
};
var variable = {
  pattern: /(^|[^^])\B\$(?:\w+|(?=[.{]))(?:(?:\.|::?)\w+)*(?:\.|::?)?/,
  lookbehind: true,
  inside: {
    "punctuation": /\.|:+/
  }
};
var func = {
  pattern: /(^|[^^])\B[@^]\w+(?:(?:\.|::?)\w+)*(?:\.|::?)?/,
  lookbehind: true,
  inside: {
    "keyword": {
      pattern: /(^@)(?:GET_|SET_)/,
      lookbehind: true
    },
    "punctuation": /\.|:+/
  }
};
var escape = {
  pattern: /\^(?:[$^;@()[\]{}"':]|#[a-f\d]*)/i,
  alias: "builtin"
};
var punctuation = /[()[\]{};]/;
var expression = {
  // Allow for 3 levels of depth
  pattern: /(^|[^^])\((?:[^()]|\((?:[^()]|\([^)]*\))*\))*\)/g,
  lookbehind: true,
  greedy: true,
  inside: {
    "string": {
      pattern: /(^|[^^])(["'])(?:(?!\2)[^^]|\^[^])*\2/,
      lookbehind: true
    },
    "keyword": keyword,
    "variable": variable,
    "function": func,
    "boolean": boolean,
    "number": /\b(?:0x[a-f\d]+|\d+(?:\.\d*)?(?:e[+-]?\d+)?)\b/i,
    "escape": escape,
    "operator": /[~/\\%*+]|!\|\|?|&&?|\|\|?|==|>>|<<|[!<>]=?|-[fd]?|\b(?:def|eq|[gl][et]|in|is|ne)\b/,
    "punctuation": punctuation
  }
};
var parser = languages.parser = extend("html", {
  "parser-comment": {
    pattern: /(\s)#.*/,
    lookbehind: true,
    alias: "comment"
  },
  "expression": expression,
  "keyword": keyword,
  "variable": variable,
  "function": func,
  "escape": escape,
  "punctuation": punctuation
});
insertBefore(parser["tag"].inside["attr-value"][2].inside, "punctuation", {
  "expression": expression,
  "keyword": keyword,
  "variable": variable,
  "function": func,
  "escape": escape,
  "parser-punctuation": {
    pattern: punctuation,
    alias: "punctuation"
  }
});
delete parser["markup-bracket"];
//# sourceMappingURL=parser.js.map
