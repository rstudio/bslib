import { l as languages } from "../../index-XEj74r-1.js";
import { i as insertBefore, e as extend } from "../../language-DxUX0ITY.js";
import "./scheme.js";
insertBefore(
  languages.rkt = languages.racket = extend("scheme", {
    "lambda-parameter": {
      // the racket lambda syntax is a lot more complex, so we won't even attempt to capture it.
      // this will just prevent false positives of the `function` pattern
      pattern: /([(\[]lambda\s+[(\[])[^()[\]'\s]+/,
      lookbehind: true
    }
  }),
  "string",
  {
    "lang": {
      pattern: /^#lang.+/mg,
      greedy: true,
      alias: "keyword"
    }
  }
);
//# sourceMappingURL=racket.js.map
