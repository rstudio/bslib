import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, b as boolean } from "../../patterns-Cp3h1ylA.js";
var interpolation = {
  // The lookbehind ensures the ${} is not preceded by \ or ''
  pattern: /(^|(?:^|(?!'').)[^\\])\$\{(?:[^{}]|\{[^}]*\})*\}/,
  lookbehind: true
};
interpolation.inside = languages.nix = {
  "comment": /\/\*[^]*?\*\/|#.*/,
  "string": {
    pattern: /"(?:\\[^]|[^\\"])*"|''(?:(?!'')[^]|''(?:'|\\|\$\{))*''/g,
    greedy: true,
    inside: {
      "interpolation": interpolation
    }
  },
  "url": {
    pattern: /\b(?:[a-z]{3,7}:\/\/)[\w%~/.:#=?&+-]+|([^/])(?:[\w%~.:#=?&+-]*(?!\/\/)[\w%~/.:#=?&+-])?(?!\/\/)\/[\w%~/.:#=?&+-]*/,
    lookbehind: true
  },
  "antiquotation": {
    pattern: /\$(?=\{)/,
    alias: "important"
  },
  "number": /\b\d+\b/,
  "keyword": /\b(?:assert|builtins|else|if|in|inherit|let|null|or|then|with)\b/,
  "function": /\b(?:abort|add|all|any|attrNames|attrValues|baseNameOf|compareVersions|concatLists|currentSystem|deepSeq|derivation|dirOf|div|elem(?:At)?|fetch(?:Tarball|url)|filter(?:Source)?|fromJSON|genList|getAttr|getEnv|hasAttr|hashString|head|import|intersectAttrs|is(?:Attrs|Bool|Function|Int|List|Null|String)|length|lessThan|listToAttrs|map|mul|parseDrvName|pathExists|read(?:Dir|File)|removeAttrs|replaceStrings|seq|sort|stringLength|sub(?:string)?|tail|throw|to(?:File|JSON|Path|String|XML)|trace|typeOf)\b|\bfoldl'\B/,
  "boolean": boolean,
  "operator": /[!=<>]=?|\+\+?|&&|\|\||\/\/|->?|[?@]/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=nix.js.map
