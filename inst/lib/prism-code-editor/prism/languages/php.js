import { l as languages, t as tokenize, a as tokenizeText } from "../../index-XEj74r-1.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
import { e as embeddedIn } from "../../templating-CGPRy7qI.js";
import "./markup.js";
var comment = /\/\*[^]*?\*\/|\/\/.*|#(?!\[).*/;
var constant = [
  {
    pattern: /\b(?:false|true)\b/i,
    alias: "boolean"
  },
  {
    pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/gi,
    lookbehind: true,
    greedy: true
  },
  {
    pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/gi,
    lookbehind: true,
    greedy: true
  },
  /\b(?:null)\b/i,
  /\b[A-Z_][A-Z\d_]*\b(?!\s*\()/
];
var number = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[a-f\d]+(?:_[a-f\d]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i;
var operator = /<?=>|\?\?=?|\.{3}|\??->|[!=]==|::|--|\+\+|&&|\*\*=?|\|\||>>|<<|[?~]|[.%&|^!=<>/*+-]=?/;
var stringInterpolation = {
  pattern: /\{\$(?:[^{}]|\{(?:[^{}]|\{[^}]+\})*\})*\}|(^|[^\\{])\$+(?:\w+(?:\[[^\n[\]]*\]|->\w+)?)/,
  lookbehind: true
};
var string = [
  {
    pattern: /<<<'([^']+)'\n(?:.*\n)*?\1;/g,
    alias: "nowdoc-string",
    greedy: true,
    inside: {
      "delimiter": {
        pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
        alias: "symbol",
        inside: {
          "punctuation": /^<<<'?|[';]$/
        }
      }
    }
  },
  {
    pattern: /<<<(?:"([^"]+)"\n(?:.*\n)*?\1;|([a-z_]\w*)\n(?:.*\n)*?\2;)/gi,
    greedy: true,
    alias: "heredoc-string",
    inside: {
      "delimiter": {
        pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
        alias: "symbol",
        inside: {
          "punctuation": /^<<<"?|[";]$/
        }
      },
      "interpolation": stringInterpolation
    }
  },
  {
    pattern: /`(?:\\[^]|[^\\`])*`/g,
    alias: "backtick-quoted-string",
    greedy: true
  },
  {
    pattern: /'(?:\\[^]|[^\\'])*'/g,
    greedy: true,
    alias: "single-quoted-string"
  },
  {
    pattern: /"(?:\\[^]|[^\\"])*"/g,
    greedy: true,
    alias: "double-quoted-string",
    inside: {
      "interpolation": stringInterpolation
    }
  }
];
var php = stringInterpolation.inside = {
  "delimiter": {
    pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
    alias: "important"
  },
  "doc-comment": {
    pattern: /\/\*\*(?!\/)[^]*?\*\//g,
    greedy: true,
    alias: "comment",
    inside: "phpdoc"
  },
  "comment": comment,
  "string": string,
  "attribute": {
    pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*')+\](?=\s*[a-z$#])/img,
    greedy: true,
    inside: {
      "attribute-content": {
        pattern: /^(..)[^]+(?=.)/,
        lookbehind: true,
        // inside can appear subset of php
        inside: {
          "comment": comment,
          "string": string,
          "attribute-class-name": [
            {
              pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/gi,
              lookbehind: true,
              greedy: true,
              alias: "class-name"
            },
            {
              pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/gi,
              lookbehind: true,
              greedy: true,
              alias: "class-name class-name-fully-qualified",
              inside: {
                "punctuation": /\\/
              }
            }
          ],
          "constant": constant,
          "number": number,
          "operator": operator,
          "punctuation": clikePunctuation
        }
      },
      "delimiter": {
        pattern: /.+/,
        alias: "punctuation"
      }
    }
  },
  "variable": /\$+(?:\w+|(?=\{))/,
  "package": {
    pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
    lookbehind: true,
    inside: {
      "punctuation": /\\/
    }
  },
  "class-name-definition": {
    pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
    lookbehind: true,
    alias: "class-name"
  },
  "function-definition": {
    pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,
    lookbehind: true,
    alias: "function"
  },
  "keyword": [
    {
      pattern: /(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/gi,
      lookbehind: true,
      greedy: true,
      alias: "type-casting"
    },
    {
      pattern: /([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/gi,
      lookbehind: true,
      greedy: true,
      alias: "type-hint"
    },
    {
      pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|never|object|self|static|string|void)\b/gi,
      lookbehind: true,
      greedy: true,
      alias: "return-type"
    },
    {
      pattern: /\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/gi,
      alias: "type-declaration",
      greedy: true
    },
    {
      pattern: /(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/gi,
      lookbehind: true,
      greedy: true,
      alias: "type-declaration"
    },
    {
      pattern: /\b(?:parent|self|static)(?=\s*::)/gi,
      greedy: true,
      alias: "static-context"
    },
    {
      // yield from
      pattern: /(\byield\s+)from\b/gi,
      lookbehind: true
    },
    // `class` is always a keyword unlike other keywords
    /\bclass\b/i,
    {
      // https://www.php.net/manual/en/reserved.keywords.php
      //
      // keywords cannot be preceded by "->"
      // the complex lookbehind means `(?<!(?:->|::)\s*)`
      pattern: /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|[fx]?or|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|never|new|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|yield|__halt_compiler)\b/i,
      lookbehind: true
    }
  ],
  "argument-name": {
    pattern: /([(,]\s*)\b[a-z_]\w*(?=\s*:(?!:))/i,
    lookbehind: true
  },
  "class-name": [
    {
      pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/gi,
      lookbehind: true,
      greedy: true
    },
    {
      pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/gi,
      lookbehind: true,
      greedy: true
    },
    {
      pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/gi,
      greedy: true
    },
    {
      pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/gi,
      lookbehind: true,
      greedy: true,
      alias: "class-name-fully-qualified",
      inside: {
        "punctuation": /\\/
      }
    },
    {
      pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/gi,
      greedy: true,
      alias: "class-name-fully-qualified",
      inside: {
        "punctuation": /\\/
      }
    },
    {
      pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/gi,
      lookbehind: true,
      greedy: true,
      alias: "class-name-fully-qualified",
      inside: {
        "punctuation": /\\/
      }
    },
    {
      pattern: /\b[a-z_]\w*(?=\s*\$)/gi,
      greedy: true,
      alias: "type-declaration"
    },
    {
      pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/gi,
      greedy: true,
      alias: "class-name-fully-qualified type-declaration",
      inside: {
        "punctuation": /\\/
      }
    },
    {
      pattern: /\b[a-z_]\w*(?=\s*::)/gi,
      greedy: true,
      alias: "static-context"
    },
    {
      pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/gi,
      greedy: true,
      alias: "class-name-fully-qualified static-context",
      inside: {
        "punctuation": /\\/
      }
    },
    {
      pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/gi,
      lookbehind: true,
      greedy: true,
      alias: "type-hint"
    },
    {
      pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/gi,
      lookbehind: true,
      greedy: true,
      alias: "class-name-fully-qualified type-hint",
      inside: {
        "punctuation": /\\/
      }
    },
    {
      pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/gi,
      alias: "return-type",
      lookbehind: true,
      greedy: true
    },
    {
      pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/gi,
      lookbehind: true,
      greedy: true,
      alias: "class-name-fully-qualified return-type",
      inside: {
        "punctuation": /\\/
      }
    }
  ],
  "constant": constant,
  "function": {
    pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,
    lookbehind: true,
    inside: {
      "punctuation": /\\/
    }
  },
  "property": {
    pattern: /(->\s*)\w+/,
    lookbehind: true
  },
  "number": number,
  "operator": operator,
  "punctuation": clikePunctuation
};
var embedded = embeddedIn("html");
languages.php = {
  "php": {
    pattern: /<\?(?:[^"'/#]|\/(?![*/])|(["'])(?:\\[^]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^\n?]|\?(?!>))*(?=$|\?>|\n)|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/,
    alias: "language-php",
    inside: php
  },
  [tokenize]: (code, grammar) => {
    if (code.includes("<?")) return embedded(code, grammar);
    return tokenizeText(code, php);
  }
};
//# sourceMappingURL=php.js.map
