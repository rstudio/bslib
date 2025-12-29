import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
languages.erlang = {
  "comment": /%.+/,
  "string": {
    pattern: /"(?:\\.|[^\\\n"])*"/g,
    greedy: true
  },
  "quoted-function": {
    pattern: /'(?:\\.|[^\\\n'])+'(?=\()/,
    alias: "function"
  },
  "quoted-atom": {
    pattern: /'(?:\\.|[^\\\n'])+'/,
    alias: "atom"
  },
  "boolean": boolean,
  "keyword": /\b(?:after|begin|case|catch|end|fun|if|of|receive|try|when)\b/,
  "number": [
    /\$\\?./,
    /\b\d+#[a-z\d]+/i,
    /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i
  ],
  "function": /\b[a-z][\w@]*(?=\()/,
  "variable": {
    // Look-behind is used to prevent wrong highlighting of atoms containing "@"
    pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/,
    lookbehind: true
  },
  "operator": [
    /[:=<>/]=|=[:/]=|\+\+?|--?|[!=/*]|\b(?:andalso|b?and|b?not|b?x?or|bs[lr]|div|orelse|rem)\b/,
    {
      // We don't want to match <<
      pattern: /(^|[^<])<(?!<)/,
      lookbehind: true
    },
    {
      // We don't want to match >>
      pattern: /(^|[^>])>(?!>)/,
      lookbehind: true
    }
  ],
  "atom": /\b[a-z][\w@]*/,
  "punctuation": /[()[\]{}.,:;#|]|<<|>>/
};
//# sourceMappingURL=erlang.js.map
