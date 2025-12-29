import { l as languages } from "../../index-XEj74r-1.js";
languages.j = {
  "comment": /\bNB\..*/,
  "string": {
    pattern: /'(?:''|[^\n'])*'/g,
    greedy: true
  },
  "keyword": /\b(?:(?:CR|LF|adverb|conjunction|def|define|dyad|monad|noun|verb)\b|(?:assert|break|catch[dt]?|continue|do|else|elseif|end|f?case|for|for_\w+|goto_\w+|if|label_\w+|return|select|throw|try|while|whilst)\.)/,
  "verb": {
    // Negative look-ahead prevents bad highlighting
    // of ^: ;. =. =: !. !:
    pattern: /(?!\^:|;\.|[!=][.:])(?:\{(?:\.|::?)?|p(?:\.\.?|:)|[!=\]]|[<>*%$|,#+-][.:]?|[?^]\.?|[;\[]:?|[~}"i][.:]|[ACeEIjLor]\.|(?:[_/\\qsux]|_?\d):)/,
    alias: "keyword"
  },
  "number": /\b_?(?:(?!\d:)\d+(?:\.\d+)?(?:(?:ad|ar|[ejpx])_?\d+(?:\.\d+)?)*(?:b_?[a-z\d]+(?:\.[a-z\d]+)?)?|_\b(?!\.))/,
  "adverb": {
    pattern: /[~}]|[/\\]\.?|[bfM]\.|t[.:]/,
    alias: "builtin"
  },
  "operator": /[=a][.:]|_\./,
  "conjunction": {
    pattern: /&(?:\.:?|:)?|[.:@][.:]?|[!D][.:]|[;dHT]\.|`:?|[\^LS]:|"/,
    alias: "variable"
  },
  "punctuation": /[()]/
};
//# sourceMappingURL=j.js.map
