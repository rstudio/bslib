import { l as languages, t as tokenize } from "../../index-XEj74r-1.js";
import { c as clone, i as insertBefore } from "../../language-DxUX0ITY.js";
import { e as embeddedIn } from "../../templating-CGPRy7qI.js";
import "./markup.js";
import "./php.js";
var markupLatte = clone(languages.html);
insertBefore(markupLatte.tag.inside, "attr-value", {
  "n-attr": {
    pattern: /n:[\w-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=>]+))?/g,
    greedy: true,
    inside: {
      "attr-value": {
        pattern: /(=\s*)[^]+/,
        lookbehind: true,
        inside: {
          "punctuation": /^["']|["']$/,
          "php": {
            pattern: /\S(?:[^]*\S)?/,
            inside: "php"
          }
        }
      },
      "attr-equals": /=/,
      "attr-name": {
        pattern: /\S+/,
        alias: "important"
      }
    }
  }
});
languages.latte = {
  "latte": {
    pattern: /\{\*[^]*?\*\}|\{[^\s{}"'*](?:[^"'/{}]|\/(?![*/])|(["'])(?:\\[^]|(?!\1)[^\\])*\1|\/\*(?:[^*]|\*(?!\/))*\*\/)*\}/,
    alias: "language-latte",
    inside: {
      "comment": /^\{\*[^]+/,
      "latte-tag": {
        // https://latte.nette.org/en/tags
        pattern: /(^\{(?:\/(?=[a-z]))?)(?:[=_]|[a-z]\w*\b(?!\())/i,
        lookbehind: true,
        alias: "important"
      },
      "delimiter": {
        pattern: /^\{\/?|\}$/,
        alias: "punctuation"
      },
      "php": {
        pattern: /\S(?:[^]*\S)?/,
        alias: "language-php",
        inside: "php"
      }
    }
  },
  [tokenize]: embeddedIn(markupLatte)
};
//# sourceMappingURL=latte.js.map
