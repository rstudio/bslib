import { l as languages } from "../../index-XEj74r-1.js";
languages.basic = {
  "comment": {
    pattern: /(?:!|rem\b).+/i,
    inside: {
      "keyword": /^rem/i
    }
  },
  "string": {
    pattern: /"(?:""|[#$%&'().,:;\w ?^!=<>/*+-])*"/g,
    greedy: true
  },
  "number": /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  "keyword": /\b(?:as|beep|bload|bsave|call absolute|call|case|chain|chdir|clear|close|cls|com|common|const|data|declare|def(?: fn| seg|dbl|int|[ls]ng|str)|dim|do|double|else|elseif|environ|erase|error|exit|field|files|for|function|get|gosub|goto|if|input|integer|ioctl|key|kill|line input|locate|lock|long|loop|[lr]set|mkdir|name|next|off|on(?: com| error| key| timer)?|open|option base|[op]ut|poke|read|redim|rem|restore|resume|return|rmdir|run|select case|shared|shell|single|sleep|static|step|stop|string|sub|swap|system|then|timer|to|troff|tron|type|unlock|until|using|view print|wait|w?end|while|write)(?:\$|\b)/i,
  "function": /\b(?:abs|access|a?cos|angle|area|arithmetic|array|a?sin|ask|atn?|base|begin|break|cause|ceil|chr|clip|collate|color|co[nst]|cosh|csc|date|datum|debug|decimal|de[fgt]|degrees|delete|device|display|dot|elapsed|eps|erasable|exline|exp|external|extype|filetype|fixed|fp|go|graph|handler|idn|image|int?|internal|ip|is|keyed|[lu]bound|[lu]case|left|le[nt]|length|lines?|log2?|log10|[lr]trim|margin|ma[tx]|maxnum|mi[dn]|missing|mod|native|nul|numeric|of|option|ord|organization|outin|output|pi|pointer|points?|pos|print|program|prompt|rad|radians|randomize|record|recsize|rectype|relative|remainder|repeat|rest|retry|rewrite|right|rnd|round|same|se[ct]|select|sequential|setter|sgn|sinh|size|skip|s[qt]r|standard|status|stream|style|tab|tanh?|template|text|there|time|timeout|trace|transform|truncate|use|val|variable|viewport|when|window|with|zer|zonewidth)(?:\$|\b)/i,
  "operator": /<=|<>|>=|[&^=<>/*+-]|\b(?:and|eqv|imp|not|x?or)\b/i,
  "punctuation": /[(),:;]/
};
//# sourceMappingURL=basic.js.map
