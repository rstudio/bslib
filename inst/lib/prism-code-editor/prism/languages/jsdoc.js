import { l as languages } from "../../index-XEj74r-1.js";
import { i as insertBefore, e as extend } from "../../language-DxUX0ITY.js";
import { r as re } from "../../shared-Sq5P6lf6.js";
import "./javascript.js";
import "./javadoclike.js";
import "./typescript.js";
var javascript = languages.js;
var type = "\\{(?:[^{}]|\\{(?:[^{}]|\\{[^}]*\\})*\\})+\\}";
var parameterPrefix = `(@(?:arg|argument|param|property)\\s+(?:${type}\\s+)?)`;
insertBefore(
  languages.jsdoc = extend("javadoclike", {
    "parameter": {
      // @param {string} foo - foo bar
      pattern: RegExp(parameterPrefix + "(?:(?!\\s)[$\\w\\xa0-\\uffff.])+(?!\\S)"),
      lookbehind: true,
      inside: {
        "punctuation": /\./
      }
    }
  }),
  "keyword",
  {
    "optional-parameter": {
      // @param {string} [baz.foo="bar"] foo bar
      pattern: RegExp(parameterPrefix + "\\[(?:(?!\\s)[$\\w\\xa0-\\uffff.])+(?:=[^[\\]]+)?\\](?!\\S)"),
      lookbehind: true,
      inside: {
        "code": {
          pattern: /(=)[^]+(?=.)/,
          lookbehind: true,
          alias: "language-javascript",
          inside: javascript
        },
        "punctuation": /[=[\]]/,
        "parameter": {
          pattern: /[^]+/,
          inside: {
            "punctuation": /\./
          }
        }
      }
    },
    "class-name": [
      {
        pattern: re("(@(?:augments|class|extends|interface|memberof!?|template|this|typedef)\\s+(?:<0>\\s+)?)[A-Z]\\w*(?:\\.[A-Z]\\w*)*", [type]),
        lookbehind: true,
        inside: {
          "punctuation": /\./
        }
      },
      {
        pattern: RegExp("(@[a-z]+\\s+)" + type),
        lookbehind: true,
        inside: {
          "string": javascript.string,
          "number": javascript.number,
          "boolean": javascript.boolean,
          "keyword": languages.ts.keyword,
          "operator": /=>|\.{3}|[&|?:*]/,
          "punctuation": /[()[\]{}.,;<>=]/
        }
      }
    ],
    "example": {
      pattern: /(@example\s+(?!\s))(?:[^@\s]|\s+(?!\s))+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,
      lookbehind: true,
      inside: {
        "code": {
          pattern: /^([ 	]*(?:\*[ 	]*|(?!\*)))\S.*/m,
          lookbehind: true,
          alias: "language-javascript",
          inside: javascript
        }
      }
    }
  }
);
//# sourceMappingURL=jsdoc.js.map
