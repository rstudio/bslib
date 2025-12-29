import { l as languages } from "../../index-XEj74r-1.js";
var attributes = {
  pattern: /(^[ 	]*)\[(?!\[)(?:(["'$`])(?:\\.|(?!\2)[^\\])*\2|\[(?:\\.|[^\\[\]])*\]|\\.|[^\\"'[\]$`])*\]/m,
  lookbehind: true,
  inside: {
    "quoted": {
      pattern: /([$`])(?:\\.|(?!\1)[^\\])*\1/,
      inside: {
        "punctuation": /^[$`]|[$`]$/
      }
    },
    "interpreted": {
      pattern: /'(?:\\.|[^\\'])*'/,
      inside: {
        "punctuation": /^'|'$/
        // See rest below
      }
    },
    "string": /"(?:\\.|[^\\"])*"/,
    "variable": /\w+(?==)/,
    "punctuation": /^\[|\]$|,/,
    "operator": /=/,
    // The negative look-ahead prevents blank matches
    "attr-value": /(?!^\s+$).+/
  }
};
var asciidoc = languages.adoc = languages.asciidoc = {
  "comment-block": {
    pattern: /^(\/{4,})$[^]*?^\1/m,
    alias: "comment"
  },
  "table": {
    pattern: /^\|={3,}(?:\n.*)*?\n\|={3,}$/m,
    inside: {
      "specifiers": {
        pattern: /(?:(?:(?:\d+(?:\.\d+)?|\.\d+)[+*](?:[<^>](?:\.[<^>])?|\.[<^>])?|[<^>](?:\.[<^>])?|\.[<^>])[a-z]*|[a-z]+)(?=\|)/,
        alias: "attr-value"
      },
      "punctuation": {
        pattern: /(^|[^\\])[|!]=*/,
        lookbehind: true
      }
      // See rest below
    }
  },
  "passthrough-block": {
    pattern: /^(\+{4,})$[^]*?^\1$/m,
    inside: {
      "punctuation": /^\++|\++$/
      // See rest below
    }
  },
  // Literal blocks and listing blocks
  "literal-block": {
    pattern: /^(-{4,}|\.{4,})$[^]*?^\1$/m,
    inside: {
      "punctuation": /^(?:-+|\.+)|(?:-+|\.+)$/
      // See rest below
    }
  },
  // Sidebar blocks, quote blocks, example blocks and open blocks
  "other-block": {
    pattern: /^(--|\*{4,}|_{4,}|={4,})$[^]*?^\1$/m,
    inside: {
      "punctuation": /^(?:-+|\*+|_+|=+)|(?:-+|\*+|_+|=+)$/
      // See rest below
    }
  },
  // list-punctuation and list-label must appear before indented-block
  "list-punctuation": {
    pattern: /(^[ 	]*)(?:-|\*{1,5}|\.{1,5}|(?:[a-z]|\d+)\.|[xvi]+\))(?= )/im,
    lookbehind: true,
    alias: "punctuation"
  },
  "list-label": {
    pattern: /(^[ 	]*)[a-z\d].+(?::{2,4}|;;)(?!\S)/im,
    lookbehind: true,
    alias: "symbol"
  },
  "indented-block": {
    pattern: /(\n\n)([ 	]+)\S.*(?:\n\2.+)*(?=\n\n|$)/,
    lookbehind: true
  },
  "comment": /^\/\/.*/m,
  "title": {
    pattern: /^.+\n(?:={3,}|-{3,}|~{3,}|\^{3,}|\+{3,})$|^={1,5} .+|^\.(?![\s.]).*/m,
    alias: "important",
    inside: {
      "punctuation": /^(?:\.|=+)|(?:=+|-+|~+|\^+|\++)$/
      // See rest below
    }
  },
  "attribute-entry": {
    pattern: /^:[^\n:]+:(?: .*?(?: \+\n.*?)*)?$/m,
    alias: "tag"
  },
  "attributes": attributes,
  "hr": {
    pattern: /^'{3,}$/m,
    alias: "punctuation"
  },
  "page-break": {
    pattern: /^<{3,}$/m,
    alias: "punctuation"
  },
  "admonition": {
    pattern: /^(?:CAUTION|IMPORTANT|NOTE|TIP|WARNING):/m,
    alias: "keyword"
  },
  "callout": [
    {
      pattern: /(^[ 	]*)<?\d*>/m,
      lookbehind: true,
      alias: "symbol"
    },
    {
      pattern: /<\d+>/,
      alias: "symbol"
    }
  ],
  "macro": {
    pattern: /\b[a-z\d][a-z\d-]*::?(?:[^\s\[\]]*\[(?:[^\]\\"']|(["'])(?:\\.|(?!\1)[^\\])*\1|\\.)*\])/,
    inside: {
      "function": /^[^:]+/,
      "punctuation": /^::?/,
      "attributes": {
        pattern: /(?:\[(?:[^\]\\"']|(["'])(?:\\.|(?!\1)[^\\])*\1|\\.)*\])/,
        inside: attributes.inside
      }
    }
  },
  "inline": {
    /*
    		The initial look-behind prevents the highlighting of escaped quoted text.
    
    		Quoted text can be multi-line but cannot span an empty line.
    		All quoted text can have attributes before [foobar, 'foobar', baz="bar"].
    
    		First, we handle the constrained quotes.
    		Those must be bounded by non-word chars and cannot have spaces between the delimiter and the first char.
    		They are, in order: _emphasis_, ``double quotes'', `single quotes', `monospace`, 'emphasis', *strong*, +monospace+ and #unquoted#
    
    		Then we handle the unconstrained quotes.
    		Those do not have the restrictions of the constrained quotes.
    		They are, in order: __emphasis__, **strong**, ++monospace++, +++passthrough+++, ##unquoted##, $$passthrough$$, ~subscript~, ^superscript^, {attribute-reference}, [[anchor]], [[[bibliography anchor]]], <<xref>>, (((indexes))) and ((indexes))
    		 */
    pattern: /(^|[^\\])(?:(?:\B\[(?:[^\]\\"']|(["'])(?:\\.|(?!\2)[^\\])*\2|\\.)*\])?(?:\b_(?!\s)(?: _|\\.|[^\\\n_])+(?:\n(?: _|\\.|[^\\\n_])+)*_\b|\B``(?!\s).+?(?:\n.+?)*''\B|\B`(?!\s)(?:[^`'\s]|\s+\S)+['`]\B|\B(['*+#])(?!\s)(?: \3|\\.|(?!\3)[^\\\n])+(?:\n(?: \3|\\.|(?!\3)[^\\\n])+)*\3\B)|(?:\[(?:[^\]\\"']|(["'])(?:\\.|(?!\4)[^\\])*\4|\\.)*\])?(?:(__|\*\*|\+\+\+?|##|\$\$|[~^]).+?(?:\n.+?)*\5|\{[^\n}]+\}|\[\[\[?.+?(?:\n.+?)*\]?\]\]|<<.+?(?:\n.+?)*>>|\(\(\(?.+?(?:\n.+?)*\)?\)\)))/m,
    lookbehind: true,
    inside: {
      "attributes": attributes,
      "url": {
        pattern: /^(?:\[\[\[?.+?\]?\]\]|<<.+?>>)$/,
        inside: {
          "punctuation": /^(?:\[\[\[?|<<)|(?:\]\]\]?|>>)$/
        }
      },
      "attribute-ref": {
        pattern: /^\{.+\}$/,
        inside: {
          "variable": {
            pattern: /(^\{)[a-z\d,+_-]+/,
            lookbehind: true
          },
          "operator": /^[=?!#%@$]|!(?=[:}])/,
          "punctuation": /^\{|\}$|::?/
        }
      },
      "italic": {
        pattern: /^(['_])[^]+\1$/,
        inside: {
          "punctuation": /^(?:''?|__?)|(?:''?|__?)$/
        }
      },
      "bold": {
        pattern: /^\*[^]+\*$/,
        inside: {
          punctuation: /^\*\*?|\*\*?$/
        }
      },
      "punctuation": /^(?:``?|\+{1,3}|##?|\$\$|[~^]|\(\(\(?)|(?:''?|\+{1,3}|##?|\$\$|[~^`]|\)\)\)?)$/
    }
  },
  "replacement": {
    pattern: /\((?:C|R|TM)\)/,
    alias: "builtin"
  },
  "entity": /&#?[a-z\d]{1,8};/i,
  "line-continuation": {
    pattern: /(^| )\+$/m,
    lookbehind: true,
    alias: "punctuation"
  }
};
var copyFromAsciiDoc = (keys, obj) => {
  keys = keys.split(" ");
  obj = obj.inside;
  for (var i = 0, l = keys.length; i < l; i++) {
    obj[keys[i]] = asciidoc[keys[i]];
  }
};
copyFromAsciiDoc("macro inline replacement entity", attributes.inside["interpreted"]);
copyFromAsciiDoc("macro", asciidoc["passthrough-block"]);
copyFromAsciiDoc("callout", asciidoc["literal-block"]);
copyFromAsciiDoc("comment-block passthrough-block literal-block other-block list-punctuation indented-block comment title attribute-entry attributes hr page-break admonition list-label callout macro inline replacement entity line-continuation", asciidoc["table"]);
copyFromAsciiDoc("table list-punctuation indented-block comment attribute-entry attributes hr page-break admonition list-label macro inline replacement entity line-continuation", asciidoc["other-block"]);
copyFromAsciiDoc("macro inline replacement entity", asciidoc["title"]);
//# sourceMappingURL=asciidoc.js.map
