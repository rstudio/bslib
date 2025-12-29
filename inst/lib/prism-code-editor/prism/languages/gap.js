import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, b as boolean } from "../../patterns-Cp3h1ylA.js";
var gap = {
  pattern: /^(gap>).+(?:\n>.*)*/,
  lookbehind: true
};
gap.inside = languages.gap = {
  "shell": {
    pattern: /^gap>[^]*?(?=^gap>|$(?![^]))/mg,
    greedy: true,
    inside: {
      "gap": gap,
      "punctuation": /^gap>/
    }
  },
  "comment": {
    pattern: /#.*/g,
    greedy: true
  },
  "string": {
    pattern: /(^|[^\\"'])(?:'(?:\\.|[^\\\n']|){1,10}'|"(?:\\.|[^\\\n"])*"(?!")|"""[^]*?""")/g,
    lookbehind: true,
    greedy: true,
    inside: {
      "continuation": {
        pattern: /^>/m,
        alias: "punctuation"
      }
    }
  },
  "keyword": /\b(?:Assert|Info|IsBound|QUIT|TryNextMethod|Unbind|[ae]nd|atomic|break|continue|do|elif|else|fi|f?or|function|if|in|local|m?od|not|quit|readonly|readwrite|rec|repeat|return|then|until|while)\b/,
  "boolean": boolean,
  "function": /\b[a-z_]\w*(?=\s*\()/i,
  "number": {
    pattern: /(^|[^\w.]|\.\.)(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?(?:_[a-z]?)?(?=$|[^\w.]|\.\.)/,
    lookbehind: true
  },
  "continuation": {
    pattern: /^>/m,
    alias: "punctuation"
  },
  "operator": /->|[~^!=/*+-]|<>|[<>]=?|:=|\.\./,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=gap.js.map
