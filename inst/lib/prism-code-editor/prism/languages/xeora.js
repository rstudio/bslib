import { l as languages } from "../../index-XEj74r-1.js";
import { c as clone, i as insertBefore } from "../../language-DxUX0ITY.js";
import "./markup.js";
var xeora = languages.xeoracube = languages.xeora = clone(languages.html);
var variable = {
  pattern: /(?:[,|])@?(?:#+|[~=^*+-])?[\w.]+/,
  inside: {
    "punctuation": /[,.|]/,
    "operator": /#+|[~=^@*+-]/
  }
};
var blockPunctuation = {
  pattern: /\$(?:\w:|C\[|C#\d)?|[[\]{:]/,
  inside: {
    "tag": /#\d/
  }
};
insertBefore(xeora, "markup-bracket", {
  "constant": {
    pattern: /\$(?:DomainContents|PageRenderDuration)\$/,
    inside: {
      "punctuation": /\$/
    }
  },
  "variable": {
    pattern: /\$@?(?:#+|[~=^*+-])?[\w.]+\$/,
    inside: {
      "punctuation": /[$.]/,
      "operator": /#+|[~=^@*+-]/
    }
  },
  "function-inline": {
    pattern: /\$F:[\w.-]+\?[\w.-]+(?:,(?:(?:@[-#]*\w+\.[\w+.]\.*)*\|)*(?:(?:[\w+]|[-#*.~^]+[\w+]|=\S)(?:[^$=]|=+[^=])*=*|(?:@[-#]*\w+\.[\w+.]\.*)+(?:(?:[\w+]|[-#*~^][-#*.~^]*[\w+]|=\S)(?:[^$=]|=+[^=])*=*)?)?)?\$/,
    alias: "function",
    inside: {
      "variable": variable,
      "punctuation": /\$\w:|[$?.,:|]/
    }
  },
  "function-block": {
    pattern: /\$XF:\{[\w.-]+\?[\w.-]+(?:,(?:(?:@[-#]*\w+\.[\w+.]\.*)*\|)*(?:(?:[\w+]|[-#*.~^]+[\w+]|=\S)(?:[^$=]|=+[^=])*=*|(?:@[-#]*\w+\.[\w+.]\.*)+(?:(?:[\w+]|[-#*~^][-#*.~^]*[\w+]|=\S)(?:[^$=]|=+[^=])*=*)?)?)?\}:XF\$/,
    alias: "function",
    inside: {
      "variable": variable,
      "punctuation": /[{}$?.,:|]/
    }
  },
  "directive-inline": {
    pattern: /\$\w(?:#\d+\+?)?(?:\[[\w.-]+\])?:[\w./-]+\$/,
    alias: "function",
    inside: {
      "punctuation": blockPunctuation
    }
  },
  "directive-block-open": {
    pattern: /\$\w+:\{|\$\w(?:#\d+\+?)?(?:\[[\w.-]+\])?:[\w.-]+:\{(?:![A-Z]+)?/,
    alias: "function",
    inside: {
      "punctuation": blockPunctuation,
      "attribute": {
        pattern: /!.+/,
        alias: "keyword",
        inside: {
          "punctuation": /!/
        }
      }
    }
  },
  "directive-block-separator": {
    pattern: /\}:[\w.-]+:\{/,
    alias: "function",
    inside: {
      "punctuation": /[:{}]/
    }
  },
  "directive-block-close": {
    pattern: /\}:[\w.-]+\$/,
    alias: "function",
    inside: {
      "punctuation": /[:}$]/
    }
  }
});
//# sourceMappingURL=xeora.js.map
