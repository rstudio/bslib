import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
languages.qasm = languages.openqasm = {
  "string": /"[^\n	"]*"|'[^\n	']*'/,
  "comment": clikeComment(),
  "keyword": /\b(?:CX|OPENQASM|U|barrier|boxas|boxto|break|const|continue|ctrl|def|defcal|defcalgrammar|delay|else|end|for|gate|gphase|if|include|inv?|kernel|lengthof|let|measure|pow|reset|return|rotary|stretchinf|while)\b|#pragma\b/,
  "class-name": /\b(?:angle|bit|bool|[cq]reg|fixed|float|length|qubit|stretch|u?int)\b/,
  "function": /\b(?:cos|exp|ln|popcount|rot[lr]|sin|sqrt|tan)\b(?=\s*\()/,
  "constant": /\b(?:euler|pi|tau)\b|π|𝜏|ℇ/,
  "number": {
    pattern: /(^|[^$\w.])(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?(?:dt|[nuµm]?s)?/i,
    lookbehind: true
  },
  "operator": /->|--|\+\+|&&|\|\||>>=?|<<=?|[~%&|^!=<>/*+-]=?|@/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=openqasm.js.map
