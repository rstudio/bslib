import { l as languages } from "../../index-XEj74r-1.js";
languages["xlsx"] = languages["xls"] = languages["excel-formula"] = {
  "comment": {
    pattern: /(\bn\(\s*)"(?:[^"]|"")*"(?=\s*\))/gi,
    lookbehind: true,
    greedy: true
  },
  "string": {
    pattern: /"(?:[^"]|"")*"(?!")/g,
    greedy: true
  },
  "reference": {
    // https://www.ablebits.com/office-addins-blog/2015/12/08/excel-reference-another-sheet-workbook/
    // Sales!B2
    // 'Winter sales'!B2
    // [Sales.xlsx]Jan!B2:B5
    // D:\Reports\[Sales.xlsx]Jan!B2:B5
    // '[Sales.xlsx]Jan sales'!B2:B5
    // 'D:\Reports\[Sales.xlsx]Jan sales'!B2:B5
    pattern: /(?:'[^']*'|(?:[^\s()[\]{}<>*?"';,$&]*\[[^^\s()[\]{}<>*?"']+\])?\w+)!/g,
    greedy: true,
    alias: "string",
    inside: {
      "operator": /!$/,
      "punctuation": /'/,
      "sheet": {
        pattern: /[^[\]]+$/,
        alias: "function"
      },
      "file": {
        pattern: /\[[^[\]]+\]$/,
        inside: {
          "punctuation": /[[\]]/
        }
      },
      "path": /[^]+/
    }
  },
  "function-name": {
    pattern: /\b[a-z]\w*(?=\()/i,
    alias: "builtin"
  },
  "range": {
    pattern: /\$?\b(?:[a-z]+\$?\d+:\$?[a-z]+\$?\d+|[a-z]+:\$?[a-z]+|\d+:\$?\d+)\b/i,
    alias: "selector",
    inside: {
      "operator": /:/,
      "cell": /\$?[a-z]+\$?\d+/i,
      "column": /\$?[a-z]+/i,
      "row": /\$?\d+/
    }
  },
  "cell": {
    // Excel is case insensitive, so the string "foo1" could be either a variable or a cell.
    // To combat this, we match cells case insensitive, if the contain at least one "$", and case sensitive otherwise.
    pattern: /\b[A-Z]+\d+\b|\$[a-zA-Z]+\$?\d+\b|\b[a-zA-Z]+\$\d+\b/,
    alias: "selector"
  },
  "number": /(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:e[+-]?\d+)?\b/i,
  "boolean": /\b(?:false|true)\b/i,
  "operator": /[%&^,=/*+-]|<[=>]?|>=?/,
  "punctuation": /[()[\]{};|]/
};
//# sourceMappingURL=excel-formula.js.map
