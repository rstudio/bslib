import { l as languages } from "../../index-XEj74r-1.js";
import { i as insertBefore, e as extend } from "../../language-DxUX0ITY.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
import "./json.js";
insertBefore(languages.jsonp = extend("json", {
  "punctuation": clikePunctuation
}), "punctuation", {
  "function": /(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*\()/
});
//# sourceMappingURL=jsonp.js.map
