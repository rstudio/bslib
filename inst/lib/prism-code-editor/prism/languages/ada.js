import { l as languages } from "../../index-XEj74r-1.js";
languages.ada = {
  "comment": /--.*/,
  "string": /"(?:""|[^"\f\n])*"/,
  "number": /\b\d(?:_?\d)*(?:#[a-f\d](?:_?[a-f\d])*(?:\.[a-f\d](?:_?[a-f\d])*)?#|(?:\.\d(?:_?\d)*)?)(?:e[+-]?\d(?:_?\d)*)?\b/i,
  "attribute": {
    pattern: /\b'\w+/,
    alias: "attr-name"
  },
  "keyword": /\b(?:abort|abs|abstract|accept|access|aliased|all|[ae]nd|array|at|begin|body|case|constant|declare|delay|delta|digits|do|else|elsif|entry|exception|exit|for|function|generic|goto|i[fns]|interface|limited|loop|mod|new|not|null|of|others|out|overriding|package|pragma|private|procedure|protected|raise|range|record|rem|renames|requeue|return|reverse|select|separate|some|subtype|synchronized|tagged|task|terminate|[tw]hen|type|until|use|while|with|x?or)\b/i,
  "boolean": /\b(?:false|true)\b/i,
  "operator": /<[=>]?|>=?|=>?|:=|\/=?|\*\*?|[&+-]/,
  "punctuation": /\.\.?|[(),:;]/,
  "char": /'.'/,
  "variable": /\b[a-z]\w*/i
};
//# sourceMappingURL=ada.js.map
