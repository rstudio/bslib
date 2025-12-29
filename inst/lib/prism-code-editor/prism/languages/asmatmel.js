import { l as languages } from "../../index-XEj74r-1.js";
var opCodes = "ad[cd]|adiw|andi?|asr|bclr|bld|br[bchtv][cs]|break|breq|br[gin]e|brid|brl[ot]|brmi|brpl|brsh|bse?t|cb[ir]|cl[chinrstvz]|com|cp[ci]?|cpse|de[cs]|eicall|eijmp|e?lpm|eor|f?mul|f?mulsu?|[ir]?call|[ir]?jmp|inc?|la[cst]|ld[a-z0-9]?|ls[lr]|movw?|neg|nop|ori?|out|pop|push|reti?|rol|ror|sbci?|sbi[csw]?|sbr[cs]?|se[chinrstvz]|sleep|spm|st[a-z0-9]?|subi?|swap|tst|wdr|xch";
languages.asmatmel = {
  "comment": /;.*/,
  "string": {
    pattern: /(["'`])(?:\\.|(?!\1)[^\\\n])*\1/g,
    greedy: true
  },
  "constant": /\b(?:PORT[A-Z]|DDR[A-Z]|(?:DD|P)[A-Z](?:\d|[0-2]\d|3[01]))\b/,
  "directive": {
    pattern: /\.\w+(?= )/,
    alias: "property"
  },
  "r-register": {
    pattern: /\br(?:\d|[12]\d|3[01])\b/,
    alias: "variable"
  },
  "op-code": {
    pattern: RegExp("\\b(?:" + opCodes.toUpperCase() + "|" + opCodes + ")\\b"),
    alias: "keyword"
  },
  "hex-number": {
    pattern: /#?\$[a-f\d]{2,4}\b/i,
    alias: "number"
  },
  "binary-number": {
    pattern: /#?%[01]+\b/,
    alias: "number"
  },
  "decimal-number": {
    pattern: /#?\b\d+\b/,
    alias: "number"
  },
  "register": {
    pattern: /\b[acznvshtixy]\b/i,
    alias: "variable"
  },
  "operator": /&[&=]?|\|[|=]?|>>=?|<<=?|[%?^!=<>/*+-]=?/,
  "punctuation": /[(),:]/
};
//# sourceMappingURL=asmatmel.js.map
