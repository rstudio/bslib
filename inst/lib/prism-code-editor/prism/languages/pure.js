import { l as languages, r as rest } from "../../index-XEj74r-1.js";
import { r as re } from "../../shared-Sq5P6lf6.js";
var inside = (lang) => ({
  "lang": {
    pattern: /(^%< *)-\*-.+?-\*-/,
    lookbehind: true,
    alias: "comment"
  },
  "delimiter": {
    pattern: /^%<.*|%>$/,
    alias: "punctuation"
  },
  [rest]: lang
});
var pure = languages.pure = {
  "comment": /#!.+|\/\/.*|\/\*[^]*?\*\//
};
var inlineLanguages = [
  "c",
  "c\\+\\+",
  "fortran"
];
var inlineLanguageRe = "%< *-\\*- *<0>\\d* *-\\*-[\\s\\S]+?%>";
inlineLanguages.forEach((lang) => {
  var alias = lang.length == 5 ? "cpp" : lang;
  pure["inline-lang-" + alias] = {
    pattern: re(inlineLanguageRe, [lang], "i"),
    inside: inside(alias)
  };
});
Object.assign(pure, {
  "inline-lang": {
    pattern: /%<[^]+?%>/g,
    greedy: true,
    inside: inside("c")
  },
  "string": {
    pattern: /"(?:\\.|[^\\\n"])*"/g,
    greedy: true
  },
  "number": {
    // The look-behind prevents wrong highlighting of the .. operator
    pattern: /(\.\.)?(?:\b(?:inf|nan)\b|\b0x[a-f\d]+|(?:\b(?:0b)?\d+(?:\.\d+)?|\B\.\d+)(?:e[+-]?\d+)?l?)/i,
    lookbehind: true
  },
  "keyword": /\b(?:NULL|ans|break|bt|case|catch|cd|clear|const|de[fl]|dump|else|end|exit|extern|false|true|force|help|if|infix[lr]?|interface|let|ls|mem|namespace|nonfix|of|otherwise|outfix|override|postfix|prefix|private|public|pwd|quit|run|save|show|stats|[tw]hen|throw|trace|type|underride|using|with)\b/,
  "function": /\b(?:abs|add_(?:addr|constdef|(?:fundef|interface|macdef|typedef)(?:_at)?|vardef)|all|any|applp?|arity|bigintp?|blob(?:_crc|_size|p)?|boolp?|byte_c?string(?:_pointer)?|byte_(?:matrix|pointer)|calloc|cat|catmap|ceil|char[ps]?|check_ptrtag|chr|clear_sentry|clearsym|closurep?|cmatrixp?|cols?|colcat(?:map)?|colmap|colrev|colvector(?:p|seq)?|complex(?:_float_(?:matrix|pointer)|_matrix(?:_view)?|_pointer|p)?|conj|cookedp?|cst|cstring(?:_(?:dup|list|vector))?|curry3?|cyclen?|del_(?:constdef|fundef|interface|macdef|typedef|vardef)|delete|diag(?:mat)?|dim|dmatrixp?|do|double(?:_matrix(?:_view)?|_pointer|p)?|dowith3?|drop|dropwhile|eval(?:cmd)?|exactp|filter|fix|fixity|flip|float(?:_matrix|_pointer)|floor|fold[lr]1?|frac|free|funp?|functionp?|gcd|get(?:_(?:byte|constdef|double|float|fundef|int(?:64)?|interface(?:_typedef)?|long|macdef|pointer|ptrtag|sentry|short|string|typedef|vardef))?|globsym|hash|head|id|im|imatrixp?|index|inexactp|infp|init|insert|int(?:_matrix_view|_matrix|_pointer|p)?|int64_(?:matrix|pointer)|integerp?|iteraten?|iterwhile|join|keys?|lambdap?|last(?:errpos|err)?|lcd|list[2p]?|listmap|make_ptrtag|malloc|map|matcat|max|member|min|nanp|nargs|n?matrixp?|null|numberp?|ord|packed|pack|pointer(?:_cast|_tag|_type|p)?|pow|pred|ptrtag|put(?:_(?:byte|double|float|int64|int|long|pointer|short|string))?|rationalp?|re|realp?|realloc|recordp?|redim|reduce_with|reduce|refp?|repeatn?|reverse|rlistp?|round|rows?|rowcatmap|rowcat|rowmap|rowrev|rowvector(?:p|seq)?|same|scan[lr]1?|sentry|sgn|short_(?:matrix|pointer)|slice|smatrixp?|sort|split|str|strcat|stream|stride|string(?:_(?:dup|list|vector)|p)?|su[bp]diag(?:mat)?|submat|subseq2?|substr|succ|symbolp?|tail|take|takewhile|thunkp?|transpose|trunc|tuplep?|typep|ubyte|uint(?:64)?|ulong|uncurry3?|unref|unzip3?|update|ushort|vals?|varp?|vectorseq|vectorp?|void|zip3?|zipwith3?)\b/,
  "special": {
    pattern: /\b__[a-z]+__\b/i,
    alias: "builtin"
  },
  // Any combination of operator chars can be an operator
  // eslint-disable-next-line no-misleading-character-class
  "operator": /(?:[\\#$"'.,:?@`~\xa1-\xbf\xd7-\xf7\u20d0-\u2bff%&|^!=<>/*+-]|\b_+\b)+|\b(?:and|div|mod|not|or)\b/,
  // FIXME: How can we prevent | and , to be highlighted as operator when they are used alone?
  "punctuation": /[()[\]{},;|]/
});
//# sourceMappingURL=pure.js.map
