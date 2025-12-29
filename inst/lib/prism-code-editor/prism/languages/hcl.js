import { l as languages } from "../../index-XEj74r-1.js";
languages.hcl = {
  "comment": /(?:\/\/|#).*|\/\*[^]*?(?:\*\/|$)/,
  "heredoc": {
    pattern: /<<-?(\w+\b)[^]*?^[ 	]*\1/mg,
    greedy: true,
    alias: "string"
  },
  "keyword": [
    {
      pattern: /(?:data|resource)\s+(?:"(?:\\[^]|[^\\"])*")(?=\s+"[\w-]+"\s+\{)/i,
      inside: {
        "type": {
          pattern: /(resource|data|\s)(?:"(?:\\[^]|[^\\"])*")/i,
          lookbehind: true,
          alias: "variable"
        }
      }
    },
    {
      pattern: /(?:backend|module|output|provider|provisioner|variable)\s+(?:[\w-]+|"(?:\\[^]|[^\\"])*")\s+(?=\{)/i,
      inside: {
        "type": {
          pattern: /(backend|module|output|provider|provisioner|variable)\s+(?:[\w-]+|"(?:\\[^]|[^\\"])*")\s+/i,
          lookbehind: true,
          alias: "variable"
        }
      }
    },
    /[\w-]+(?=\s+\{)/
  ],
  "property": [
    /[-\w.]+(?=\s*=(?!=))/,
    /"(?:\\[^]|[^\\"])+"(?=\s*[:=])/
  ],
  "string": {
    pattern: /"(?:\\[^]|[^\\"$]|\$(?:(?=")|\$+(?!\$)|[^"${])|\$\{(?:[^{}"]|"(?:\\[^]|[^\\"])*")*\})*"/g,
    greedy: true,
    inside: {
      "interpolation": {
        pattern: /(^|[^$])\$\{(?:[^{}"]|"(?:\\[^]|[^\\"])*")*\}/,
        lookbehind: true,
        inside: {
          "type": {
            pattern: /(\b(?:count|data|local|module|path|self|terraform|var)\b\.)[\w\*]+/i,
            lookbehind: true,
            alias: "variable"
          },
          "keyword": /\b(?:count|data|local|module|path|self|terraform|var)\b/i,
          "function": /\w+(?=\()/,
          "string": {
            pattern: /"(?:\\[^]|[^\\"])*"/g,
            greedy: true
          },
          "number": /\b0x[a-f\d]+\b|\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
          "punctuation": /[?!=$#%&'()[\]{}.,:;*+/<>@\\^`|~]/
        }
      }
    }
  },
  "number": /\b0x[a-f\d]+\b|\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
  "boolean": /\b(?:false|true)\b/i,
  "punctuation": /[=[\]{}]/
};
//# sourceMappingURL=hcl.js.map
