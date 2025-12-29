import { l as languages } from "../../index-XEj74r-1.js";
import { i as insertBefore, e as extend } from "../../language-DxUX0ITY.js";
import "./clike.js";
insertBefore(
  languages.processing = extend("clike", {
    "keyword": /\b(?:break|case|catch|class|continue|default|else|extends|final|for|if|implements|import|new|null|private|public|return|static|super|switch|this|try|void|while)\b/,
    // Spaces are allowed between function name and parenthesis
    "function": /\b\w+(?=\s*\()/,
    "operator": />>|<<|&&?|\|\|?|[%?]|[!=<>/*+-]=?/
  }),
  "number",
  {
    // Special case: XML is a type
    "constant": /\b(?!XML\b)[A-Z][A-Z\d_]+\b/,
    "type": {
      pattern: /\b(?:boolean|byte|char|color|double|float|int|[A-Z]\w*)\b/,
      alias: "class-name"
    }
  }
);
//# sourceMappingURL=processing.js.map
