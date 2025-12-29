import { l as languages } from "../../index-XEj74r-1.js";
languages.hoon = {
  "comment": /::.*/,
  "string": {
    pattern: /"(?:\\.|[^\\"])*"|'(?:\\.|[^\\'])*'/g,
    greedy: true
  },
  "constant": /%(?:\.[ny]|[\w-]+)/,
  "class-name": /@(?:[a-z\d-]*[a-z\d])?|\*/i,
  "function": /(?:\+[+-]  )?(?:[a-z](?:[a-z\d-]*[a-z\d])?)/,
  "keyword": /\.[+*=?^]|![.:?!=<>]|=[.,:;~?|^<>/*+-]|\?[|.:^<>&~=@!+-]|\|[$_%.:^~*=@?-]|\+[|$+*]|:[_^~*+-]|%[_.:^~*=+]|\^[|.:&~*=?+-]|\$[|_%:<>^&~@=?-]|;[<:;/~*=+]|~[%&|$_?!=<>/+]|--|==/
};
//# sourceMappingURL=hoon.js.map
