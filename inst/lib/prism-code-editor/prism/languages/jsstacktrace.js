import { l as languages } from "../../index-XEj74r-1.js";
languages.jsstacktrace = {
  "error-message": {
    pattern: /^\S.*/m,
    alias: "string"
  },
  "stack-frame": {
    pattern: /(^[ 	]+)at[ 	].*/m,
    lookbehind: true,
    inside: {
      "not-my-code": {
        pattern: /^at[ 	]+(?!\s)(?:node\.js|<unknown>|.*(?:node_modules|\(<anonymous>\)|\(<unknown>|<anonymous>$|\(internal\/|\(node\.js)).*/m,
        alias: "comment"
      },
      "filename": {
        pattern: /(\bat\s+(?!\s)|\()(?:[a-zA-Z]:)?[^():]+(?=:)/,
        lookbehind: true,
        alias: "url"
      },
      "function": {
        pattern: /(\bat\s+(?:new\s+)?)(?![\d>.])(?:(?!\s)[.$\w\xa0-\uffff<>])+/,
        lookbehind: true,
        inside: {
          "punctuation": /\./
        }
      },
      "punctuation": /[()]/,
      "keyword": /\b(?:at|new)\b/,
      "alias": {
        pattern: /\[(?:as\s+)?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+\]/,
        alias: "variable"
      },
      "line-number": {
        pattern: /:\d+(?::\d+)?\b/,
        alias: "number",
        inside: {
          "punctuation": /:/
        }
      }
    }
  }
};
//# sourceMappingURL=jsstacktrace.js.map
