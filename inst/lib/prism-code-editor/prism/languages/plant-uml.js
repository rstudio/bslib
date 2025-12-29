import { l as languages } from "../../index-XEj74r-1.js";
var variable = /\$\w+|%[a-z]+%/;
var expression = {
  pattern: /(\[)[^[\]]+(?=\])/,
  lookbehind: true
};
var arrowAttr = "\\[[^[\\]]*\\]";
var arrowDirection = "(?:[drlu]|do|down|le|left|ri|right|up)";
var arrowBody = "(?:-+" + arrowDirection + "-+|\\.+" + arrowDirection + "\\.+|-+(?:" + arrowAttr + "-*)?|" + arrowAttr + "-+|\\.+(?:" + arrowAttr + "\\.*)?|" + arrowAttr + "\\.+)";
var arrowLeft = "(?:<<?|//?|\\\\\\\\?|<\\||[#*^+}xo])";
var arrowRight = "(?:>>?|//?|\\\\\\\\?|\\|>|[#*^+{xo])";
var arrowPrefix = "[[?]?[ox]?";
var arrowSuffix = "[ox]?[\\]?]?";
var arrow = arrowPrefix + "(?:" + arrowBody + arrowRight + "|" + arrowLeft + arrowBody + "(?:" + arrowRight + ")?)" + arrowSuffix;
expression.inside = languages.plantuml = languages["plant-uml"] = {
  "comment": {
    pattern: /(^[ 	]*)(?:'.*|\/'[^]*?'\/)/mg,
    lookbehind: true,
    greedy: true
  },
  "preprocessor": {
    pattern: /(^[ 	]*)!.*/mg,
    lookbehind: true,
    greedy: true,
    alias: "property",
    inside: {
      "variable": variable
    }
  },
  "delimiter": {
    pattern: /(^[ 	]*)@(?:end|start)uml\b/mg,
    lookbehind: true,
    greedy: true,
    alias: "punctuation"
  },
  "arrow": {
    pattern: RegExp("(^|[^-.<>?|\\\\[\\]ox])" + arrow + "(?![-.<>?|\\\\\\]ox])", "g"),
    lookbehind: true,
    greedy: true,
    alias: "operator",
    inside: {
      "expression": expression,
      "punctuation": /\[(?=$|\])|^\]/
    }
  },
  "string": {
    pattern: /"[^"]*"/g,
    greedy: true
  },
  "text": {
    pattern: /(\[[ 	]*\n+(?!\n))[^\]]+(?=\])/g,
    lookbehind: true,
    greedy: true,
    alias: "string"
  },
  "keyword": [
    {
      pattern: /^([ 	]*)(?:abstract\s+class|end\s+(?:box|fork|group|merge|note|ref|split|title)|(?:fork|split)(?:\s+again)?|activate|actor|agent|alt|annotation|artifact|autoactivate|autonumber|backward|binary|boundary|box|break|caption|card|case|circle|class|clock|cloud|collections|component|concise|control|create|critical|database|deactivate|destroy|detach|diamond|else|elseif|end|end[hr]note|endif|endswitch|endwhile|entity|enum|file|folder|footer|frame|group|[hr]?note|header|hexagon|hide|if|interface|label|legend|loop|map|namespace|network|newpage|node|nwdiag|object|opt|package|page|par|participant|person|queue|rectangle|ref|remove|repeat|restore|return|robust|scale|set|show|skinparam|stack|start|state|stop|storage|switch|title|together|usecase\/?|while)(?!\S)/mg,
      lookbehind: true,
      greedy: true
    },
    /\b(?:elseif|equals|not|while)(?=\s*\()/,
    /\b(?:as|is|then)\b/
  ],
  "divider": {
    pattern: /^==.+==$/mg,
    greedy: true,
    alias: "important"
  },
  "time": {
    pattern: /@(?:\d+(?:[:/]\d+){2}|[+-]?\d+|:[a-z]\w*(?:[+-]\d+)?)\b/gi,
    greedy: true,
    alias: "number"
  },
  "color": {
    pattern: /#(?:[a-z_]+|[a-fA-F\d]+)\b/,
    alias: "symbol"
  },
  "variable": variable,
  "punctuation": /[()[\]{},:;]|\.{3}/
};
//# sourceMappingURL=plant-uml.js.map
