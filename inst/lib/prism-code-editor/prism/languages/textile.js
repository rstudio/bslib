import { l as languages } from "../../index-XEj74r-1.js";
import { c as clone, i as insertBefore } from "../../language-DxUX0ITY.js";
import { r as re } from "../../shared-Sq5P6lf6.js";
import "./markup.js";
var replacements = ["(?:\\([^|()\n]+\\)|\\[[^\\]\n]+\\]|\\{[^\n}]+\\})", "(?:\\)|\\((?![^|()\n]+\\)))"];
var modifierTokens = {
  "css": {
    pattern: /\{[^{}]+\}/,
    inside: "css"
  },
  "class-id": {
    pattern: /(\()[^()]+(?=\))/,
    lookbehind: true,
    alias: "attr-value"
  },
  "lang": {
    pattern: /(\[)[^[\]]+(?=\])/,
    lookbehind: true,
    alias: "attr-value"
  },
  // Anything else is punctuation (the first pattern is for row/col spans inside tables)
  "punctuation": /[\\/]\d+|\S/
};
var phraseInlineInside = {
  // Note: superscripts and subscripts are not handled specifically
  // *bold*, **bold**
  "bold": {
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    pattern: re("(^(\\*\\*?)<0>*).+?(?=\\2)", replacements),
    lookbehind: true
  },
  // _italic_, __italic__
  "italic": {
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    pattern: re("(^(__?)<0>*).+?(?=\\2)", replacements),
    lookbehind: true
  },
  // ??cite??
  "cite": {
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    pattern: re("(^\\?\\?<0>*).+?(?=\\?\\?)", replacements),
    lookbehind: true,
    alias: "string"
  },
  // @code@
  "code": {
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    pattern: re("(^@<0>*).+?(?=@)", replacements),
    lookbehind: true,
    alias: "keyword"
  },
  // +inserted+
  "inserted": {
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    pattern: re("(^\\+<0>*).+?(?=\\+)", replacements),
    lookbehind: true
  },
  // -deleted-
  "deleted": {
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    pattern: re("(^-<0>*).+?(?=-)", replacements),
    lookbehind: true
  },
  // %span%
  "span": {
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    pattern: re("(^%<0>*).+?(?=%)", replacements),
    lookbehind: true
  },
  "modifier": {
    pattern: re("(^\\*\\*|__|\\?\\?|[*_%@^~+-])<0>+", replacements),
    lookbehind: true,
    inside: modifierTokens
  },
  "punctuation": /[*_%?@^~+-]+/
};
var phraseTableInside = {
  "modifier": {
    // Modifiers for rows after the first one are
    // preceded by a pipe and a line feed
    pattern: re("(^|\\|\n?)(?:<0>|<1>|[<>=^~_]|[\\\\/]\\d+)+(?=\\.)", replacements),
    lookbehind: true,
    inside: modifierTokens
  },
  "punctuation": /\||^\./
};
var phraseInside = {
  // h1. Header 1
  "block-tag": {
    pattern: re("^[a-z]\\w*(?:<0>|<1>|[<>=])*\\.", replacements),
    inside: {
      "modifier": {
        pattern: re("(^[a-z]\\w*)(?:<0>|<1>|[<>=])+(?=\\.)", replacements),
        lookbehind: true,
        inside: modifierTokens
      },
      "tag": /^[a-z]\w*/,
      "punctuation": /\.$/
    }
  },
  // # List item
  // * List item
  "list": {
    pattern: re("^[*#]+<0>*\\s+\\S.*", replacements, "m"),
    inside: {
      "modifier": {
        pattern: re("(^[*#]+)<0>+", replacements),
        lookbehind: true,
        inside: modifierTokens
      },
      "punctuation": /^[*#]+/
    }
  },
  // | cell | cell | cell |
  "table": {
    // Modifiers can be applied to the row: {color:red}.|1|2|3|
    // or the cell: |{color:red}.1|2|3|
    pattern: re("^(?:(?:<0>|<1>|[<>=^~])+\\.\\s*)?(?:\\|(?:(?:<0>|<1>|[<>=^~_]|[\\\\/]\\d+)+\\.|(?!(?:<0>|<1>|[<>=^~_]|[\\\\/]\\d+)+\\.))[^|]*)+\\|", replacements, "m"),
    inside: phraseTableInside
  },
  "inline": {
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    pattern: re("(^|[^a-zA-Z\\d])(\\*\\*|__|\\?\\?|[*_%@^~+-])<0>*.+?\\2(?![a-zA-Z\\d])", replacements),
    lookbehind: true,
    inside: phraseInlineInside
  },
  // [alias]http://example.com
  "link-ref": {
    pattern: /^\[[^\]]+\]\S+$/m,
    inside: {
      "string": {
        pattern: /(^\[)[^\]]+(?=\])/,
        lookbehind: true
      },
      "url": {
        pattern: /(^\])\S+$/,
        lookbehind: true
      },
      "punctuation": /[[\]]/
    }
  },
  // "text":http://example.com
  // "text":link-ref
  "link": {
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    pattern: re('"<0>*[^"]+":\\S+(?=\\S)[\\w/]?', replacements),
    inside: {
      "text": {
        // eslint-disable-next-line regexp/no-super-linear-backtracking
        pattern: re('(^"<0>*)[^"]+(?=")', replacements),
        lookbehind: true
      },
      "modifier": {
        pattern: re('(^")<0>+', replacements),
        lookbehind: true,
        inside: modifierTokens
      },
      "url": {
        pattern: /(:).+/,
        lookbehind: true
      },
      "punctuation": /[":]/
    }
  },
  // !image.jpg!
  // !image.jpg(Title)!:http://example.com
  "image": {
    pattern: re("!(?:<0>|<1>|[<>=])*(?![<>=])[^!\\s()]+(?:\\([^)]+\\))?!(?::\\S+(?=\\S)[\\w/]?)?", replacements),
    inside: {
      "source": {
        pattern: re("(^!(?:<0>|<1>|[<>=])*)(?![<>=])[^!\\s()]+(?:\\([^)]+\\))?(?=!)", replacements),
        lookbehind: true,
        alias: "url"
      },
      "modifier": {
        pattern: re("(^!)(?:<0>|<1>|[<>=])+", replacements),
        lookbehind: true,
        inside: modifierTokens
      },
      "url": {
        pattern: /(:).+/,
        lookbehind: true
      },
      "punctuation": /[!:]/
    }
  },
  // Footnote[1]
  "footnote": {
    pattern: /\b\[\d+\]/,
    alias: "comment",
    inside: {
      "punctuation": /[[\]]/
    }
  },
  // CSS(Cascading Style Sheet)
  "acronym": {
    pattern: /\b[A-Z\d]+\([^)]+\)/,
    inside: {
      "comment": {
        pattern: /(\()[^()]+(?=\))/,
        lookbehind: true
      },
      "punctuation": /[()]/
    }
  },
  // Prism(C)
  "mark": {
    pattern: /\b\((?:C|R|TM)\)/,
    alias: "comment",
    inside: {
      "punctuation": /[()]/
    }
  }
};
var textile = languages.textile = clone(languages.html);
var nestedPatterns = {};
insertBefore(textile, "markup-bracket", {
  "phrase": {
    pattern: /(^|\n)\S[^]*?(?=$|\n\n)/,
    lookbehind: true,
    inside: phraseInside
  }
});
["bold", "italic", "inserted", "deleted", "span"].forEach((p) => phraseInlineInside[p].inside = nestedPatterns);
["inline", "link", "image", "footnote", "acronym", "mark"].forEach((p) => nestedPatterns[p] = phraseTableInside[p] = phraseInside[p]);
textile.tag.pattern = /<\/?(?!\d)[a-z\d]+(?:\s+[^\s/=>]+(?:=(?:"[^"]*"|'[^']'|[^\s"'>=]+))?)*\s*\/?>/gi;
//# sourceMappingURL=textile.js.map
