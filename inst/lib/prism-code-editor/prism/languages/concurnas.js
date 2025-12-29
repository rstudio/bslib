import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, b as boolean, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
var interpolation = {
  pattern: /((?:^|[^\\])(?:\\\\)*)\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/,
  lookbehind: true
};
interpolation.inside = languages.conc = languages.concurnas = {
  "comment": clikeComment(),
  "regex-literal": {
    pattern: /\br(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
    greedy: true,
    inside: {
      "interpolation": interpolation,
      "regex": /[^]+/
    }
  },
  "string-literal": {
    pattern: /(?:\B|\bs)(["'])(?:\\.|(?!\1)[^\\\n])*\1/g,
    greedy: true,
    inside: {
      "interpolation": interpolation,
      "string": /[^]+/
    }
  },
  "langext": {
    pattern: /\b\w+\s*\|\|[^]+?\|\|/g,
    greedy: true,
    inside: {
      "class-name": /^\w+/,
      "string": {
        pattern: /(^\s*..)[^]+(?=..)/,
        lookbehind: true
      },
      "punctuation": /\|\|/
    }
  },
  "function": {
    pattern: /((?:^|\s)def[ 	]+)(?!\d)\w+(?=\s*\()/,
    lookbehind: true
  },
  "keyword": /\b(?:abstract|actor|also|annotation|assert|a?sync|await|bool|boolean|break|byte|case|[cm]atch|changed|char|class|closed|constant|continue|def|default|del|double|elif|else|enum|every|extends|false|true|finally|float|for|from|global|gpudef|gpukernel|if|import|in|ini?t|inject|lambda|local|long|loop|new|nodefault|null|of|onchange|open|out|override|package|parfor|parforsync|post|pre|private|protected|provider?|public|return|shared|short|single|size_t|sizeof|super|this|throw|trait|trans|transient|try|typedef|unchecked|using|va[lr]|void|while|with)\b/,
  "boolean": boolean,
  "number": /\b0b[01][01_]*l?\b|\b0x(?:[a-f\d_]*\.)?[a-f\d_p+-]+\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfls]?/i,
  "punctuation": clikePunctuation,
  "operator": /<==|>==|=>|->|<-|<>|&==|&<>|\?:?|\.\?|--|\+\+|[=<>/*+-]=?|[!^~]|\b(?:as|b?and|bx?or|comp|is|isnot|mod|or)\b=?/,
  "annotation": {
    pattern: /@(?:\w+:)?(?:\w+|\[[^\]]+\])?/,
    alias: "builtin"
  }
};
//# sourceMappingURL=concurnas.js.map
