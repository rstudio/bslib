import { l as languages } from "../../index-XEj74r-1.js";
languages.applescript = {
  // Allow one level of nesting
  "comment": /#.+|--.+|\(\*(?:\(\*(?:[^*]|\*(?!\)))*\*\)|(?!\(\*)[^])*?\*\)/,
  "string": /"(?:\\.|[^\\\n"])*"/,
  "number": /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e-?\d+)?\b/i,
  "operator": [
    /[&=≠≤≥*/÷^+-]|[<>]=?/,
    /\b(?:(?:begin|end|start)s? with|(?:contains?|(?:does not|doesn't) contain)|(?:is|isn't|is not) (?:contained by|in)|(?:(?:is|isn't|is not) )?(?:greater|less) than(?: or equal)?(?: to)?|(?:comes|(?:does not|doesn't) come) (?:after|before)|(?:is|isn't|is not) equal(?: to)?|(?:(?:does not|doesn't) equal|equal to|equals|is not|isn't)|(?:a )?(?:ref(?: to)?|reference to)|(?:and|as|div|mod|not|or))\b/
  ],
  "keyword": /\b(?:about|above|after|against|apart from|around|aside from|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|continue|copy|does|eighth|else|end|equal|error|every|exit|false|true|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|instead of|[io]nto|is|its?|last|local|me|middle|my|ninth|of|on|out of|over|prop|property|put|repeat|return|returning|second|set|seventh|since|sixth|some|tell|tenth|that|then?|third|through|thru|timeout|times|to|transaction|try|until|where|while|whose|with|without)\b/,
  "class-name": /\b(?:POSIX file|RGB color|alias|application|boolean|class|constant|(?:cubic )?(?:(?:centi)?(?:meters|metres)|feet|inches|yards)|date|degrees (?:Celsius|Fahrenheit|Kelvin)|file|gallons|grams|integer|kilograms|list|liters|litres|number|ounces|pounds|quarts|real|record|reference|script|(?:square )?(?:feet|(?:kilo)?(?:meters|metres)|miles|yards)|text)\b/,
  "punctuation": /[(){},:¬«»《》]/
};
//# sourceMappingURL=applescript.js.map
