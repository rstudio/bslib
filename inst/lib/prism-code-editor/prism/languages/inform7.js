import { l as languages } from "../../index-XEj74r-1.js";
var substitutionInside = {
  "delimiter": {
    pattern: /[[\]]/,
    alias: "punctuation"
  }
};
var inform7 = languages.inform7 = {
  "comment": /\[[^[\]]+\]/,
  "string": {
    pattern: /"[^"]*"/g,
    greedy: true,
    inside: {
      "substitution": {
        pattern: /\[[^[\]]+\]/,
        inside: substitutionInside
      }
    }
  },
  "title": {
    pattern: /^[ 	]*(?:book|chapter|part(?! of)|section|table|volume)\b.+/im,
    alias: "important"
  },
  "number": {
    pattern: /(^|[^-])(?:\b\d+(?:\.\d+)?(?:\^\d+)?(?:(?!\d)\w+)?|\b(?:eight|eleven|five|four|nine|one|seven|six|ten|three|twelve|two))\b(?!-)/i,
    lookbehind: true
  },
  "verb": {
    pattern: /(^|[^-])\b(?:answering|applying to|are|asking|attacking|being|be|[bt]urning|buying|called|carries|carry(?! out)|carrying|climbing|closing|consulting|[cp]utting|drinking|dropping|eating|entering|examining|exiting|[gs]etting|giving|going|has|have|[hw]aving|implies|imply|inserting|is|jumping|kissing|listening|locking|looking|opening|pulling|pushing|(?:enclos|incorporat|provid|relat)(?:es?|ing)|removing|searching|showing|singing|sleeping|smelling|squeezing|swearing|switching|[tw]aking|tasting|telling|thinking|throwing|touching|tying|varies|varying|vary|waiting|(?:conceal|contain|hold|mean|see|support|unlock|wear)(?:ing|s)?)\b(?!-)/i,
    lookbehind: true,
    alias: "operator"
  },
  "keyword": {
    pattern: /(^|[^-])\b(?:after|before|carry out|check|continue the action|definition(?= *:)|do nothing|else|end (?:if|the story|unless)|every turn|if|include|instead(?: of)?|let|move|now?|otherwise|repeat|report|resume the story|rule for|running through|saying|say|stop the action|test|trying|try|understand|unless|use|when|while|yes)\b(?!-)/i,
    lookbehind: true
  },
  "property": {
    pattern: /(^|[^-])\b(?:adjacent(?! to)|carried|closed|concealed|contained|dark|described|edible|empty|enclosed|enterable|even|female|fixed in place|full|handled|held|improper-named|incorporated|inedible|invisible|lighted|lit|lockable|locked|male|marked for listing|mentioned|negative|neuter|non-(?:empty|full|recurring)|odd|opaque|open(?:able)?|plural-named|portable|positive|privately-named|proper-named|provided|publically-named|pushable between rooms|recurring|related|rubbing|scenery|seen|singular-named|supported|swinging|switch(?:able|ed off|ed on|ed)|touchable|touched|transparent|unconcealed|undescribed|unlit|unlocked|unmarked for listing|unmentioned|unopenable|untouchable|unvisited|variable|visible|visited|wearable|worn)\b(?!-)/i,
    lookbehind: true,
    alias: "symbol"
  },
  "position": {
    pattern: /(^|[^-])\b(?:above|adjacent to|back side of|below|between|down|east|everywhere|front side|here|in|inside(?: from)?|nowhere|on top of|on|other side|outside(?: from)?|parts? of|regionally in|(?:north|south)(?:east|west)?|through|up|west|within)\b(?!-)/i,
    lookbehind: true,
    alias: "keyword"
  },
  "type": {
    pattern: /(^|[^-])\b(?:actions?|activit(?:ies|y)|actors?|animals?|backdrops?|containers?|devices?|directions?|doors?|holders?|kinds?|lists?|m[ae]n|nobody|nothing|nouns?|numbers?|objects?|people|persons?|player(?:'s holdall)?|regions?|relations?|rooms?|rule(?:book)?s?|scenes?|someone|something|supporters?|tables?|texts?|things?|time|vehicles?|wom[ae]n)\b(?!-)/i,
    lookbehind: true,
    alias: "variable"
  },
  "punctuation": /[(){}.,:;]/
};
Object.assign(substitutionInside, inform7, {
  "text": {
    pattern: /\S(?:[^]*\S)?/,
    alias: "comment"
  }
});
//# sourceMappingURL=inform7.js.map
