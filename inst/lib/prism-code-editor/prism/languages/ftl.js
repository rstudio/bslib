import { r as rest, l as languages, t as tokenize } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, b as boolean } from "../../patterns-Cp3h1ylA.js";
import { n as nested, r as re } from "../../shared-Sq5P6lf6.js";
import { e as embeddedIn } from "../../templating-CGPRy7qI.js";
import "./markup.js";
var FTL_EXPR = [nested(`[^<()"']|\\((?:<self>)*\\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:\\\\.|[^\\\\"])*"|'(?:\\\\.|[^\\\\'])*'`, 2)];
var interpolationInside = {
  "interpolation-punctuation": {
    pattern: /^\$\{|\}$/,
    alias: "punctuation"
  }
};
var ftl = interpolationInside[rest] = {
  "comment": /<#--[^]*?-->/,
  "string": [
    {
      // raw string
      pattern: /\br(["'])(?:\\.|(?!\1)[^\\])*\1/g,
      greedy: true
    },
    {
      pattern: re(`(["'])(?:\\\\.|(?!\\1|\\$\\{)[^\\\\]|\\$\\{(?:(?!\\})<0>)*\\})*\\1`, FTL_EXPR, "g"),
      greedy: true,
      inside: {
        "interpolation": {
          pattern: re("((?:^|[^\\\\])(?:\\\\\\\\)*)\\$\\{(?:(?!\\})<0>)*\\}", FTL_EXPR),
          lookbehind: true,
          inside: interpolationInside
        }
      }
    }
  ],
  "keyword": /\b(?:as)\b/,
  "boolean": boolean,
  "builtin-function": {
    pattern: /((?:^|[^?])\?\s*)\w+/,
    lookbehind: true,
    alias: "function"
  },
  "function": /\b\w+(?=\s*\()/,
  "number": /\b\d+(?:\.\d+)?\b/,
  "operator": /\.\.[<*!]?|->|--|\+\+|&&|\|\||\?\??|[%!=<>/*+-]=?|\b[gl]te?\b/,
  "punctuation": clikePunctuation
};
languages.ftl = {
  "ftl-comment": {
    pattern: /<#--[^]*?-->/g,
    greedy: true,
    alias: "comment"
  },
  "ftl-directive": {
    pattern: re("</?[#@][a-zA-Z]<0>*?>", FTL_EXPR, "gi"),
    greedy: true,
    inside: {
      "punctuation": /^<\/?|\/?>$/,
      "directive": {
        pattern: /^[#@][a-z]\w*/i,
        alias: "keyword"
      },
      "ftl": {
        pattern: /\s*\S[^]*/,
        alias: "language-ftl",
        inside: ftl
      }
    }
  },
  "ftl-interpolation": {
    pattern: re("\\$\\{<0>*?\\}", FTL_EXPR, "gi"),
    greedy: true,
    inside: {
      "punctuation": /^\$\{|\}$/,
      "ftl": {
        pattern: /\s*\S[^]*/,
        alias: "language-ftl",
        inside: ftl
      }
    }
  },
  [tokenize]: embeddedIn("html")
};
//# sourceMappingURL=ftl.js.map
