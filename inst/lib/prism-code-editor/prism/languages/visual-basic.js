import { l as languages } from "../../index-XEj74r-1.js";
languages.vba = languages.vb = languages["visual-basic"] = {
  "comment": {
    pattern: /(?:['‘’]|rem\b)(?:[^\n_]|_\n?)*/i,
    inside: {
      "keyword": /^rem/i
    }
  },
  "directive": {
    pattern: /#(?:const|else|elseif|end|externalchecksum|externalsource|if|region)(?:\b_[ 	]*\n|.)+/gi,
    alias: "property",
    greedy: true
  },
  "string": {
    pattern: /\$?["“”](?:["“”]{2}|[^"“”])*["“”]c?/gi,
    greedy: true
  },
  "date": {
    pattern: /#[ 	]*(?:\d+([/-])\d+\1\d+(?:[ 	]+(?:\d+[ 	]*(?:am|pm)|\d+:\d+(?::\d+)?(?:[ 	]*(?:am|pm))?))?|\d+[ 	]*(?:am|pm)|\d+:\d+(?::\d+)?(?:[ 	]*(?:am|pm))?)[ 	]*#/i,
    alias: "number"
  },
  "number": /(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?|&[ho][a-f\d]+)(?:[frd]|u?[ils])?/i,
  "boolean": /\b(?:false|true|nothing)\b/i,
  "keyword": /\b(?:addhandler|addressof|alias|andalso|and|as|boolean|byref|byval|call|case|catch|cbool|cc?har|c?date|cdbl|cdec|cobj|c?s?byte|csng|cstr|c?type|cu?int|cu?lng|c?u?short|class|const|continue|currency|decimal|declare|default|delegate|dim|directcast|do|double|each|else|elseif|endif|enum|erase|error|event|exit|finally|[fx]or|friend|function|get(?:type|xmlnamespace)?|global|gosub|goto|handles|i[fns]|implements|imports|inherits|interface|isnot|[ls]et|lib|like|loop|me|mod|module|must(?:inherit|override)|mybase|myclass|namespace|narrowing|new|next|notinheritable|notoverridable|not|object|o[fnr]|operator|optional|option|orelse|out|overloads|overridable|overrides|paramarray|partial|private|property|protected|public|raiseevent|readonly|redim|removehandler|resume|return|select|shadows|shared|single|static|step|stop|string|structure|sub|synclock|[tw]hen|throw|to|try|trycast|typeof|u?integer|u?long|until|using|variant|w?end|while|widening|withevents|with|writeonly)\b/i,
  "operator": /[\\#@$%&^!=<>/*+-]|\b_(?=[ 	]*\n)/,
  "punctuation": /[(){}.,:?]/
};
//# sourceMappingURL=visual-basic.js.map
