import { l as languages } from "../../index-XEj74r-1.js";
import { e as extend, i as insertBefore } from "../../language-DxUX0ITY.js";
import "./java.js";
var scala = languages.scala = extend("java", {
  "triple-quoted-string": {
    pattern: /"""[^]*?"""/g,
    greedy: true,
    alias: "string"
  },
  "string": {
    pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
    greedy: true
  },
  "keyword": /<-|=>|\b(?:abstract|case|[cm]atch|class|def|derives|do|else|enum|extends|extension|final|finally|for|forSome|given|if|implicit|import|infix|inline|lazy|new|null|object|opaque|open|override|package|private|protected|return|sealed|self|super|this|throw|trait|transparent|try|type|using|val|var|while|with|yield)\b/,
  "number": /\b0x(?:[a-f\d]*\.)?[a-f\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e\d+)?[dfl]?/i,
  "builtin": /\b(?:Any|AnyRef|AnyVal|Boolean|Byte|Char|Double|Float|Int|Long|Nothing|Short|String|Unit)\b/,
  "symbol": /'[^\d\s\\]\w*/
});
insertBefore(scala, "triple-quoted-string", {
  "string-interpolation": {
    pattern: /\b[a-z]\w*(?:"""(?:[^$]|\$(?:[^{]|\{(?:[^{}]|\{[^}]*\})*\}))*?"""|"(?:[^$"\n]|\$(?:[^{]|\{(?:[^{}]|\{[^}]*\})*\}))*")/ig,
    greedy: true,
    inside: {
      "id": {
        pattern: /^\w+/g,
        greedy: true,
        alias: "function"
      },
      "escape": {
        pattern: /\\\$"|\$[$"]/g,
        greedy: true,
        alias: "symbol"
      },
      "interpolation": {
        pattern: /\$(?:\w+|\{(?:[^{}]|\{[^}]*\})*\})/g,
        greedy: true,
        inside: {
          "punctuation": /^\$\{?|\}$/,
          "expression": {
            pattern: /[^]+/,
            inside: scala
          }
        }
      },
      "string": /[^]+/
    }
  }
});
delete scala["class-name"];
delete scala["function"];
delete scala["constant"];
//# sourceMappingURL=scala.js.map
