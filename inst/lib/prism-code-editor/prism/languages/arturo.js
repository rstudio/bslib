import { l as languages } from "../../index-XEj74r-1.js";
var createLanguageString = (lang, pattern = lang) => ({
  pattern: RegExp(`\\{!(?:${pattern})$[^]*\\}`, "mg"),
  greedy: true,
  inside: {
    "string": /^.+|.$/,
    "embedded": {
      pattern: /[^]+/,
      alias: "language-" + lang,
      inside: lang
    }
  }
});
languages.art = languages.arturo = {
  "comment": {
    pattern: /;.*/g,
    greedy: true
  },
  "character": {
    pattern: /`.`/g,
    greedy: true,
    alias: "char"
  },
  "number": /\b\d+(?:\.\d+(?:\.\d+(?:-[\w+-]+)?)?)?\b/,
  "string": {
    pattern: /"(?:\\.|[^\\\n"])*"/g,
    greedy: true
  },
  "regex": {
    pattern: /\{\/.*?\/\}/g,
    greedy: true
  },
  "html-string": createLanguageString("html"),
  "css-string": createLanguageString("css"),
  "js-string": createLanguageString("js"),
  "md-string": createLanguageString("md"),
  "sql-string": createLanguageString("sql"),
  "sh-string": createLanguageString("shell", "sh"),
  "multistring": {
    pattern: /».*|\{:[^]*?:\}|\{[^}]*\}|^-{6}$[^]*/mg,
    alias: "string",
    greedy: true
  },
  "label": {
    pattern: /\w+\??:/,
    alias: "property"
  },
  "literal": {
    pattern: /'\w+\??:?/,
    alias: "constant"
  },
  "type": {
    pattern: /:\w+\??:?/,
    alias: "class-name"
  },
  "color": /#\w+/,
  "predicate": {
    pattern: /\b(?:all|an[dy]|ascii|attr|attribute|attributeLabel|binary|block|char|contains|database|date|dictionary|empty|equal|even|every|exists|false|true|floating|function|greater|greaterOrEqual|i[fns]|inline|integer|key|label|leap|less|lessOrEqual|literal|logical|lower|n?and|negative|not|notEqual|null|numeric|odd|path|pathLabel|positive|prefix|prime|regex|same|set|some|sorted|standalone|string|subset|suffix|superset|symbol|symbolLiteral|try|type|unless|upper|when|whitespace|word|x?n?or|zero)\?/,
    alias: "keyword"
  },
  "builtin-function": {
    pattern: /\b(?:ab?s|a?cosh?|a?csech?|a?ctanh?|add|after|alert|alias|angle|append|args?|arity|array|a?sech?|a?sinh?|a?tanh?|atan2|attrs?|average|before|benchmark|blend|break|call|capitalize|case|ceil|chop|clear|clip|close|color|combine|conj|continue|copy|crc|cursor|darken|dec|decode|define|delete|desaturate|deviation|dialog|dictionary|difference|digest|digits|do|download|drop|dup|e|else|empty|encode|ensure|env|escape|execute|exit|exp|extend|extract|factors|f?div|filter|first|flatten|floor|fold|from|function|gamma|gcd|get|goto|hash|hypot|if|inc|indent|index|infinity|info|input|insert|inspect|intersection|invert|jaro|join|keys|kurtosis|last|let|levenshtein|lighten|list|ln|log|loop|lower|mail|map|match|max|median|min|mod|module|mul|n?and|neg|new|normalize|no[tw]|null|open|outdent|pad|palette|panic|path|pause|permissions|permutate|pi|po[pw]|popup|powerset|powmod|prefix|prints?|process|product|query|random|range|read|relative|remove|rename|render|repeat|replace|request|return|reverse|round|sample|saturate|script|select|serve|set|sh[lr]|shuffle|size|skewness|slice|sort|spin|split|sqrt|squeeze|stack|strip|su[bm]|suffix|switch|symbols|symlink|sys|take|terminal|terminate|to|truncate|try|type|unclip|union|unique|unless|until|unzip|upper|values|var|variance|volume|webview|while|with|wordwrap|write|x?n?or|zip)\b/,
    alias: "keyword"
  },
  "sugar": {
    pattern: /->|=>|\||::/,
    alias: "operator"
  },
  "punctuation": /[()[\],]/,
  "symbol": /<:|-:|ø|@|#|\+|\||\*|\$|---|-|%|\/|\.\.|\^|~|=|<|>|\\/,
  "boolean": /\b(?:false|true|maybe)\b/
};
//# sourceMappingURL=arturo.js.map
