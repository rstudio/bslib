import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, b as boolean } from "../../patterns-Cp3h1ylA.js";
languages.fsharp = {
  "comment": {
    pattern: /\/\/.*|\(\*(?!\))[^]*?\*\)/g,
    greedy: true
  },
  "annotation": {
    pattern: /\[<.+?>\]/g,
    greedy: true,
    inside: {
      "punctuation": /^\[<|>\]$/,
      "class-name": {
        pattern: /^\w+$|(^|;\s*)[A-Z]\w*(?=\()/,
        lookbehind: true
      },
      "annotation-content": {
        pattern: /[^]+/,
        inside: "fsharp"
      }
    }
  },
  "char": {
    pattern: /'(?:[^\\']|\\(?:.|\d{3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}|U[a-fA-F\d]{8}))'B?/g,
    greedy: true
  },
  "string": {
    pattern: /(?:"""[^]*?"""|@"(?:""|[^"])*"|"(?:\\[^]|[^\\"])*")B?/g,
    greedy: true
  },
  "class-name": {
    pattern: /(\b(?:exception|inherit|interface|new|of|type)\s+|\w\s*:\s*|\s:\??>\s*)[.\w]+\b(?:\s*(?:->|\*)\s*[.\w]+\b)*(?!\s*[:.])/,
    lookbehind: true,
    inside: {
      "operator": /->|\*/,
      "punctuation": /\./
    }
  },
  "preprocessor": {
    pattern: /(^[ 	]*)#.*/m,
    lookbehind: true,
    alias: "property",
    inside: {
      "directive": {
        pattern: /(^#)\b(?:else|endif|if|light|line|nowarn)\b/,
        lookbehind: true,
        alias: "keyword"
      }
    }
  },
  "keyword": /\b(?:let|return|use|yield)(?:!\B|\b)|\b(?:abstract|and|asr?|assert|atomic|base|begin|break|checked|class|component|const|constraint|constructor|continue|default|delegate|do|done|downcast|downto|eager|elif|else|end|event|exception|extern|external|false|true|finally|fixed|f?or|fun|function|functor|global|if|in|include|inherit|inline|interface|internal|land|lazy|ls[lr]|lx?or|match|member|method|mixin|mod|module|mutable|namespace|new|not|null|object|of|open|override|parallel|private|process|protected|public|pure|rec|sealed|select|sig|static|struct|tailcall|[tw]hen|to|trait|try|type|upcast|val|virtual|void|volatile|while|with)\b/,
  "boolean": boolean,
  "function": /\b\w+(?=\()/,
  "number": [
    /\b0x[a-fA-F\d]+(?:LF|lf|un)?\b/,
    /\b0b[01]+(?:uy|y)?\b/,
    /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[fm]|e[+-]?\d+)?\b/i,
    /\b\d+(?:[IlLsy]|UL|u[lsy]?)?\b/
  ],
  "operator": /([<>~&^])\1\1|([*.:<>&])\2|<-|->|[!=:]=|<?\|{1,3}>?|\??(?:<=|>=|<>|[%=<>/*+-])\??|[?!^&]|~[+~-]|:>|:\?>?/,
  "computation-expression": {
    pattern: /\b[_a-z]\w*(?=\s*\{)/i,
    alias: "keyword"
  },
  "punctuation": clikePunctuation
};
//# sourceMappingURL=fsharp.js.map
