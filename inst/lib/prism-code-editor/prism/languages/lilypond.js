import { l as languages, r as rest } from "../../index-XEj74r-1.js";
import { n as nested, r as re } from "../../shared-Sq5P6lf6.js";
import "./scheme.js";
var schemeExpression = nested('\\((?:\\\\[\\s\\S]|[^\\\\"();#]|;.*(?!.)|"(?:\\\\.|[^\\\\"])*"|#(?:\\{(?:(?!#\\})[\\s\\S])*#\\}|[^{])|<self>)*\\)', 5);
var inside = {
  pattern: /[^]+/,
  alias: "language-lilypond"
};
inside.inside = languages.ly = languages.lilypond = {
  "comment": /%\{[^]*?%\}|%.*/,
  "embedded-scheme": {
    pattern: re('(^|[=\\s])#(?:"(?:\\\\.|[^\\\\"])*"|[^\\s()"]*(?:[^\\s()]|<0>))', [schemeExpression], "mg"),
    lookbehind: true,
    greedy: true,
    inside: {
      "scheme": {
        pattern: /(?!^)[^]+/,
        alias: "language-scheme",
        inside: {
          "embedded-lilypond": {
            pattern: /#\{[^]*?#\}/g,
            greedy: true,
            inside: {
              "punctuation": /^#\{|#\}$/,
              "lilypond": inside
            }
          },
          [rest]: languages.scheme
        }
      },
      "punctuation": /#/
    }
  },
  "string": {
    pattern: /"(?:\\.|[^\\"])*"/g,
    greedy: true
  },
  "class-name": {
    pattern: /(\\new\s+)[\w-]+/,
    lookbehind: true
  },
  "keyword": {
    pattern: /\\[a-z][-\w]*/i,
    inside: {
      "punctuation": /^\\/
    }
  },
  "operator": /[=|]|<<|>>/,
  "punctuation": {
    pattern: /(^|[a-z\d])(?:'+|,+|[_^]?-[_^]?(?:[!>._^+-]|(?=\d))|[_^]\.?|[.!])|[()[\]{}<>^~]|\\[()[\]<>\\!]|--|__/,
    lookbehind: true
  },
  "number": /\b\d+(?:\/\d+)?\b/
};
//# sourceMappingURL=lilypond.js.map
