import { l as languages } from "../../index-XEj74r-1.js";
languages.abap = {
  "comment": /^\*.*/m,
  "string": /(`|')(?:\\.|(?!\1)[^\\\n])*\1/,
  "string-template": {
    pattern: /([|}])(?:\\.|[^\\\n|{])+(?=[|{])/,
    lookbehind: true,
    alias: "string"
  },
  /* End Of Line comments should not interfere with strings when the
  quote character occurs within them. We assume a string being highlighted
  inside an EOL comment is more acceptable than the opposite.
  */
  "eol-comment": {
    pattern: /(^|\s)".*/m,
    lookbehind: true,
    alias: "comment"
  },
  "keyword": {
    pattern: /(\s|\.|^)(?:\*-input|\?to|abap-source|abbreviated|ab?s|abstract|accept|accepting|accesspolicy|according|a?cos|activation|actual|add|add-corresponding|adjacent|after|alias|aliases|align|allocate|alpha|analysis|analyzer|an[dy]|append|appendage|appending|application|archive|area|arithmetic|ascending|a?sin|aspect|assert|assign|assigned|assigning|association|asynchronous|at|a?tan|attributes|authority|authority-check|avg|[bp]ack|background|backup|backward|badi|base|before|begin|between|big|binary|binding|bit|bit-and|bit-not|bit-x?or|black|blanks?|b?lob|blocks?|blue|bounds?|boundaries|boxed|break-point|bt|buffer|by|bypassing|byte|byte-c[anos]|byte-n[as]|byte-order|ca?|c?all|calling|cas[et]|casting|[cm]atch|ceil|center|centered|chain|chain-input|chain-request|change|changing|channels|char-to-hex|character|charlen|check|checkbox|circular|ci_|class|class-coding|class-data|class-events|class-methods|class-pool|cleanup|clear|client|clob|clock|close|cnt?|co|coalesce|code|coding|collect|color|columns?|col_background|col_group|col_heading|col_key|col_negative|col_normal|col_positive|col_total|comments?|commit|common|communication|comparing|components?|compression|compute|concat|concatenate|con[dv]|condense|condition|connect|connection|constants|contexts?|continue|controls?|conversion|convert|copies|copy|corresponding|cosh|count|country|cover|cpi?|create|creating|critical|cs|currency|currency_conversion|current|cursor|cursor-selection|customer|customer-function|dangerous|data|database|datainfo|dataset|[dl]ate|daylight|dbmaxlen|dd\/mm\/yy|dd\/mm\/yyyy|ddmmyy|deallocate|decimals|decimal_shift|declarations|[dk]eep|default|deferred|define|defining|definition|delete|deleting|demand|department|descending|describe|destination|detail|dialog|directory|disconnect|display|display-mode|distance|distinct|div|divide|divide-corresponding|division|do|dummy|duplicates?|duration|during|dynamic|dynpro|eq?|each|edit|editor-call|else|elseif|empty|enabled|enabling|encoding|end(?:-enhancement-section|-lines|-of-definition|-of-file|-of-page|-of-selection|at|case|catch|chain|class|do|enhancement|exec|form?|function|ian|if|ing|interface|loop|method|module|on|provide|select|try|while)|engineering|enhancements?|enhancement-point|enhancement-section|entries|entry|environment|equal|equiv|errormessage|errors|escape|escaping|events?|exact|except|exceptions?|exception-table|exclude|excluding|exec|execute|exists|exit|exit-command|exp|expand|expanding|expiration|explicit|exponent|export|exporting|extend|extended|extension|extract|fail|fetch|field-groups|field-symbols?|fields?|file|filter-table|filters?|final|find|first|first-line|fixed-point|[fg]keq|[fg]kge|floor|flush|font|form?|format|forward|found|frac|frames?|free|friends|from|function|function-pool|functionality|further|gaps|get?|generate|giving|global|grant|greater|green|groups?|gt|handler?|harmless|hashed|having|hdb|head-lines|headers?|heading|help-id|help-request|hide|high|hint|hold|hotspot|in?|icon|ids?|identification|identifier|if|ignore|ignoring|immediately|implementations?|implemented|implicit|import|importing|inactive|incl|includes?|including|increment|index|index-line|infotypes|inheriting|init|initial|initialization|inner|in[op]ut|insert|instances|intensified|interfaces?|interface-pool|internal|intervals|into|inverse|inverted-date|iso?|iterator|itno|job|join|keeping|kernel|keys?|keywords|kind|language|last|layout|let?|leading|leave|left|left-justified|leftplus|leftspace|legacy|length|less|levels?|like|lines?|line-count|line-selection|line-size|linefeed|list|list-processing|listbox|little|llang|load|load-of-program|locale?|locator|log|log-point|log10|logfile|logical|long|loop|low|lower|l?pad|lpi|lt|m|mai[ln]|major-id|mapping|margin|ma[rs]k|matchcode|max|maximum|medium|members|memory|mesh|messages?|message-id|messaging|methods?|min|minimum|minor-id|mm\/dd\/yy|mm\/dd\/yyyy|mmddyy|mode?|modify?|modifier|module|move|move-corresponding|multiply|multiply-corresponding|n[abeops]|name|nametab|native|nested|[nt]esting|new|new-line|new-page|new-section|[nt]ext|no-display|no-extension|no-gaps?|no-grouping|no-heading|no-scrolling|no-sign|no-title|no-topofpage|no-zero|nodes?|non-unicode|non-unique|not|null|number|numofchar|on?|objects?|obligatory|occurrences?|occurs|off?|offset|only|open|options?|optional|order|others?|[op]ut|outer|output|output-length|overflow|overlay|package|padding|pages?|parameters?|parameter-table|part|partially|pattern|percentage|perform|performing|person|pf|pf-status|pink|places|position|pos_high|pos_low|pragmas|precompiled|preferred|preserving|primary|print|print-control|priority|private|procedure|process|program|property|protected|provide|public|pushbutton|queue-only|quickinfo|radiobutton|raise|raising|ranges?|raw|read|read-only|reader|receiver?|received|receiving|red|redefinition|reduced?|ref|reference|refresh|regex|reject|remote|renaming|replace|replacement|replacing|report|request|requested|reserve|reset|resolution|respecting|responsible|results?|resumable|resume|retry|return|returncode|returning|right|right-justified|rightplus|rightspace|risk|rmc_communication_failure|rmc_invalid_status|rmc_system_failure|r?ole|rollback|round|rows|rtti|run|sap|sap-spool|saving|scale_preserving|scale_preserving_scientific|scan|scientific|scientific_with_leading_zero|screen|scroll|scroll-boundary|scrolling|search|secondary|seconds|section|select(?:-options|ion-screen|ion-sets?|ion-table|ions?|or)?|s?end|separated?|set|shared|shift|short|shortdump-id|sign|sign_as_postfix|simple|single|sinh|size|skip|skipping|smart|some|sort|sortable|sorted|source|space|specified|split|s?pool|spots|sql|sqlscript|sqrt|stable|stamp|standard|start-of-selection|starting|state|statements?|statics?|statusinfo|step-loop|stop|structures?|style|subkey|submatches|submit|subroutine|subscreen|substring|subtract|subtract-corresponding|suffix|sum|summary|summing|supplied|supply|suppress|switch|switchstates|symbol|syncpoints|syntax|syntax-check|syntax-trace|system-call|system-exceptions|system-exit|tab|tabbed|tables?|tableview|tabstrip|tanh|target|tasks?|test|textpool|[tw]hen|throw|times?|timestamp|timezone|title|title-lines|titlebar|to|tokenization|tokens|top-lines|top-of-page|trace-file|trace-table|trailing|transaction|transfer|transformation|translate|transporting|trmac|trunc|truncate|truncation|try|types?|type-pools?|uline|unassign|under|unicode|union|unique|uni[tx]|unit_conversion|unpack|until|unwind|up|update|upper|user|user-command|using|utf-8|valid|values?|value-request|vary|varying|verification-message|version|via|view|visible|wait|warning|whenever|where|while|width|windows?|with|with-heading|with-title|without|wor[dk]|writer?|x|xml|x?or|xsd|x?strlen|yellow|yes|yymmdd|z|zero|zone)(?![\w-])/i,
    lookbehind: true
  },
  /* Numbers can be only integers. Decimal or Hex appear only as strings */
  "number": /\b\d+\b/,
  /* Operators must always be surrounded by whitespace, they cannot be put
  adjacent to operands.
  */
  "operator": {
    pattern: /(\s)(?:\*\*?|<[=>]?|>=?|\?=|[/=+-])(?!\S)/,
    lookbehind: true
  },
  "string-operator": {
    pattern: /(\s)&&?(?!\S)/,
    lookbehind: true,
    /* The official editor highlights */
    alias: "keyword"
  },
  "token-operator": {
    /* Special operators used to access structure components, class methods/attributes, etc. */
    /* Special tokens used do delimit string templates */
    pattern: /\b(?:->?|=>|~)\b|[|{}]/,
    alias: "punctuation"
  },
  "punctuation": /[().,:]/
};
//# sourceMappingURL=abap.js.map
