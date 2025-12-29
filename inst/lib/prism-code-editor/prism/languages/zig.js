import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, b as boolean } from "../../patterns-Cp3h1ylA.js";
import { a as replace, r as re } from "../../shared-Sq5P6lf6.js";
var keyword = /\b(?:align|allowzero|and|anyframe|anytype|asm|async|await|break|cancel|catch|comptime|const|continue|defer|else|enum|errdefer|error|export|extern|fn|f?or|if|inline|linksection|nakedcc|noalias|nosuspend|null|orelse|packed|promise|pub|resume|return|stdcallcc|struct|suspend|switch|test|threadlocal|try|undefined|union|unreachable|usingnamespace|var|volatile|while)\b/;
var IDENTIFIER = "\\b(?!" + keyword.source + ")(?!\\d)\\w+\\b";
var ALIGN = "align\\s*\\((?:[^()]|\\([^)]*\\))*\\)";
var PREFIX_TYPE_OP = replace("(?:\\?|\\bpromise->|(?:\\[[^[\\]]*\\]|\\*(?!\\*)|\\*\\*)(?:\\s*<0>|\\s*const\\b|\\s*volatile\\b|\\s*allowzero\\b)*)", [ALIGN]);
var SUFFIX_EXPR = replace("(?:\\bpromise\\b|(?:\\berror\\.)?<0>(?:\\.<0>)*(?!\\s+<0>))", [IDENTIFIER]);
var TYPE = "(?!\\s)(?:!?\\s*(?:" + PREFIX_TYPE_OP + "\\s*)*" + SUFFIX_EXPR + ")+";
languages.zig = {
  "comment": [
    {
      pattern: /\/\/[/!].*/,
      alias: "doc-comment"
    },
    /\/\/.*/
  ],
  "string": [
    {
      // "string" and c"string"
      pattern: /(^|[^\\@])c?"(?:\\.|[^\\\n"])*"/g,
      lookbehind: true,
      greedy: true
    },
    {
      // multiline strings and c-strings
      pattern: /(\n)([ 	]+c?\\\\).*(?:\n\2.*)*/g,
      lookbehind: true,
      greedy: true
    }
  ],
  "char": {
    // characters 'a', '\n', '\xFF', '\u{10FFFF}'
    pattern: /(^|[^\\])'(?:[^\\\n']|[\ud800-\udfff]{2}|\\(?:.|x[a-fA-F\d]{2}|u\{[a-fA-F\d]{1,6}\}))'/g,
    lookbehind: true,
    greedy: true
  },
  "builtin": /\B@(?!\d)\w+(?=\s*\()/,
  "label": {
    pattern: /(\b(?:break|continue)\s*:\s*)\w+|\b(?!\d)\w+\b(?=\s*:\s*(?:\{|while\b))/,
    lookbehind: true
  },
  "class-name": [
    // const Foo = struct {};
    /\b(?!\d)\w+(?=\s*=\s*(?:(?:extern|packed)\s+)?(?:enum|struct|union)\s*[({])/,
    {
      // const x: i32 = 9;
      // var x: Bar;
      // fn foo(x: bool, y: f32) void {}
      pattern: re("(:\\s*)<0>(?=\\s*(?:<1>\\s*)?[=;,)])|<0>(?=\\s*(?:<1>\\s*)?\\{)", [TYPE, ALIGN]),
      lookbehind: true,
      inside: "zig"
    },
    {
      // extern fn foo(x: f64) f64; (optional alignment)
      pattern: re("(\\)\\s*)<0>(?=\\s*(?:<1>\\s*)?;)", [TYPE, ALIGN]),
      lookbehind: true,
      inside: "zig"
    }
  ],
  "builtin-type": {
    pattern: /\b(?:anyerror|bool|c_u?(?:int|long|longlong|short)|c_longdouble|c_void|comptime_(?:float|int)|f(?:16|32|64|128)|[iu](?:8|16|32|64|128|size)|noreturn|type|void)\b/,
    alias: "keyword"
  },
  "keyword": keyword,
  "function": /\b(?!\d)\w+(?=\s*\()/,
  "number": /\b(?:0b[01]+|0o[0-7]+|0x[a-fA-F\d]+(?:\.[a-fA-F\d]*)?(?:[pP][+-]?[a-fA-F\d]+)?|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)\b/,
  "boolean": boolean,
  "operator": /[=-]>|\*\*|\+\+|\|\||(?:<<|>>|[*+-]%|[%&|^!=<>/*+-])=?|[?~]|\.{3}|\.[.*?]/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=zig.js.map
