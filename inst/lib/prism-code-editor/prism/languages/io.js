import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
languages.io = {
  "comment": {
    pattern: /\/\*[^]*?(?:\*\/|$)|\/\/.*|#.*/g,
    greedy: true
  },
  "triple-quoted-string": {
    pattern: /"""(?:\\[^]|[^\\])*?"""/g,
    greedy: true,
    alias: "string"
  },
  "string": {
    pattern: /"(?:\\.|[^\\\n"])*"/g,
    greedy: true
  },
  "keyword": /\b(?:activate|activeCoroCount|asString|block|break|call|catch|clone|collectGarbage|compileString|continue|do|doFile|doMessage|doString|else|elseif|exit|for|foreach|forward|getEnvironmentVariable|[gs]etSlot|hasSlot|if|ifFalse|ifNil|ifNilEval|ifTrue|isActive|isNil|isResumable|list|message|method|parent|pass|pause|perform|performWithArgList|print|println|proto|raise|raiseResumable|removeSlot|resend|resume|schedulerSleepSeconds|self|sender|setSchedulerSleepSeconds|shallowCopy|slotNames|super|system|then|thisBlock|thisContext|try|type|uniqueId|updateSlot|wait|while|write|yield)\b/,
  "builtin": /\b(?:Array|AudioDevice|AudioMixer|BigNum|Block|Box|Buffer|CFunction|CGI|Color|Curses|DBM|DNSResolver|DOConnection|DOProxy|DOServer|Date|Directory|Duration|DynLib|Error|Exception|FFT|File|Fnmatch|Font|Future|GLE?|GLScissor|GLUCylinder|GLUQuadric|GLUSphere|GLUT?|Host|Image|Importer|LinkList|List|Lobby|Locals|MD5|MP3Decoder|MP3Encoder|Map|Message|Movie|Notification|Number|Object|OpenGL|Point|Protos|Random|Regex|SGML|SGMLElement|SGMLParser|SQLite|Sequence|Server|ShowMessage|SleepyCat|SleepyCatCursor|Socket|SocketManager|Sound|Soup|Store|String|Tree|UDPSender|UPDReceiver|URL|User|Warning|WeakLink)\b/,
  "boolean": /\b(?:false|true|nil)\b/,
  "number": /\b0x[a-f\d]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e-?\d+)?/i,
  "operator": /--|\+\+|\*\*|\/\/|\|\||&&|::?=|>>=?|<<=?|[!~^]=|[%&|=<>/*+-]=?|\b(?:and|not|or|return)\b|@@?|\?\??|\.\./,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=io.js.map
