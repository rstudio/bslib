import { l as languages } from "../../index-XEj74r-1.js";
languages.q = {
  "string": /"(?:\\.|[^\\\n"])*"/,
  "comment": [
    // From http://code.kx.com/wiki/Reference/Slash:
    // When / is following a space (or a right parenthesis, bracket, or brace), it is ignored with the rest of the line.
    {
      pattern: /([	 )\]}])\/.*/g,
      lookbehind: true,
      greedy: true
    },
    // From http://code.kx.com/wiki/Reference/Slash:
    // A line which has / as its first character and contains at least one other non-whitespace character is a whole-line comment and is ignored entirely.
    // A / on a line by itself begins a multiline comment which is terminated by the next \ on a line by itself.
    // If a / is not matched by a \, the multiline comment is unterminated and continues to end of file.
    // The / and \ must be the first char on the line, but may be followed by any amount of whitespace.
    {
      pattern: /^\/[ 	]*(?:\n(?:.*\n)*?(?:\\(?=[ 	]*$)|(?![^]))|\S.*)/mg,
      greedy: true
    },
    // From http://code.kx.com/wiki/Reference/Slash:
    // A \ on a line by itself with no preceding matching / will comment to end of file.
    {
      pattern: /^\\[ 	]*\n[^]+|^#!.+/mg,
      greedy: true
    }
  ],
  "symbol": /`(?::\S+|[\w.]*)/,
  "datetime": {
    pattern: /0N[mdzuvt]|0W[dtz]|\d{4}\.\d\d(?:m|\.\d\d(?:T(?:\d\d(?::\d\d(?::\d\d(?:[.:]\d\d\d)?)?)?)?)?[dz]?)|\d\d:\d\d(?::\d\d(?:[.:]\d\d\d)?)?[uvt]?/,
    alias: "number"
  },
  // The negative look-ahead prevents bad highlighting
  // of verbs 0: and 1:
  "number": /\b(?![01]:)(?:0N[hje]?|0W[hj]?|0[wn]|0x[a-fA-F\d]+|\d+(?:\.\d*)?(?:e[+-]?\d+)?[hjfeb]?)/,
  "keyword": /\\\w+|\b(?:abs|a?cos|aj0?|all|an[dy]|[ix]?asc|a?sin|asof|a?tan|attr|avgs?|binr?|ceiling|cols|cor|[hm]?count|cross|csv|cut|delete|deltas|[ix]?desc|[sm]?dev|differ|distinct|div|do|ej|enlist|except|exec|exit|f?by|fills|first|fkeys|flip|floor|from|get|getenv|[gl]time|hclose|hdel|hopen|hsym|identity|i[fjn]|insert|inter|inv|keys?|last|like|ljf?|lower|lsq|[lr]?trim|[mw]avg|maxs?|md5|med|meta|mins?|mmax|mmin|mmu|mod|[mw]sum|neg|next|not|null|or|over|parse|peach|pj|p?list|prds?|prior|rand|ratios|raze|read[01]|reciprocal|r?eval|reverse|r?load|rotate|[dr]?save|scan|s?cov|select|set|setenv|show|signum|sqrt|ssr?|string|sublist|sums?|sv|s?var|system|tables|til|txf|type|uj|ungroup|union|update|upper|upsert|value|views?|vs|where|while|within|wj1?|ww|xbar|xcols?|x?exp|x?group|xkey|x?log|x?prev|x?rank)\b/,
  "adverb": {
    pattern: /['/\\]:?|\beach\b/,
    alias: "function"
  },
  "verb": {
    pattern: /(?:\B\.\B|\b[01]:|<[=>]?|>=?|[:%,!?~=|$&#@^*+-]):?|\b_\b:?/,
    alias: "operator"
  },
  "punctuation": /[()[\]{}.;]/
};
//# sourceMappingURL=q.js.map
