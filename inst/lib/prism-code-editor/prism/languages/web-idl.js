import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
var id = "(?:\\B-|\\b_|\\b)[a-zA-Z][\\w-]*(?![\\w-])";
var type = `(?:\\b(?:unsigned\\s+)?long\\s+long(?![\\w-])|\\b(?:unrestricted|unsigned)\\s+[a-z]+(?![\\w-])|(?!(?:unrestricted|unsigned)\\b)${id}(?:\\s*<(?:[^<>]|<[^<>]*>)*>)?)(?:\\s*\\?)?`;
var typeInside = {};
var webIdl = languages["webidl"] = languages["web-idl"] = {
  "comment": clikeComment(),
  "string": {
    pattern: /"[^"]*"/g,
    greedy: true
  },
  "namespace": {
    pattern: RegExp("(\\bnamespace\\s+)" + id),
    lookbehind: true
  },
  "class-name": [
    {
      pattern: /(^|[^\w-])(?:iterable|maplike|setlike)\s*<(?:[^<>]|<[^<>]*>)*>/,
      lookbehind: true,
      inside: typeInside
    },
    {
      pattern: RegExp("(\\b(?:attribute|const|deleter|[gs]etter|optional)\\s+)" + type),
      lookbehind: true,
      inside: typeInside
    },
    {
      // callback return type
      pattern: RegExp(`(\\bcallback\\s+${id}\\s*=\\s*)${type}`),
      lookbehind: true,
      inside: typeInside
    },
    {
      // typedef
      pattern: RegExp("(\\btypedef\\b\\s*)" + type),
      lookbehind: true,
      inside: typeInside
    },
    {
      pattern: RegExp("(\\b(?:callback|dictionary|enum|interface(?:\\s+mixin)?)\\s+)(?!(?:interface|mixin)\\b)" + id),
      lookbehind: true
    },
    {
      // inheritance
      pattern: RegExp("(:\\s*)" + id),
      lookbehind: true
    },
    // includes and implements
    RegExp(id + "(?=\\s+(?:implements|includes)\\b)"),
    {
      pattern: RegExp("(\\b(?:implements|includes)\\s+)" + id),
      lookbehind: true
    },
    {
      // function return type, parameter types, and dictionary members
      pattern: RegExp(`${type}(?=\\s*(?:\\.{3}\\s*)?${id}\\s*[(),;=])`),
      inside: typeInside
    }
  ],
  "builtin": /\b(?:ArrayBuffer|BigInt64Array|BigUint64Array|ByteString|DOMString|DataView|Float32Array|Float64Array|FrozenArray|Int16Array|Int32Array|Int8Array|ObservableArray|Promise|USVString|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray)\b/,
  "keyword": [
    /\b(?:async|attribute|callback|const|constructor|deleter|dictionary|enum|[gs]etter|implements|includes|inherit|interface|mixin|namespace|null|optional|or|partial|readonly|required|static|stringifier|typedef|unrestricted)\b/,
    // type keywords
    /\b(?:any|bigint|boolean|byte|double|float|iterable|long|maplike|object|octet|record|sequence|setlike|short|symbol|undefined|unsigned|void)\b/
  ],
  "boolean": boolean,
  "number": {
    pattern: /(^|[^\w-])-?(?:0x[a-f\d]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|NaN|Infinity)(?![\w-])/i,
    lookbehind: true
  },
  "operator": /\.{3}|[?:=<>-]/,
  "punctuation": /[()[\]{}.,;]/
};
Object.assign(typeInside, webIdl);
delete typeInside["class-name"];
//# sourceMappingURL=web-idl.js.map
