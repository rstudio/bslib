import { l as languages } from "../../index-XEj74r-1.js";
languages.fortran = {
  "quoted-number": {
    pattern: /[boz](["'])[a-f\d]+\1/i,
    alias: "number"
  },
  "string": {
    pattern: /(?:\b\w+_)?(["'])(?:\1\1|&\n(?:[ 	]*!.*\n|(?![ 	]*!))|(?!\1).)*(?:\1|&)/,
    inside: {
      "comment": {
        pattern: /(&\n\s*)!.*/,
        lookbehind: true
      }
    }
  },
  "comment": {
    pattern: /!.*/g,
    greedy: true
  },
  "boolean": /\.(?:false|true)\.(?:_\w+)?/i,
  "number": /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[ed][+-]?\d+)?(?:_\w+)?/i,
  "keyword": /\b(?:allocatable|allocate|assignment|backspace|call|case|character|close|common|complex|contains|continue|cycle|data|deallocate|default|dimension|do|double ?precision|elemental|else|elseif|elsewhere|(?:end ?)?(?:block ?data|do|file|forall|function|if|interface|program|select|subroutine|type|where)|end module|end|entry|equivalence|exit|external|format|go ?to|implicit(?: none)?|in|include|inout|inquire|integer|intent|intrinsic|kind|logical|module procedure|module|namelist|null|nullify|only|open|operator|optional|out|parameter|pointer|print|private|public|pure|rea[dl]|recursive|result|return|rewind|save|select|sequence|stat|stop|target|then|use|while|write)\b/i,
  "operator": [
    /\*\*|\/\/|=>|[=/]=|[<>]=?|::|[%=*+-]|\.[a-z]+\./i,
    {
      // Use lookbehind to prevent confusion with (/ /)
      pattern: /(^|[^(])\/(?!\))/,
      lookbehind: true
    }
  ],
  "punctuation": /\(\/|\/\)|[(),:;&]/
};
//# sourceMappingURL=fortran.js.map
