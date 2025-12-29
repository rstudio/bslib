import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
languages["nand2tetris-hdl"] = {
  "comment": clikeComment(),
  "keyword": /\b(?:BUILTIN|CHIP|CLOCKED|IN|OUT|PARTS)\b/,
  "boolean": boolean,
  "function": /\b[a-zA-Z][A-Za-z\d]*(?=\()/,
  "number": /\b\d+\b/,
  "operator": /=|\.\./,
  "punctuation": /[()[\]{},:;]/
};
//# sourceMappingURL=nand2tetris-hdl.js.map
