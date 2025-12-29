import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
languages.n1ql = {
  "comment": {
    pattern: /\/\*[^]*?(?:$|\*\/)|--.*/g,
    greedy: true
  },
  "string": {
    pattern: /(["'])(?:\\[^]|(?!\1)[^\\]|\1\1)*\1/g,
    greedy: true
  },
  "identifier": {
    pattern: /`(?:\\[^]|[^\\`]|``)*`/g,
    greedy: true
  },
  "parameter": /\$[\w.]+/,
  // https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/reservedwords.html#n1ql-reserved-words
  "keyword": /\b(?:advise|alter|analyze|asc?|at|begin|binary|boolean|break|bucket|build|by|c?all|[cl]ast|cluster|collate|collection|commit|committed|connect|continue|correlated?|c?over|create|current|database|dataset|datastore|declare|decrement|delete|derived|desc|describe|distinct|do|drop|each|element|except|exclude|execute|explain|fetch|filter|flatten|flush|following|[fx]or|force|from|fts|function|golang|grant|groups?|gsi|hash|having|if|ignore|ilike|include|increment|index|infer|inline|inner|insert|intersect|into|is|isolation|javascript|join|keys?|keyspace|known|language|lef?t|letting|level|limit|lsm|map|mapping|matched|materialized|merge|minus|missing|namespace|nest|nl|no|nth_value|nulls?|number|object|offset|on|options?|order|others|outer|parse|partition|password|path|pool|preceding|prepare|primary|private|privilege|probe|procedure|public|range|raw|realm|reduce|rename|respect|return|returning|revoke|right|role|rollback|rows?|satisfies|savepoint|schema|scope|select|self|semi|set|show|some|start|statistics|string|system|ties|to|tran|transaction|trigger|truncate|unbounded|under|union|unique|unknown|unnest|unset|update|upsert|user?|using|validate|values?|via|view|where|while|window|with|work)\b/i,
  "function": /\b[a-z_]\w*(?=\s*\()/i,
  "boolean": /\b(?:false|true)\b/i,
  "number": /(?:\b\d+\.|\B\.)\d+e[+-]?\d+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
  "operator": /[%/*+-]|!=|==?|\|\||<[>=]?|>=?|\b(?:an[dy]|array|between|case|else|end|every|exists|first|in|like|not|or|[tw]hen|valued|within)\b/i,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=n1ql.js.map
