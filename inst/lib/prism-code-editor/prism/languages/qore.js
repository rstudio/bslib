import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
languages.qore = {
  "comment": /\/\*[^]*?\*\/|\/\/.*|#.*/,
  // Overridden to allow unescaped multi-line strings
  "string": {
    pattern: /(["'])(?:\\[^]|(?!\1)[^\\])*\1/g,
    greedy: true
  },
  "class-name": {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: true,
    inside: {
      "punctuation": /[.\\]/
    }
  },
  "keyword": /\b(?:abstract|any|assert|binary|bool|boolean|break|byte|case|catch|char|class|code|const|continue|data|default|do|double|else|enum|extends|final|finally|float|for|goto|hash|if|implements|import|inherits|instanceof|int|interface|long|my|native|new|nothing|null|object|our|own|private|reference|rethrow|return|short|soft(?:bool|date|float|int|list|number|string)|static|strictfp|string|sub|super|switch|synchronized|this|throws?|transient|try|void|volatile|while)\b/,
  "boolean": /\b(?:false|true)\b/i,
  "function": /\$?\b(?!\d)\w+(?=\()/,
  "number": /\b(?:0b[01]+|0x(?:[a-f\d]*\.)?[a-f\dp-]+|(?:\d+(?:\.\d+)?|\.\d+)(?:e\d+)?[df]|(?:\d+(?:\.\d+)?|\.\d+))\b/i,
  "operator": {
    pattern: /(^|[^.])(?:--|\+\+|&&|\|\||[!=]==|[!=]~|<=>?|>>=?|<<=?|[%&|^!=<>/*+-]=?|[~?])/,
    lookbehind: true
  },
  "punctuation": clikePunctuation,
  "variable": /\$(?!\d)\w+/
};
//# sourceMappingURL=qore.js.map
