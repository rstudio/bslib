import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, b as boolean } from "../../patterns-Cp3h1ylA.js";
languages.gdscript = {
  "comment": /#.*/,
  "string": {
    pattern: /@?(?:(["'])(?:\\[^]|(?!\1)[^\\\n])*\1(?!"|')|"""(?:\\[^]|[^\\])*?""")/g,
    greedy: true
  },
  "class-name": {
    // class_name Foo, extends Bar, class InnerClass
    // export(int) var baz, export(int, 0) var i
    // as Node
    // const FOO: int = 9, var bar: bool = true
    // func add(reference: Item, amount: int) -> Item:
    pattern: /(^(?:class|class_name|extends)[ 	]+|^export\([ 	]*|\bas[ 	]+|(?:\b(?:const|var)[ 	]|[,(])[ 	]*\w+[ 	]*:[ 	]*|->[ 	]*)(?!\d)\w+/m,
    lookbehind: true
  },
  "keyword": /\b(?:and|as|assert|break|breakpoint|class|class_name|const|continue|elif|else|enum|export|extends|f?or|func|if|in|is|master|mastersync|match|not|null|onready|pass|preload|puppet|puppetsync|remote|remotesync|return|self|setget|signal|static|tool|var|while|yield)\b/,
  "function": /\b[a-z_]\w*(?=[ 	]*\()/i,
  "variable": /\$\w+/,
  "number": [
    /\b0b[01_]+\b|\b0x[a-fA-F\d_]+\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.[\d_]+)(?:e[+-]?[\d_]+)?\b/,
    /\b(?:INF|NAN|PI|TAU)\b/
  ],
  "constant": /\b[A-Z][A-Z_\d]*\b/,
  "boolean": boolean,
  "operator": /->|:=|&&|\|\||<<|>>|[%&|!=<>/*+-]=?|[~^]/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=gdscript.js.map
