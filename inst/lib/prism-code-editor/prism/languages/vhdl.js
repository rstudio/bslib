import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
languages.vhdl = {
  "comment": /--.+/,
  // support for all logic vectors
  "vhdl-vectors": {
    "pattern": /\b[oxb]"[a-f\d_]+"|"[01uxzwlh-]+"/i,
    "alias": "number"
  },
  // support for operator overloading included
  "quoted-function": {
    pattern: /"\S+?"(?=\()/,
    alias: "function"
  },
  "string": /"(?:\\[^]|[^\\\n"])*"/,
  "attribute": {
    pattern: /\b'\w+/,
    alias: "attr-name"
  },
  // support for predefined attributes included
  "keyword": /\b(?:access|after|alias|all|architecture|array|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|constant|disconnect|downto|else|elsif|end|entity|exit|file|for|function|generate|generic|group|guarded|impure|inertial|inout|i[fns]|label|library|linkage|literal|loop|map|new|next|null|of|on|open|others|out|package|port|postponed|private|procedure|process|pure|range|record|register|reject|report|return|select|severity|shared|signal|subtype|[tw]hen|to|transport|type|unaffected|units|until|use|variable|view|wait|while|with)\b/i,
  "boolean": /\b(?:false|true)\b/i,
  "function": /\w+(?=\()/,
  // decimal, based, physical, and exponential numbers supported
  "number": /'[01uxzwlh-]'|\b(?:\d+#[a-f\d_.]+#|\d[\d_.]*)(?:e[-+]?\d+)?/i,
  "operator": /[<>]=?|:=|[&=/*+-]|\b(?:abs|n?and|mod|x?n?or|not|rem|ro[lr]|s[lr][al])\b/i,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=vhdl.js.map
