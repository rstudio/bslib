import { l as languages } from "../../index-XEj74r-1.js";
import { c as clone, i as insertBefore } from "../../language-DxUX0ITY.js";
import "./javascript.js";
var flow = languages.flow = clone(languages.js);
insertBefore(flow, "keyword", {
  "type": [
    {
      pattern: /\b(?:[Bb]oolean|Function|[Nn]umber|[Ss]tring|[Ss]ymbol|any|mixed|null|void)\b/,
      alias: "class-name"
    }
  ]
});
flow["function-variable"].pattern = /(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*=\s*(?:function\b|(?:\([^()]*\)(?:\s*:\s*\w+)?|(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+)\s*=>))/i;
delete flow["parameter"];
insertBefore(flow, "operator", {
  "flow-punctuation": {
    pattern: /\{\||\|\}/,
    alias: "punctuation"
  }
});
flow.keyword.unshift(
  {
    pattern: /(^|[^$]\b)(?:Class|declare|opaque|type)\b(?!\$)/,
    lookbehind: true
  },
  {
    pattern: /(^|[^$]\B)\$(?:Diff|Enum|Exact|Keys|ObjMap|PropertyType|Record|Shape|Subtype|Supertype|await)\b(?!\$)/,
    lookbehind: true
  }
);
//# sourceMappingURL=flow.js.map
