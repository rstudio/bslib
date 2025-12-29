import { l as languages, t as tokenize } from "../../index-XEj74r-1.js";
import { e as embeddedIn } from "../../templating-CGPRy7qI.js";
import "./javascript.js";
import "./markup.js";
languages.eta = languages.ejs = {
  "ejs": {
    pattern: /<%[^%][^]*?%>/,
    inside: {
      "comment": /^<%#[^]+/,
      "delimiter": {
        pattern: /^<%[-_=]?|[-_]?%>$/,
        alias: "punctuation"
      },
      "language-javascript": {
        pattern: /[^]+/,
        inside: "js"
      }
    }
  },
  "escape": /<%%|%%>/,
  [tokenize]: embeddedIn("html")
};
//# sourceMappingURL=ejs.js.map
