import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
import { a as replace, n as nested, r as re } from "../../shared-Sq5P6lf6.js";
var keywords = /\b(?:Adj|BigInt|Bool|Ctl|Double|false|true|Int|One|Pauli[IXYZ]?|Qubit|Range|Result|String|Unit|Zero|[Aa]djoint|apply|as|auto|body|borrow|borrowing|[Cc]ontrolled|distribute|elif|else|fail|fixup|for|function|i[fns]|internal|intrinsic|invert|[ls]et|mutable|namespace|new|newtype|open|operation|repeat|return|self|until|use|using|while|within)\b/;
var identifier = "\\b(?!\\d)\\w+\\b";
var qualifiedName = replace("<0>(?:\\s*\\.\\s*<0>)*", [identifier]);
var typeInside = {
  "keyword": keywords,
  "punctuation": /[<>()?,.:[\]]/
};
var regularString = '"(?:\\\\.|[^\\\\"])*"';
var interpolationExpr = nested(replace('\\{(?:[^"{}]|<0>|<self>)*\\}', [regularString]), 2);
languages.qs = languages.qsharp = {
  "comment": /\/\/.*/,
  "interpolation-string": {
    pattern: re('\\$"(?:\\\\.|<0>|[^\\\\"{])*"', [interpolationExpr], "g"),
    greedy: true,
    inside: {
      "interpolation": {
        pattern: re("((?:^|[^\\\\])(?:\\\\\\\\)*)<0>", [interpolationExpr]),
        lookbehind: true,
        inside: {
          "punctuation": /^\{|\}$/,
          "expression": {
            pattern: /[^]+/,
            alias: "language-qsharp",
            inside: "qs"
          }
        }
      },
      "string": /[^]+/
    }
  },
  "string": [
    {
      pattern: re("(^|[^$\\\\])<0>", [regularString], "g"),
      lookbehind: true,
      greedy: true
    }
  ],
  "class-name": [
    {
      // open Microsoft.Quantum.Canon;
      // open Microsoft.Quantum.Canon as CN;
      pattern: re("(\\b(?:as|open)\\s+)<0>(?=\\s*(?:;|as\\b))", [qualifiedName]),
      lookbehind: true,
      inside: typeInside
    },
    {
      // namespace Quantum.App1;
      pattern: re("(\\bnamespace\\s+)<0>(?=\\s*\\{)", [qualifiedName]),
      lookbehind: true,
      inside: typeInside
    }
  ],
  "keyword": keywords,
  "boolean": boolean,
  "function": /\b\w+(?=\()/,
  "range": {
    pattern: /\.\./,
    alias: "operator"
  },
  "number": /(?:\b0(?:x[a-f\d]+|b[01]+|o[0-7]+)|(?:\B\.\d+|\b\d+(?:\.\d*)?)(?:e[+-]?\d+)?)l?\b/i,
  "operator": /\b(?:and\b=?|or\b=?|not\b)|<[=-]|[=-]>|(?:>>>|<<<|\^\^\^|\|\|\||&&&|w\/|[*/^!=%+-])=?|~~~/,
  "punctuation": /::|[()[\]{}.,:;]/
};
//# sourceMappingURL=qsharp.js.map
