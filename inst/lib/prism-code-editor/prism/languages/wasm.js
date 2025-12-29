import { l as languages } from "../../index-XEj74r-1.js";
languages.wasm = {
  "comment": /\(;[^]*?;\)|;;.*/,
  "string": {
    pattern: /"(?:\\[^]|[^\\"])*"/g,
    greedy: true
  },
  "keyword": [
    {
      pattern: /\b(?:align|offset)=/,
      inside: {
        "operator": /=/
      }
    },
    {
      pattern: /\b(?:(?:[fi]32|[fi]64)(?:\.(?:abs|a[dn]d|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|neg?|nearest|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|sqrt|store(?:8|16|32)?|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|x?or))?|memory\.(?:grow|size))\b/,
      inside: {
        "punctuation": /\./
      }
    },
    /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/
  ],
  "variable": /\$[\w!#$%&'*./:<=>?@\\^`|~+-]+/,
  "number": /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[a-fA-F\d](?:_?[a-fA-F\d])*(?:\.[a-fA-F\d](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[a-fA-F\d](?:_?[\da-fA-D])*)?\b/,
  "punctuation": /[()]/
};
//# sourceMappingURL=wasm.js.map
