import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, e as clikeNumber, b as boolean, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
languages.haxe = {
  "comment": clikeComment(),
  "string-interpolation": {
    pattern: /'(?:\\[^]|[^\\'])*'/g,
    greedy: true,
    inside: {
      "interpolation": {
        pattern: /(^|[^\\])\$(?:\w+|\{[^{}]+\})/,
        lookbehind: true,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\$\{?|\}$/,
            alias: "punctuation"
          },
          "expression": {
            pattern: /[^]+/,
            inside: "haxe"
          }
        }
      },
      "string": /[^]+/
    }
  },
  "string": {
    // Strings can be multi-line
    pattern: /"(?:\\[^]|[^\\"])*"/g,
    greedy: true
  },
  "regex": {
    pattern: /~\/(?:\\.|[^\\\n/])+\/[a-z]*/g,
    greedy: true,
    inside: {
      "regex-flags": /\w+$/,
      "regex-delimiter": /^~\/|\/$/,
      "regex-source": {
        pattern: /[^]+/,
        alias: "language-regex",
        inside: "regex"
      }
    }
  },
  "class-name": [
    {
      pattern: /(\b(?:abstract|class|enum|extends|implements|interface|new|typedef)\s+)[A-Z_]\w*/,
      lookbehind: true
    },
    // based on naming convention
    /\b[A-Z]\w*/
  ],
  "preprocessor": {
    pattern: /#(?:else|elseif|end|if)\b.*/,
    alias: "property"
  },
  "metadata": {
    pattern: /@:?[\w.]+/,
    alias: "symbol"
  },
  "reification": {
    pattern: /\$(?:\w+|(?=\{))/,
    alias: "important"
  },
  // The final look-ahead prevents highlighting of keywords if expressions such as "haxe.macro.Expr"
  "keyword": /\bthis\b|\b(?:abstract|as|break|cas[et]|catch|class|continue|default|do|dynamic|else|enum|extends|extern|final|for|from|function|if|implements|import|in|inline|interface|macro|new|null|operator|overload|override|package|private|public|return|static|super|switch|throw|to|try|typedef|untyped|using|var|while)(?!\.)\b/,
  "boolean": boolean,
  "function": {
    pattern: /\b[a-z_]\w*(?=\s*(?:<[^<>]*>\s*)?\()/gi,
    greedy: true
  },
  "number": clikeNumber,
  "operator": /--|\+\+|&&|\|\||->|=>|(?:<<?|>{1,3}|[%&|^!=/*+-])=?|[?:~]|\.{3}/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=haxe.js.map
