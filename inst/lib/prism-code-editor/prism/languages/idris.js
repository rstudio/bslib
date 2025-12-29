import { l as languages } from "../../index-XEj74r-1.js";
import { i as insertBefore, e as extend } from "../../language-DxUX0ITY.js";
import "./haskell.js";
insertBefore(
  languages.idr = languages.idris = extend("hs", {
    "comment": /(?:(?:--|\|\|\|).*$|\{-[^]*?-\})/m,
    "keyword": /\b(?:Type|case|class|codata|constructor|corecord|data|do|dsl|else|export|if|implementation|implicit|import|impossible|in|infix[lr]?|instance|interface|let|module|mutual|namespace|of|parameters|partial|postulate|private|proof|public|quoteGoal|record|rewrite|syntax|then|total|using|where|with)\b/,
    "builtin": void 0
  }),
  "keyword",
  {
    "import-statement": {
      pattern: /(^\s*import\s+)(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*/m,
      lookbehind: true,
      inside: {
        "punctuation": /\./
      }
    }
  }
);
//# sourceMappingURL=idris.js.map
