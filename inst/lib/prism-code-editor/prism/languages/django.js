import { l as languages, t as tokenize } from "../../index-XEj74r-1.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
import { e as embeddedIn } from "../../templating-CGPRy7qI.js";
import "./markup.js";
languages.jinja2 = languages.django = {
  "django": {
    pattern: /\{(?:\{[^]*?\}|%[^]*?%|#[^]*?#)\}/,
    alias: "language-django",
    inside: {
      "comment": /^\{#[^]+/,
      "tag": {
        pattern: /(^\{%[+-]?\s*)\w+/,
        lookbehind: true,
        alias: "keyword"
      },
      "delimiter": {
        pattern: /^\{[{%][+-]?|[+-]?[}%]\}$/,
        alias: "punctuation"
      },
      "string": {
        pattern: /(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
        greedy: true
      },
      "filter": {
        pattern: /(\|)\w+/,
        lookbehind: true,
        alias: "function"
      },
      "test": {
        pattern: /(\bis\s+(?:not\s+)?)(?!not\b)\w+/,
        lookbehind: true,
        alias: "function"
      },
      "function": /\b(?!\d)\w+(?=\s*\()/,
      "keyword": /\b(?:and|as|by|else|f?or|i[fns]|import|loop|not|recursive|with|without)\b/,
      "operator": /!=|\*\*=?|\/\/=?|<>|>>|<<|[%=<>/*+-]=?|[&|^~]/,
      "number": /\b\d+(?:\.\d+)?\b/,
      "boolean": /[Ff]alse|[Nn]one|[Tt]rue/,
      "variable": /\w+/,
      "punctuation": clikePunctuation
    }
  },
  [tokenize]: embeddedIn("html")
};
//# sourceMappingURL=django.js.map
