import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
import { r as re } from "../../shared-Sq5P6lf6.js";
var types = "bool|clip|float|int|string|val";
var allinternals = "is(?:bool|clip|float|int|string)|defined|(?:(?:internal)?function|var)?exists?|apply|assert|default|eval|import|nop|select|undefined|opt_(?:allowfloataudio|avipadscanlines|dwchannelmask|enable_(?:b64a|planartopackedrgb|v210|y3_10_10|y3_10_16)|usewaveextensible|vdubplanarhack)|set(?:cachemode|maxcpu|memorymax|planarlegacyalignment|workingdir)|hex(?:value)?|value|abs|ceil|continued(?:denominator|numerator)?|exp|floor|fmod|frac|log(?:10)?|max|min|muldiv|pi|pow|rand|round|sign|spline|sqrt|a?sinh?|a?cosh?|a?tan[2h]?|(?:bit(?:and|not|x?or|[lr]?shift[aslu]?|sh[lr]|sa[lr]|[lr]rotatel?|ro[rl]|te?st|set(?:count)?|cl(?:ea)?r|ch(?:an)?ge?))|average(?:[bgr]|chroma[uv]|luma)|(?:[rgb]|chroma[uv]|luma|rgb|[yuv](?=difference(?:fromprevious|tonext)))difference(?:fromprevious|tonext)?|[yuvrgb]plane(?:median|min|max|minmaxdifference)|getprocessinfo|logmsg|script(?:dir(?:utf8)?|file(?:utf8)?|name(?:utf8)?)|setlogparams|chr|(?:fill|find|left|mid|replace|rev|right)str|format|[lu]case|ord|str(?:cmpi?|fromutf8|len|toutf8)|time|trim(?:all|left|right)|isversionorgreater|version(?:number|string)|buildpixeltype|colorspacenametopixeltype|addautoloaddir|on(?:cpu|cuda)|prefetch|setfiltermtmode|has(?:audio|video)|height|width|frame(?:count|rate(?:denominator|numerator)?)|getparity|is(?:field|frame)based|bitspercomponent|componentsize|hasalpha|is(?:planar(?:rgba?)?|interleaved|rgb(?:24|32|48|64)?|y(?:8|u(?:va?|y2))?|yv(?:12|16|24|411)|420|422|444|packedrgb)|numcomponents|pixeltype|audio(?:bits|channels|duration|length(?:[fs]|hi|lo)?|rate)|isaudio(?:float|int)|avi(?:file)?source|directshowsource|image(?:reader|source|sourceanim)|opendmlsource|segmented(?:avisource|directshowsource)|wavsource|coloryuv|convertbacktoyuy2|convertto(?:RGB(?:24|32|48|64)|(?:planar)?RGBA?|Y8?|YV(?:12|16|24|411)|YUVA?(?:411|420|422|444)|YUY2)|fixluminance|gr[ae]yscale|invert|levels|limiter|mergea?rgb|merge(?:chroma|luma)|rgbadjust|show(?:alpha|blue|green|red)|swapuv|tweak|[uv]toy8?|ytouv|(?:colorkey|reset)mask|layer|mask(?:hs)?|merge|overlay|subtract|addborders|(?:bicubic|bilinear|blackman|gauss|lanczos4|lanczos|point|sinc|spline(?:16|36|64))resize|crop(?:bottom)?|flip(?:horizontal|vertical)|(?:horizontal|vertical)?reduceby2|letterbox|skewrows|turn(?:180|left|right)|blur|fixbrokenchromaupsampling|generalconvolution|(?:spatial|temporal)soften|sharpen|trim|(?:un)?alignedsplice|(?:assume|assumescaled|change|convert)FPS|(?:delete|duplicate)frame|dissolve|fade(?:in|io|out)[02]?|freezeframe|interleave|loop|reverse|select(?:even|odd|(?:range)?every)|assume[bt]ff|assume(?:field|frame)based|bob|complementparity|doubleweave|peculiarblend|pulldown|separate(?:columns|fields|rows)|swapfields|weave(?:columns|rows)?|amplify(?:db)?|assumesamplerate|audiodub(?:ex)?|audiotrim|convertaudioto(?:(?:8|16|24|32)bit|float)|converttomono|delayaudio|ensurevbrmp3sync|get(?:left|right)?channel|kill(?:audio|video)|mergechannels|mixaudio|monotostereo|normalize|resampleaudio|ssrc|supereq|timestretch|animate|applyrange|conditional(?:filter|reader|select)|frameevaluate|scriptclip|tcp(?:server|source)|writefile(?:end|if|start)?|imagewriter|blackness|blankclip|colorbars(?:hd)?|compare|dumpfiltergraph|echo|histogram|info|messageclip|preroll|setgraphanalysis|show(?:framenumber|smpte|time)|showfiveversions|stack(?:horizontal|vertical)|subtitle|tone|version";
languages.avs = languages.avisynth = {
  "comment": {
    pattern: /#.*|\/\*[^]*?(?:\*\/|$)|\[\*(?:[^\[*]|\[(?!\*)|\*(?!\])|\[\*(?:[^\[*]|\[(?!\*)|\*(?!\]))*\*\])*\*\]/g,
    greedy: true
  },
  // Handle before strings because optional arguments are surrounded by double quotes
  "argument": {
    pattern: re('\\b<0>\\s+("?)\\w+\\1', [types], "i"),
    inside: {
      "keyword": /^\w+/
    }
  },
  // Optional argument assignment
  "argument-label": {
    pattern: /([,(][\s\\]*)\w+\s*=(?!=)/,
    lookbehind: true,
    inside: {
      "argument-name": {
        pattern: /\w+/,
        alias: "punctuation"
      },
      "punctuation": /=/
    }
  },
  "string": [
    {
      // triple double-quoted
      pattern: /"""[^]*?"""/g,
      greedy: true
    },
    {
      // single double-quoted
      pattern: /"(?:\\[^]|[^\\\n"])*"/g,
      greedy: true,
      inside: {
        "constant": {
          // These *are* case-sensitive!
          pattern: /\b(?:DEFAULT_MT_MODE|(?:MAINSCRIPT|PROGRAM|SCRIPT)DIR|(?:MACHINE|USER)_(?:CLASSIC|PLUS)_PLUGINS)\b/
        }
      }
    }
  ],
  // The special "last" variable that takes the value of the last implicitly returned clip
  "variable": /\b(?:last)\b/i,
  "boolean": /\b(?:false|true|no|yes)\b/i,
  "keyword": /\b(?:catch|else|for|function|global|if|return|try|while|__end__)\b/i,
  "constant": /\bMT_(?:MULTI_INSTANCE|NICE_FILTER|SERIALIZED|SPECIAL_MT)\b/,
  // AviSynth's internal functions, filters, and properties
  "builtin-function": {
    pattern: re("\\b<0>\\b", [allinternals], "i"),
    alias: "function"
  },
  "type-cast": {
    pattern: re("\\b<0>(?=\\s*\\()", [types], "i"),
    alias: "keyword"
  },
  // External/user-defined filters
  "function": {
    pattern: /\b[a-z_]\w*(?=\s*\()|(\.)[a-z_]\w*\b/i,
    lookbehind: true
  },
  // Matches a \ as the first or last character on a line
  "line-continuation": {
    pattern: /(^[ 	]*)\\|\\(?=[ 	]*$)/m,
    lookbehind: true,
    alias: "punctuation"
  },
  "number": /\B\$(?:[a-f\d]{6}|[a-f\d]{8})\b|(?:(?:\b|\B-)\d+(?:\.\d*)?\b|\B\.\d+\b)/i,
  "operator": /\+\+?|[!=<>]=?|&&|\|\||[?:%/*-]/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=avisynth.js.map
