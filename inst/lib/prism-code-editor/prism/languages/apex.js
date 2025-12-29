import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, c as clikeString, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
import { a as replace, r as re } from "../../shared-Sq5P6lf6.js";
import "./clike.js";
import "./sql.js";
var keywords = /\b(?:(?:after|before)(?=\s+[a-z])|abstract|activate|an[dy]|array|asc?|autonomous|begin|bigdecimal|blob|boolean|break|bulk|by|byte|cas[et]|catch|char|class|collect|commit|const|continue|currency|date|datetime|decimal|default|delete|desc|do|double|else|end|enum|exception|exit|export|extends|final|finally|float|for|from|get(?=\s*[{};])|global|goto|group|having|hint|if|implements|import|inner|insert|instanceof|integer|interface|into?|in|join|like|limit|list|long|loop|map|merge|new|not|nulls?|number|o[fnr]|outer|override|package|parallel|pragma|private|protected|public|retrieve|return|rollback|select|set|short|s?object|sort|static|string|super|switch|synchronized|system|testmethod|[tw]hen|this|throw|time|transaction|transient|trigger|try|undelete|update|upsert|using|virtual|void|webservice|where|while|(?:inherited|with|without)\s+sharing)\b/i;
var className = replace("\\b(?:(?=[a-z_]\\w*\\s*[<\\[])|(?!<0>))[A-Z_]\\w*(?:\\s*\\.\\s*[A-Z_]\\w*)*\\b(?:\\s*(?:\\[\\s*\\]|<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>))*", [keywords.source]);
var insertClassName = (pattern) => re(pattern, [className], "i");
var classNameInside = {
  "keyword": keywords,
  "punctuation": /[()[\]{}.,:;<>]/
};
languages.apex = {
  "comment": clikeComment(),
  "string": clikeString(),
  "sql": {
    pattern: /((?:[=,({:]|\breturn)\s*)\[[^[\]]*\]/gi,
    lookbehind: true,
    greedy: true,
    alias: "language-sql",
    inside: "sql"
  },
  "annotation": {
    pattern: /@\w+/,
    alias: "punctuation"
  },
  "class-name": [
    {
      pattern: insertClassName("(\\b(?:class|enum|extends|implements|instanceof|interface|new|trigger\\s+\\w+\\s+on)\\s+)<0>"),
      lookbehind: true,
      inside: classNameInside
    },
    {
      // cast
      pattern: insertClassName("(\\(\\s*)<0>(?=\\s*\\)\\s*[\\w(])"),
      lookbehind: true,
      inside: classNameInside
    },
    {
      // variable/parameter declaration and return types
      pattern: insertClassName("<0>(?=\\s*\\w+\\s*[;=,(){:])"),
      inside: classNameInside
    }
  ],
  "trigger": {
    pattern: /(\btrigger\s+)\w+/i,
    lookbehind: true,
    alias: "class-name"
  },
  "keyword": keywords,
  "function": /\b[a-z_]\w*(?=\s*\()/i,
  "boolean": /\b(?:false|true)\b/i,
  "number": /(?:\B\.\d+|\b\d+(?:\.\d+|l)?)\b/i,
  "operator": /\?\.?|&&|\|\||--|\+\+|(?:[!=]=|<<|>>>?|[&|^!=<>/*+-])=?|:/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=apex.js.map
