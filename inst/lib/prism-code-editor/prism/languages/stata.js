import { l as languages } from "../../index-XEj74r-1.js";
import "./mata.js";
import "./java.js";
import "./python.js";
var expression = {
  pattern: /[^]+/
};
expression.inside = languages.stata = {
  "comment": [
    {
      pattern: /(^[ 	]*)\*.*/mg,
      lookbehind: true,
      greedy: true
    },
    {
      pattern: /(^|\s)\/\/.*|\/\*[^]*?\*\//g,
      lookbehind: true,
      greedy: true
    }
  ],
  "string-literal": {
    pattern: /"[^\n"]*"|[‘`']".*?"[’`']/g,
    greedy: true,
    inside: {
      "interpolation": {
        pattern: /\$\{[^{}]*\}|[‘`']\w[^’`'\n]*[’`']/,
        inside: {
          "punctuation": /^\$\{|\}$/,
          "expression": expression
        }
      },
      "string": /[^]+/
    }
  },
  "mata": {
    pattern: /(^[ 	]*mata[ 	]*:)[^]+?(?=^end\b)/mg,
    lookbehind: true,
    greedy: true,
    alias: "language-mata",
    inside: languages.mata
  },
  "java": {
    pattern: /(^[ 	]*java[ 	]*:)[^]+?(?=^end\b)/mg,
    lookbehind: true,
    greedy: true,
    alias: "language-java",
    inside: languages.java
  },
  "python": {
    pattern: /(^[ 	]*python[ 	]*:)[^]+?(?=^end\b)/mg,
    lookbehind: true,
    greedy: true,
    alias: "language-python",
    inside: languages.py
  },
  "command": {
    pattern: /(^[ 	]*(?:\.[ 	]+)?(?:(?:bayes|bootstrap|by|bysort|capture|collect|fmm|frame|jackknife|m?fp|mi|nestreg|noisily|permute|quietly|rolling|simulate|statsby|stepwise|svy|version|xi)\b[^\n:]*:[ 	]*|(?:capture|noisily|quietly|version)[ 	]+)?)[a-zA-Z]\w*/mg,
    lookbehind: true,
    greedy: true,
    alias: "keyword"
  },
  "variable": /\$\w+|[‘`']\w[^’`'\n]*[’`']/,
  "keyword": /\b(?:bayes|bootstrap|by|bysort|capture|clear|collect|fmm|frame|if|in|jackknife|mi[ 	]+estimate|m?fp|nestreg|noisily|of|permute|quietly|rolling|simulate|sort|statsby|stepwise|svy|varlist|version|xi)\b/,
  "boolean": /\b(?:off|on)\b/,
  "number": /\b\d+(?:\.\d+)?\b|\B\.\d+/,
  "function": /\b[a-z_]\w*(?=\()/i,
  "operator": /--|\+\+|##?|[~!=<>]=?|[&|^/*+-]/,
  "punctuation": /[()[\]{},:]/
};
//# sourceMappingURL=stata.js.map
