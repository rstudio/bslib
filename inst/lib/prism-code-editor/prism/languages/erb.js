import { l as languages, t as tokenize } from "../../index-XEj74r-1.js";
import { e as embeddedIn } from "../../templating-CGPRy7qI.js";
import "./markup.js";
import "./ruby.js";
languages.erb = {
  "erb": {
    pattern: /<%=?(?:[^\n]|\n(?!=begin)|\n=begin\s(?:[^\n]|\n(?!=end))*\n=end)+?%>/,
    inside: {
      "delimiter": {
        pattern: /^<%=?|%>$/,
        alias: "punctuation"
      },
      "ruby": {
        pattern: /\s*\S[^]*/,
        alias: "language-ruby",
        inside: "ruby"
      }
    }
  },
  [tokenize]: embeddedIn("html")
};
//# sourceMappingURL=erb.js.map
