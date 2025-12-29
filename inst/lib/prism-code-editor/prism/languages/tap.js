import { l as languages } from "../../index-XEj74r-1.js";
import "./yaml.js";
languages.tap = {
  "fail": /not ok[^#{\n]*/,
  "pass": /ok[^#{\n]*/,
  "pragma": /pragma [+-][a-z]+/,
  "bailout": /bail out!.*/i,
  "version": /tap version \d+/i,
  "plan": /\b\d+\.\.\d+(?: +#.*)?/,
  "subtest": {
    pattern: /# Subtest(?:: .*)?/g,
    greedy: true
  },
  "punctuation": /[{}]/,
  "directive": /#.*/,
  "yamlish": {
    pattern: /(^[ 	]*)---[^]*?\n[ 	]*\.{3}$/m,
    lookbehind: true,
    inside: languages.yaml,
    alias: "language-yaml"
  }
};
//# sourceMappingURL=tap.js.map
