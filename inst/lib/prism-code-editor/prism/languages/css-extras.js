import { l as languages } from "../../index-XEj74r-1.js";
import { i as insertBefore } from "../../language-DxUX0ITY.js";
import "./css.js";
var css = languages.css;
var unit = {
  pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/,
  lookbehind: true
};
var number = {
  pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
  lookbehind: true
};
css.selector.inside = css["atrule"].inside["selector-function-argument"].inside = {
  "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
  "pseudo-class": /:[-\w]+/,
  "class": /\.[-\w]+/,
  "id": /#[-\w]+/,
  "attribute": {
    pattern: /\[(?:[^[\]"']|(["'])(?:\\[^]|(?!\1)[^\\\n])*\1)*\]/g,
    greedy: true,
    inside: {
      "punctuation": /^\[|\]$/,
      "case-sensitivity": {
        pattern: /(\s)[si]$/i,
        lookbehind: true,
        alias: "keyword"
      },
      "namespace": {
        pattern: /^(\s*)(?:(?!\s)[-*\w\xa0-\uffff])*\|(?!=)/,
        lookbehind: true,
        inside: {
          "punctuation": /\|$/
        }
      },
      "attr-name": {
        pattern: /^(\s*)(?:(?!\s)[-\w\xa0-\uffff])+/,
        lookbehind: true
      },
      "attr-value": {
        pattern: /(=\s*)(?:(?!\s)[-\w\xa0-\uffff])+(?=\s*$)|(["'])(?:\\[^]|(?!\2)[^\\\n])*\2/,
        lookbehind: true
      },
      "operator": /[|~*^$]?=/
    }
  },
  "n-th": [
    {
      pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
      lookbehind: true,
      inside: {
        "number": /[\dn]+/,
        "operator": /[+-]/
      }
    },
    {
      pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
      lookbehind: true
    }
  ],
  "combinator": />|\+|~|\|\|/,
  // the `tag` token has been existed and removed.
  // because we can't find a perfect tokenize to match it.
  // if you want to add it, please read https://github.com/PrismJS/prism/pull/2373 first.
  "punctuation": /[(),]/
};
insertBefore(css, "property", {
  "variable": {
    pattern: /(^|[^-\w\xa0-\uffff])--(?!\d)(?:(?!\s)[-\w\xa0-\uffff])*/i,
    lookbehind: true
  }
});
insertBefore(css, "function", {
  "operator": {
    pattern: /(\s)[/*+-](?!\S)/,
    lookbehind: true
  },
  // CAREFUL!
  // Previewers and Inline color use hexcode and color.
  "hexcode": {
    pattern: /\B#[a-f\d]{3,8}\b/i,
    alias: "color"
  },
  "color": [
    {
      pattern: /(^|[^\w-])(?:(?:alice|cadet|cornflower|deepsky|dodger|midnight|powder|royal|sky|steel)blue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blueviolet|brown|burlywood|chartreuse|chocolate|coral|cornsilk|crimson|(?:dark)?(?:blue|cyan|goldenrod|gr[ae]y|green|khaki|magenta|olivegreen|orange|orchid|red|salmon|seagreen|slateblue|slategr[ae]y|turquoise|violet)|deeppink|dimgr[ae]y|firebrick|floralwhite|(?:forest|lawn|lime|pale|spring)green|fuchsia|gainsboro|ghostwhite|gold|greenyellow|honeydew|hotpink|indianred|indigo|ivory|lavender|lavenderblush|lemonchiffon|light(?:blue|coral|cyan|goldenrodyellow|gr[ae]y|green|pink|salmon|seagreen|skyblue|slategr[ae]y|steelblue|yellow)|lime|linen|maroon|medium(?:aquamarine|blue|orchid|purple|seagreen|slateblue|springgreen|turquoise|violetred)|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orangered|palegoldenrod|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|purple|rebeccapurple|rosybrown|saddlebrown|sandybrown|seashell|sienna|silver|snow|tan|teal|thistle|tomato|transparent|wheat|white|whitesmoke|yellow|yellowgreen)(?![\w-])/i,
      lookbehind: true
    },
    {
      pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
      inside: {
        "function": /^[^(]+/,
        "unit": unit,
        "number": number,
        "punctuation": /[(),]/
      }
    }
  ],
  // it's important that there is no boundary assertion after the hex digits
  "entity": /\\[a-f\d]{1,8}/i,
  "unit": unit,
  "number": number
});
//# sourceMappingURL=css-extras.js.map
