import { l as languages } from "../../index-XEj74r-1.js";
import { c as clikeString } from "../../patterns-Cp3h1ylA.js";
languages.iecst = {
  "comment": /\/\/.*|\/\*[^]*?(?:\*\/|$)|\(\*[^]*?(?:\*\)|$)|\{[^}]*}?/g,
  "string": clikeString(),
  "keyword": [
    /\b(?:end_)?(?:program|configuration|interface|function_block|function|action|transition|type|struct|(?:initial_)?step|namespace|library|channel|folder|resource|var_(?:access|config|external|global|input|in_out|output|temp)|var|method|property)\b/i,
    /\b(?:AT|BY|(?:END_)?(?:CASE|FOR|IF|REPEAT|WHILE)|CONSTANT|CONTINUE|DO|ELSE|ELSIF|EXIT|EXTENDS|FROM|[GS]ET|GOTO|IMPLEMENTS|JMP|NON_RETAIN|OF|PRIVATE|PROTECTED|PUBLIC|RETAIN|RETURN|TASK|THEN|TO|UNTIL|USING|WITH|__CATCH|__ENDTRY|__FINALLY|__TRY)\b/
  ],
  "class-name": /\b(?:ANY|ARRAY|BOOL|BYTE|U?(?:D|L|S)?INT|(?:D|L)?WORD|DATE(?:_AND_TIME)?|DT|L?REAL|POINTER|STRING|TIME(?:_OF_DAY)?|TOD)\b/,
  "address": {
    pattern: /%[IQM][XBWDL][\d.]*|%[IQ][\d.]*/,
    alias: "symbol"
  },
  "number": /\b(?:16#[a-f\d]+|2#[01_]+|0x[a-f\d]+)\b|\b(?:dt?|t|tod)#[\d_shmd:]*|\b[a-z]*#[\d.,_]*|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  "boolean": /\b(?:FALSE|TRUE|NULL)\b/,
  "operator": /S?R?:?=>?|&&|\*\*|<>|<=|>=|[:#&^<>/*+-]|\b(?:AND|EQ|EXPT|[GL][ET]|MOD|NE|NOT|X?OR)\b/,
  "function": /\b[a-z_]\w*(?=\s*\()/i,
  "punctuation": /[()[\].,;]/
};
//# sourceMappingURL=iecst.js.map
