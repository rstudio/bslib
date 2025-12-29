import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, b as boolean, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
languages.bicep = {
  "comment": clikeComment(),
  "property": [
    {
      pattern: /(\n[ 	]*)[a-z_]\w*(?=[ 	]*:)/i,
      lookbehind: true
    },
    {
      pattern: /(\n[ 	]*)'(?:\\.|\$(?!\{)|[^\\\n'$])*'(?=[ 	]*:)/g,
      lookbehind: true,
      greedy: true
    }
  ],
  "string": [
    {
      pattern: /'''[^'][^]*?'''/g,
      greedy: true
    },
    {
      pattern: /(^|[^\\'])'(?:\\.|\$(?!\{)|[^\\\n'$])*'/g,
      lookbehind: true,
      greedy: true
    }
  ],
  "interpolated-string": {
    pattern: /(^|[^\\'])'(?:\\.|\$(?:(?!\{)|\{[^{}\n]*\})|[^\\\n'$])*'/g,
    lookbehind: true,
    greedy: true,
    inside: {
      "interpolation": {
        pattern: /\$\{[^{}\n]*\}/,
        inside: {
          "punctuation": /^\$\{|\}$/,
          "expression": {
            pattern: /[^]+/,
            inside: "bicep"
          }
        }
      },
      "string": /[^]+/
    }
  },
  "datatype": {
    pattern: /(\b(?:output|param)\b[ 	]+\w+[ 	]+)\w+/,
    lookbehind: true,
    alias: "class-name"
  },
  "boolean": boolean,
  // https://github.com/Azure/bicep/blob/114a3251b4e6e30082a58729f19a8cc4e374ffa6/src/textmate/bicep.tmlanguage#L184
  "keyword": /\b(?:existing|for|if|in|module|null|output|param|resource|targetScope|var)\b/,
  "decorator": /@\w+/,
  "function": /\b[a-z_]\w*(?=[ 	]*\()/i,
  "number": /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  "operator": /--|\+\+|=>|(?:\*\*|&&|\|\||\?\?|[!=]=|<<|>>>?|[%&|^!=<>/*+-])=?|\.{3}|\?\.?|[~:]/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=bicep.js.map
