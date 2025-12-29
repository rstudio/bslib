import { l as languages } from "../../index-XEj74r-1.js";
var vectorMatching = "on|ignoring|group_right|group_left|by|without";
languages.promql = {
  "comment": {
    pattern: /(^[ 	]*)#.*/m,
    lookbehind: true
  },
  "vector-match": {
    // Match the comma-separated label lists inside vector matching:
    pattern: RegExp("((?:" + vectorMatching + ")\\s*)\\([^)]*\\)"),
    lookbehind: true,
    inside: {
      "label-key": {
        pattern: /\b[^,]+\b/,
        alias: "attr-name"
      },
      "punctuation": /[(),]/
    }
  },
  "context-labels": {
    pattern: /\{[^{}]*\}/,
    inside: {
      "label-key": {
        pattern: /\b[a-z_]\w*(?=\s*(?:=|![=~]))/,
        alias: "attr-name"
      },
      "label-value": {
        pattern: /(["'`])(?:\\[^]|(?!\1)[^\\])*\1/g,
        greedy: true,
        alias: "attr-value"
      },
      "punctuation": /\{|\}|=~?|![=~]|,/
    }
  },
  "context-range": [
    {
      pattern: /\[[\w\s:]+\]/,
      // [1m]
      inside: {
        "punctuation": /[[\]:]/,
        "range-duration": {
          pattern: /\b(?:\d+(?:[smhdwy]|ms))+\b/i,
          alias: "number"
        }
      }
    },
    {
      pattern: /(\boffset\s+)\w+/,
      // offset 1m
      lookbehind: true,
      inside: {
        "range-duration": {
          pattern: /\b(?:\d+(?:[smhdwy]|ms))+\b/i,
          alias: "number"
        }
      }
    }
  ],
  "keyword": RegExp("\\b(?:sum|min|max|avg|group|stddev|stdvar|count|count_values|bottomk|topk|quantile|" + vectorMatching + "|offset)\\b", "i"),
  "function": /\b[a-z_]\w*(?=\s*\()/i,
  "number": /[+-]?(?:(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:e[+-]?\d+)?\b|\b(?:0x[a-f\d]+|nan|inf)\b)/i,
  "operator": /[!=<>]=|[%^<>/*+-]|\b(?:and|or|unless)\b/i,
  "punctuation": /[()[\]{}.,;`]/
};
//# sourceMappingURL=promql.js.map
