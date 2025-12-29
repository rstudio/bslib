import { l as languages } from "../../index-XEj74r-1.js";
import { i as insertBefore, e as extend } from "../../language-DxUX0ITY.js";
import "./clike.js";
insertBefore(
  languages.birb = extend("clike", {
    "string": {
      pattern: /r?(["'])(?:\\.|(?!\1)[^\\])*\1/g,
      greedy: true
    },
    "class-name": [
      /\b[A-Z](?:[\d_]*[a-zA-Z]\w*)?\b/,
      // matches variable and function return types (parameters as well).
      /\b(?:[A-Z]\w*|(?!(?:var|void)\b)[a-z]\w*)(?=\s+\w+\s*[;,=()])/
    ],
    "keyword": /\b(?:assert|break|case|class|const|default|else|enum|final|follows|for|grab|if|nest|new|next|noSeeb|return|static|switch|throw|var|void|while)\b/,
    "operator": /--|\+\+|&&|\|\||(?:<<|>>|~\/|[%&|^!=<>/*+-])=?|[?:~]/,
    "variable": /\b[a-z_]\w*\b/
  }),
  "function",
  {
    "metadata": {
      pattern: /<\w+>/g,
      greedy: true,
      alias: "symbol"
    }
  }
);
//# sourceMappingURL=birb.js.map
