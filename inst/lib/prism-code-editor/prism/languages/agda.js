import { l as languages } from "../../index-XEj74r-1.js";
languages.agda = {
  "comment": /\{-[^]*?(?:-\}|$)|--.*/,
  "string": {
    pattern: /"(?:\\[^]|[^\\\n"])*"/g,
    greedy: true
  },
  "punctuation": /[(){}⦃⦄.;@]/,
  "class-name": {
    pattern: /((?:data|record) +)\S+/,
    lookbehind: true
  },
  "function": {
    pattern: /(^[ 	]*)(?!\s)[^\n:]+(?=:)/m,
    lookbehind: true
  },
  "operator": {
    pattern: /(^|\s)(?:[=|:∀→λ\\?_]|->)(?!\S)/,
    lookbehind: true
  },
  "keyword": /\b(?:Set|abstract|constructor|data|eta-equality|field|forall|hiding|import|in|inductive|infix[lr]?|instance|let|macro|module|mutual|no-eta-equality|open|overlap|pattern|postulate|primitive|private|public|quote|quoteContext|quoteGoal|quoteTerm|record|renaming|rewrite|syntax|tactic|unquote|unquoteDecl|unquoteDef|using|variable|where|with)\b/
};
//# sourceMappingURL=agda.js.map
