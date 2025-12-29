import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
var expression = {
  pattern: /[^]+/
};
var interpolation = {
  pattern: /((?:^|[^\\$])(?:\\\\)*)\$(?:\w+|\{[^{}]*\})/,
  lookbehind: true,
  inside: {
    "interpolation-punctuation": {
      pattern: /^\$\{?|\}$/,
      alias: "punctuation"
    },
    "expression": expression
  }
};
expression.inside = languages.groovy = {
  "comment": clikeComment(),
  "shebang": {
    pattern: /#!.+/g,
    alias: "comment",
    greedy: true
  },
  "interpolation-string": {
    // TODO: Slash strings (e.g. /foo/) can contain line breaks but this will cause a lot of trouble with
    // simple division (see JS regex), so find a fix maybe?
    pattern: /"""(?:\\[^]|[^\\])*?"""|(["/])(?:\\.|(?!\1)[^\\\n])*\1|\$\/(?:[^/$]|\$(?:[/$]|(?![/$]))|\/(?!\$))*\/\$/g,
    greedy: true,
    inside: {
      "interpolation": interpolation,
      "string": /[^]+/
    }
  },
  "string": {
    // https://groovy-lang.org/syntax.html#_dollar_slashy_string
    pattern: /'''(?:\\[^]|[^\\])*?'''|'(?:\\.|[^\\\n'])*'/g,
    greedy: true
  },
  "class-name": {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: true,
    inside: {
      "punctuation": /[.\\]/
    }
  },
  "keyword": /\b(?:abstract|as|assert|boolean|break|byte|case|catch|char|class|const|continue|def|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int?|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throws?|trait|transient|try|void|volatile|while)\b/,
  "boolean": boolean,
  "annotation": {
    pattern: /(^|[^.])@\w+/,
    lookbehind: true,
    alias: "punctuation"
  },
  "function": /\b\w+(?=\()/,
  "number": /\b(?:0b[01_]+|0x[a-f\d_]+(?:\.[a-f\d_p-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?\d+)?)[glidf]?\b/i,
  "operator": {
    pattern: /(^|[^.])(?:~|==?~?|\?[.:]?|\*\.|\.[@&]|\.\.<|\.\.(?!\.)|--|\+\+|&&|\|\||\*\*=?|->|>>>?=?|<<=?|<=>?|[%&|^!=<>/*+-]=?)/,
    lookbehind: true
  },
  "spock-block": /\b(?:and|cleanup|expect|given|setup|[tw]hen|where):/,
  "punctuation": /\.+|[()[\]{},:;$]/
};
//# sourceMappingURL=groovy.js.map
