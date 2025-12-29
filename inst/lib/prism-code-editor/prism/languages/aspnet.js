import { l as languages, r as rest } from "../../index-XEj74r-1.js";
import { c as clone, i as insertBefore } from "../../language-DxUX0ITY.js";
import "./markup.js";
import "./csharp.js";
var pageDirectiveInside = {
  "page-directive": {
    pattern: /<%\s*@\s*(?:assembly|control|implements|import|master(?:type)?|outputcache|page|previouspagetype|reference|register)?|%>/i,
    alias: "tag"
  }
};
var aspnet = languages.aspnet = clone(languages.html);
var tag = aspnet.tag;
var directive = {
  pattern: /<%.*%>/,
  alias: "tag",
  inside: {
    "directive": {
      pattern: /<%\s*?[$=%#:]{0,2}|%>/,
      alias: "tag"
    },
    [rest]: "cs"
  }
};
insertBefore(aspnet, "markup-bracket", {
  "page-directive": {
    pattern: /<%\s*@.*%>/,
    alias: "tag",
    inside: pageDirectiveInside
  },
  "directive": directive
});
pageDirectiveInside[rest] = tag.inside;
tag.inside["attr-value"][2].inside["directive"] = directive;
insertBefore(aspnet, "comment", {
  "asp-comment": {
    pattern: /<%--[^]*?--%>/,
    alias: "asp comment"
  }
});
insertBefore(aspnet, "script", {
  "asp-script": {
    pattern: /(<script(?=.*runat=["']?server\b)[^>]*>)(?!<\/script>)[^]+?(?=<\/script>)/i,
    lookbehind: true,
    alias: "language-csharp",
    inside: "cs"
  }
});
//# sourceMappingURL=aspnet.js.map
