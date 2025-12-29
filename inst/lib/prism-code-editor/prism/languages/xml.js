import { l as languages } from "../../index-XEj74r-1.js";
import { e as entity, t as tag } from "../../xml-shared-Cw3KspmP.js";
languages.rss = languages.atom = languages.ssml = languages.xml = {
  "comment": {
    pattern: /<!--(?:(?!<!--)[^])*?-->/g,
    greedy: true
  },
  "prolog": {
    pattern: /<\?[^]+?\?>/g,
    greedy: true
  },
  "doctype": {
    // https://www.w3.org/TR/xml/#NT-doctypedecl
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/gi,
    greedy: true,
    inside: {
      "internal-subset": {
        pattern: /(\[)[^]+(?=\]\s*>$)/,
        lookbehind: true,
        inside: "xml"
      },
      "string": /"[^"]*"|'[^']*'/,
      "punctuation": /^<!|[>[\]]/,
      "doctype-tag": /^DOCTYPE/i,
      "name": /\S+/
    }
  },
  "cdata": {
    pattern: /<!\[CDATA\[[^]*?\]\]>/gi,
    greedy: true
  },
  "tag": tag,
  "entity": entity,
  "markup-bracket": {
    pattern: /[()[\]{}]/,
    alias: "punctuation"
  }
};
//# sourceMappingURL=xml.js.map
