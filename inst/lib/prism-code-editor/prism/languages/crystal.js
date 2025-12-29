import { l as languages } from "../../index-XEj74r-1.js";
import { e as extend, i as insertBefore } from "../../language-DxUX0ITY.js";
import "./ruby.js";
var crystal = languages.crystal = extend("ruby", {
  "keyword": {
    pattern: /\b(?:__DIR__|__END_LINE__|__FILE__|__LINE__|abstract|alias|annotation|asm?|begin|break|case|class|def|do|else|elsif|end|ensure|enum|extend|for|fun|if|ifdef|include|instance_sizeof|lib|macro|module|next|of|out|pointerof|private|protected|ptr|require|rescue|return|select|self|sizeof|struct|super|[tw]hen|type|typeof|undef|uninitialized|union|unless|until|while|with|yield)\b|(\.\s*)(?:is_a|responds_to)\?/,
    lookbehind: true
  },
  "number": /\b(?:0b[01_]*[01]|0o[0-7_]*[0-7]|0x[a-fA-F\d_]*[a-fA-F\d]|(?:\d(?:[\d_]*\d)?)(?:\.[\d_]*\d)?(?:[eE][+-]?[\d_]*\d)?)(?:_(?:[uif](?:8|16|32|64))?)?\b/,
  "operator": [
    /->/,
    languages.ruby.operator
  ],
  "punctuation": /[()[\]{}.,;\\]/
});
insertBefore(crystal, "string-literal", {
  "attribute": {
    pattern: /@\[.*?\]/,
    inside: {
      "delimiter": {
        pattern: /^@\[|\]$/,
        alias: "punctuation"
      },
      "attribute": {
        pattern: /^(\s*)\w+/,
        lookbehind: true,
        alias: "class-name"
      },
      "args": {
        pattern: /\S(?:.*\S)?/,
        inside: crystal
      }
    }
  },
  "expansion": {
    pattern: /\{(?:\{.*?\}|%.*?%)\}/,
    inside: {
      "content": {
        pattern: /^(..).+(?=..)/,
        lookbehind: true,
        inside: crystal
      },
      "delimiter": {
        pattern: /../,
        alias: "operator"
      }
    }
  },
  "char": {
    pattern: /'(?:[^\\\n]{1,2}|\\(?:.|u(?:[a-fA-F\d]{1,4}|\{[a-fA-F\d]{1,6}\})))'/g,
    greedy: true
  }
});
//# sourceMappingURL=crystal.js.map
