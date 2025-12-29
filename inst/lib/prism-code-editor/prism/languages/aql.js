import { l as languages } from "../../index-XEj74r-1.js";
import { a as clikeComment } from "../../patterns-Cp3h1ylA.js";
languages.aql = {
  "comment": clikeComment(),
  "property": {
    pattern: /([{,]\s*)(?:(?!\d)\w+|(["'´`])(?:\\.|(?!\2)[^\\\n])*\2)(?=\s*:)/g,
    lookbehind: true,
    greedy: true
  },
  "string": {
    pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
    greedy: true
  },
  "identifier": {
    pattern: /([´`])(?:\\.|(?!\1)[^\\\n])*\1/g,
    greedy: true
  },
  "variable": /@@?\w+/,
  "keyword": [
    {
      pattern: /(\with\s+)count(?=\s+into\b)/i,
      lookbehind: true
    },
    /\b(?:aggregate|all|an[dy]|asc|collect|desc|distinct|filter|f?or|graph|in|inbound|insert|into|k_paths|k_shortest_paths|let|like|limit|none|not|null|outbound|remove|replace|return|shortest_path|sort|update|upsert|window|with)\b/i,
    // pseudo keywords get a lookbehind to avoid false positives
    {
      pattern: /(^|[^\w.[])(?:keep|prune|search|to)\b/i,
      lookbehind: true
    },
    {
      pattern: /(^|[^\w.[])(?:CURRENT|NEW|OLD)\b/,
      lookbehind: true
    },
    /\options(?=\s*\{)/i
  ],
  "function": /\b(?!\d)\w+(?=\s*\()/,
  "boolean": /\b(?:false|true)\b/i,
  "range": {
    pattern: /\.\./,
    alias: "operator"
  },
  "number": [
    /\b0b[01]+/i,
    /\b0x[a-f\d]+/i,
    /(?:\B\.\d+|\b(?:0|[1-9]\d*)(?:\.\d+)?)(?:e[+-]?\d+)?/i
  ],
  "operator": /\*{2,}|[!=]~|[!=<>]=?|&&|\|\||[*/%+-]/,
  "punctuation": /::|[()[\]{}.,:;?]/
};
//# sourceMappingURL=aql.js.map
