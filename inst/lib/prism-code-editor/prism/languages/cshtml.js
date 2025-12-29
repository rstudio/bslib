import { l as languages } from "../../index-XEj74r-1.js";
import { c as clone, i as insertBefore } from "../../language-DxUX0ITY.js";
import { n as nested, a as replace } from "../../shared-Sq5P6lf6.js";
import "./markup.js";
import "./csharp.js";
var commentLike = "/(?![/*])|//.*\n|/\\*[^*]*(?:\\*(?!/)[^*]*)*\\*/";
var stringLike = `@(?!")|"(?:[^\\\\
"]|\\\\.)*"|@"(?:\\\\[^]|[^\\\\"]|"")*"(?!")|'(?:(?:[^\\\\
']|\\\\.|\\\\[Uux][a-fA-Fd]{1,8})'|(?=[^\\\\](?!')))`;
var round = nested(replace(`\\((?:[^()"'@/]|<0>|<1>|<self>)*\\)`, [stringLike, commentLike]), 2);
var square = nested(replace(`\\[(?:[^[\\]"'@/]|<0>|<1>|<self>)*\\]`, [stringLike, commentLike]), 1);
var curly = nested(replace(`\\{(?:[^{}"'@/]|<0>|<1>|<self>)*\\}`, [stringLike, commentLike]), 2);
var angle = nested(replace(`<(?:[^<>"'@/]|<0>|<self>)*>`, [commentLike]), 1);
var inlineCs = `@(?:await\\b\\s*)?(?:(?!await\\b)\\w+\\b|${round})(?:[?!]?\\.\\w+\\b|(?:${angle})?${round}|${square})*(?![?!\\.(\\[]|<(?!\\/))`;
var tagAttrInlineCs = "@(?![()\\w])|" + inlineCs;
var tagAttrValue = `(?:"[^"@]*"|'[^'@]*'|[^\\s"'@=>]+(?=[\\s>])|["'][^"'@]*(?:(?:${tagAttrInlineCs})[^"'@]*)+["'])`;
var tagAttrs = `(?:\\s(?:\\s*[^\\s/=>]+(?:\\s*=\\s*${tagAttrValue}|(?=[\\s/>])))+)?`;
var tagContent = `(?!\\d)[^\\s/=>$<%]+${tagAttrs}\\s*\\/?>`;
var tagRegion = `\\B@?(?:<([a-zA-Z][\\w:]*)${tagAttrs}\\s*>(?:[^<]|<\\/?(?!\\1\\b)${tagContent}|${nested(
  `<\\1${tagAttrs}\\s*>(?:[^<]|<\\/?(?!\\1\\b)${tagContent}|<self>)*<\\/\\1\\s*>`,
  2
)})*<\\/\\1\\s*>|<${tagContent})`;
var cshtml = languages.razor = languages.cshtml = clone(languages.html);
var csharpWithHtml = clone(languages.cs);
var cs = {
  pattern: /\S[^]*/,
  alias: "language-csharp",
  inside: csharpWithHtml
};
var inlineValue = {
  pattern: RegExp("(^|[^@])" + inlineCs, "g"),
  lookbehind: true,
  greedy: true,
  alias: "variable",
  inside: {
    "keyword": /^@/,
    "csharp": cs
  }
};
var attrValue = cshtml.tag.inside["attr-value"][2];
cshtml.tag.pattern = RegExp("</?" + tagContent, "g");
attrValue.pattern = RegExp("(=\\s*)" + tagAttrValue, "g");
insertBefore(csharpWithHtml, "string", {
  "html": {
    pattern: RegExp(tagRegion, "g"),
    greedy: true,
    inside: cshtml
  }
});
insertBefore(attrValue.inside, "punctuation", { "value": inlineValue });
insertBefore(cshtml, "prolog", {
  "razor-comment": {
    pattern: /@\*[^]*?\*@/g,
    greedy: true,
    alias: "comment"
  },
  "block": {
    pattern: RegExp(
      `(^|[^@])@(?:${curly}|(?:code|functions)\\s*${curly}|(?:for|foreach|lock|switch|using|while)\\s*${round}\\s*${curly}|do\\s*${curly}\\s*while\\s*${round}(?:\\s*;)?|try\\s*${curly}\\s*catch\\s*${round}\\s*${curly}\\s*finally\\s*${curly}|if\\s*${round}\\s*${curly}(?:\\s*else(?:\\s+if\\s*${round})?\\s*${curly})*|helper\\s+\\w+\\s*${round}\\s*${curly})`,
      "g"
    ),
    lookbehind: true,
    greedy: true,
    inside: {
      "keyword": /^@\w*/,
      "csharp": cs
    }
  },
  "directive": {
    pattern: /^([ 	]*)@(?:addTagHelper|attribute|implements|inherits|inject|layout|model|namespace|page|preservewhitespace|removeTagHelper|section|tagHelperPrefix|using)(?=\s).*/mg,
    lookbehind: true,
    greedy: true,
    inside: {
      "keyword": /^@\w+/,
      "csharp": cs
    }
  },
  "value": inlineValue,
  "delegate-operator": {
    pattern: /(^|[^@])@(?=<)/,
    lookbehind: true,
    alias: "operator"
  }
});
//# sourceMappingURL=cshtml.js.map
