import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
var content = {
  pattern: /[^]+/
};
var interpolation = "\\\\\\((?:[^()]|\\([^)]*\\))*\\)";
var string = '(^|[^\\\\])"(?:[^\\\\\n"]|\\\\[^\n(]|__)*"'.replace(/__/g, interpolation);
var stringInterpolation = {
  "interpolation": {
    pattern: RegExp("((?:^|[^\\\\])(?:\\\\\\\\)*)" + interpolation),
    lookbehind: true,
    inside: {
      "punctuation": /^\\\(|\)$/,
      "content": content
    }
  }
};
content.inside = languages.jq = {
  "comment": /#.*/,
  "property": {
    pattern: RegExp(string + "(?=\\s*:(?!:))", "g"),
    lookbehind: true,
    greedy: true,
    inside: stringInterpolation
  },
  "string": {
    pattern: RegExp(string, "g"),
    lookbehind: true,
    greedy: true,
    inside: stringInterpolation
  },
  "function": {
    pattern: /(\bdef\s+)[a-z_]\w+/i,
    lookbehind: true
  },
  "variable": /\B\$\w+/,
  "property-literal": {
    pattern: /\b[a-z_]\w*(?=\s*:(?!:))/i,
    alias: "property"
  },
  "keyword": /\b(?:as|break|catch|def|elif|else|end|foreach|if|import|include|label|module|modulemeta|null|reduce|then|try|while)\b/,
  "boolean": boolean,
  "number": /(?:\b\d+\.|\B\.)?\b\d+(?:[eE][+-]?\d+)?\b/,
  "operator": [
    {
      pattern: /\|=?/,
      alias: "pipe"
    },
    /\.\.|!=|\?\/\/|\/\/=?|[%=<>/*+-]=?|\?|\b(?:and|not|or)\b/
  ],
  "c-style-function": {
    pattern: /\b[a-z_]\w*(?=\s*\()/i,
    alias: "function"
  },
  "punctuation": /::|[()[\]{},:;]|\.(?=\s*[\[$\w])/,
  "dot": {
    pattern: /\./,
    alias: "important"
  }
};
//# sourceMappingURL=jq.js.map
