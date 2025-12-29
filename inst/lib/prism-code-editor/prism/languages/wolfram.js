import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
languages.nb = languages.wl = languages.mathematica = languages.wolfram = {
  "comment": (
    // Allow one level of nesting - note: regex taken from applescipt
    /\(\*(?:\(\*(?:[^*]|\*(?!\)))*\*\)|(?!\(\*)[^])*?\*\)/
  ),
  "string": {
    pattern: /"(?:\\.|[^\\\n"])*"/g,
    greedy: true
  },
  "keyword": /\b(?:Abs|AbsArg|Accuracy|Block|Do|For|Function|If|Manipulate|Module|Nest|NestList|None|Return|Switch|Table|Which|While)\b/,
  "context": {
    pattern: /\b\w+`+\w*/,
    alias: "class-name"
  },
  "blank": {
    pattern: /\b\w+_\b/,
    alias: "regex"
  },
  "global-variable": {
    pattern: /\$\w+/,
    alias: "variable"
  },
  "boolean": /\b(?:False|True)\b/,
  "number": /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[a-f\d])[a-f\d]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  "operator": /[/=]\.|:>|\|?->|<-|@@?@?|\/@|=?[!=]?=|\^?:?=|\*\*?=?|\/\/?=?|[/+-]=?|<[<|=>]?|>[|=>]?|[;&|^~]/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=wolfram.js.map
