import { l as languages } from "../../index-XEj74r-1.js";
import { e as extend } from "../../language-DxUX0ITY.js";
var asm = {
  pattern: /(\basm\b)[^]+?(?=\bend\s*[;[])/gi,
  lookbehind: true,
  greedy: true
};
languages.objectpascal = asm.inside = languages.pascal = {
  "directive": {
    pattern: /\{\$[^]*?\}/g,
    greedy: true,
    alias: "marco property"
  },
  "comment": {
    pattern: /\(\*[^]*?\*\)|\{[^]*?\}|\/\/.*/g,
    greedy: true
  },
  "string": {
    pattern: /(?:'(?:''|[^\n'])*'(?!')|#[&$%]?[a-f\d]+)+|\^[a-z]/gi,
    greedy: true
  },
  "asm": asm,
  "keyword": [
    {
      // Turbo Pascal
      pattern: /(^|[^&])\b(?:absolute|array|asm|begin|case|const|constructor|destructor|do|downto|else|end|file|for|function|goto|if|implementation|inherited|inline|interface|label|nil|object|of|operator|packed|procedure|program|record|reintroduce|repeat|self|set|string|then|to|type|unit|until|uses|var|while|with)\b/i,
      lookbehind: true
    },
    {
      // Free Pascal
      pattern: /(^|[^&])\b(?:dispose|exit|false|true|new)\b/i,
      lookbehind: true
    },
    {
      // Object Pascal
      pattern: /(^|[^&])\b(?:class|dispinterface|except|exports|finalization|finally|initialization|inline|library|on|out|packed|property|raise|resourcestring|threadvar|try)\b/i,
      lookbehind: true
    },
    {
      // Modifiers
      pattern: /(^|[^&])\b(?:absolute|abstract|alias|assembler|bitpacked|break|cdecl|continue|cppdecl|cvar|default|deprecated|dynamic|enumerator|experimental|export|external|far|far16|forward|generic|helper|implements|index|interrupt|iochecks|local|message|name|near|nodefault|noreturn|nostackframe|oldfpccall|otherwise|overload|override|pascal|platform|private|protected|public|published|read|register|reintroduce|result|safecall|saveregisters|softfloat|specialize|static|stdcall|stored|strict|unaligned|unimplemented|varargs|virtual|write)\b/i,
      lookbehind: true
    }
  ],
  // Hexadecimal, octal and binary, Decimal
  "number": /[&%]\d+|\$[a-f\d]+|\b\d+(?:\.\d+)?(?:e[+-]?\d+)?/i,
  "operator": {
    pattern: /\.\.|\*\*|:=|<>|>>|<<|[<>/*+-]=?|[@^=]|(^|[^&])\b(?:and|as|div|exclude|in|include|is|mod|not|x?or|sh[lr])\b/,
    lookbehind: true
  },
  "punctuation": /\(\.|\.\)|[()[\].,:;]/
};
asm.inside = extend("pascal", {
  "asm": void 0,
  "keyword": void 0,
  "operator": void 0
});
//# sourceMappingURL=pascal.js.map
