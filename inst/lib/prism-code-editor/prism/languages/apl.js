import { l as languages } from "../../index-XEj74r-1.js";
languages.apl = {
  "comment": /(?:⍝|#[! ]).*/,
  "string": {
    pattern: /'(?:[^\n']|'')*'/g,
    greedy: true
  },
  "number": /¯?(?:\d*\.?\b\d+(?:e[+¯]?\d+)?|¯|∞)(?:j¯?(?:(?:\d+(?:\.\d+)?|\.\d+)(?:e[+¯]?\d+)?|¯|∞))?/i,
  "statement": /:[A-Z][a-z][a-zA-Z]*\b/,
  "system-function": {
    pattern: /⎕[a-z]+/i,
    alias: "function"
  },
  "constant": /[⍬⌾#⎕⍞]/,
  "function": /[×÷⌈⌊∣|⍳⍸?⍟○⌹≤≥≠≡≢∊⍷∪∩~∨∧⍱⍲⍴,⍪⌽⊖⍉↑↓⊂⊃⊆⊇⌷⍋⍒⊤⊥⍕⍎⊣⊢⍁⍂≈⍯↗¤→!=<>*+-]/,
  "monadic-operator": {
    pattern: /[\\/⌿⍀¨⍨⌶&∥]/,
    alias: "operator"
  },
  "dyadic-operator": {
    pattern: /[.⍣⍠⍤∘⌸@⌺⍥]/,
    alias: "operator"
  },
  "assignment": {
    pattern: /←/,
    alias: "keyword"
  },
  "punctuation": /[()[\];◇⋄]/,
  "dfn": {
    pattern: /[{}⍺⍵⍶⍹∇⍫:]/,
    alias: "builtin"
  }
};
//# sourceMappingURL=apl.js.map
