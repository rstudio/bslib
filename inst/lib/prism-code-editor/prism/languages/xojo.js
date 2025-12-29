import { l as languages } from "../../index-XEj74r-1.js";
languages.xojo = {
  "comment": /(?:'|\/\/|rem\b).+/i,
  "string": {
    pattern: /"(?:""|[^"])*"/g,
    greedy: true
  },
  "number": [
    /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    /&[bchou][a-z\d]+/i
  ],
  "directive": {
    pattern: /#(?:else|elseif|endif|if|pragma)\b/i,
    alias: "property"
  },
  "keyword": /\b(?:addhandler|app|array|assigns|as|auto|boolean|break|byref|byval|byte|call|case|catch|cfstringref|cgfloat|class|color|const|continue|cstring|currency|currentmethodname|declare|delegate|dim|do(?:uble|wnto)?|each|else(?:if)?|enumeration|event|exception|exit|extends|false|true|finally|for|function|get|gettypeinfo|global|goto|if|implements|in|inherits|int(?:8|16|32|64|eger|erface)?|lib|loop|me|module|[nt]ext|nil|object|optional|ostype|paramarray|private|property|protected|p?string|ptr|raiseevent|raise|redim|removehandler|return|selector|select|self|set|shared|short|single|soft|static|step|sub|super|then|to|try|ubound|uint(?:8|16|32|64|eger)?|until|using|variant|var|w?end|while|windowptr|wstring)\b/i,
  "operator": /<[=>]|>=|[\\^=<>/*+-]|\b(?:addressof|and|ctype|isa?|mod|new|not|weakaddressof|x?or)\b/i,
  "punctuation": /[().,:;]/
};
//# sourceMappingURL=xojo.js.map
