import { l as languages, t as tokenize, w as withoutTokenizer } from "../../index-XEj74r-1.js";
var expressionDef = /\{[^\n[\]{}]*\}/g;
var params = {
  "quoted-string": {
    pattern: /"(?:\\.|[^\\"])*"/,
    alias: "operator"
  },
  "command-param-id": {
    pattern: /(\s)\w+:/,
    lookbehind: true,
    alias: "property"
  },
  "command-param-value": [
    {
      pattern: expressionDef,
      alias: "selector"
    },
    {
      pattern: /([ 	])\S+/g,
      lookbehind: true,
      greedy: true,
      alias: "operator"
    },
    {
      pattern: /\S(?:.*\S)?/,
      alias: "operator"
    }
  ]
};
var isBadLine = (input) => {
  for (var brackets = "[]{}", stack = [], s = 0, i = 0, l = input.length; i < l; ) {
    var bracketsIndex = brackets.indexOf(input[i++]);
    if (bracketsIndex + 1) {
      if (bracketsIndex % 2) {
        if (stack[--s] != bracketsIndex) return true;
      } else stack[s++] = bracketsIndex + 1;
    }
  }
  return s;
};
languages.nani = languages.naniscript = {
  // ; ...
  "comment": {
    pattern: /^([ 	]*);.*/m,
    lookbehind: true
  },
  // > ...
  // Define is a control line starting with '>' followed by a word, a space and a text.
  "define": {
    pattern: /^>.+/m,
    alias: "tag",
    inside: {
      "value": {
        pattern: /(^>\w+[ 	]+)(?!\s)[^{}\n]+/,
        lookbehind: true,
        alias: "operator"
      },
      "key": {
        pattern: /(^>)\w+/,
        lookbehind: true
      }
    }
  },
  // # ...
  "label": {
    pattern: /^([ 	]*)#[ 	]*\w+[ 	]*$/m,
    lookbehind: true,
    alias: "regex"
  },
  "command": {
    pattern: /^([ 	]*)@\w+(?=[ 	]|$).*/m,
    lookbehind: true,
    alias: "function",
    inside: {
      "command-name": /^@\w+/,
      "expression": {
        pattern: expressionDef,
        greedy: true,
        alias: "selector"
      },
      "command-params": {
        pattern: /\s*\S[^]*/,
        inside: params
      }
    }
  },
  // Generic is any line that doesn't start with operators: ;>#@
  "generic-text": {
    pattern: /(^[ 	]*)[^#@>;\s].*/m,
    lookbehind: true,
    alias: "punctuation",
    inside: {
      // \{ ... \} ... \[ ... \] ... \"
      "escaped-char": /\\[[\]{}"]/,
      "expression": {
        pattern: expressionDef,
        greedy: true,
        alias: "selector"
      },
      "inline-command": {
        pattern: /\[[ 	]*\w[^\n[\]]*\]/g,
        greedy: true,
        alias: "function",
        inside: {
          "start-stop-char": /[[\]]/,
          "command-params": {
            pattern: /(^[ 	]*\w+)[^]+/,
            lookbehind: true,
            inside: params
          },
          "command-param-name": {
            pattern: /\w+/,
            alias: "name"
          }
        }
      }
    }
  },
  [tokenize](code, grammar) {
    var tokens = withoutTokenizer(code, grammar);
    var position = 0;
    var i = 0, l = tokens.length;
    while (i < l) {
      var token = tokens[i++];
      var length = token.length;
      var content;
      if (token.type == "generic-text") {
        content = code.slice(position, position + length);
        if (isBadLine(content)) {
          token.type = "bad-line";
          token.content = content;
        }
      }
      position += length;
    }
    return tokens;
  }
};
//# sourceMappingURL=naniscript.js.map
