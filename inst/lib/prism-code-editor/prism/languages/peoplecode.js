import { l as languages } from "../../index-XEj74r-1.js";
languages.pcode = languages.peoplecode = {
  "comment": /\/\*[^]*?\*\/|\bREM[^;]*;|<\*(?:[^<*]|\*(?!>)|<(?!\*)|<\*(?:(?!\*>)[^])*\*>)*\*>|\/\+[^]*?\+\//,
  "string": {
    pattern: /'(?:''|[^\n'])*'(?!')|"(?:""|[^\n"])*"(?!")/g,
    greedy: true
  },
  "variable": /%\w+/,
  "function-definition": {
    pattern: /((?:^|[^\w-])(?:function|method)\s+)\w+/i,
    lookbehind: true,
    alias: "function"
  },
  "class-name": {
    pattern: /((?:^|[^-\w])(?:as|catch|class|component|create|extends|global|implements|instance|local|of|property|returns)\s+)\w+(?::\w+)*/i,
    lookbehind: true,
    inside: {
      "punctuation": /:/
    }
  },
  "keyword": /\b(?:abstract|alias|as|catch|class|component|constant|create|declare|else|end-(?:class|evaluate|for|function|[gs]et|if|method|try|while)|evaluate|extends|for|function|[gs]et|global|if|implements|import|instance|library|local|method|null|of|out|peoplecode|private|program|property|protected|readonly|ref|repeat|returns?|step|throw|to|try|until|value|when-other|[tw]hen|while)\b/i,
  "operator-keyword": {
    pattern: /\b(?:and|not|or)\b/i,
    alias: "operator"
  },
  "function": /[_a-z]\w*(?=\s*\()/i,
  "boolean": /\b(?:false|true)\b/i,
  "number": /\b\d+(?:\.\d+)?\b/,
  "operator": /<>|[<>]=?|!=|\*\*|[@|=/*+-]/,
  "punctuation": /[()[\].,:;]/
};
//# sourceMappingURL=peoplecode.js.map
