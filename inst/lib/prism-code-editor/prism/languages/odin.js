import { l as languages } from "../../index-XEj74r-1.js";
var escapes = /\\(?:["'\\abefnrtv]|0[0-7]{2}|U[a-fA-F\d]{6}|u[a-fA-F\d]{4}|x[a-fA-F\d]{2})/;
languages.odin = {
  /**
   * The current implementation supports only 1 level of nesting.
   *
   * @author Michael Schmidt
   * @author edukisto
   */
  "comment": {
    pattern: /\/\/.*|#!.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:\*(?!\/)|[^*])*(?:\*\/|$))*(?:\*\/|$)/g,
    greedy: true
  },
  /**
   * Should be found before strings because of '"'"- and '`'`-like sequences.
   */
  "char": {
    pattern: /'(?:\\(?:.|[0Uux][a-fA-F\d]{1,6})|[^\n'\\])'/g,
    greedy: true,
    inside: {
      "symbol": escapes
    }
  },
  "string": [
    {
      pattern: /`[^`]*`/g,
      greedy: true
    },
    {
      pattern: /"(?:\\.|[^\\\n"])*"/g,
      greedy: true,
      inside: {
        "symbol": escapes
      }
    }
  ],
  "directive": {
    pattern: /#\w+/,
    alias: "property"
  },
  "number": /\b0(?:b[01_]+|d[\d_]+|h_*(?:(?:(?:[a-fA-F\d]_*){8}){1,2}|(?:[a-fA-F\d]_*){4})|o[0-7_]+|x[a-fA-F\d_]+|z[\dAB_ab]+)\b|(?:\b\d+(?:\.(?!\.)\d*)?|\B\.\d+)(?:[Ee][+-]?\d*)?[ijk]?(?!\w)/,
  "discard": {
    pattern: /\b_\b/,
    alias: "keyword"
  },
  "procedure-definition": {
    pattern: /\b\w+(?=[ 	]*(?::\s*){2}proc\b)/,
    alias: "function"
  },
  "keyword": /\b(?:asm|auto_cast|bit_set|break|cas[et]|context|continue|defer|distinct|do|dynamic|else|enum|fallthrough|for|foreign|if|import|in|map|matrix|not_in|or_else|or_return|package|proc|return|struct|switch|transmute|typeid|union|using|when|where)\b/,
  /**
   * false, nil, true can be used as procedure names. "_" and keywords can't.
   */
  "procedure-name": {
    pattern: /\b\w+(?=[ 	]*\()/,
    alias: "function"
  },
  "boolean": /\b(?:false|true|nil)\b/,
  "constant-parameter-sign": {
    pattern: /\$/,
    alias: "important"
  },
  "undefined": {
    pattern: /---/,
    alias: "operator"
  },
  "arrow": {
    pattern: /->/,
    alias: "punctuation"
  },
  "operator": /--|\+\+|\.\.[<=]?|(?:&~|[~!=/*+-]|[%&|<>]{1,2})=?|[?^]/,
  "punctuation": /[()[\]{}.,:;@]/
};
//# sourceMappingURL=odin.js.map
