import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, c as clikeString } from "../../patterns-Cp3h1ylA.js";
languages.pbfasm = languages.purebasic = {
  "comment": /;.*/,
  "string": clikeString(),
  "tag": /#\w+\$?/,
  "asm": {
    pattern: /(^[ 	]*)!.*/m,
    lookbehind: true,
    alias: "tag",
    inside: {
      "string": {
        pattern: /(["'`])(?:\\.|(?!\1)[^\\\n])*\1/g,
        greedy: true
      },
      // Anonymous label references, i.e.: jmp @b
      "label-reference-anonymous": {
        pattern: /(!\s*j[a-z]+\s+)@[fb]/i,
        lookbehind: true,
        alias: "fasm-label"
      },
      // Named label reference, i.e.: jne label1
      "label-reference-addressed": {
        pattern: /(!\s*j[a-z]+\s+)[a-z._?$@][\w.?$@~#]*/i,
        lookbehind: true,
        alias: "fasm-label"
      },
      "keyword": [
        /\b(?:extern|global)\b[^\n;]*/i,
        /\b(?:CPU|DEFAULT|FLOAT)\b.*/
      ],
      "function": {
        pattern: /^([ 	]*!\s*)[a-z\d]+(?!\S)/im,
        lookbehind: true
      },
      "function-inline": {
        pattern: /(:\s*)[a-z\d]+(?!\S)/i,
        lookbehind: true,
        alias: "function"
      },
      "label": {
        pattern: /^([ 	]*!\s*)[A-Za-z._?$@][\w.?$@~#]*(?=:)/m,
        lookbehind: true,
        alias: "fasm-label"
      },
      "register": /\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|di|si|sp)|[cdefgs]s|mm\d+)\b/i,
      "number": /(?:\b|-|(?=\$))(?:0[hx](?:[a-f\d]*\.)?[a-f\d]+(?:p[+-]?\d+)?|\d[a-f\d]+[hx]|\$\d[a-f\d]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\d+|(?:\d+(?:\.\d+)?|\.\d+)(?:\.?e[+-]?\d+)?[dt]?)\b/i,
      "operator": /[[\].,:%&|$!=<>/*+-]/
    }
  },
  "keyword": /\b(?:align|and|as|break|calldebugger|compilererror|(?:compiler)?(?:case|default|else|elseif|endif|endselect|if|select)|continue|data|datasection|debug|debuglevel|declarec?|declarec?dll|declaremodule|define|dim|disableasm|disabledebugger|disableexplicit|enableasm|enabledebugger|enableexplicit|enddatasection|enddeclaremodule|endenumeration|endimport|endinterface|endmacro|endmodule|endprocedure|endstructure|endstructureunion|endwith|enumeration|extends|fakereturn|[fx]?or|foreach|forever|global|gosub|goto|importc?|includebinary|includepath|interface|macro|module|newlist|newmap|next|not|procedurec?|procedurec?dll|procedurereturn|protected|prototypec?|read|redim|repeat|restore|return|runtime|shared|static|step|structure|structureunion|swap|threaded|to|until|w?end|while|with|x?includefile)\b/i,
  "function": /\b\w+(?:\.\w+)?\s*(?=\()/,
  "number": /(?:\$[a-f\d]+|\b-?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?)\b/i,
  "operator": /(?:@\*?|\?|\*)\w+\$?|-[>-]?|\+\+?|[!=]=?|<<?=?|>>?=?|&&?|\|\|?|[~^%?*/@]/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=purebasic.js.map
