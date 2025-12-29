import { l as languages, t as tokenize } from "../../index-XEj74r-1.js";
import { e as embeddedIn } from "../../templating-CGPRy7qI.js";
import "./markup.js";
import "./lua.js";
languages.etlua = {
  "etlua": {
    pattern: /<%[^]+?%>/,
    inside: {
      "delimiter": {
        pattern: /^<%[=-]?|-?%>$/,
        alias: "punctuation"
      },
      "language-lua": {
        pattern: /[^]+/,
        inside: "lua"
      }
    }
  },
  [tokenize]: embeddedIn("html")
};
//# sourceMappingURL=etlua.js.map
