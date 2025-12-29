import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
var moonscript = {
  pattern: /[^]+/
};
moonscript.inside = languages.moon = languages.moonscript = {
  "comment": /--.*/,
  "string": [
    {
      pattern: /'[^']*'|\[(=*)\[[^]*?\]\1\]/g,
      greedy: true
    },
    {
      pattern: /"[^"]*"/g,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /#\{[^{}]*\}/,
          inside: {
            "interpolation-punctuation": {
              pattern: /^#\{|.$/,
              alias: "punctuation"
            },
            "moonscript": moonscript
          }
        }
      }
    }
  ],
  "class-name": [
    {
      pattern: /(\b(?:class|extends)[ 	]+)\w+/,
      lookbehind: true
    },
    // class-like names start with a capital letter
    /\b[A-Z]\w*/
  ],
  "keyword": /\b(?:class|continue|do|else|elseif|export|extends|for|from|if|import|in|local|nil|return|self|super|switch|[tw]hen|unless|using|while|with)\b/,
  "variable": /@@?\w*/,
  "property": {
    pattern: /\b(?!\d)\w+(?=:)|(:)(?!\d)\w+/,
    lookbehind: true
  },
  "function": {
    pattern: /\b(?:_G|_VERSION|assert|collectgarbage|coroutine\.(?:create|resume|running|status|wrap|yield)|debug\.(?:debug|[gs]etfenv|[gs]ethook|getinfo|[gs]etlocal|[gs]etmetatable|getregistry|[gs]etupvalue|traceback)|dofile|error|[gs]etfenv|[gs]etmetatable|io\.(?:close|flush|input|lines|output|p?open|read|stderr|stdin|stdout|tmpfile|type|write)|i?pairs|load|loadfile|loadstring|math\.(?:abs|acos|asin|atan2?|ceil|cosh?|deg|exp|floor|fmod|frexp|ldexp|log|log10|max|min|modf|pi|pow|rad|random|randomseed|sinh?|sqrt|tanh?)|module|next|os\.(?:clock|date|difftime|execute|exit|getenv|remove|rename|setlocale|time|tmpname)|package\.(?:cpath|loaded|loadlib|path|preload|seeall)|print|rawequal|rawget|rawset|require|select|string\.(?:byte|char|dump|find|format|g?match|g?sub|len|lower|rep|reverse|upper)|table\.(?:concat|insert|maxn|remove|sort)|tonumber|tostring|type|unpack|x?pcall)\b/,
    inside: {
      "punctuation": /\./
    }
  },
  "boolean": boolean,
  "number": /(?:\B\.\d+|\b\d+\.\d+|\b\d+(?=[eE]))(?:[eE][+-]?\d+)?\b|\b(?:0x[a-fA-F\d]+|\d+)(?:U?LL)?\b/,
  "operator": /\.{3}|[=-]>|~=|(?:[%!=<>/*+-]|\.\.)=?|[:#^]|\b(?:and|or)\b=?|\b(?:not)\b/,
  "punctuation": /[()[\]{}.,\\]/
};
//# sourceMappingURL=moonscript.js.map
