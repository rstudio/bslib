import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
languages.metafont = {
  // Syntax of METAFONT with the added (public) elements of PlainMETAFONT. Except for internal quantities they are expected to be rarely redefined. Freely inspired by the syntax of Christophe Grandsire for the Crimson Editor.
  "comment": /%.*/,
  "string": {
    pattern: /"[^\n"]*"/g,
    greedy: true
  },
  "number": /\d*\.?\d+/,
  "boolean": boolean,
  "punctuation": [
    /[,;()]/,
    {
      pattern: /(^|[^{}])(?:\{|\})(?![{}])/,
      lookbehind: true
    },
    {
      pattern: /(^|[^[])\[(?!\[)/,
      lookbehind: true
    },
    {
      pattern: /(^|[^\]])\](?!\])/,
      lookbehind: true
    }
  ],
  "constant": [
    {
      pattern: /(^|[^!?])\?\?\?(?![!?])/,
      lookbehind: true
    },
    {
      pattern: /(^|[^/*\\])(?:\\|\\\\)(?![/*\\])/,
      lookbehind: true
    },
    /\b(?:_|blankpicture|bp|cc|cm|dd|ditto|down|eps|epsilon|fullcircle|halfcircle|identity|in|infinity|left|mm|nullpen|nullpicture|origin|pc|penrazor|penspeck|pensquare|penstroke|proof|pt|quartercircle|relax|right|smoke|unitpixel|unitsquare|up)\b/
  ],
  "quantity": {
    pattern: /\b(?:autorounding|blacker|boundarychar|charcode|chard[pxy]|charext|charht|charic|charwd|currentwindow|day|designsize|displaying|fillin|fontmaking|granularity|[hv]ppp|join_radius|month|o_correction|pausing|pen_(?:bot|lft|rt|top)|pixels_per_inch|proofing|showstopping|smoothing|time|tolerance|tracing(?:capsules|choices|commands|edges|equations|macros|online|output|pens|restores|specs|stats|titles)|turningcheck|vppp|warningcheck|[xy]offset|year)\b/,
    alias: "keyword"
  },
  "command": {
    pattern: /\b(?:addto|batchmode|charlist|cull|display|errhelp|errmessage|errorstopmode|everyjob|extensible|fontdimen|headerbyte|inner|interim|let|ligtable|message|newinternal|nonstopmode|numspecial|openwindow|outer|randomseed|save|scrollmode|shipout|show|showdependencies|showstats|showtoken|showvariable|special)\b/,
    alias: "builtin"
  },
  "operator": [
    {
      pattern: /(^|[^>=<:|])(?:\|?=:?\|?>?|\|=:\|>>|<>|::|\|\|:|>=?|<=?|:=?)(?![>=<:|])/,
      lookbehind: true
    },
    {
      pattern: /(^|[^+-])(?:\+|\+\+|-{1,3}|\+-\+)(?![+-])/,
      lookbehind: true
    },
    {
      pattern: /(^|[^/*\\])(?:\*|\*\*|\/)(?![/*\\])/,
      lookbehind: true
    },
    {
      pattern: /(^|[^.])(?:\.{2,3})(?!\.)/,
      lookbehind: true
    },
    {
      pattern: /(^|[^@#&$])&(?![@#&$])/,
      lookbehind: true
    },
    /\b(?:and|not|or)\b/
  ],
  "macro": {
    pattern: /\b(?:abs|beginchar|bot|byte|capsule_def|ceiling|change_width|clear_pen_memory|clearit|clearpen|clearxy|counterclockwise|cullit|cutdraw|cutoff|decr|define_(?:blacker_pixels|corrected_pixels|good_x_pixels|good_y_pixels|horizontal_corrected_pixels|pixels|whole_blacker_pixels|whole_pixels|whole_vertical_blacker_pixels|whole_vertical_pixels)|di[rv]|direction|directionpoint|dotprod|downto|draw|drawdot|endchar|erase|fill|filldraw|fix_units|flex|font_(?:coding_scheme|extra_space|identifier|normal_shrink|normal_space|normal_stretch|quad|size|slant|x_height)|gfcorners|gobbled?|good\.(?:bot|lft|rt|top|x|y)|grayfont|hide|[hv]?round|imagerules|incr|interact|interpath|intersectionpoint|inverse|italcorr|killtext|labelfont|labels|lft|loggingall|lowres_fix|makegrid|makelabel(?:\.(?:bot|lft|rt|top)(?:\.nodot)?)?|max|min|mod|mode_def|mode_setup|nodisplays|notransforms|numtok|openit|penlabels|penpos|pickup|proofoffset|proofrule|proofrulethickness|range|reflectedabout|rotatedabout|rotatedaround|rt|savepen|screenchars|screenrule|screenstrokes|shipit|showit|slantfont|softjoin|solve|s?top|superellipse|tensepath|thru|titlefont|tracingall|tracingnone|undraw|undrawdot|unfill|unfilldraw|upto)\b/,
    alias: "function"
  },
  "builtin": /\b(?:ASCII|angle|char|cosd|decimal|directiontime|floor|hex|intersectiontimes|jobname|known|length|makepath|makepen|mexp|mlog|normaldeviate|oct|odd|pencircle|penoffset|point|postcontrol|precontrol|reverse|rotated|sind|sqrt|str|subpath|substring|totalweight|turningnumber|uniformdeviate|unknown|[xy][xy]?part)\b/,
  "keyword": /\b(?:also|at|atleast|begingroup|charexists|contour|controls|curl|cycle|def|delimiters|doublepath|dropping|dump|else|elseif|end|enddef|endfor|endgroup|endinput|exitif|exitunless|expandafter|fi|for|forever|forsuffixes|from|if|input|inwindow|keeping|kern|of|primarydef|quote|readstring|scantokens|secondarydef|shifted|skipto|slanted|step|tension|tertiarydef|to|transformed|until|vardef|withpen|withweight|[xyz]?scaled)\b/,
  "type": {
    pattern: /\b(?:boolean|expr|numeric|pair|path|pen|picture|primary|secondary|string|suffix|tertiary|text|transform)\b/,
    alias: "property"
  },
  "variable": {
    pattern: /(^|[^@#&$])(?:@#|#@|#|@)(?![@#&$])|\b(?:aspect_ratio|currentpen|currentpicture|currenttransform|d|extra_beginchar|extra_endchar|extra_setup|h|localfont|mag|mode|screen_cols|screen_rows|w|whatever|x|y|z)\b/,
    lookbehind: true
  }
};
//# sourceMappingURL=metafont.js.map
