import { l as languages } from "../../index-XEj74r-1.js";
languages.mermaid = {
  "comment": {
    pattern: /%%.*/g,
    greedy: true
  },
  "style": {
    pattern: /^([ 	]*(?:classDef|linkStyle|style)[ 	]+[$\w-]+[ 	]+)\w.*[^\s;]/m,
    lookbehind: true,
    inside: {
      "property": /\b\w[\w-]*(?=[ 	]*:)/,
      "operator": /:/,
      "punctuation": /,/
    }
  },
  "inter-arrow-label": {
    pattern: /([^<>ox.=-])(?:-[-.]|==)(?![<>ox.=-])[ 	]*(?:"[^\n"]*"|[^\s".=-](?:[^\n.=-]*[^\s.=-])?)[ 	]*(?:\.+->?|--+[->]|==+[=>])(?![<>ox.=-])/g,
    lookbehind: true,
    greedy: true,
    inside: {
      "arrow": {
        pattern: /(?:\.+->?|--+[->]|==+[=>])$/,
        alias: "operator"
      },
      "label": {
        pattern: /^([^]{2}[ 	]*)\S(?:[^]*\S)?/,
        lookbehind: true,
        alias: "property"
      },
      "arrow-head": {
        pattern: /^\S+/,
        alias: "arrow operator"
      }
    }
  },
  "arrow": [
    // This might look complex but it really isn't.
    // There are many possible arrows (see tests) and it's impossible to fit all of them into one pattern. The
    // problem is that we only have one lookbehind per pattern. However, we cannot disallow too many arrow
    // characters in the one lookbehind because that would create too many false negatives. So we have to split the
    // arrows into different patterns.
    {
      // ER diagram
      pattern: /(^|[^{}|o.-])[|}][|o](?:--|\.\.)[|o][|{](?![{}|o.-])/,
      lookbehind: true,
      alias: "operator"
    },
    {
      // flow chart
      // (?:==+|--+|-\.*-)
      pattern: /(^|[^<>ox.=-])(?:[<ox](?:==+|--+|-\.*-)[>ox]?|(?:==+|--+|-\.*-)[>ox]|===+|---+|-\.+-)(?![<>ox.=-])/,
      lookbehind: true,
      alias: "operator"
    },
    {
      // sequence diagram
      pattern: /(^|[^<>()x-])(?:--?(?:>>|[x>)])(?![<>()x])|(?:<<|[x<(])--?(?!-))/,
      lookbehind: true,
      alias: "operator"
    },
    {
      // class diagram
      pattern: /(^|[^<>|*o.-])(?:[*o]--|--[*o]|<\|?(?:--|\.\.)|(?:--|\.\.)\|?>|--|\.\.)(?![<>|*o.-])/,
      lookbehind: true,
      alias: "operator"
    }
  ],
  "label": {
    pattern: /(^|[^|<])\|(?:[^\n"|]|"[^\n"]*")+\|/g,
    lookbehind: true,
    greedy: true,
    alias: "property"
  },
  "text": {
    pattern: /(?:[(\[{]+|\b>)(?:[^\n"()[\]{}]|"[^\n"]*")+(?:[)\]}]+|>)/,
    alias: "string"
  },
  "string": {
    pattern: /"[^\n"]*"/g,
    greedy: true
  },
  "annotation": {
    pattern: /<<(?:abstract|choice|enumeration|fork|interface|join|service)>>|\[\[(?:choice|fork|join)\]\]/i,
    alias: "important"
  },
  "keyword": [
    // This language has both case-sensitive and case-insensitive keywords
    {
      pattern: /(^[ 	]*)(?:action|callback|class|classDef|classDiagram|click|direction|erDiagram|flowchart|gantt|gitGraph|graph|journey|link|linkStyle|pie|requirementDiagram|sequenceDiagram|stateDiagram|stateDiagram-v2|style|subgraph)(?![$\w-])/mg,
      lookbehind: true,
      greedy: true
    },
    {
      pattern: /(^[ 	]*)(?:activate|alt|and|as|autonumber|deactivate|else|end(?:[ 	]+note)?|loop|opt|par|participant|rect|state|note[ 	]+(?:over|(?:left|right)[ 	]+of))(?![$\w-])/img,
      lookbehind: true,
      greedy: true
    }
  ],
  "entity": /#[a-z\d]+;/,
  "operator": {
    pattern: /(\w[ 	]*)&(?=[ 	]*\w)|:::|:/,
    lookbehind: true
  },
  "punctuation": /[(){};]/
};
//# sourceMappingURL=mermaid.js.map
