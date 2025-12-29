import { l as languages } from "../../index-XEj74r-1.js";
languages.warpscript = {
  "comment": /#.*|\/\/.*|\/\*[^]*?\*\//,
  "string": {
    pattern: /"(?:\\.|[^\\\n"])*"|'(?:\\.|[^\\\n'])*'|<'(?:[^\\']|'(?!>)|\\.)*'>/g,
    greedy: true
  },
  "variable": /\$\S+/,
  "macro": {
    pattern: /@\S+/,
    alias: "property"
  },
  // WarpScript doesn't have any keywords, these are all functions under the control category
  // https://www.warp10.io/tags/control
  "keyword": /\b(?:BREAK|CHECKMACRO|CONTINUE|C?UDF|DEFINED|DEFINEDMACRO|EVAL|FAIL|FOR|FOREACH|FORSTEP|IFTE?|MSGFAIL|N?RETURN|RETHROW|SWITCH|TRY|UNTIL|WHILE)\b/,
  "number": /[+-]?\b(?:NaN|Infinity|\d+(?:\.\d*)?(?:[Ee][+-]?\d+)?|0x[a-fA-F\d]+|0b[01]+)\b/,
  "boolean": /\b(?:F|T|false|true)\b/,
  "punctuation": /<%|%>|[()[\]{}]/,
  // Some operators from the "operators" category
  // https://www.warp10.io/tags/operators
  "operator": /==|&&?|\|\|?|\*\*?|>>>?|<<|[<>!~]=?|[%^/-]|\+!?|\b(?:AND|NOT|OR)\b/
};
//# sourceMappingURL=warpscript.js.map
