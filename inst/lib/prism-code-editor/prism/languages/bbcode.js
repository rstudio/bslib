import { l as languages } from "../../index-XEj74r-1.js";
languages.shortcode = languages.bbcode = {
  "tag": {
    pattern: /\[\/?[^\s=\]]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'\]=]+))?(?:\s+[^\s=\]]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'\]=]+))*\s*\]/,
    inside: {
      "punctuation": /^\[\/?|\]$/,
      "attr-value": {
        pattern: /(=\s*)(?:"[^"]*"|'[^']*'|\S+)/,
        lookbehind: true,
        inside: {
          "punctuation": /^["']|["']$/
        }
      },
      "attr-equals": /=/,
      "tag": /^\S+/,
      "attr-name": /\S+/
    }
  }
};
//# sourceMappingURL=bbcode.js.map
