import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
import { r as re, a as replace } from "../../shared-Sq5P6lf6.js";
var keywords = /\b(?:abstype|[ae]nd|andalso|as|case|datatype|do|else|eqtype|exception|fu?n|functor|handle|if|in|include|infixr?|let|local|nonfix|of|op|open|orelse|raise|rec|sharing|sig|signature|struct|structure|then|type|val|where|while|with|withtype)\b/i;
var longId = `(?!${keywords.source})[a-z\\d_][\\w'.]*`;
var class0 = {
  // This is only an approximation since the real grammar is context-free
  //
  // Why the main loop so complex?
  // The main loop is approximately the same as /(?:\s*(?:[*,]|->)\s*<TERMINAL>)*/ which is, obviously, a lot
  // simpler. The difference is that if a comma is the last iteration of the loop, then the terminal must be
  // followed by a long identifier.
  pattern: re(
    "((?:^|[^:]):\\s*)<0>(?:\\s*(?:(?:\\*|->)\\s*<0>|,\\s*<0>(?:(?=\\s*(?:[*,]|->))|(?!\\s*(?:[*,]|->))\\s+<1>)))*",
    [replace("(?:'[\\w']*|<0>|\\((?:[^()]|\\([^)]*\\))*\\)|\\{(?:[^{}]|\\{[^}]*\\})*\\})(?:\\s+<0>)*", [longId]), longId],
    "gi"
  ),
  lookbehind: true,
  greedy: true
};
class0.inside = languages.smlnj = languages.sml = {
  // allow one level of nesting
  "comment": /\(\*(?:[^*(]|\*(?!\))|\((?!\*)|\(\*(?:[^*(]|\*(?!\))|\((?!\*))*\*\))*\*\)/,
  "string": {
    pattern: /#?"(?:\\.|[^\\"])*"/g,
    greedy: true
  },
  "class-name": [
    class0,
    {
      pattern: /((?:^|[^\w'])(?:datatype|exception|functor|signature|structure|type)\s+)[a-z_][\w'.]*/i,
      lookbehind: true
    }
  ],
  "function": {
    pattern: /((?:^|[^\w'])fun\s+)[a-z_][\w'.]*/i,
    lookbehind: true
  },
  "keyword": keywords,
  "variable": {
    pattern: /(^|[^\w'])'[\w']*/,
    lookbehind: true
  },
  "number": /~?\b(?:\d+(?:\.\d+)?(?:e~?\d+)?|0x[a-f\d]+)\b/i,
  "word": {
    pattern: /\b0w(?:\d+|x[a-f\d]+)\b/i,
    alias: "constant"
  },
  "boolean": /\b(?:false|true)\b/i,
  "operator": /\.{3}|:[>=:]|=>?|->|[<>]=?|[|^#@~!/*+-]/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=sml.js.map
