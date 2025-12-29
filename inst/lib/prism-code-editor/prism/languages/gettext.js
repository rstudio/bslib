import { l as languages } from "../../index-XEj74r-1.js";
languages.po = languages.gettext = {
  "comment": [
    {
      pattern: /# .*/g,
      greedy: true,
      alias: "translator-comment"
    },
    {
      pattern: /#\..*/g,
      greedy: true,
      alias: "extracted-comment"
    },
    {
      pattern: /#:.*/g,
      greedy: true,
      alias: "reference-comment"
    },
    {
      pattern: /#,.*/g,
      greedy: true,
      alias: "flag-comment"
    },
    {
      pattern: /#\|.*/g,
      greedy: true,
      alias: "previously-untranslated-comment"
    },
    {
      pattern: /#.*/g,
      greedy: true
    }
  ],
  "string": {
    pattern: /(^|[^\\])"(?:\\.|[^\\"])*"/g,
    lookbehind: true,
    greedy: true
  },
  "keyword": /^msg(?:ctxt|id|id_plural|str)\b/m,
  "number": /\b\d+\b/,
  "punctuation": /[[\]]/
};
//# sourceMappingURL=gettext.js.map
