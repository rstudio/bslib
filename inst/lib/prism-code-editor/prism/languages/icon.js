import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
languages.icon = {
  "comment": /#.*/,
  "string": {
    pattern: /(["'])(?:\\.|(?!\1)[^\\\n_]|_(?!\1)[^])*\1/g,
    greedy: true
  },
  "number": /\b(?:\d+r[a-z\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b|\.\d+\b/i,
  "builtin-keyword": {
    pattern: /&(?:allocated|ascii|clock|collections|cset|current|date|dateline|digits|dump|e|error(?:number|text|value)?|errout|fail|features|file|host|input|[lu]case|letters|level|line|main|null|output|phi|pi|pos|progname|random|regions|source|storage|subject|time|trace|version)\b/,
    alias: "variable"
  },
  "directive": {
    pattern: /\$\w+/,
    alias: "builtin"
  },
  "keyword": /\b(?:break|by|case|create|default|do|else|end|every|fail|global|if|initial|invocable|link|local|next|not|of|procedure|record|repeat|return|static|suspend|then|to|until|while)\b/,
  "function": /\b(?!\d)\w+(?=\s*[({]|\s*!\s*\[)/,
  "operator": /[+-]:(?!=)|(?:[/?@^%&]|\+\+?|--?|~?==?=?|\*\*?|\|\|\|?|<(?:->?|<?=?)|>>?=?)(?::=)?|:=?:?|[!.\\|~]/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=icon.js.map
