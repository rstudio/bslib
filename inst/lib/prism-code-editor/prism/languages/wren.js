import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, b as boolean } from "../../patterns-Cp3h1ylA.js";
languages.wren = {
  // Multiline comments in Wren can have nested multiline comments
  // Comments: // and /* */
  "comment": {
    // support 3 levels of nesting
    // regex: \/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\/
    pattern: /\/\/.*|\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|\/\*(?:[^*/]|\*(?!\/)|\/(?!\*))*\*\/)*\*\/)*\*\//g,
    greedy: true
  },
  // Triple quoted strings are multiline but cannot have interpolation (raw strings)
  // Based on prism-python.js
  "triple-quoted-string": {
    pattern: /"""[^]*?"""/g,
    greedy: true,
    alias: "string"
  },
  "string-literal": {
    // A single quote string is multiline and can have interpolation (similar to JS backticks ``)
    pattern: /(^|[^\\"])"(?:\\[^]|[^\\"%]|%(?!\()|%\((?:[^()]|\((?:[^()]|\([^)]*\))*\))*\))*"/g,
    lookbehind: true,
    greedy: true,
    inside: {
      "interpolation": {
        // "%(interpolation)"
        pattern: /((?:^|[^\\])(?:\\\\)*)%\((?:[^()]|\((?:[^()]|\([^)]*\))*\))*\)/,
        lookbehind: true,
        inside: {
          "expression": {
            pattern: /^(..)[^]+(?=.)/,
            lookbehind: true,
            inside: "wren"
          },
          "interpolation-punctuation": {
            pattern: /.+/,
            alias: "punctuation"
          }
        }
      },
      "string": /[^]+/
    }
  },
  // #!/usr/bin/env wren on the first line
  "hashbang": {
    pattern: /^#!\/.+/g,
    greedy: true,
    alias: "comment"
  },
  // Attributes are special keywords to add meta data to classes
  "attribute": {
    // #! attributes are stored in class properties
    // #!myvar = true
    // #attributes are not stored and dismissed at compilation
    pattern: /#!?[ 	　]*\w+/,
    alias: "keyword"
  },
  "class-name": [
    {
      // class definition
      // class Meta {}
      pattern: /(\bclass\s+)\w+/,
      lookbehind: true
    },
    // A class must always start with an uppercase.
    // File.read
    /\b[A-Z][a-z\d_]*\b/
  ],
  // A constant can be a variable, class, property or method. Just named in all uppercase letters
  "constant": /\b[A-Z][A-Z\d_]*\b/,
  "null": {
    pattern: /\bnull\b/,
    alias: "keyword"
  },
  "keyword": /\b(?:as|break|class|construct|continue|else|for|foreign|i[fns]|import|return|static|super|this|var|while)\b/,
  "boolean": boolean,
  "number": /\b(?:0x[a-f\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i,
  // Functions can be Class.method()
  "function": /\b[a-z_]\w*(?=\s*[({])/i,
  "operator": /<<|>>|[!=<>]=?|&&|\|\||[%&|^~?:/*+-]|\.{2,3}/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=wren.js.map
