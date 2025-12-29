import { l as languages } from "../../index-XEj74r-1.js";
import { i as insertBefore, e as extend } from "../../language-DxUX0ITY.js";
import "./turtle.js";
insertBefore(
  languages.rq = languages.sparql = extend("turtle", {
    "boolean": /\b(?:false|true)\b/i,
    "variable": {
      pattern: /[?$]\w+/g,
      greedy: true
    }
  }),
  "punctuation",
  {
    "keyword": [
      /\b(?:a|add|all|as[ck]?|bnode|by|clear|construct|copy|create|data|default|delete|desc|describe|distinct|drop|exists|filter|from|group|having|insert|into|limit|load|minus|move|named|no[tw]|offset|optional|order|rand|reduced|select|separator|service|silent|struuid|union|using|uuid|values|where)\b/i,
      /\b(?:abs|avg|bind|[br]ound|ceil|coalesce|concat|contains|count|datatype|day|encode_for_uri|floor|group_concat|hours|if|[iu]ri|isblank|is[iu]ri|isliteral|isnumeric|lang|langmatches|[lu]case|max|md5|min|minutes|month|regex|replace|sameterm|sample|seconds|sha1|sha256|sha384|sha512|str|strafter|strbefore|strdt|strends|strlang|strlen|strstarts|substr|sum|timezone|tz|year)\b(?=\s*\()/i,
      /\b(?:base|graph|prefix)\b/i
    ]
  }
);
//# sourceMappingURL=sparql.js.map
