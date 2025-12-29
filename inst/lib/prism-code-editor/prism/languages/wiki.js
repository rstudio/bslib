import { l as languages, r as rest } from "../../index-XEj74r-1.js";
import { i as insertBefore, e as extend } from "../../language-DxUX0ITY.js";
import "./markup.js";
var tagInside = languages.html.tag.inside;
insertBefore(
  languages.wiki = extend("html", {
    "block-comment": {
      pattern: /(^|[^\\])\/\*[^]*?\*\//,
      lookbehind: true,
      alias: "comment"
    },
    "heading": {
      pattern: /^(=+)[^\n=].*?\1/m,
      inside: {
        "punctuation": /^=+|=+$/,
        "important": /.+/
      }
    },
    "emphasis": {
      // TODO Multi-line
      pattern: /('{2,5}).+?\1/,
      inside: {
        "bold-italic": {
          pattern: /(''''').+?(?=\1)/,
          lookbehind: true,
          alias: "bold italic"
        },
        "bold": {
          pattern: /(''')[^'].*(?=\1)/,
          lookbehind: true
        },
        "italic": /[^'].*(?='')/,
        "punctuation": /.+/
      }
    },
    "hr": {
      pattern: /^-{4,}/m,
      alias: "punctuation"
    },
    "url": [
      /isbn +(?:97[89][ -]?)?(?:\d[ -]?){9}[\dx]\b|(?:pmid|rfc) +\d+/i,
      /\[\[.+?\]\]|\[.+?\]/
    ],
    "variable": [
      /__[A-Z]+__/,
      // FIXME Nested structures should be handled
      // {{formatnum:{{#expr:{{{3}}}}}}}
      /\{{3}.+?\}{3}/,
      /\{\{.+?\}\}/
    ],
    "symbol": [
      /^#redirect/im,
      /~{3,5}/
    ],
    // Handle table attrs:
    // {|
    // ! style="text-align:left;"| Item
    // |}
    "table-tag": {
      pattern: /((?:^|[|!])[|!])[^\n|]+\|(?!\|)/m,
      lookbehind: true,
      inside: {
        "table-bar": {
          pattern: /\|$/,
          alias: "punctuation"
        },
        [rest]: tagInside
      }
    },
    "punctuation": /^(?:\{\||\|\}|\|-|[*#:;!|])|\|\||!!/m
  }),
  "tag",
  {
    // Prevent highlighting inside <nowiki>, <source> and <pre> tags
    "nowiki": {
      pattern: /<(nowiki|pre|source)\b[^>]*>[^]*?<\/\1>/i,
      inside: {
        "tag": {
          pattern: /<(?:nowiki|pre|source)\b[^>]*>|<\/(?:nowiki|pre|source)>/i,
          inside: tagInside
        }
      }
    }
  }
);
delete languages.wiki["markup-bracket"];
//# sourceMappingURL=wiki.js.map
