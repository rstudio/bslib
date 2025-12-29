import { l as languages } from "../../index-XEj74r-1.js";
import { i as insertBefore, c as clone } from "../../language-DxUX0ITY.js";
import "./cpp.js";
insertBefore(languages.cilk = languages["cilk-cpp"] = languages.cilkcpp = clone(languages.cpp), "function", {
  "parallel-keyword": {
    pattern: /\bcilk_(?:for|reducer|s(?:cope|pawn|ync))\b/,
    alias: "keyword"
  }
});
//# sourceMappingURL=cilkcpp.js.map
