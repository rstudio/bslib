import { l as languages } from "../../index-XEj74r-1.js";
var keywords = /\b(?:ACT|ACTIFSUB|CARRAY|CASE|CLEARGIF|COA|COA_INT|CONSTANTS|CONTENT|CUR|EDITPANEL|EFFECT|EXT|FILE|FLUIDTEMPLATE|FORM|FRAME|FRAMESET|GIFBUILDER|[GHT]MENU|GMENU_FOLDOUT|[GT]MENU_LAYERS|GP|HRULER|HTML|IENV|IFSUB|IMAGE|IMGMENU|IMGMENUITEM|IMGTEXT|IMG_RESOURCE|INCLUDE_TYPOSCRIPT|JSMENU|JSMENUITEM|LLL|LOAD_REGISTER|NO|PAGE|RECORDS|RESTORE_REGISTER|TEMPLATE|TEXT|TMENUITEM|USER|USER_INT|_GIFBUILDER|global|globalString|globalVar)\b/;
languages.tsconfig = languages.typoscript = {
  "comment": [
    // multiline comments /* */
    /\/\*[^]*?(?:\*\/|$)/,
    {
      // double-slash comments - ignored when backslashes or colon is found in front
      // also ignored whenever directly after an equal-sign, because it would probably be an url without protocol
      pattern: /(^|[^\\:= 	]|(?:^|[^= 	])[ 	]+)\/\/.*/g,
      lookbehind: true,
      greedy: true
    },
    {
      // hash comments - ignored when leading quote is found for hex colors in strings
      pattern: /(^|[^"'])#.*/g,
      lookbehind: true,
      greedy: true
    }
  ],
  "function": [
    {
      // old include style
      pattern: /<INCLUDE_TYPOSCRIPT:\s*source\s*=\s*(?:"[^\n"]*"|'[^\n']*')\s*>/,
      inside: {
        "string": {
          pattern: /"[^\n"]*"|'[^\n']*'/,
          inside: {
            "keyword": keywords
          }
        },
        "keyword": /INCLUDE_TYPOSCRIPT/
      }
    },
    {
      // new include style
      pattern: /@import\s*(?:"[^\n"]*"|'[^\n']*')/,
      inside: {
        "string": /"[^\n"]*"|'[^\n']*'/
      }
    }
  ],
  "string": {
    pattern: /^((?:[^=]|=\n)*=[< ]?).*[^\n\]]/,
    lookbehind: true,
    inside: {
      "function": /\{\$.*\}/,
      // constants include
      "keyword": keywords,
      "number": /^\d+$/,
      "punctuation": /[,:|]/
    }
  },
  "keyword": keywords,
  "number": {
    // special highlighting for indexes of arrays in tags
    pattern: /\b\d+\s*[.{=]/,
    inside: {
      "operator": /[.{=]/
    }
  },
  "tag": {
    pattern: /\.?[-\w\\]+\.?/,
    inside: {
      "punctuation": /\./
    }
  },
  "punctuation": /[()[\]{}.,:;|]/,
  "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/
};
//# sourceMappingURL=typoscript.js.map
