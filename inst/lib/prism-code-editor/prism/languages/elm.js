import { l as languages } from "../../index-XEj74r-1.js";
languages.elm = {
  "comment": /--.*|\{-[^]*?-\}/,
  "char": {
    pattern: /'(?:[^\\\n']|\\(?:[abfnrtv\\']|\d+|x[a-fA-F\d]+|u\{[a-fA-F\d]+\}))'/g,
    greedy: true
  },
  "string": {
    // Multiline strings are wrapped in triple ". Quotes may appear unescaped.
    pattern: /"""[^]*?"""|"(?:\\.|[^\\\n"])*"/g,
    greedy: true
  },
  "import-statement": {
    // The imported or hidden names are not included in this import
    // statement. This is because we want to highlight those exactly like
    // we do for the names in the program.
    pattern: /(^[ 	]*)import\s+[A-Z]\w*(?:\.[A-Z]\w*)*(?:\s+as\s+(?:[A-Z]\w*)(?:\.[A-Z]\w*)*)?(?:\s+exposing\s+)?/m,
    lookbehind: true,
    inside: {
      "keyword": /\b(?:as|exposing|import)\b/
    }
  },
  "keyword": /\b(?:alias|as|case|else|exposing|if|in|infix[lr]|let|module|of|then|type)\b/,
  // These are builtin variables only. Constructors are highlighted later as a constant.
  "builtin": /\b(?:abs|a?cos|always|a?sin|atan2?|ceiling|clamp|compare|curry|degrees|e|flip|floor|fromPolar|identity|isInfinite|isNaN|logBase|max|min|negate|never|not|pi|radians|rem|round|sqrt|tan|toFloat|toPolar|toString|truncate|turns|uncurry|xor)\b/,
  // decimal integers and floating point numbers | hexadecimal integers
  "number": /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[a-f\d]+)\b/i,
  // Most of this is needed because of the meaning of a single '.'.
  // If it stands alone freely, it is the function composition.
  // It may also be a separator between a module name and an identifier => no
  // operator. If it comes together with other special characters it is an
  // operator too.
  // Valid operator characters in 0.18: +-/*=.$<>:&|^?%#@~!
  // Ref: https://groups.google.com/forum/#!msg/elm-dev/0AHSnDdkSkQ/E0SVU70JEQAJ
  "operator": /\s\.\s|\.\.+|[:?$#@~%&|^!=<>/*+-]+/,
  // In Elm, nearly everything is a variable, do not highlight these.
  "hvariable": /\b(?:[A-Z]\w*\.)*[a-z]\w*\b/,
  "constant": /\b(?:[A-Z]\w*\.)*[A-Z]\w*\b/,
  "punctuation": /[()[\]{}.,]/
};
//# sourceMappingURL=elm.js.map
