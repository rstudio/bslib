import { l as languages, r as rest } from "../../index-XEj74r-1.js";
import { r as re } from "../../shared-Sq5P6lf6.js";
import "./markup.js";
import "./javascript.js";
var js = languages.js;
var filter_pattern = "(^[ 	]*):<0>(?:$\\s*?\n\\1[ 	]+\\S.*)+";
var langMap = {
  atpl: "twig",
  coffee: "coffeescript",
  sass: "scss"
};
var pug = languages.pug = {
  // Multiline stuff should appear before the rest
  // This handles both single-line and multi-line comments
  "comment": {
    pattern: /(^[ 	]*)\/\/.*(?:$\s*?\n\1[ 	]+\S.*)*/m,
    lookbehind: true
  },
  // All the tag-related part is in lookbehind
  // so that it can be highlighted by the "tag" pattern
  "multiline-script": {
    pattern: /(^([ 	]*)script\b.*\.[ 	]*)(?:$\s*?\n\2[ 	]+\S.*)+/m,
    lookbehind: true,
    inside: js
  }
};
[
  "atpl",
  "coffee",
  "ejs",
  "handlebars",
  "less",
  "livescript",
  "markdown",
  "sass",
  "stylus"
].forEach((filter) => {
  var language = langMap[filter] || filter;
  pug["filter-" + filter] = {
    pattern: re(filter_pattern, [filter], "m"),
    lookbehind: true,
    inside: {
      "filter-name": {
        pattern: /^:.+/,
        alias: "variable"
      },
      "text": {
        pattern: /\S[^]*/,
        alias: "language-" + language,
        inside: language
      }
    }
  };
});
Object.assign(pug, {
  "filter": {
    pattern: re(filter_pattern, [".+"], "m"),
    lookbehind: true,
    inside: {
      "filter-name": {
        pattern: /^:.+/,
        alias: "variable"
      },
      "text": /\S[^]*/
    }
  },
  "multiline-plain-text": {
    pattern: /(^([ 	]*)[\w#.-]+\.[ 	]*)(?:$\s*?\n\2[ 	]+\S.*)+/m,
    lookbehind: true
  },
  "markup": {
    pattern: /(^[ 	]*)<.+/m,
    lookbehind: true,
    inside: languages.html
  },
  "doctype": {
    pattern: /((?:^|\n)[ 	]*)doctype(?: .+)?/,
    lookbehind: true
  },
  // This handle all conditional and loop keywords
  "flow-control": {
    pattern: /(^[ 	]*)(?:case|default|each|else|if|unless|when|while)\b(?: .+)?/m,
    lookbehind: true,
    inside: {
      "each": {
        pattern: /^each .+? in\b/,
        inside: {
          "keyword": /^\w+|in$/,
          "punctuation": /,/
        }
      },
      "branch": {
        pattern: /^\w+/,
        alias: "keyword"
      },
      [rest]: js
    }
  },
  "keyword": {
    pattern: /(^[ 	]*)(?:append|block|extends|include|prepend)\b.+/m,
    lookbehind: true
  },
  "mixin": [
    // Declaration
    {
      pattern: /(^[ 	]*)mixin .+/m,
      lookbehind: true,
      inside: {
        "keyword": /^mixin/,
        "function": /\b\w+(?!\s*[^\s(])/,
        "punctuation": /[().,]/
      }
    },
    // Usage
    {
      pattern: /(^[ 	]*)\+.+/m,
      lookbehind: true,
      inside: {
        "name": {
          pattern: /^\+\w+/,
          alias: "function"
        },
        [rest]: js
      }
    }
  ],
  "script": {
    pattern: /(^[ 	]*script(?:(?:&[^(]+)?\([^)]+\))*[ 	]).+/m,
    lookbehind: true,
    inside: js
  },
  "plain-text": {
    pattern: /(^[ 	]*(?!-)[\w#.-]*[\w-](?:(?:&[^(]+)?\([^)]+\))*\/?[ 	]).+/m,
    lookbehind: true
  },
  "tag": {
    pattern: /(^[ 	]*)(?!-)[\w#.-]*[\w-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
    lookbehind: true,
    inside: {
      "attributes": [
        {
          pattern: /&[^(]+\([^)]+\)/,
          inside: js
        },
        {
          pattern: /\([^)]+\)/,
          inside: {
            "attr-value": {
              pattern: /(=\s*(?!\s))(?:\{[^}]*\}|[^\n,)]+)/,
              lookbehind: true,
              inside: js
            },
            "attr-name": /[\w-]+(?=\s*!?=|\s*[,)])/,
            "punctuation": /[!=(),]+/
          }
        }
      ],
      "punctuation": /:/,
      "attr-id": /#[\w-]+/,
      "attr-class": /\.[\w-]+/
    }
  },
  "code": {
    pattern: /(^[ 	]*(?:-|!?=)).+/m,
    lookbehind: true,
    inside: js
  },
  "punctuation": /[.!=|-]+/
});
//# sourceMappingURL=pug.js.map
