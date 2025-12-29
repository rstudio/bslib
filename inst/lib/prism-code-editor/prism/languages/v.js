import { l as languages } from "../../index-XEj74r-1.js";
import { e as extend, i as insertBefore } from "../../language-DxUX0ITY.js";
import "./clike.js";
var interpolationExpr = {
  pattern: /[^]+/
};
var generic = {
  "punctuation": /<|>/,
  "class-name": /\w+/
};
var v = interpolationExpr.inside = languages.v = extend("clike", {
  "string": {
    pattern: /r?(["'])(?:\\[^]|(?!\1)[^\\\n])*\1/g,
    alias: "quoted-string",
    greedy: true,
    inside: {
      "interpolation": {
        pattern: /((?:^|[^\\])(?:\\\\)*)\$(?:\{[^{}]*\}|\w+(?:\.\w+(?:\([^\(\)]*\))?|\[[^[\]]+\])*)/,
        lookbehind: true,
        inside: {
          "interpolation-variable": {
            pattern: /^\$\w[^]*$/,
            alias: "variable"
          },
          "interpolation-punctuation": {
            pattern: /^\$\{|\}$/,
            alias: "punctuation"
          },
          "interpolation-expression": interpolationExpr
        }
      }
    }
  },
  "class-name": {
    pattern: /(\b(?:enum|interface|struct|type)\s+)(?:C\.)?\w+/,
    lookbehind: true
  },
  "keyword": /(?:\b(?:__global|asm?|assert|atomic|break|chan|const|continue|defer|else|embed|enum|fn|f?or|goto|go|i[fns]|import|interface|match|module|mut|none|pub|return|r?lock|select|shared|sizeof|static|struct|typeof|type|union|unsafe)|\$(?:else|for|if)|#(?:flag|include))\b/,
  "number": /\b(?:0x[a-f\d]+(?:_[a-f\d]+)*|0b[01]+(?:_[01]+)*|0o[0-7]+(?:_[0-7]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?)\b/i,
  "operator": /--|\+\+|\|\||&&|&\^=?|<-|<<=?|>>=?|[%&|^!=<>/*+-]=?|:=|\.{2,3}|[~?]/,
  "builtin": /\b(?:any(?:_float|_int)?|bool|byte(?:ptr)?|charptr|f(?:32|64)|[iu](?:16|64|128)|i8|int|rune|size_t|string|voidptr)\b/
});
insertBefore(v, "string", {
  "char": {
    pattern: /`(?:\\`|\\?[^`]{1,2})`/,
    // using {1,2} instead of `u` flag for compatibility
    alias: "rune"
  }
});
insertBefore(v, "operator", {
  "attribute": {
    pattern: /(^[ 	]*)\[(?:deprecated|direct_array_access|flag|inline|live|ref_only|typedef|unsafe_fn|windows_stdcall)\]/m,
    lookbehind: true,
    alias: "annotation",
    inside: {
      "punctuation": /[[\]]/,
      "keyword": /\w+/
    }
  },
  "generic": {
    pattern: /<\w+>(?=\s*[\)\{])/,
    inside: generic
  }
});
insertBefore(v, "function", {
  "generic-function": {
    // e.g. foo<T>( ...
    pattern: /\b\w+\s*<\w+>(?=\()/,
    inside: {
      "function": /^\w+/,
      "generic": {
        pattern: /<\w+>/,
        inside: generic
      }
    }
  }
});
//# sourceMappingURL=v.js.map
