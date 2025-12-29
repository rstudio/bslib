import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
languages.cypher = {
  // https://neo4j.com/docs/cypher-manual/current/syntax/comments/
  "comment": /\/\/.*/,
  "string": {
    pattern: /"(?:\\.|[^\\\n"])*"|'(?:\\.|[^\\\n'])*'/g,
    greedy: true
  },
  "class-name": {
    pattern: /(:\s*)(?:\w+|`(?:[^\\\n`])*`)(?=\s*[{):])/g,
    lookbehind: true,
    greedy: true
  },
  "relationship": {
    pattern: /(-\[\s*(?:\w+\s*|`(?:[^\\\n`])*`\s*)?:\s*|\|\s*:\s*)(?:\w+|`(?:[^\\\n`])*`)/g,
    lookbehind: true,
    greedy: true,
    alias: "property"
  },
  "identifier": {
    pattern: /`(?:[^\\\n`])*`/g,
    greedy: true
  },
  "variable": /\$\w+/,
  // https://neo4j.com/docs/cypher-manual/current/syntax/reserved/
  "keyword": /\b(?:add|and|asc?|ascending|assert|by|c?all|case|commit|constraint|contains|create|csv|delete|desc|descending|detach|distinct|do|drop|else|ends?|exists|for|foreach|in|index|is|join|key|limit|load|mandatory|match|merge|node|not|of|on|optional|order(?=\s+by)|periodic|remove|require|return|scalar|scan|set|skip|starts?|[tw]hen|union|unique|unwind|using|where|with|x?or|yield)\b/i,
  "function": /\b\w+(?=\s*\()/,
  "boolean": /\b(?:false|true|null)\b/i,
  "number": /\b(?:0x[a-fA-F\d]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/,
  // https://neo4j.com/docs/cypher-manual/current/syntax/operators/
  "operator": /<--?|--?>?|<>|=~?|[<>]=?|[:%|^/*+]|\.{2,3}/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=cypher.js.map
