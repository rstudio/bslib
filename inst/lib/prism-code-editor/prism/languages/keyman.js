import { l as languages } from "../../index-XEj74r-1.js";
languages.keyman = {
  "comment": {
    pattern: /\bc .*/gi,
    greedy: true
  },
  "string": {
    pattern: /"[^\n"]*"|'[^\n']*'/g,
    greedy: true
  },
  "virtual-key": {
    pattern: /\[\s*(?:(?:[lr]?alt|[lr]?ctrl|n?caps|shift)\s+)*(?:[tku]_[\w?]+|[a-e]\d\d?|"[^\n"]*"|'[^\n']*')\s*\]/gi,
    greedy: true,
    alias: "function"
    // alias for styles
  },
  // https://help.keyman.com/developer/language/guide/headers
  "header-keyword": {
    pattern: /&\w+/,
    alias: "bold"
    // alias for styles
  },
  "header-statement": {
    pattern: /\b(?:bitmap|bitmaps|caps always off|caps on only|copyright|hotkey|language|layout|message|name|shift frees caps|version)\b/i,
    alias: "bold"
    // alias for styles
  },
  "rule-keyword": {
    pattern: /\b(?:any|baselayout|beep|call|context|deadkey|dk|if|index|layer|notany|nul|outs|platform|reset|return|save|set|store|use)\b/i,
    alias: "keyword"
  },
  "structural-keyword": {
    pattern: /\b(?:ansi|begin|group|match|newcontext|nomatch|postkeystroke|readonly|unicode|using keys)\b/i,
    alias: "keyword"
  },
  "compile-target": {
    pattern: /\$(?:keyman|keymanonly|keymanweb|kmfl|weaver):/i,
    alias: "property"
  },
  // U+####, x###, d### characters and numbers
  "number": /\b(?:u\+[a-f\d]+|d?\d+|x[a-f\d]+)\b/i,
  "operator": /[\\+>$]|\.\./,
  "punctuation": /[(),=]/
};
//# sourceMappingURL=keyman.js.map
