import { l as languages } from "../../index-XEj74r-1.js";
import { i as insertBefore, e as extend } from "../../language-DxUX0ITY.js";
import "./javascript.js";
insertBefore(
  languages.n4jsd = languages.n4js = extend("js", {
    // Keywords from N4JS language spec: https://numberfour.github.io/n4js/spec/N4JSSpec.html
    "keyword": /\b(?:Array|any|boolean|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|false|true|finally|for|from|function|[gls]et|if|implements|import|in|instanceof|interface|module|new|null|number|package|private|protected|public|return|static|string|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/
  }),
  "constant",
  {
    // Annotations in N4JS spec: https://numberfour.github.io/n4js/spec/N4JSSpec.html#_annotations
    "annotation": {
      pattern: /@+\w+/,
      alias: "operator"
    }
  }
);
//# sourceMappingURL=n4js.js.map
