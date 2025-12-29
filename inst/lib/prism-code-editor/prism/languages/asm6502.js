import { l as languages } from "../../index-XEj74r-1.js";
var opCodes = "adc|and|asl|bcc|bcs|beq|bit|bmi|bne|bpl|brk|bvc|bvs|cl[cdiv]|cmp|cpx|cpy|de[cxy]|eor|in[cxy]|jmp|jsr|ld[axy]|lsr|nop|ora|pha|php|pla|plp|rol|ror|rti|rts|sbc|se[cdi]|st[axy]|tax|tay|tsx|txa|txs|tya";
languages.asm6502 = {
  "comment": /;.*/,
  "directive": {
    pattern: /\.\w+(?= )/,
    alias: "property"
  },
  "string": /(["'`])(?:\\.|(?!\1)[^\\\n])*\1/,
  "op-code": {
    pattern: RegExp("\\b(?:" + opCodes.toUpperCase() + "|" + opCodes + ")\\b"),
    alias: "keyword"
  },
  "hex-number": {
    pattern: /#?\$[a-f\d]{1,4}\b/i,
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
    pattern: /\b[xya]\b/i,
    alias: "variable"
  },
  "punctuation": /[(),:]/
};
//# sourceMappingURL=asm6502.js.map
