import { l as languages } from "../../index-XEj74r-1.js";
import { e as extend, i as insertBefore } from "../../language-DxUX0ITY.js";
import { t as tag } from "../../xml-shared-Cw3KspmP.js";
import "./javascript.js";
var actionscript = languages.actionscript = extend("javascript", {
  "keyword": /\b(?:as|break|case|catch|class|const|default|delete|do|dynamic|each|else|extends|final|finally|for|function|[gs]et|if|implements|import|in|include|instanceof|interface|internal|is|namespace|native|new|null|override|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|use|var|void|while|with)\b/,
  "operator": /--|\+\+|[!=]==|(?:&&|\|\||<<|>>>?|[%&|^!=<>/*+-])=?|[~?@]/
});
actionscript["class-name"].alias = "function";
delete actionscript["parameter"];
delete actionscript["literal-property"];
insertBefore(actionscript, "regex", {
  "tag": tag
});
//# sourceMappingURL=actionscript.js.map
