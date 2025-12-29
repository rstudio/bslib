import { l as languages } from "../../index-XEj74r-1.js";
import { a as clikeComment } from "../../patterns-Cp3h1ylA.js";
languages.verilog = {
  "comment": clikeComment(),
  "string": {
    pattern: /"(?:\\[^]|[^\\\n"])*"/g,
    greedy: true
  },
  "kernel-function": {
    // support for any kernel function (ex: $display())
    pattern: /\B\$\w+/,
    alias: "property"
  },
  // support for user defined constants (ex: `define)
  "constant": /\B`\w+/,
  "function": /\b\w+(?=\()/,
  // support for verilog and system verilog keywords
  "keyword": /\b(?:alias|assert|assign|assume|automatic|before|begin|bin[ds]|binsof|bit|break|buf|bufif[01]|byte|case[xz]?|cell|chandle|class|clocking|config|const|constraint|context|continue|cover|covergroup|coverpoint|cross|deassign|default|defparam|design|disable|dist|do|edge|else|end(?:case|class|clocking|config|function|generate|group|interface|module|package|primitive|program|property|sequence|specify|table|task)?|enum|event|expect|export|extends|extern|final|first_match|[fnw]or|force|foreach|forever|fork|forkjoin|function|generate|genvar|highz[01]|iff?|ifnone|ignore_bins|illegal_bins|import|incdir|include|initial|in[op]ut|inside|instance|int|integer|interface|intersect|join|join_any|join_none|large|liblist|library|local|localparam|logic|longint|macromodule|matches|medium|modport|module|[nrw]?and|negedge|new|noshowcancelled|not|notif[01]|null|output|package|packed|parameter|posedge|primitive|priority|program|property|protected|pull[01]|pulldown|pullup|pulsestyle_ondetect|pulsestyle_onevent|pure|randc|randcase|randsequence|r?[cnp]mos|real|realtime|re[fg]|release|repeat|return|r?tran|r?tranif[01]|scalared|sequence|shortint|shortreal|showcancelled|signed|small|solve|specify|specparam|static|string|strong[01]|struct|super|supply[01]|table|tagged|task|this|throughout|time|timeprecision|timeunit|tri[01]?|triand|trior|trireg|type|typedef|union|unique|unsigned|use|u?wire|var|vectored|virtual|void|wait|wait_order|weak[01]|while|wildcard|with|within|x?n?or)\b/,
  // bold highlighting for all verilog and system verilog logic blocks
  "important": /\b(?:always|always_comb|always_ff|always_latch)\b(?: *@)?/,
  // support for time ticks, vectors, and real numbers
  "number": /\B##?\d+|(?:\b\d+)?'[odbh] ?[a-f\dzx_?]+|\b(?:\d*[._])?\d+(?:e[+-]?\d+)?/i,
  "operator": /[{}~?%&|^!=<>/*+-]+/,
  "punctuation": /[()[\].,:;]/
};
//# sourceMappingURL=verilog.js.map
