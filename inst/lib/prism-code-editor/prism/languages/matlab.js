import { l as languages } from "../../index-XEj74r-1.js";
languages.matlab = {
  "comment": /%\{[^]*?\}%|%.+/,
  "string": {
    pattern: /\B'(?:''|[^\n'])*'/g,
    greedy: true
  },
  // FIXME We could handle imaginary numbers as a whole
  "number": /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
  "keyword": /\b(?:NaN|break|case|catch|continue|else|elseif|end|for|function|in?f|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
  "function": /\b(?!\d)\w+(?=\s*\()/,
  "operator": /\.?[\\^'/*]|[:@]|[~=<>+-]=?|&&?|\|\|?/,
  "punctuation": /\.{3}|[()[\]{}.,;!]/
};
//# sourceMappingURL=matlab.js.map
