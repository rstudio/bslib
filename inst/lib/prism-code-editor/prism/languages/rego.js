import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, b as boolean } from "../../patterns-Cp3h1ylA.js";
languages.rego = {
  "comment": /#.*/,
  "property": {
    pattern: /(^|[^\\.])(?:"(?:\\.|[^\\\n"])*"|`[^`]*`|\b[a-z_]\w*\b)(?=\s*:(?!=))/gi,
    lookbehind: true,
    greedy: true
  },
  "string": {
    pattern: /(^|[^\\])"(?:\\.|[^\\\n"])*"|`[^`]*`/g,
    lookbehind: true,
    greedy: true
  },
  "keyword": /\b(?:as|default|else|import|not|null|package|set(?=\s*\()|some|with)\b/,
  "boolean": boolean,
  "function": {
    pattern: /\b[a-z_]\w*\b(?:\s*\.\s*\b[a-z_]\w*\b)*(?=\s*\()/i,
    inside: {
      "namespace": /\b\w+(?=\s*\.)/,
      "punctuation": /\./
    }
  },
  "number": /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  "operator": /[%&|/*+-]|[:=<>]=?|!=|\b_\b/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=rego.js.map
