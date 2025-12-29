import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
languages.trig = languages.turtle = {
  "comment": {
    pattern: /#.*/g,
    greedy: true
  },
  "multiline-string": {
    pattern: /"""(?:\\.|[^\\])*?"""|'''(?:\\.|[^\\])*?'''/g,
    greedy: true,
    alias: "string",
    inside: {
      "comment": /#.*/
    }
  },
  "string": {
    pattern: /"(?:\\.|[^\\\n"])*"|'(?:\\.|[^\\\n'])*'/g,
    greedy: true
  },
  "url": {
    pattern: /<(?:[^\0- <>"{}|^`\\]|\\(?:u[a-fA-F\d]{4}|U[a-fA-F\d]{8}))*>/g,
    greedy: true,
    inside: {
      "punctuation": /<|>/
    }
  },
  "function": {
    pattern: /(?:(?![-.\d\xb7])[-.\w\xb7\xc0-\ufffd]+)?:(?:(?![-.])(?:[-.:\w\xc0-\ufffd]|%[a-f\d]{2}|\\.)+)?/i,
    inside: {
      "local-name": {
        pattern: /(:)[^]+/,
        lookbehind: true
      },
      "prefix": {
        pattern: /[^]+/,
        inside: {
          "punctuation": /:/
        }
      }
    }
  },
  "number": /[+-]?\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
  "punctuation": /[()[\]{}.,;]|\^\^/,
  "boolean": boolean,
  "keyword": [
    /(?:\ba|@prefix|@base)\b|=/,
    /\b(?:base|graph|prefix)\b/i
  ],
  "tag": {
    pattern: /@[a-z]+(?:-[a-z\d]+)*/i,
    inside: {
      "punctuation": /@/
    }
  }
};
//# sourceMappingURL=turtle.js.map
