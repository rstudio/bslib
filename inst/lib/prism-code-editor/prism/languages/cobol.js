import { l as languages } from "../../index-XEj74r-1.js";
languages.cobol = {
  "comment": {
    pattern: /\*>.*|(^[ 	]*)\*.*/mg,
    lookbehind: true,
    greedy: true
  },
  "string": {
    pattern: /[xzgn]?(?:"(?:[^\n"]|"")*"(?!")|'(?:[^\n']|'')*'(?!'))/ig,
    greedy: true
  },
  "level": {
    pattern: /(^[ 	]*)\d+\b/mg,
    lookbehind: true,
    greedy: true,
    alias: "number"
  },
  "class-name": {
    // https://github.com/antlr/grammars-v4/blob/42edd5b687d183b5fa679e858a82297bd27141e7/cobol85/Cobol85.g4#L1015
    pattern: /(\bpic(?:ture)?\s+)(?:(?:[$\w/,:*<>+-]|\.(?=\S))(?:\(\d+\))?)+/i,
    lookbehind: true,
    inside: {
      "number": {
        pattern: /(\()\d+/,
        lookbehind: true
      },
      "punctuation": /[()]/
    }
  },
  "keyword": {
    pattern: /(^|[^\w-])(?:abort|accept|access|add|address|advancing|after|aligned|alphabet|alphabetic|alphabetic-lower|alphabetic-upper|alphanumeric|alphanumeric-edited|also|alter|alternate|any|are|areas?|as|ascending|ascii|assign|associated-data|associated-data-length|at|attribute|author|auto|auto-skip|background-color|background-colour|basis|beep|before|beginning|bell|binary|bit|blank|blink|b?lock|bottom|bounds|by|byfunction|bytitle|c?all|cancel|capable|ccsversion|c[dfh]|chaining|changed|channel|characters?|class|class-id|clock-units|close|close-disposition|co(?:bol|de|de-set|l|llating|lumn|m-reg|mma|mmitment|mmon|mmunication|mp(?:utational)?(?:-[1-5])?|mpute|nfiguration|ntains|ntent|ntinue|ntrol-point|ntrols?|nvention|nverting|py|rr|rresponding|unt)|crunch|currency|cursor|dat[ae]|data-base|date-compiled|date-written|day|day-of-week|dbcs|de|debug-contents|debug-item|debug-line|debug-name|debug-sub-[123]|debugging|decimal-point|declaratives|default|default-display|definition|delete|delimite[dr]|depending|descending|destination|detail|dfhresp|dfhvalue|disable|disk|display|display-1|divide|division|dontcare|double|d?own|duplicates|dynamic|ebcdic|egcs|egi|else|emi|empty-check|enable|end-(?:accept|add|call|compute|delete|divide|evaluate|if|multiply|of-page|perform|read|receive|return|rewrite|search|start|string|subtract|unstring|write)|ending|enter|entry|entry-procedure|environment|eo[lps]|erase|error|escape|esi|evaluate|event|every|exception|exclusive|exhibit|exit|export|extend|extended|external|fd|file|file-control|filler|final|first|footing|for|foreground-color|foreground-colour|from|full|function|function-pointer|functionname|generate|giving|global|go|goback|grid|group|heading|(?:high-|low-)?values?|highlight|i-o|i-o-control|i[dfns]|identification|implicit|import|index|indexed|indicate|initial|initialize|initiate|input|input-output|inspect|installation|integer|into|invalid|invoke|just|justified|kanji|kept|key|keyboard|label|language|last|lb|ld|leading|left|leftline|length|length-check|libaccess|libparameter|library|limits?|linage|linage-counter|line-counter|lines?|linkage|list|local|local-storage|long-date|long-time|lower|lowlight|memory|merge|message|mmddyyyy|mode|modules|more-labels|move|multipl[ey]|named|national|national-edited|native|negative|network|[nt]ext|no|no-echo|nulls?|number|numeric|numeric-date|numeric-edited|numeric-time|object-computer|occurs|odt|off?|omitted|on|open|optional|order|orderly|organization|other|output|overflow|overline|packed-decimal|padding|page|page-counter|password|perform|pf|ph|pic|picture|plus|pointer|port|position|positive|printer|printing|private|procedure-pointer|procedures?|proceed|process|program|program-id|program-library|prompt|purge|queue|quotes?|random|rd|re(?:ad|ader|al|ceived?|cording|cords?|cursive|defines|el|f|ferences?|lative|lease|mainder|marks|mote|moval|move|names|place|placing|porting|ports?|quired|run|serve|set|turn|turn-code|turning|verse-video|versed|wind|write)|rf|rh|right|rounded|run|same|save|screen|sd|search|section|secure|security|segment|segment-limit|select|s?end|sentence|separate|sequence|sequential|set|shared|sharedbyall|sharedbyrununit|sharing|shift-in|shift-out|short-date|sign|size|sort|sort-(?:control|core-size|file-size|merge|message|mode-size|return)|source|source-computer|spaces?|special-names|standard|standard-[12]|start|status|stop|string|sub-queue-[123]|subtract|sum|suppress|symbol|symbolic|sync|synchronized|table|tally|tallying|tape|task|terminal|terminate|test|[tw]hen|thread|thread-local|through|thru|time[rs]?|title|todays-date|todays-name|top?|trailing|truncated|type|typedef|underline|unit|unstring|until|up|upon|usage|use|using|varying|virtual|wait|when-compiled|with|words|working-storage|write|year|yyyyddd|yyyymmdd|zero-fill|zeroe?s)(?![\w-])/i,
    lookbehind: true
  },
  "boolean": {
    pattern: /(^|[^\w-])(?:false|true)(?![\w-])/i,
    lookbehind: true
  },
  "number": {
    pattern: /(^|[^\w-])(?:[+-]?(?:(?:\d+(?:[.,]\d+)?|[.,]\d+)(?:e[+-]?\d+)?|zero))(?![\w-])/i,
    lookbehind: true
  },
  "operator": {
    pattern: /<>|[<>]=?|[=+*/&]|(^|[^\w-])(?:-|and|equal|greater|less|not|or|than)(?![\w-])/i,
    lookbehind: true
  },
  "punctuation": /[().,:]/
};
//# sourceMappingURL=cobol.js.map
