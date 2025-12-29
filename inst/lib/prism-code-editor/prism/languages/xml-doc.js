import { l as languages } from "../../index-XEj74r-1.js";
import { i as insertBefore } from "../../language-DxUX0ITY.js";
import "./markup.js";
var insertDocComment = (lang, docComment) => {
  if (languages[lang]) {
    insertBefore(languages[lang], "comment", {
      "doc-comment": docComment
    });
  }
};
var tag = languages.markup.tag;
var slashDocComment = {
  pattern: /\/\/\/.*/g,
  greedy: true,
  alias: "comment",
  inside: {
    "tag": tag
  }
};
var tickDocComment = {
  pattern: /'''.*/g,
  greedy: true,
  alias: "comment",
  inside: {
    "tag": tag
  }
};
insertDocComment("csharp", slashDocComment);
insertDocComment("fsharp", slashDocComment);
insertDocComment("vbnet", tickDocComment);
//# sourceMappingURL=xml-doc.js.map
