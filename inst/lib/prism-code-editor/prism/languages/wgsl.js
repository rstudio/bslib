import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
languages.wgsl = {
  "comment": clikeComment(),
  "builtin-attribute": {
    pattern: /(@)builtin\(.*?\)/,
    lookbehind: true,
    inside: {
      "attribute": {
        pattern: /^builtin/,
        alias: "attr-name"
      },
      "punctuation": /[(),]/,
      "built-in-values": {
        pattern: /\b(?:frag_depth|front_facing|global_invocation_id|instance_index|local_invocation_id|local_invocation_index|num_workgroups|position|sample_index|sample_mask|vertex_index|workgroup_id)\b/,
        alias: "attr-value"
      }
    }
  },
  "attributes": {
    pattern: /(@)(?:align|binding|compute|const|fragment|group|id|interpolate|invariant|location|size|vertex|workgroup_size)/i,
    lookbehind: true,
    alias: "attr-name"
  },
  "functions": {
    pattern: /\b(fn\s+)(?!\d)\w+(?=[(<])/,
    lookbehind: true,
    alias: "function"
  },
  "keyword": /\b(?:bitcast|break|case|const|continue|continuing|default|discard|else|enable|fallthrough|fn|for|function|if|let|loop|private|return|storage|struct|switch|type|uniform|var|while|workgroup)\b/,
  "builtin": /\b(?:abs|a?cosh?|all|any|array|a?sinh?|atan2|a?tanh?|atomic(?:Add|And|CompareExchangeWeak|Exchange|Load|Max|Min|Or|Store|Sub|Xor)?|bool|ceil|clamp|countLeadingZeros|countOneBits|countTrailingZeros|cross|degrees|determinant|distance|dot|dpd[xy]|dpd[xy]Coarse|dpd[xy]Fine|exp2?|extractBits|[fiu]32|[fiu]64|faceForward|firstLeadingBit|floor|fma|fract|frexp|fwidth|fwidthCoarse|fwidthFine|insertBits|inverseSqrt|ldexp|length|log2?|mat[234]x[234]|max|mi[nx]|modf|normalize|override|(?:un)?pack2x16float|(?:un)?pack(?:2x16|4x8)[su]norm|pow|ptr|quantizeToF16|radians|reflect|refract|reverseBits|round|sampler|sampler_comparison|select|shiftLeft|shiftRight|sign|smoothstep|sqrt|staticAssert|step|storageBarrier|texture(?:Dimensions|Gather|GatherCompare|Load|NumLayers|NumLevels|NumSamples|Sample|SampleBias|SampleCompare|SampleCompareLevel|SampleGrad|SampleLevel|Store|_[123]d|_2d_array|_cube|_cube_array|_depth_2d|_depth_2d_array|_depth_cube|_depth_cube_array|_depth_multisampled_2d|_multisampled_2d|_storage_[123]d|_storage_2d_array)|transpose|trunc|vec[234]|workgroupBarrier)\b/,
  "function-calls": {
    pattern: /\b[_a-z]\w*(?=\()/i,
    alias: "function"
  },
  "class-name": /\b(?:[A-Z][A-Za-z\d]*)\b/,
  "bool-literal": {
    pattern: boolean,
    alias: "boolean"
  },
  "hex-int-literal": {
    pattern: /\b0[xX][a-fA-F\d]+[iu]?\b(?![.pP])/,
    alias: "number"
  },
  "hex-float-literal": {
    pattern: /\b0[xX][a-fA-F\d]*(?:\.[a-fA-F\d]*)?(?:[pP][+-]?\d+[fh]?)?/,
    alias: "number"
  },
  "decimal-float-literal": {
    pattern: /(?:(?:\d*\.\d+|\d+\.\d*)(?:[eE][+-]?\d+)?|\d+[eE][+-]?\d+)[fh]?|\b\d+[fh]\b/,
    alias: "number"
  },
  "int-literal": {
    pattern: /\b\d+[iu]?\b/,
    alias: "number"
  },
  "operator": /-[->]|\+\+|&&|\|\||>>=?|<<=?|[%&|^!=/*+-]=?|[<>]=|~/,
  "punctuation": /[()[\]{}.,:;<>@]/
};
//# sourceMappingURL=wgsl.js.map
