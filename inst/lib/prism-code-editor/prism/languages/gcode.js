import { l as languages } from "../../index-XEj74r-1.js";
languages.gcode = {
  "comment": /;.*|\B\(.*?\)\B/,
  "string": {
    pattern: /"(?:""|[^"])*"/g,
    greedy: true
  },
  "keyword": /\b[GM]\d+(?:\.\d+)?\b/,
  "property": /\b[A-Z]/,
  "checksum": {
    pattern: /(\*)\d+/,
    lookbehind: true,
    alias: "number"
  },
  // T0:0:0
  "punctuation": /[:*]/
};
//# sourceMappingURL=gcode.js.map
