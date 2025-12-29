import { l as languages } from "../../index-XEj74r-1.js";
languages.neon = {
  "comment": /#.*/,
  "string": {
    pattern: /(^|[[{(=,:\s])(?:('''|""")\n(?:(?:[^\n]|\n(?![ 	]*\2))*\n)?[ 	]*\2|'[^\n']*'|"(?:\\.|[^\\\n"])*")/g,
    lookbehind: true,
    greedy: true
  },
  "datetime": {
    pattern: /(^|[[{(=,:\s])\d{4}-\d\d?-\d\d?(?:(?:[Tt]| +)\d\d?:\d\d:\d\d(?:\.\d*)? *(?:Z|[+-]\d\d?(?::?\d\d)?)?)?(?![^\s\]}),])/,
    lookbehind: true,
    alias: "number"
  },
  "key": {
    pattern: /(^|[[{(,\s])[^\s,:=()[\]{}"']+(?=\s*:(?:$|[\]}),\s])|\s*=)/,
    lookbehind: true,
    alias: "property"
  },
  "number": {
    pattern: /(^|[[{(=,:\s])[+-]?(?:0x[a-fA-F\d]+|0o[0-7]+|0b[01]+|(?:\d+(?:\.\d*)?|\.?\d+)(?:[eE][+-]?\d+)?)(?![^\s\]}),:=])/,
    lookbehind: true
  },
  "boolean": {
    pattern: /(^|[[{(=,:\s])(?:false|true|no|yes)(?![^\s\]}),:=])/i,
    lookbehind: true
  },
  "null": {
    pattern: /(^|[[{(=,:\s])(?:null)(?![^\s\]}),:=])/i,
    lookbehind: true,
    alias: "keyword"
  },
  "literal": {
    pattern: /(^|[[{(=,:\s])(?:[^\s#"'`()[\]{},:=-]|[:-][^\s"',=()[\]{}])(?:[^\s,:=()\]}]|:(?=[^\s,\]})])|[ 	]+[^\s#,:=()\]}])*/,
    lookbehind: true,
    alias: "string"
  },
  "punctuation": /[()[\]{},:=-]/
};
//# sourceMappingURL=neon.js.map
