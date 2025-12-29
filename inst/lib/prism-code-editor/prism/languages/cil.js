import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean, c as clikeString } from "../../patterns-Cp3h1ylA.js";
languages.cil = {
  "comment": /\/\/.*/,
  "string": clikeString(),
  "directive": {
    pattern: /(^|\W)\.[a-z]+(?!\S)/,
    lookbehind: true,
    alias: "class-name"
  },
  // Actually an assembly reference
  "variable": /\[[\w\.]+\]/,
  "keyword": /\b(?:abstract|ansi|assembly|auto|autochar|beforefieldinit|bool|bstr|byvalstr|catch|char|cil|class|currency|date|decimal|default|enum|error|explicit|extends|extern|famandassem|family|famorassem|final(?:ly)?|float32|float64|hidebysig|u?int(?:8|16|32|64)?|iant|idispatch|implements|import|initonly|instance|interface|iunknown|literal|lpstr|lpstruct|lptstr|lpwstr|managed|method|native(?:Type)?|nested|newslot|object(?:ref)?|pinvokeimpl|private|privatescope|public|reqsecobj|rtspecialname|runtime|sealed|sequential|serializable|specialname|static|string|struct|syschar|tbstr|unicode|unmanagedexp|unsigned|value(?:type)?|variant|virtual|void)\b/,
  "function": /\b(?:(?:constrained|no|readonly|tail|unaligned|volatile)\.)?(?:conv\.(?:[iu][1248]?|ovf\.[iu][1248]?(?:\.un)?|r\.un|r4|r8)|ldc\.(?:i4(?:\.\d+|\.[mM]1|\.s)?|i8|r4|r8)|ldelem(?:\.[iu][1248]?|\.r[48]|\.ref|a)?|ldind\.(?:[iu][1248]?|r[48]|ref)|stelem\.?(?:i[1248]?|r[48]|ref)?|stind\.(?:i[1248]?|r[48]|ref)?|end(?:fault|filter|finally)|ldarg(?:\.[0-3s]|a(?:\.s)?)?|ldloc(?:\.\d+|\.s)?|sub(?:\.ovf(?:\.un)?)?|mul(?:\.ovf(?:\.un)?)?|add(?:\.ovf(?:\.un)?)?|stloc(?:\.[0-3s])?|refany(?:type|val)|b[lg][te](?:\.un)?(?:\.s)?|unbox(?:\.any)?|init(?:blk|obj)|call(?:i|virt)?|brfalse(?:\.s)?|bne\.un(?:\.s)?|ldloca(?:\.s)?|brzero(?:\.s)?|brtrue(?:\.s)?|brnull(?:\.s)?|brinst(?:\.s)?|starg(?:\.s)?|leave(?:\.s)?|(?:ovf\.[iu][1248]?|shr|rem|div|clt)(?:\.un)?|rem(?:\.un)?|div(?:\.un)?|clt(?:\.un)?|alignment|castclass|ldvirtftn|beq(?:\.s)?|ckfinite|ldsflda|ldtoken|localloc|mkrefany|rethrow|cgt\.un|arglist|switch|stsfld|sizeof|newobj|newarr|ldsfld|ldnull|ldflda?|isinst|throw|stobj|stfld|ldstr|ldobj|ldlen|ldftn|cpobj|cpblk|break|br\.s|x?or|shl|ret|pop|not|nop|neg|jmp|dup|cgt|ceq|box|and|br)\b/,
  "boolean": boolean,
  "number": /\b-?(?:0x[a-f\d]+|\d+)(?:\.[a-f\d]+)?\b/i,
  "punctuation": /[()[\]{};,:=]|IL_[a-zA-Z\d]+/
};
//# sourceMappingURL=cil.js.map
