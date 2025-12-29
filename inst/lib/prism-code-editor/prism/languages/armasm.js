import { l as languages } from "../../index-XEj74r-1.js";
languages["arm-asm"] = languages.armasm = {
  "comment": {
    pattern: /;.*/g,
    greedy: true
  },
  "string": {
    pattern: /"(?:[^\n"]|"")*"/g,
    greedy: true,
    inside: {
      "variable": {
        pattern: /((?:^|[^$])(?:\$\$)*)\$\w+/,
        lookbehind: true
      }
    }
  },
  "char": {
    pattern: /'(?:[^\n']{0,4}|'')'/g,
    greedy: true
  },
  "version-symbol": {
    pattern: /\|[\w@]+\|/g,
    greedy: true,
    alias: "property"
  },
  "boolean": /\b(?:FALSE|TRUE)\b/,
  "directive": {
    pattern: /\b(?:ALIAS|ALIGN|AREA|ARM|ASSERT|ATTR|CN|CODE|CODE16|CODE32|COMMON|CP|DATA|DC[BDIQW]|DCD[OU]|DCFDU?|DC[QW]U|DN|ELIF|ELSE|ENDFUNC|ENDIF|ENDP?|ENTRY|EQU|EXPORT|EXPORTAS|EXTERN|FIELD|FILL|FN|FUNCTION|GBL[ALS]|GET|GLOBAL|IF|IMPORT|INCBIN|INCLUDE|INFO|KEEP|LCL[ALS]|LTORG|MACRO|MAP|MEND|MEXIT|NOFP|OPT|PRESERVE8|PROC|QN|READONLY|RELOC|REQUIRE8?|RLIST|ROUT|SET[ALS]|SN|SPACE|SUBT|THUMBX?|TTL|WEND|WHILE)\b/,
    alias: "property"
  },
  "instruction": {
    pattern: /((?:^|(?:^|[^\\])\n)[ 	]*(?:(?:[A-Z][A-Z\d_]*[a-z]\w*|[a-z]\w*|\d+)[ 	]+)?)\b[A-Z.]+\b/,
    lookbehind: true,
    alias: "keyword"
  },
  "variable": /\$\w+/,
  "number": /(?:\b[2-9]_\d+|(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:e-?\d+)?|\b0(?:[fd]_|x)[a-f\d]+|&[a-f\d]+)\b/i,
  "register": {
    pattern: /\b(?:r\d|lr)\b/,
    alias: "symbol"
  },
  "operator": /<>|>>|<<|&&|\|\||[!=<>/]=?|[%&|^#?*+-]|:[A-Z]+:/,
  "punctuation": /[()[\],]/
};
//# sourceMappingURL=armasm.js.map
