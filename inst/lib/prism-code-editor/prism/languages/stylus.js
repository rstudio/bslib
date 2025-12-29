import { r as rest, l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, b as boolean, c as clikeString, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
var unit = {
  pattern: /(\b\d+)(?:%|[a-z]+)/,
  lookbehind: true
};
var number = {
  pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
  lookbehind: true
};
var comment = clikeComment();
var string = clikeString();
var interpolation = {
  pattern: /\{[^\n}:]*\}/,
  alias: "variable",
  inside: {
    "delimiter": {
      pattern: /^\{|\}$/,
      alias: "punctuation"
    }
  }
};
var func = {
  pattern: /[\w-]+\([^)]*\).*/,
  inside: {
    "function": /^[^(]+/
  }
};
var inside = interpolation.inside[rest] = func.inside[rest] = {
  "comment": comment,
  "url": {
    pattern: /\burl\((["']?).*?\1\)/ig,
    greedy: true
  },
  "string": string,
  "interpolation": interpolation,
  "func": func,
  "important": /\B!(?:important|optional)\b/i,
  "keyword": {
    pattern: /(^|\s)(?:(?:else|for|if|return|unless)(?!\S)|@[\w-]+)/,
    lookbehind: true
  },
  "hexcode": /#[a-f\d]{3,6}/i,
  "color": [
    /\b(?:(?:alice|cadet|cornflower|darksky|dodger|midnight|powder|royal|sky|steel)blue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blueviolet|brown|burlywood|chartreuse|chocolate|coral|cornsilk|crimson|(?:dark)?(?:blue|cyan|goldenrod|gr[ae]y|green|khaki|magenta|olivegreen|orange|orchid|red|salmon|seagreen|slateblue|slategr[ae]y|turquoise|violet)|deeppink|dimgr[ae]y|firebrick|floralwhite|(?:forest|lawn|lime|pale|spring)green|fuchsia|gainsboro|ghostwhite|gold|greenyellow|honeydew|hotpink|indianred|indigo|ivory|lavender|lavenderblush|lemonchiffon|light(?:blue|coral|cyan|goldenrodyellow|gr[ae]y|green|pink|salmon|seagreen|skyblue|slategr[ae]y|steelblue|yellow)|lime|linen|maroon|medium(?:aquamarine|blue|orchid|purple|seagreen|slateblue|springgreen|turquoise|violetred)|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orangered|palegoldenrod|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|purple|rosybrown|saddlebrown|sandybrown|seashell|sienna|silver|snow|tan|teal|thistle|tomato|transparent|wheat|white|whitesmoke|yellow|yellowgreen)\b/i,
    {
      pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
      inside: {
        "unit": unit,
        "number": number,
        "function": /[\w-]+(?=\()/,
        "punctuation": /[(),]/
      }
    }
  ],
  "entity": /\\[a-f\d]{1,8}/i,
  "unit": unit,
  "boolean": boolean,
  // We want non-word chars around "-" because it is
  // accepted in property names.
  "operator": /~|\*\*|[?%!=<>/*+]=?|[-:]=|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/,
  "number": number,
  "punctuation": clikePunctuation
};
languages.stylus = {
  "atrule-declaration": {
    pattern: /(^[ 	]*)@.*[^\s{]/m,
    lookbehind: true,
    inside: {
      "atrule": /^@[\w-]+/,
      [rest]: inside
    }
  },
  "variable-declaration": {
    pattern: /(^[ 	]*)[$\w-]+\s*.?=[ 	]*(?:\{[^{}]*\}|\S.*|$)/m,
    lookbehind: true,
    inside: {
      "variable": /^\S+/,
      [rest]: inside
    }
  },
  "statement": {
    pattern: /(^[ 	]*)(?:else|for|if|return|unless)[ 	].+/m,
    lookbehind: true,
    inside: {
      "keyword": /^\S+/,
      [rest]: inside
    }
  },
  // A property/value pair cannot end with a comma or a brace
  // It cannot have indented content unless it ended with a semicolon
  "property-declaration": {
    pattern: /((?:^|\{)([ 	]*))(?:[\w-]|\{[^\n}]*\})+(?:\s*:\s*|[ 	]+)(?!\s)[^\n{]*(?:;|[^\n{,]$(?!\n(?:\{|\2[ 	])))/m,
    lookbehind: true,
    inside: {
      "property": {
        pattern: /^[^\s:]+/,
        inside: {
          "interpolation": interpolation
        }
      },
      [rest]: inside
    }
  },
  // A selector can contain parentheses only as part of a pseudo-element
  // It can span multiple lines.
  // It must end with a comma or an accolade or have indented content.
  "selector": {
    pattern: /(^[ 	]*)(?:(?!\s)(?:[^(){}\n:]|::?[\w-]+(?:\([^\n)]*\)|(?![\w-]))|\{[^\n}]*\})+)(?:\n(?:\1(?:(?!\s)(?:[^(){}\n:]|::?[\w-]+(?:\([^\n)]*\)|(?![\w-]))|\{[^\n}]*\})+)))*(?=,$|\{|\n(?:\{|\1[ 	]))/m,
    lookbehind: true,
    inside: {
      "interpolation": interpolation,
      "comment": comment,
      "punctuation": /[()[\]{},]/
    }
  },
  "func": func,
  "string": string,
  "comment": comment,
  "interpolation": interpolation,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=stylus.js.map
