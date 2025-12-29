import { l as languages } from "../../index-XEj74r-1.js";
languages.eiffel = {
  "comment": /--.*/,
  "string": {
    pattern: /"([^[]*)\[[^]*?\]\1"|"([^{]*)\{[^]*?\}\2"|"(?:%(?:(?!\n)\s)*\n\s*%|%\S|[^%"\n])*"/g,
    greedy: true
  },
  // normal char | special char | char code
  "char": /'(?:%.|[^%'\n])+'/,
  "keyword": /\b(?:across|agent|alias|all|[ae]nd|as|assign|attached|attribute|check|class|convert|create|current|debug|deferred|detachable|do|else|elseif|ensure|expanded|export|external|feature|from|frozen|if|implies|inherit|inspect|invariant|like|local|loop|note?|obsolete|old|once|precursor|redefine|rename|require|rescue|result|retry|select|separate|some|[tw]hen|undefine|until|variant|void|x?or)\b/i,
  "boolean": /\b(?:false|true)\b/i,
  // Convention: class-names are always all upper-case characters
  "class-name": /\b[A-Z][A-Z\d_]*\b/,
  // hexa | octal | bin | decimal
  "number": /\b0[xcb][a-f\d](?:_*[a-f\d])*\b|(?:\b\d(?:_*\d)*)?\.(?:(?:\d(?:_*\d)*)?e[+-]?)?\d(?:_*\d)*\b|\b\d(?:_*\d)*\b\.?/i,
  "punctuation": /:=|<<|>>|\(\||\|\)|->|\.\b|[()[\]{},:;?]/,
  "operator": /\\\\|\|\.\.\||\.\.|\/[~/=]?|[<>]=?|[~^=*+-]/
};
//# sourceMappingURL=eiffel.js.map
