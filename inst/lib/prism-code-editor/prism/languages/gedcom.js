import { l as languages } from "../../index-XEj74r-1.js";
languages.gedcom = {
  "line-value": {
    // Preceded by level, optional pointer, and tag
    pattern: /(^[ 	]*\d+ +(?:@\w[\w!"$%&'()*+,./:;<=>?[\\\]^`{|}~\x80-\xfe #-]*@ +)?\w+ ).+/m,
    lookbehind: true,
    inside: {
      "pointer": {
        pattern: /^@\w[\w!"$%&'()*+,./:;<=>?[\\\]^`{|}~\x80-\xfe #-]*@$/,
        alias: "variable"
      }
    }
  },
  "record": {
    // Preceded by level and optional pointer
    pattern: /(^[ 	]*\d+ +(?:@\w[\w!"$%&'()*+,./:;<=>?[\\\]^`{|}~\x80-\xfe #-]*@ +)?)\w+/m,
    lookbehind: true,
    alias: "tag"
  },
  "level": {
    pattern: /(^[ 	]*)\d+/m,
    lookbehind: true,
    alias: "number"
  },
  "pointer": {
    pattern: /@\w[\w!"$%&'()*+,./:;<=>?[\\\]^`{|}~\x80-\xfe #-]*@/,
    alias: "variable"
  }
};
//# sourceMappingURL=gedcom.js.map
