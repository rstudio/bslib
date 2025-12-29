import { l as languages } from "../../index-XEj74r-1.js";
var SortedBNF = (grammar) => {
  for (var key in grammar) {
    grammar[key] = grammar[key].replace(/<[\w ]+>/g, (key2) => `(?:${grammar[key2]})`);
  }
  return RegExp(grammar[key], "i");
};
languages.scheme = {
  // this supports "normal" single-line comments:
  //   ; comment
  // and (potentially nested) multiline comments:
  //   #| comment #| nested |# still comment |#
  // (only 1 level of nesting is supported)
  "comment": /;.*|#;\s*(?:\((?:[^()]|\([^)]*\))*\)|\[(?:[^[\]]|\[[^\]]*\])*\])|#\|(?:[^#|]|#(?!\|)|\|(?!#)|#\|(?:[^#|]|#(?!\|)|\|(?!#))*\|#)*\|#/,
  "string": {
    pattern: /"(?:\\.|[^\\"])*"/g,
    greedy: true
  },
  "symbol": {
    pattern: /'[^()[\]#'\s]+/g,
    greedy: true
  },
  "char": {
    pattern: /#\\(?:[ux][a-fA-F\d]+\b|[-a-zA-Z]+\b|[\ud800-\udbff][\udc00-\udfff]|\S)/g,
    greedy: true
  },
  "lambda-parameter": [
    // https://www.cs.cmu.edu/Groups/AI/html/r4rs/r4rs_6.html#SEC30
    {
      pattern: /((?:^|[^'`#])[([]lambda\s+)(?:[^\s()[\]'|]+|\|(?:\\.|[^\\|])*\|)/,
      lookbehind: true
    },
    {
      pattern: /((?:^|[^'`#])[([]lambda\s+[([])[^()[\]']+/,
      lookbehind: true
    }
  ],
  "keyword": {
    pattern: /((?:^|[^'`#])[([])(?:begin|case(?:-lambda)?|cond(?:-expand)?|define(?:-library|-macro|-record-type|-syntax|-values)?|defmacro|delay(?:-force)?|do|else|except|export|guard|if|import|include(?:-ci|-library-declarations)?|lambda|let(?:rec)?(?:-syntax|-values|\*)?|let\*-values|only|parameterize|prefix|(?:quasi-?)?quote|rename|set!|syntax-(?:case|rules)|unless|unquote(?:-splicing)?|when)(?![^()[\]\s])/,
    lookbehind: true
  },
  "builtin": {
    // all functions of the base library of R7RS plus some of built-ins of R5Rs
    pattern: /((?:^|[^'`#])[([])(?:abs|and|append|apply|assoc|ass[qv]|binary-port\?|boolean=?\?|bytevector(?:-append|-copy!?|-length|-u8-ref|-u8-set!|\?)?|caar|cadr|call-with-(?:current-continuation|port|values)|call\/cc|car|cdar|cddr|cdr|ceiling|char(?:->integer|-ready\?|\?|<\?|<=\?|=\?|>\?|>=\?)|close-(?:input-port|output-port|port)|complex\?|cons|current-(?:error|input|output)-port|denominator|dynamic-wind|eof-object\??|eq\?|equal\?|eqv\?|error|error-object(?:-irritants|-message|\?)|eval|even\?|exact(?:-integer-sqrt|-integer\?|\?)?|expt|features|file-error\?|floor(?:-quotient|-remainder|\/)?|flush-output-port|for-each|gcd|get-output-(?:bytevector|string)|inexact\??|input-port(?:-open\?|\?)|integer(?:->char|\?)|lcm|length|list(?:->string|->vector|-copy|-ref|-set!|-tail|\?)?|make-(?:bytevector|list|parameter|string|vector)|map|max|member|mem[qv]|min|modulo|negative\?|newline|not|null\?|number(?:->string|\?)|numerator|odd\?|open-(?:input|output)-(?:bytevector|string)|or|output-port(?:-open\?|\?)|pair\?|peek-char|peek-u8|port\?|positive\?|procedure\?|quotient|raise|raise-continuable|rational\?|rationalize|read-(?:bytevector|bytevector!|char|error\?|line|string|u8)|real\?|remainder|reverse|round|set-c[ad]r!|square|string(?:->list|->number|->symbol|->utf8|->vector|-append|-copy!?|-fill!|-for-each|-length|-map|-ref|-set!|\?|<\?|<=\?|=\?|>\?|>=\?)?|substring|symbol(?:->string|\?|=\?)|syntax-error|textual-port\?|truncate(?:-quotient|-remainder|\/)?|u8-ready\?|utf8->string|values|vector(?:->list|->string|-append|-copy!?|-fill!|-for-each|-length|-map|-ref|-set!|\?)?|with-exception-handler|write-(?:bytevector|char|string|u8)|zero\?)(?![^()[\]\s])/,
    lookbehind: true
  },
  "operator": {
    pattern: /((?:^|[^'`#])[([])(?:[%/*+-]|[<>]=?|=>?)(?![^()[\]\s])/,
    lookbehind: true
  },
  "number": {
    // The number pattern from [the R7RS spec](https://small.r7rs.org/attachment/r7rs.pdf).
    //
    // <number>      := <num 2>|<num 8>|<num 10>|<num 16>
    // <num R>       := <prefix R><complex R>
    // <complex R>   := <real R>(?:@<real R>|<imaginary R>)?|<imaginary R>
    // <imaginary R> := [+-](?:<ureal R>|(?:inf|nan)\.0)?i
    // <real R>      := [+-]?<ureal R>|[+-](?:inf|nan)\.0
    // <ureal R>     := <uint R>(?:\/<uint R>)?
    //                | <decimal R>
    //
    // <decimal 10>  := (?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?
    // <uint R>      := <digit R>+
    // <prefix R>    := <radix R>(?:#[ei])?|(?:#[ei])?<radix R>
    // <radix 2>     := #b
    // <radix 8>     := #o
    // <radix 10>    := (?:#d)?
    // <radix 16>    := #x
    // <digit 2>     := [01]
    // <digit 8>     := [0-7]
    // <digit 10>    := \d
    // <digit 16>    := [a-f\d]
    //
    // The problem with this grammar is that the resulting regex is way to complex, so we simplify by grouping all
    // non-decimal bases together. This results in a decimal (dec) and combined binary, octal, and hexadecimal (box)
    // pattern:
    pattern: SortedBNF({
      "<ureal dec>": "\\d+(?:/\\d+)|(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[esfdl][+-]?\\d+)?",
      "<real dec>": "[+-]?<ureal dec>|[+-](?:inf|nan)\\.0",
      "<imaginary dec>": "[+-](?:<ureal dec>|(?:inf|nan)\\.0)?i",
      "<complex dec>": "<real dec>(?:@<real dec>|<imaginary dec>)?|<imaginary dec>",
      "<num dec>": "(?:#d(?:#[ei])?|#[ei](?:#d)?)?<complex dec>",
      "<ureal box>": "[a-f\\d]+(?:/[a-f\\d]+)?",
      "<real box>": "[+-]?<ureal box>|[+-](?:inf|nan)\\.0",
      "<imaginary box>": "[+-](?:<ureal box>|(?:inf|nan)\\.0)?i",
      "<complex box>": "<real box>(?:@<real box>|<imaginary box>)?|<imaginary box>",
      "<num box>": "#[box](?:#[ei])?|(?:#[ei])?#[box]<complex box>",
      "<number>": "(^|[()[\\]\\s])(?:<num dec>|<num box>)(?![^()[\\]\\s])"
    }),
    lookbehind: true
  },
  "boolean": {
    pattern: /(^|[()[\]\s])#(?:[ft]|false|true)(?![^()[\]\s])/,
    lookbehind: true
  },
  "function": {
    pattern: /((?:^|[^'`#])[([])(?:[^|()[\]'\s]+|\|(?:\\.|[^\\|])*\|)(?![^()[\]\s])/,
    lookbehind: true
  },
  "identifier": {
    pattern: /(^|[()[\]\s])\|(?:\\.|[^\\|])*\|(?![^()[\]\s])/g,
    lookbehind: true,
    greedy: true
  },
  "punctuation": /[()[\]']/
};
//# sourceMappingURL=scheme.js.map
