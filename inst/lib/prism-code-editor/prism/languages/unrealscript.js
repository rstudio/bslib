import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, e as clikeNumber, b as boolean, c as clikeString, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
languages.uc = languages.uscript = languages.unrealscript = {
  "comment": clikeComment(),
  "string": clikeString(),
  "category": {
    pattern: /(\b(?:(?:autoexpand|hide|show)categories|var)\s*\()[^()]+(?=\))/g,
    lookbehind: true,
    greedy: true,
    alias: "property"
  },
  "metadata": {
    pattern: /(\w\s*)<\s*\w+\s*=[^<>|=\n]+(?:\|\s*\w+\s*=[^<>|=\n]+)*>/g,
    lookbehind: true,
    greedy: true,
    inside: {
      "property": /\b\w+(?=\s*=)/,
      "operator": /=/,
      "punctuation": /[<>|]/
    }
  },
  "macro": {
    pattern: /`\w+/,
    alias: "property"
  },
  "class-name": {
    pattern: /(\b(?:class|enum|extends|interface|state(?:\(\))?|struct|within)\s+)\w+/,
    lookbehind: true
  },
  "keyword": /\b(?:abstract|actor|array|auto|autoexpandcategories|bool|break|byte|case|class|classgroup|client|coerce|collapsecategories|config|const|continue|default|defaultproperties|delegate|dependson|deprecated|do|dontcollapsecategories|editconst|editinlinenew|else|enum|event|exec|export|extends|final|float|for|forcescriptorder|foreach|function|goto|guid|hidecategories|hidedropdown|if|ignores|implements|inherits|input|int|interface|iterator|latent|local|material|name|native|nativereplication|noexport|nontransient|noteditinlinenew|notplaceable|operator|optional|out|pawn|perobjectconfig|perobjectlocalized|placeable|postoperator|preoperator|private|protected|reliable|replication|return|server|showcategories|simulated|singular|state|static|string|struct|structdefault|structdefaultproperties|switch|texture|transient|travel|unreliable|until|var|vector|while|within)\b/,
  "function": /\b[a-z_]\w*(?=\s*\()/i,
  "boolean": boolean,
  "number": clikeNumber,
  // https://docs.unrealengine.com/udk/Three/UnrealScriptExpressions.html
  "operator": />>|<<|--|\+\+|\*\*|[~$@!=<>/*+-]=?|&&?|\|\|?|\^\^?|[?:%]|\b(?:ClockwiseFrom|Cross|Dot)\b/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=unrealscript.js.map
