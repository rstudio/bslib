import { l as languages, t as tokenize, w as withoutTokenizer } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
languages.graphql = {
  "comment": /#.*/,
  "description": {
    pattern: /(?:"""(?:[^"]|"(?!""))*"""|"(?:\\.|[^\\\n"])*")(?=\s*[a-z_])/gi,
    greedy: true,
    alias: "string",
    inside: {
      "language-markdown": {
        pattern: /("(?!")|""")[^]+(?=\1)/,
        lookbehind: true,
        inside: "md"
      }
    }
  },
  "string": {
    pattern: /"""[^]*?"""|"(?:\\.|[^\\\n"])*"/g,
    greedy: true
  },
  "number": /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  "boolean": boolean,
  "variable": /\$[a-z_]\w*/i,
  "directive": {
    pattern: /@[a-z_]\w*/i,
    alias: "function"
  },
  "attr-name": {
    pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\\n"])*")*\))?:)/gi,
    greedy: true
  },
  "atom-input": {
    pattern: /\b[A-Z]\w*Input\b/,
    alias: "class-name"
  },
  "scalar": /\b(?:Boolean|Float|ID|Int|String)\b/,
  "constant": /\b[A-Z][A-Z_\d]*\b/,
  "class-name": {
    pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
    lookbehind: true
  },
  "fragment": {
    pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))(?!\d)\w+/,
    lookbehind: true,
    alias: "function"
  },
  "definition-mutation": {
    pattern: /(\bmutation\s+)(?!\d)\w+/,
    lookbehind: true,
    alias: "function"
  },
  "definition-query": {
    pattern: /(\bquery\s+)(?!\d)\w+/,
    lookbehind: true,
    alias: "function"
  },
  "keyword": /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
  "operator": /[&|!=]|\.{3}/,
  "property-query": /\w+(?=\s*\()/,
  "object": /\w+(?=\s*\{)/,
  "punctuation": /[()[\]{},:!=]/,
  "property": /\w+/,
  [tokenize](code, grammar) {
    var tokens = withoutTokenizer(code, grammar);
    var validTokens = tokens.filter(({ type }) => type && type != "comment" && type != "scalar");
    var l = validTokens.length;
    var currentIndex = 0;
    var isNotTokenType = (types) => {
      for (var i2 = 0; i2 < types.length; i2++) {
        if (currentIndex + i2 == l || validTokens[currentIndex + i2].type != types[i2]) {
          return true;
        }
      }
    };
    var findClosingBracket = (open, close) => {
      var stackHeight = 1;
      for (var i2 = currentIndex; i2 < l; i2++) {
        var token = validTokens[i2];
        var content = token.content;
        if (token.type == "punctuation") {
          if (open == content) {
            stackHeight++;
          } else if (close == content && !--stackHeight) {
            return i2;
          }
        }
      }
    };
    while (currentIndex < l) {
      var startToken = validTokens[currentIndex++];
      if (startToken.type == "keyword" && startToken.content == "mutation") {
        var inputVariables = [];
        if (!isNotTokenType(["definition-mutation", "punctuation"]) && validTokens[currentIndex + 1].content == "(") {
          currentIndex += 2;
          var definitionEnd = findClosingBracket("(", ")");
          if (!definitionEnd) continue;
          for (; currentIndex < definitionEnd; currentIndex++) {
            var t = validTokens[currentIndex];
            if (t.type == "variable") {
              t.alias = "variable-input";
              inputVariables.push(t.content);
            }
          }
          currentIndex = definitionEnd + 1;
        }
        if (!isNotTokenType(["punctuation", "property-query"]) && validTokens[currentIndex].content == "{") {
          validTokens[++currentIndex].alias = "property-mutation";
          if (inputVariables[0]) {
            var mutationEnd = findClosingBracket("{", "}");
            if (mutationEnd) for (var i = currentIndex; i < mutationEnd; i++) {
              var varToken = validTokens[i];
              if (varToken.type == "variable" && inputVariables.indexOf(varToken.content) >= 0) {
                varToken.alias = "variable-input";
              }
            }
          }
        }
      }
    }
    return tokens;
  }
};
//# sourceMappingURL=graphql.js.map
