import { l as languages } from "../../index-XEj74r-1.js";
languages.npmignore = languages.hgignore = languages.gitignore = languages.ignore = {
  // https://git-scm.com/docs/gitignore
  "comment": /^#.*/m,
  "entry": {
    pattern: /\S(?:.*(?:(?:\\ )|\S))?/,
    alias: "string",
    inside: {
      "operator": /^!|\*\*?|\?/,
      "regex": {
        pattern: /(^|[^\\])\[[^[\]]*\]/,
        lookbehind: true
      },
      "punctuation": /\//
    }
  }
};
//# sourceMappingURL=ignore.js.map
