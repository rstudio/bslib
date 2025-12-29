import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
var expression = {
  pattern: /[^]+/
};
expression.inside = languages.brightscript = {
  "comment": /(?:\brem|').*/i,
  "directive-statement": {
    pattern: /(^[ 	]*)#(?:const|else(?:[ 	]+if)?|end[ 	]+if|error|if).*/im,
    lookbehind: true,
    alias: "property",
    inside: {
      "error-message": {
        pattern: /(^#error).+/,
        lookbehind: true
      },
      "directive": {
        pattern: /^#(?:const|else(?:[ 	]+if)?|end[ 	]+if|error|if)/,
        alias: "keyword"
      },
      "expression": expression
    }
  },
  "property": {
    pattern: /([\n{,][ 	]*)(?:(?!\d)\w+|"(?:[^\n"]|"")*"(?!"))(?=[ 	]*:)/g,
    lookbehind: true,
    greedy: true
  },
  "string": {
    pattern: /"(?:[^\n"]|"")*"(?!")/g,
    greedy: true
  },
  "class-name": {
    pattern: /(\bas[ 	]+)\w+/i,
    lookbehind: true
  },
  "keyword": /\b(?:as|dim|each|else|elseif|end|exit|for|function|goto|if|in|print|return|step|stop|sub|then|to|while)\b/i,
  "boolean": /\b(?:false|true)\b/i,
  "function": /\b(?!\d)\w+(?=[ 	]*\()/,
  "number": /(?:\b\d+(?:\.\d+)?(?:[ed][+-]\d+)?|&h[a-f\d]+)\b[%&!#]?/i,
  "operator": /--|\+\+|<>|>>=?|<<=?|[\\<>/*+-]=?|[?:^=]|\b(?:and|mod|not|or)\b/i,
  "punctuation": clikePunctuation,
  "constant": /\b(?:line_num)\b/i
};
//# sourceMappingURL=brightscript.js.map
