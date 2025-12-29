import { l as languages } from "../../index-XEj74r-1.js";
import { i as insertBefore, e as extend } from "../../language-DxUX0ITY.js";
import "./sql.js";
insertBefore(
  languages.plsql = extend("sql", {
    "comment": {
      pattern: /\/\*[^]*?\*\/|--.*/g,
      greedy: true
    },
    // https://docs.oracle.com/en/database/oracle/oracle-database/21/lnpls/plsql-reserved-words-keywords.html
    "keyword": /\b(?:a|accessible|add|agent|aggregate|alter|an[dy]|asc?|at|attribute|authid|avg|begin|between|bfile_base|binary|[bc]lob_base|b?lock|body|both|bound|bulk|by|byte|c|c?all|calling|cascade|case|character|charset|charsetform|charsetid|char_base|check|clo[ns]e|clusters?|colauth|collect|columns|comment|commit|committed|compiled|compress|connect|constant|constructor|context|continue|convert|count|crash|create|credential|current|cursor|customdatum|dangling|dat[ae]|date_base|day|declare|default|define|delete|desc|deterministic|directory|distinct|double|drop|duration|element|else|elsif|empty|end|escape|except|exceptions?|exclusive|execute|exists|exit|external|fetch|final|first|fixed|float|for|forall|force|from|function|general|goto|grant|group|hash|having|heap|hidden|hour|identified|i[fns]|immediate|immutable|including|index|indexes|indicator|indices|infinite|insert|instantiable|interface|intersect|interval|into?|invalidate|isolation|java|language|large|leading|length|level|library|like[24c]?|limit|limited|local|long|loop|ma[px]|maxlen|member|merge|min|minus|minute|mode?|modify|month|multiset|mutable|name|nan|national|native|n?char|new|nocompress|nocopy|not|nowait|null|number_base|object|ocicoll|ocidate|ocidatetime|ociduration|ociinterval|ociloblocator|ocinumber|ociraw|ociref|ocirefcursor|ocirowid|ocistring|ocitype|o[fnr]|old|only|opaque|open|operator|option|oracle|oradata|order|organization|orlany|orlvary|others|out|overlaps|overriding|package|parallel_enable|parameters?|parent|partition|pascal|persistable|pipe|pipelined|pluggable|polymorphic|pragma|precision|prior|private|procedure|public|raise|range|raw|read|record|re[fm]|reference|relies_on|remainder|rename|resource|result|result_cache|return|returning|reverse|revoke|rollback|row|sample|save|savepoint|[su]b[124]|second|segment|select|self|separate|sequence|serializable|set|share|short|size|size_t|some|sparse|sql|sqlcode|sqldata|sqlname|sqlstate|standard|start|static|stddev|stored|string|struct|style|submultiset|subpartition|substitutable|subtype|sum|synonym|tabauth|table|tdo|then?|time|timestamp|timezone_(?:abbr|hour|minute|region)|to|trailing|transaction|transactional|trusted|type|under|union|unique|unplug|unsigned|untrusted|update|use|using|valist|values?|variable|variance|v?array|varying|views?|void|when|where|while|with|work|wrapped|write|year|zone)\b/i,
    // https://docs.oracle.com/en/database/oracle/oracle-database/21/lnpls/plsql-language-fundamentals.html#GUID-96A42F7C-7A71-4B90-8255-CA9C8BD9722E
    "operator": /=>|[~^!<>:]=|\.\.|\|\||\*\*|[@%:=<>/*+-]/
  }),
  "operator",
  {
    "label": {
      pattern: /<<\s*\w+\s*>>/,
      alias: "symbol"
    }
  }
);
//# sourceMappingURL=plsql.js.map
