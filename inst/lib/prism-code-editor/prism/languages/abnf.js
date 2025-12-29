import { l as languages } from "../../index-XEj74r-1.js";
var coreRules = "(?:ALPHA|BIT|CR|CRLF|CTL|DIGIT|DQUOTE|HEXDIG|HTAB|LF|L?WSP|OCTET|SP|V?CHAR)";
languages.abnf = {
  "comment": /;.*/,
  "string": {
    pattern: /(?:%[is])?"[^\n"]*"/g,
    greedy: true,
    inside: {
      "punctuation": /^%./
    }
  },
  "range": {
    pattern: /%(?:b[01]+-[01]+|d\d+-\d+|x[a-f\d]+-[a-f\d]+)/i,
    alias: "number"
  },
  "terminal": {
    pattern: /%(?:b[01]+(?:\.[01]+)*|d\d+(?:\.\d+)*|x[a-f\d]+(?:\.[a-f\d]+)*)/i,
    alias: "number"
  },
  "repetition": {
    pattern: /(^|[^\w-])(?:\d*\*\d*|\d+)/,
    lookbehind: true,
    alias: "operator"
  },
  "definition": {
    pattern: /(^[ 	]*)(?:[a-z][\w-]*|<[^<>\n]*>)(?=\s*=)/m,
    lookbehind: true,
    alias: "keyword",
    inside: {
      "punctuation": /<|>/
    }
  },
  "core-rule": {
    pattern: RegExp(`(?:(^|[^<\\w-])${coreRules}|<${coreRules}>)(?![\\w-])`, "i"),
    lookbehind: true,
    alias: "rule constant",
    inside: {
      "punctuation": /<|>/
    }
  },
  "rule": {
    pattern: /(^|[^<\w-])[a-z][\w-]*|<[^<>\n]*>/i,
    lookbehind: true,
    inside: {
      "punctuation": /<|>/
    }
  },
  "operator": /=\/?|\//,
  "punctuation": /[()[\]]/
};
//# sourceMappingURL=abnf.js.map
