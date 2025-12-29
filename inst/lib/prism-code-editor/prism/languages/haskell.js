import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
languages.hs = languages.haskell = {
  "comment": {
    pattern: /(^|[^#$?@~.:\\%&|^!=<>/*+-])(?:--(?:(?=.)[^#$?@~.:\\%&|^!=<>/*+-].*|$)|\{-[^]*?-\})/m,
    lookbehind: true
  },
  "char": {
    pattern: /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|ACK|[BD]EL|BS|CAN|CR|DC[1-4]|DLE|EM|ENQ|EOT|ESC|ET[BX]|FF|FS|GS|HT|LF|NAK|NUL|RS|SI|SOH?|SP|STX|SUB|SYN|US|VT|\d+|o[0-7]+|x[a-fA-F\d]+))'/,
    alias: "string"
  },
  "string": {
    pattern: /"(?:[^\\"]|\\(?:\S|\s+\\))*"/g,
    greedy: true
  },
  "keyword": /\b(?:case|class|data|deriving|do|else|if|in|infix[lr]|instance|let|module|newtype|of|primitive|then|type|where)\b/,
  "import-statement": {
    // The imported or hidden names are not included in this import
    // statement. This is because we want to highlight those exactly like
    // we do for the names in the program.
    pattern: /(^[ 	]*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
    lookbehind: true,
    inside: {
      "keyword": /\b(?:as|hiding|import|qualified)\b/,
      "punctuation": /\./
    }
  },
  // These are builtin variables only. Constructors are highlighted later as a constant.
  "builtin": /\b(?:abs|a?cosh?|all|an[dy]|appendFile|approxRational|asTypeOf|a?sinh?|atan[2h]?|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|[ft]ail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|fold[lr]1?|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|ma[px]|mapM|mapM_?|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|ord?|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read(?:s?|Dec|File|Float|Hex|IO|Int|List|LitChar|Ln|Oct|Paren|Signed|sPrec)|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scan[lr]1?|seq|sequence_?|show(?:s|Char|Int|List|LitChar|Paren|Signed|String|sPrec)?|significand|signum|snd|sort|span|splitAt|sqrt|subtract|succ|sum|take|takeWhile|tanh?|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip3?|userError|words|writeFile|zip3?|zipWith3?)\b/,
  // decimal integers and floating point numbers | octal integers | hexadecimal integers
  "number": /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[a-f\d]+)\b/i,
  "operator": [
    {
      // infix operator
      pattern: /`(?:[A-Z][\w']*\.)*[_a-z][\w']*`/g,
      greedy: true
    },
    {
      // function composition
      pattern: /(\s)\.(?!\S)/,
      lookbehind: true
    },
    // Most of this is needed because of the meaning of a single '.'.
    // If it stands alone freely, it is the function composition.
    // It may also be a separator between a module name and an identifier => no
    // operator. If it comes together with other special characters it is an
    // operator too.
    //
    // This regex means: /[!#$%*=?&@|~.:<>^\\/+-]+/ without /\./.
    /[#$?@~:\\%&|^!=<>/*+-][.#$?@~:\\%&|^!=<>/*+-]*|\.[.#$?@~:\\%&|^!=<>/*+-]+/
  ],
  // In Haskell, nearly everything is a variable, do not highlight these.
  "hvariable": {
    pattern: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*/,
    inside: {
      "punctuation": /\./
    }
  },
  "constant": {
    pattern: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*/,
    inside: {
      "punctuation": /\./
    }
  },
  "punctuation": clikePunctuation
};
//# sourceMappingURL=haskell.js.map
