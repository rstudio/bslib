import { l as languages } from "../../index-XEj74r-1.js";
import { e as clikeNumber, b as boolean } from "../../patterns-Cp3h1ylA.js";
var interpolationContent = {
  pattern: /^(..)[^]+(?=.)/,
  lookbehind: true
};
var percentExpression = "(?:([^a-zA-Z\\d\\s{(\\[<=])(?:\\\\[\\s\\S]|(?!\\1)[^\\\\])*\\1|\\((?:\\\\[\\s\\S]|[^\\\\()]|\\((?:\\\\[\\s\\S]|[^\\\\()])*\\))*\\)|\\{(?:\\\\[\\s\\S]|[^\\\\{}]|\\{(?:\\\\[\\s\\S]|[^\\\\{}])*\\})*\\}|\\[(?:\\\\[\\s\\S]|[^\\\\[\\]]|\\[(?:\\\\[\\s\\S]|[^\\\\[\\]])*\\])*\\]|<(?:\\\\[\\s\\S]|[^\\\\<>]|<(?:\\\\[\\s\\S]|[^\\\\<>])*>)*>)";
var symbolName = '(?:"(?:\\\\.|[^\\\\\n"])*"|(?:\\b(?!\\d)\\w+|[^\\s\0-\\x7f]+)[?!]?|\\$.)';
var interpolation = {
  pattern: /((?:^|[^\\])(?:\\\\)*)#\{(?:[^{}]|\{[^}]*\})*\}/,
  lookbehind: true,
  inside: {
    "content": interpolationContent,
    "delimiter": {
      pattern: /.+/,
      alias: "punctuation"
    }
  }
};
interpolationContent.inside = languages.rb = languages.ruby = {
  "comment": {
    pattern: /#.*|^=begin\s[^]*?^=end/mg,
    greedy: true
  },
  "string-literal": [
    {
      pattern: RegExp("%[qQiIwWs]?" + percentExpression, "g"),
      greedy: true,
      inside: {
        "interpolation": interpolation,
        "string": /[^]+/
      }
    },
    {
      pattern: /(["'])(?:#\{[^}]+\}|#(?!\{)|\\[^]|(?!\1)[^\\#\n])*\1/g,
      greedy: true,
      inside: {
        "interpolation": interpolation,
        "string": /[^]+/
      }
    },
    {
      pattern: /<<[-~]?([a-z_]\w*)\n(?:.*\n)*?[ 	]*\1/gi,
      alias: "heredoc-string",
      greedy: true,
      inside: {
        "delimiter": {
          pattern: /^<<[-~]?[a-z_]\w*|\b[a-z_]\w*$/i,
          inside: {
            "symbol": /\w+/,
            "punctuation": /^<<[-~]?/
          }
        },
        "interpolation": interpolation,
        "string": /[^]+/
      }
    },
    {
      pattern: /<<[-~]?'([a-z_]\w*)'\n(?:.*\n)*?[ 	]*\1/gi,
      alias: "heredoc-string",
      greedy: true,
      inside: {
        "delimiter": {
          pattern: /^<<[-~]?'[a-z_]\w*'|\b[a-z_]\w*$/i,
          inside: {
            "symbol": /\w+/,
            "punctuation": /^<<[-~]?'|'$/
          }
        },
        "string": /[^]+/
      }
    }
  ],
  "command-literal": [
    {
      pattern: RegExp("%x" + percentExpression, "g"),
      greedy: true,
      inside: {
        "interpolation": interpolation,
        "command": {
          pattern: /[^]+/,
          alias: "string"
        }
      }
    },
    {
      pattern: /`(?:#\{[^}]+\}|#(?!\{)|\\[^]|[^\\`#\n])*`/g,
      greedy: true,
      inside: {
        "interpolation": interpolation,
        "command": {
          pattern: /[^]+/,
          alias: "string"
        }
      }
    }
  ],
  "class-name": {
    pattern: /(\b(?:class|module)\s+|\bcatch\s+\()[\w.\\]+|\b[A-Z_]\w*(?=\s*\.\s*new\b)/,
    lookbehind: true,
    inside: {
      "punctuation": /[.\\]/
    }
  },
  "regex-literal": [
    {
      pattern: RegExp(`%r${percentExpression}[egimnosux]{0,6}`, "g"),
      greedy: true,
      inside: {
        "interpolation": interpolation,
        "regex": /[^]+/
      }
    },
    {
      pattern: /(^|[^/])\/(?!\/)(?:\[[^\n\]]+\]|\\.|[^\\\n/[])+\/[egimnosux]{0,6}(?=\s*(?:$|[\n,.;})#]))/g,
      lookbehind: true,
      greedy: true,
      inside: {
        "interpolation": interpolation,
        "regex": /[^]+/
      }
    }
  ],
  "variable": /[@$]+(?!\d)\w+(?:[?!]|\b)/,
  "symbol": [
    {
      pattern: RegExp("(^|[^:]):" + symbolName, "g"),
      lookbehind: true,
      greedy: true
    },
    {
      pattern: RegExp("([\n{(,][ 	]*)" + symbolName + "(?=:(?!:))", "g"),
      lookbehind: true,
      greedy: true
    }
  ],
  "method-definition": {
    pattern: /(\bdef\s+)\w+(?:\s*\.\s*\w+)?/,
    lookbehind: true,
    inside: {
      "function": /\b\w+$/,
      "keyword": /^self\b/,
      "class-name": /^\w+/,
      "punctuation": /\./
    }
  },
  "keyword": /\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|f?or|if|in|include|module|new|next|nil|not|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|[tw]hen|throw|undef|unless|until|while|yield)\b/,
  "boolean": boolean,
  "builtin": /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,
  "constant": /\b[A-Z][A-Z\d_]*(?:[?!]|\b)/,
  "number": clikeNumber,
  "double-colon": {
    pattern: /::/,
    alias: "punctuation"
  },
  "operator": /\.{2,3}|&\.|===|<?=>|[!=]?~|(?:&&|\|\||<<|>>|\*\*|[%&|^!=<>/*+-])=?|[?:]/,
  "punctuation": /[()[\]{}.,;]/
};
//# sourceMappingURL=ruby.js.map
