import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
languages.ocaml = {
  "comment": /\(\*[^]*?\*\)/,
  "char": {
    pattern: /'(?:[^\\\n']|\\(?:.|[ox]?[a-f\d]{1,3}))'/gi,
    greedy: true
  },
  "string": {
    pattern: /"(?:\\[^]|[^\\\n"])*"|\{([a-z_]*)\|[^]*?\|\1\}/g,
    greedy: true
  },
  "number": [
    // binary and octal
    /\b(?:0b[01][01_]*|0o[0-7][0-7_]*)\b/i,
    // hexadecimal
    /\b0x[a-f\d][a-f\d_]*(?:\.[a-f\d_]*)?(?:p[+-]?\d[\d_]*)?(?!\w)/i,
    // decimal
    /\b\d[\d_]*(?:\.[\d_]*)?(?:e[+-]?\d[\d_]*)?(?!\w)/i
  ],
  "directive": {
    pattern: /\B#\w+/,
    alias: "property"
  },
  "label": {
    pattern: /\B~\w+/,
    alias: "property"
  },
  "type-variable": {
    pattern: /\B'\w+/,
    alias: "function"
  },
  "variant": {
    pattern: /`\w+/,
    alias: "symbol"
  },
  // For the list of keywords and operators,
  // see: http://caml.inria.fr/pub/docs/manual-ocaml/lex.html#sec84
  "keyword": /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|[tw]hen|to|try|type|val|value|virtual|where|while|with)\b/,
  "boolean": boolean,
  "operator-like-punctuation": {
    pattern: /\[[<>|]|[>|]\]|\{<|>\}/,
    alias: "punctuation"
  },
  // Custom operators are allowed
  "operator": /\.[.~]|:[=>]|[@$?~%&|^!=<>/*+-][.:/@$?~%&|^!=<>/*+-]*|\b(?:and|asr|land|ls[lr]|lx?or|mod|or)\b/,
  "punctuation": /;;|::|[()[\]{}.,:;#]|\b_\b/
};
//# sourceMappingURL=ocaml.js.map
