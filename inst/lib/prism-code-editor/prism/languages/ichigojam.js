import { l as languages } from "../../index-XEj74r-1.js";
languages.ichigojam = {
  "comment": /(?:\B'|rem).*/i,
  "string": {
    pattern: /"(?:""|[!#$%&'()*,/:;<=>?^\w .+-])*"/g,
    greedy: true
  },
  "number": /\B#[a-f\d]+|\B`[01]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  "keyword": /\b(?:beep|bps|case|clear|cl[kopstv]|cont|copy|else|end|files?|for|gosub|goto|gsb|if|input|kbd|led|let|list|load|locate|lrun|new|next|out|play|poke|print|pwm|rem|renum|reset|return|right|r[tu]n|save|scroll|sleep|srnd|st[eo]p|sub|tempo|then|to|uart|video|wait)(?:\$|\b)/i,
  "function": /\b(?:abs|ana|asc|b?in|btn|dec|[er]nd|free|help|hex|i2c[rw]|inkey|len|line|s[ct]r|sound|tick|usr|[vz]er|v?peek)(?:\$|\b)/i,
  "label": /\B@\S+/,
  "operator": /<>|<=|>=|&&|\|\||[~&|^!=<>/*+-]|\b(?:and|not|or)\b/i,
  "punctuation": /[()[\],:;]/
};
//# sourceMappingURL=ichigojam.js.map
