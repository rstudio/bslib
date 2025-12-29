import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, e as clikeNumber, b as boolean, c as clikeString, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
languages.clike = {
  "comment": clikeComment(),
  "string": clikeString(),
  "class-name": {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: true,
    inside: {
      "punctuation": /[.\\]/
    }
  },
  "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  "boolean": boolean,
  "function": /\b\w+(?=\()/,
  "number": clikeNumber,
  "operator": /[!=]==|[!=<>]=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=clike.js.map
