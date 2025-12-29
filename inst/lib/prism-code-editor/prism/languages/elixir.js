import { r as rest, l as languages } from "../../index-XEj74r-1.js";
var interpolationInside = {
  "delimiter": {
    pattern: /^#\{|\}$/,
    alias: "punctuation"
  }
};
interpolationInside[rest] = languages.elixir = {
  "doc": {
    pattern: /@(?:doc|moduledoc)\s+(?:("""|''')[^]*?\1|(["'])(?:\\[^]|(?!\2)[^\\\n])*\2)/,
    inside: {
      "attribute": /^@\w+/,
      "string": /["'][^]+/
    }
  },
  "comment": {
    pattern: /#.*/g,
    greedy: true
  },
  // ~r"""foo""" (multi-line), ~r'''foo''' (multi-line), ~r/foo/, ~r|foo|, ~r"foo", ~r'foo', ~r(foo), ~r[foo], ~r{foo}, ~r<foo>
  "regex": {
    pattern: /~[rR](?:("""|''')(?:\\[^]|(?!\1)[^\\])+\1|([/|"'])(?:\\.|(?!\2)[^\\\n])+\2|\((?:\\.|[^\\)\n])+\)|\[(?:\\.|[^\\\]\n])+\]|\{(?:\\.|[^\\}\n])+\}|<(?:\\.|[^\\>\n])+>)[uismxfr]*/g,
    greedy: true
  },
  "string": {
    // ~s"""foo""" (multi-line), ~s'''foo''' (multi-line), ~s/foo/, ~s|foo|, ~s"foo", ~s'foo', ~s(foo), ~s[foo], ~s{foo} (with interpolation care), ~s<foo>
    pattern: /~[cCsSwW](?:("""|''')(?:\\[^]|(?!\1)[^\\])+\1|([/|"'])(?:\\.|(?!\2)[^\\\n])+\2|\((?:\\.|[^\\)\n])+\)|\[(?:\\.|[^\\\]\n])+\]|\{(?:\\.|#\{[^}]+\}|#(?!\{)|[^#\\}\n])+\}|<(?:\\.|[^\\>\n])+>)[csa]?|("""|''')[^]*?\3|(["'])(?:\\[^]|(?!\4)[^\\\n])*\4/g,
    greedy: true,
    inside: {
      "interpolation": {
        pattern: /#\{[^}]+\}/,
        inside: interpolationInside
      }
    }
  },
  "atom": {
    // Look-behind prevents bad highlighting of the :: operator
    pattern: /(^|[^:]):\w+/,
    lookbehind: true,
    alias: "symbol"
  },
  "module": {
    pattern: /\b[A-Z]\w*\b/,
    alias: "class-name"
  },
  // Look-ahead prevents bad highlighting of the :: operator
  "attr-name": /\b\w+\??:(?!:)/,
  "argument": {
    // Look-behind prevents bad highlighting of the && operator
    pattern: /(^|[^&])&\d+/,
    lookbehind: true,
    alias: "variable"
  },
  "attribute": {
    pattern: /@\w+/,
    alias: "variable"
  },
  "function": /\b(?!\d)\w+[?!]?(?:(?=\s*(?:\.\s*)?\()|(?=\/\d))/,
  "number": /\b(?:0[box][a-f\d_]+|\d[\d_]*)(?:\.[\d_]+)?(?:e[+-]?[\d_]+)?\b/i,
  "keyword": /\b(?:after|alias|[ae]nd|case|catch|cond|def(?:callback|delegate|exception|impl|macro|module|n?p?|protocol|struct)|do|else|fn|f?or|if|import|not|quote|raise|require|rescue|try|unless|unquote|use|when)\b/,
  "boolean": /\b(?:false|true|nil)\b/,
  "operator": [
    /\bin\b|&&?|\|[|>]?|\\\\|::|\.{2,3}|\+\+?|-[->]?|<[=>-]|>=|!==?|\B!|=(?:==?|[>~])?|[*/^]/,
    {
      // We don't want to match <<
      pattern: /([^<])<(?!<)/,
      lookbehind: true
    },
    {
      // We don't want to match >>
      pattern: /([^>])>(?!>)/,
      lookbehind: true
    }
  ],
  "punctuation": /<<|>>|[()[\]{}.,%]/
};
//# sourceMappingURL=elixir.js.map
