import { l as languages } from "../../index-XEj74r-1.js";
languages.rest = {
  "table": [
    {
      pattern: /(^[ 	]*)(?:\+[=-]+)+\+\n(?:\1[+|].+[+|]\n)+\1(?:\+[=-]+)+\+/m,
      lookbehind: true,
      inside: {
        "punctuation": /\||(?:\+[=-]+)+\+/
      }
    },
    {
      pattern: /(^[ 	]*)=+ [ =]*=(?:\n\1.+)+\n\1=+ [ =]*=(?=\n\n|\s*$)/m,
      lookbehind: true,
      inside: {
        "punctuation": /[=-]+/
      }
    }
  ],
  // Directive-like patterns
  "substitution-def": {
    pattern: /(^[ 	]*\.\. )\|(?:[^|\s](?:[^|]*[^|\s])?)\| [^:]+::/m,
    lookbehind: true,
    inside: {
      "substitution": {
        pattern: /^\|(?:[^|\s]|[^|\s][^|]*[^|\s])\|/,
        alias: "attr-value",
        inside: {
          "punctuation": /^\||\|$/
        }
      },
      "directive": {
        pattern: /( )(?! )[^:]+::/,
        lookbehind: true,
        alias: "function",
        inside: {
          "punctuation": /::$/
        }
      }
    }
  },
  "link-target": [
    {
      pattern: /(^[ 	]*\.\. )\[[^\]]+\]/m,
      lookbehind: true,
      alias: "string",
      inside: {
        "punctuation": /^\[|\]$/
      }
    },
    {
      pattern: /(^[ 	]*\.\. )_(?:`[^`]+`|(?:\\.|[^\\:])+):/m,
      lookbehind: true,
      alias: "string",
      inside: {
        "punctuation": /^_|:$/
      }
    }
  ],
  "directive": {
    pattern: /(^[ 	]*\.\. )[^:]+::/m,
    lookbehind: true,
    alias: "function",
    inside: {
      "punctuation": /::$/
    }
  },
  "comment": {
    // The two alternatives try to prevent highlighting of blank comments
    pattern: /(^[ 	]*\.\.)(?:(?: .+)?(?:\n.+)+| .+)$/m,
    lookbehind: true
  },
  "title": [
    // Overlined and underlined
    {
      pattern: /^(([#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-])\2+)\n.+\n\1$/m,
      inside: {
        "punctuation": /^[#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-]+|[#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-]+$/,
        "important": /.+/
      }
    },
    // Underlined only
    {
      pattern: /(^|\n\n).+\n([#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-])\2+(?=\n|$)/,
      lookbehind: true,
      inside: {
        "punctuation": /[#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-]+$/,
        "important": /.+/
      }
    }
  ],
  "hr": {
    pattern: /(\n\n)([#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-])\2{3,}(?=\n\n)/,
    lookbehind: true,
    alias: "punctuation"
  },
  "field": {
    pattern: /(^[ 	]*):[^\n:]+:(?= )/m,
    lookbehind: true,
    alias: "attr-name"
  },
  "command-line-option": {
    pattern: /(^[ 	]*)(?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?(?:, (?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?)*(?=\n? {2,}\S)/im,
    lookbehind: true,
    alias: "symbol"
  },
  "literal-block": {
    pattern: /::\n\n([ 	]+)(?![ 	]).+(?:\n\1.+)*/,
    inside: {
      "literal-block-punctuation": {
        pattern: /^::/,
        alias: "punctuation"
      }
    }
  },
  "quoted-literal-block": {
    pattern: /::\n\n([#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-]).*(?:\n\1.*)*/,
    inside: {
      "literal-block-punctuation": {
        pattern: /^(?:::|([#$"'?@()[\]{}.,:;\\_`~%&|^!=<>/*+-])\1*)/m,
        alias: "punctuation"
      }
    }
  },
  "list-bullet": {
    pattern: /(^[ 	]*)(?:[*•‣⁃+-]|\(?(?:\d+|[a-z]|[ivxdclm]+)\)|(?:\d+|[a-z]|[ivxdclm]+)\.)(?= )/im,
    lookbehind: true,
    alias: "punctuation"
  },
  "doctest-block": {
    pattern: /(^[ 	]*)>>> .+(?:\n.+)*/m,
    lookbehind: true,
    inside: {
      "punctuation": /^>>>/
    }
  },
  "inline": [
    {
      pattern: /(^|[\s:/"'<([{-])(?::[^:]+:`.*?`|`.*?`:[^:]+:|(\*\*?|``?|\|)(?!\s)(?:(?!\2).)*\S\2(?![^\s.,:;!?\\/"')\]}-]))/m,
      lookbehind: true,
      inside: {
        "bold": {
          pattern: /(^\*\*).+(?=..)/,
          lookbehind: true
        },
        "italic": {
          pattern: /(^\*).+(?=.)/,
          lookbehind: true
        },
        "inline-literal": {
          pattern: /(^``).+(?=..)/,
          lookbehind: true,
          alias: "symbol"
        },
        "role": {
          pattern: /^:[^:]+:|:[^:]+:$/,
          alias: "function",
          inside: {
            "punctuation": /^:|:$/
          }
        },
        "interpreted-text": {
          pattern: /(^`).+(?=.)/,
          lookbehind: true,
          alias: "attr-value"
        },
        "substitution": {
          pattern: /(^\|).+(?=.)/,
          lookbehind: true,
          alias: "attr-value"
        },
        "punctuation": /.+/
      }
    }
  ],
  "link": [
    {
      pattern: /\[[^[\]]+\]_(?![^\s.,:;!?\\/"')\]}-])/,
      alias: "string",
      inside: {
        "punctuation": /^\[|\]_$/
      }
    },
    {
      pattern: /(?:\b[a-z\d]+(?:[_.:+][a-z\d]+)*_?_|`[^`]+`_?_|_`[^`]+`)(?![^\s.,:;!?\\/"')\]}-])/i,
      alias: "string",
      inside: {
        "punctuation": /^_?`|`$|`?_?_$/
      }
    }
  ],
  // Line block start,
  // quote attribution,
  // explicit markup start,
  // and anonymous hyperlink target shortcut (__)
  "punctuation": {
    pattern: /(^[ 	]*)(?:\|(?= |$)|(?:---?|—|\.\.|__)(?= )|\.\.$)/m,
    lookbehind: true
  }
};
//# sourceMappingURL=rest.js.map
