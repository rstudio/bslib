import { l as languages } from "../../index-XEj74r-1.js";
languages.nim = {
  "comment": {
    pattern: /#.*/g,
    greedy: true
  },
  "string": {
    // Double-quoted strings can be prefixed by an identifier (Generalized raw string literals)
    pattern: /(?:\b(?!\d)(?:\w|\\x[89a-fA-F][a-fA-F\d])+)?(?:"""[^]*?"""(?!")|"(?:\\[^]|""|[^\\"])*")/g,
    greedy: true
  },
  "char": {
    // Character literals are handled specifically to prevent issues with numeric type suffixes
    pattern: /'(?:\\(?:\d+|x[a-fA-F\d]{0,2}|.)|[^'])'/g,
    greedy: true
  },
  "function": {
    pattern: /(?:(?!\d)(?:\w|\\x[89a-fA-F][a-fA-F\d])+|`[^\n`]+`)\*?(?:\[[^\]]+\])?(?=\s*\()/g,
    greedy: true,
    inside: {
      "operator": /\*$/
    }
  },
  // We don't want to highlight operators (and anything really) inside backticks
  "identifier": {
    pattern: /`[^\n`]+`/g,
    greedy: true,
    inside: {
      "punctuation": /`/
    }
  },
  // The negative look ahead prevents wrong highlighting of the .. operator
  "number": /\b(?:0[xXoObB][a-fA-F\d_]+|\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:[eE][+-]?\d[\d_]*)?)(?:'?[iuf]\d*)?/,
  "keyword": /\b(?:addr|asm?|atomic|bind|block|break|cas[et]|concept|const|continue|converter|defer|discard|distinct|do|elif|else|end|enum|except|export|finally|for|from|func|generic|if|import|include|interface|iterator|let|macro|method|mixin|nil|object|out|proc|ptr|raise|ref|return|static|template|try|tuple|type|using|var|when|while|with|without|yield)\b/,
  "operator": {
    // Look behind and look ahead prevent wrong highlighting of punctuations [. .] {. .} (. .)
    // but allow the slice operator .. to take precedence over them
    // One can define his own operators in Nim so all combination of operators might be an operator.
    pattern: /(^|[({\[](?=\.\.)|(?![({\[]\.).)(?:(?:[\\@$~?:%&|^!=<>/*+-]|\.\.|\.(?![)}\]]))+|\b(?:and|div|in|isnot|is|mod|notin|not|of|sh[lr]|x?or)\b)/m,
    lookbehind: true
  },
  "punctuation": /[({[]\.|\.[)}\]]|[`()[\]{},:]/
};
//# sourceMappingURL=nim.js.map
