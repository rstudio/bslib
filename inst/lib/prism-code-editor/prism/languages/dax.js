import { l as languages } from "../../index-XEj74r-1.js";
languages.dax = {
  "comment": /\/\*[^]*?\*\/|(?:--|\/\/).*/,
  "data-field": {
    pattern: /'(?:[^']|'')*'(?!')(?:\[[ \w\xa0-\uffff]+\])?|\w+\[[ \w\xa0-\uffff]+\]/,
    alias: "symbol"
  },
  "measure": {
    pattern: /\[[ \w\xa0-\uffff]+\]/,
    alias: "constant"
  },
  "string": {
    pattern: /"(?:[^"]|"")*"(?!")/g,
    greedy: true
  },
  "function": /\b(?:abs|a?cosh?|a?coth?|addcolumns|addmissingitems|all|allcrossfiltered|allexcept|allnoblankrow|allselected|and|approximatedistinctcount|a?sinh?|a?tanh?|average[ax]?|beta\.dist|beta\.inv|blank|calculate|calculatetable|calendar|calendarauto|ceiling|chisq\.(?:dist|inv)(?:\.rt)?|(?:closingbalance|endof|next|openingbalance|previous|startof)(?:month|quarter|year)|coalesce|combina?|combinevalues|concatenatex?|confidence\.norm|confidence\.t|contains|containsrow|containsstring|containsstringexact|convert|counta?x?|countblank|countrows|crossfilter|crossjoin|currency|currentgroup|customdata|datatable|dateadd|datediff|datesbetween|datesinperiod|datesmtd|datesqtd|datesytd|datevalue|day|degrees|detailrows|distinct|distinctcount|distinctcountnoblank|divide|earlier|earliest|e?date|eomonth|error|even|exact|except|exp|expon\.dist|fact|false|true|filters?|find|firstdate|firstnonblank|firstnonblankvalue|fixed|floor|format|gcd|generate|generateall|generateseries|geomeanx?|groupby|hasonefilter|hasonevalue|hour|if|if\.eager|iferror|ignore|int|intersect|isblank|iscrossfiltered|isempty|iserror|iseven|isfiltered|isinscope|islogical|isnontext|isnumber|iso\.ceiling|isodd|isonorafter|isselectedmeasure|issubtotal|istext|keepfilters|keywordmatch|lastdate|lastnonblank|lastnonblankvalue|lcm|left|le?n|log|log10|lookupvalue|lower|max[ax]?|medianx?|mid|min[ax]?|minute|mod|month|m?round|naturalinnerjoin|naturalleftouterjoin|nextday|nonvisual|norm\.dist|norm\.inv|norm\.s\.dist|norm\.s\.inv|no[tw]|odd|or|parallelperiod|path|pathcontains|pathitem|pathitemreverse|pathlength|percentilex?\.exc|percentilex?\.inc|permut|pi|poisson\.dist|power|previousday|productx?|quarter|quotient|radians|rand|randbetween|rank\.eq|rankx|related|relatedtable|removefilters|replace|rept|right|rollup|rollupaddissubtotal|rollupgroup|rollupissubtotal|rounddown|roundup|row|sameperiodlastyear|sample|search|second|selectcolumns|selected(?:measure|measureformatstring|measurename|value)|sign|sqrt|sqrtpi|stdevx?\.[ps]|substitute|substitutewithindex|summarize|summarizecolumns|sumx?|switch|t\.dist|t\.dist\.[2r]t|t\.inv|t\.inv\.2t|time|timevalue|today|topn|topnperlevel|topnskip|total[mqy]td|treatas|trim|trunc|unichar|unicode|union|upper|userelationship|username|userobjectid|userprincipalname|utcnow|utctoday|values?|varx?\.[ps]|weekday|weeknum|xirr|xnpv|year|yearfrac)(?=\s*\()/i,
  "keyword": /\b(?:define|evaluate|measure|order\s+by|return|var|start\s+at|asc|desc)\b/i,
  "boolean": {
    pattern: /\b(?:false|true|null)\b/i,
    alias: "constant"
  },
  "number": /\b\d+(?:\.\d*)?|\B\.\d+\b/,
  "operator": /:=|[=^/*+-]|&&?|\|\||<=>?|<[<>]?|>[>=]?|\b(?:in|not)\b/i,
  "punctuation": /[()[\]{}.,;`]/
};
//# sourceMappingURL=dax.js.map
