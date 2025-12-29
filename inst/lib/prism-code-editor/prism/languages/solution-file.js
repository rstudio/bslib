import { l as languages } from "../../index-XEj74r-1.js";
var guid = {
  // https://en.wikipedia.org/wiki/Universally_unique_identifier#Format
  pattern: /\{[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}\}/i,
  alias: "constant",
  inside: {
    "punctuation": /[{}]/
  }
};
languages["solution-file"] = {
  "comment": {
    pattern: /#.*/g,
    greedy: true
  },
  "string": {
    pattern: /"[^\n"]*"|'[^\n']*'/g,
    greedy: true,
    inside: {
      "guid": guid
    }
  },
  "object": {
    // Foo
    //   Bar("abs") = 9
    //   EndBar
    //   Prop = TRUE
    // EndFoo
    pattern: /^([ 	]*)(?:([A-Z]\w*)\b(?=.*\n(?:\1[ 	].*\n)*\1End\2(?=[ 	]*$))|End[A-Z]\w*(?=[ 	]*$))/mg,
    lookbehind: true,
    greedy: true,
    alias: "keyword"
  },
  "property": {
    pattern: /^([ 	]*)(?!\s)[^\n"#=()]*[^\s"#=()](?=\s*=)/m,
    lookbehind: true,
    inside: {
      "guid": guid
    }
  },
  "guid": guid,
  "number": /\b\d+(?:\.\d+)*\b/,
  "boolean": /\b(?:FALSE|TRUE)\b/,
  "operator": /=/,
  "punctuation": /[(),]/
};
languages["sln"] = languages["solution-file"];
//# sourceMappingURL=solution-file.js.map
