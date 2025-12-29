import { l as languages } from "../../index-XEj74r-1.js";
import { i as insertBefore, c as clone } from "../../language-DxUX0ITY.js";
import "./c.js";
insertBefore(languages["cilk-c"] = languages.cilkc = clone(languages.c), "function", {
  "parallel-keyword": {
    pattern: /\bcilk_(?:for|reducer|s(?:cope|pawn|ync))\b/,
    alias: "keyword"
  }
});
//# sourceMappingURL=cilkc.js.map
