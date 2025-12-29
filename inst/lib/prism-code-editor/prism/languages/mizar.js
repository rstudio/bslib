import { l as languages } from "../../index-XEj74r-1.js";
languages.mizar = {
  "comment": /::.+/,
  "keyword": /@proof\b|\b(?:according|aggregate|all|[ae]nd|antonym|are|as|associativity|assume|a?symmetry|attr|be|begin|being|by|canceled|cases?|clusters?|coherence|commutativity|compatibility|connectedness|consider|consistency|constructors|contradiction|correctness|def|deffunc|define|definitions?|defpred|do|does|environ|equals|ex|exactly|existence|f?or|from|func|given|hence|hereby|holds|idempotence|identity|iff?|implies|involutiveness|irreflexivity|is|it|let|means|mode|no[nw]|not|notations?|of|otherwise|over|per|pred|prefix|projectivity|proof|provided|qua|reconsider|redefine|reduce|reducibility|reflexivity|registrations?|requirements|reserve|sch|schemes?|section|selector|set|sethood|st|struct|such|suppose|synonym|take|that|then?|theorems?|thesis|thus|to|transitivity|uniqueness|vocabular(?:ies|y)|when|where|with|wrt)\b/,
  "parameter": {
    pattern: /\$(?:10|\d)/,
    alias: "variable"
  },
  "variable": /\b\w+(?=:)/,
  "number": /(?:\b|-)\d+\b/,
  "operator": /\.{3}|->|&|\.?=/,
  "punctuation": /\(#|#\)|[()[\]{},:;]/
};
//# sourceMappingURL=mizar.js.map
