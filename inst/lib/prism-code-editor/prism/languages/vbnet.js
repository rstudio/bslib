import { l as languages } from "../../index-XEj74r-1.js";
import { e as extend } from "../../language-DxUX0ITY.js";
import "./basic.js";
languages.vbnet = extend("basic", {
  "comment": {
    pattern: /(?:!|'|rem\b).*/i,
    inside: {
      "keyword": /^rem/i
    }
  },
  "string": {
    pattern: /(^|[^"])"(?:""|[^"])*"(?!")/g,
    lookbehind: true,
    greedy: true
  },
  "keyword": /(?:\b(?:addhandler|addressof|alias|and|andalso|as|beep|bload|boolean|bsave|byref|byval|call absolute|call|case|catch|cbool|c?byte|cc?har|c?date|cdbl|cdec|chain|chdir|cu?int|class|clear|close|cls|cobj|com|common|const|continue|c?sbyte|c?u?short|c?sng|cstr|c?type|cu?lng|data|decimal|declare|def(?: fn| seg|dbl|int|lng|sng|str)|default|delegate|dim|directcast|do|double|else|elseif|enum|environ|erase|error|event|exit|false|true|field|files|finally|for each|for|friend|function|[gls]et|gettype|getxmlnamespace|global|gosub|goto|handles|i[fns]|implements|imports|inherits|input|interface|ioctl|isnot|key|kill|lib|like|line input|locate|lock|loop|[lr]set|me|mkdir|mod|module|mustinherit|mustoverride|mybase|myclass|name|namespace|narrowing|new|next|not|nothing|notinheritable|notoverridable|object|off?|on (?:com|error|key|timer)|on|open|operator|option base|option|optional|orelse|out|overloads|overridable|overrides|paramarray|partial|poke|private|property|protected|public|put|raiseevent|read|readonly|redim|removehandler|restore|resume|return|rmdir|run|select case|select|shadows|shared|shell|single|sleep|static|step|stop|string|structure|sub|swap|synclock|system|[tw]hen|throw|timer|to|troff|tron|try|trycast|typeof|u?integer|u?long|unlock|until|using|view print|wait|w?end|while|widening|with|withevents|write|writeonly|x?or)|\B#(?:const|else|elseif|end|if))(?:\$|\b)/i,
  "punctuation": /[(){},:;]/
});
//# sourceMappingURL=vbnet.js.map
