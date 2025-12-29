import { l as languages } from "../../index-XEj74r-1.js";
import "./bash.js";
languages["sh-session"] = languages.shellsession = languages["shell-session"] = {
  "command": {
    pattern: /^(?:[^\s@:$#%*!/\\]+@[^\n@:$#%*!/\\]+(?::[^\0-\x1f$#%*?"<>:;|]+)?|[/~.][^\0-\x1f$#%*?"<>@:;|]*)?[$#%](?=\s)(?:[^\\\n 	"'<$]|[ 	](?:(?!#)|#.*$)|\\[^]|\$(?!')|<(?!<)|"(?:\\[^]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^\\"`$])*"|'[^']*'|\$'(?:\\[^]|[^\\'])*'|<<-?\s*(["']?)(\w+)\1\s[^]*?\n\2)+/mg,
    greedy: true,
    inside: {
      "info": {
        // foo@bar:~/files$ exit
        // foo@bar$ exit
        // ~/files$ exit
        pattern: /^[^#$%]+/,
        alias: "punctuation",
        inside: {
          "user": /^[^\s@:$#%*!/\\]+@[^\n@:$#%*!/\\]+/,
          "punctuation": /:/,
          "path": /[^]+/
        }
      },
      "bash": {
        pattern: /(^[$#%]\s*)\S[^]*/,
        lookbehind: true,
        alias: "language-bash",
        inside: languages.bash
      },
      "shell-symbol": {
        pattern: /^[$#%]/,
        alias: "important"
      }
    }
  },
  "output": /.(?:.*(?:\n|.$))*/
};
//# sourceMappingURL=shell-session.js.map
