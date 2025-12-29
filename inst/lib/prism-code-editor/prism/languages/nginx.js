import { l as languages } from "../../index-XEj74r-1.js";
var variable = /\$(?:\w[a-z\d]*(?:_[^\0-\x1f\s"'\\()$]*)?|\{[^}\s"'\\]+\})/i;
languages.nginx = {
  "comment": {
    pattern: /(^|[\s{};])#.*/g,
    lookbehind: true,
    greedy: true
  },
  "directive": {
    pattern: /(^|\s)\w(?:\\.|[^\\\s"'{};]|"(?:\\.|[^\\"])*"|'(?:\\.|[^\\'])*'|\s+(?:#.*(?!.)|(?![#\s])))*?(?=\s*[;{])/g,
    lookbehind: true,
    greedy: true,
    inside: {
      "string": {
        pattern: /((?:^|[^\\])(?:\\\\)*)(?:"(?:\\.|[^\\"])*"|'(?:\\.|[^\\'])*')/g,
        lookbehind: true,
        greedy: true,
        inside: {
          "escape": {
            pattern: /\\["'\\nrt]/,
            alias: "entity"
          },
          "variable": variable
        }
      },
      "comment": {
        pattern: /(\s)#.*/g,
        lookbehind: true,
        greedy: true
      },
      "keyword": {
        pattern: /^\S+/g,
        greedy: true
      },
      // other patterns
      "boolean": {
        pattern: /(\s)(?:off|on)(?!\S)/,
        lookbehind: true
      },
      "number": {
        pattern: /(\s)\d+[a-z]*(?!\S)/i,
        lookbehind: true
      },
      "variable": variable
    }
  },
  "punctuation": /[{};]/
};
//# sourceMappingURL=nginx.js.map
