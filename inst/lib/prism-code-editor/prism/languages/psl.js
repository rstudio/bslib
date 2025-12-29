import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation } from "../../patterns-Cp3h1ylA.js";
languages.psl = {
  "comment": {
    pattern: /#.*/g,
    greedy: true
  },
  "string": {
    pattern: /"(?:\\.|[^\\"])*"/g,
    greedy: true,
    inside: {
      "symbol": /\\[ntrbA-Z"\\]/
    }
  },
  "heredoc-string": {
    pattern: /<<<((?!\d)\w+)\n(?:.*\n)*?\1\b/g,
    alias: "string",
    greedy: true
  },
  "keyword": /\b(?:__multi|__single|case|default|do|else|elsif|exit|export|for|foreach|function|if|last|line|local|next|requires|return|switch|until|while|word)\b/,
  "constant": /\b(?:ALARM|CHART_ADD_GRAPH|CHART_DELETE_GRAPH|CHART_DESTROY|CHART_LOAD|CHART_PRINT|EOF|OFFLINE|OK|PSL_PROF_LOG|R_CHECK_HORIZ|R_CHECK_VERT|R_CLICKER|R_COLUMN|R_FRAME|R_ICON|R_LABEL|R_LABEL_CENTER|R_LIST_MULTIPLE|R_LIST_MULTIPLE_ND|R_LIST_SINGLE|R_LIST_SINGLE_ND|R_MENU|R_POPUP|R_POPUP_SCROLLED|R_RADIO_HORIZ|R_RADIO_VERT|R_ROW|R_SCALE_HORIZ|R_SCALE_VERT|R_SEP_HORIZ|R_SEP_VERT|R_SPINNER|R_TEXT_FIELD|R_TEXT_FIELD_LABEL|R_TOGGLE|TRIM_LEADING|TRIM_LEADING_AND_TRAILING|TRIM_REDUNDANT|TRIM_TRAILING|VOID|WARN)\b/,
  "boolean": /\b(?:FALSE|[Ff]alse|NO|No|TRUE|[Tt]rue|YES|[Yy]es|no)\b/,
  "variable": /\b(?:PslDebug|errno|exit_status)\b/,
  "builtin": {
    pattern: /\b(?:PslExecute|PslFunctionCall|PslFunctionExists|PslSetOptions|_snmp_debug|a?cos|add_diary|annotate|annotate_get|ascii_to_ebcdic|asctime|a?sin|a?tan|atexit|batch_set|blackout|cat|ceil|chan_exists|change_state|close|code_cvt|cond_signal|cond_wait|console_type|convert_base|convert_date|convert_locale_date|cosh|create|date|dcget_text|destroy|destroy_lock|dget_text|difference|dump_hist|ebcdic_to_ascii|encrypt|event_(?:archive|catalog_get|check|query|range_manage|range_query|report|schedule|trigger2?)|execute|exists|exp|fabs|file|floor|fmod|[fps]open|fseek|ftell|full_discovery|[gs]et|get_chan_info|get_ranges|get_text|get_vars|getenv|gethostinfo|getpid|getpname|grep|history|history_get_retention|in_transition|int|internal|intersection|is_var|isnumber|join|kill|length|lines|lock|lock_info|log10|loge?|matchline|msg_check|msg_get_format|msg_get_severity|msg_s?printf|nthargf?|nthlinef?|num_bytes|num_consoles|pconfig|poplines|pow|printf?|proc_exists|process|read|readln|refresh_parameters|remote_(?:check|close|event_query|event_trigger|file_send|open)|remove|replace|r?index|sec_check_priv|sec_store_get|sec_store_set|set_alarm_ranges|set_locale|share|sinh|sleep|snmp_(?:agent_config|agent_start|agent_stop|close|config|[gs]et|get_next|h_get|h_get_next|h_set|open|trap_(?:ignore|listen|raise_std_trap|receive|register_im|send)|walk)|sort|splitline|sprintf|sqrt|s?random|str_repeat|strcasecmp|subset|substr|system|tail|tanh|text_domain|time|tmpnam|tolower|toupper|trace_psl_process|trim|union|unique|unlock|unset|va_arg|va_start|write)\b/,
    alias: "builtin-function"
  },
  "foreach-variable": {
    pattern: /(\bforeach\s+(?:(?:\w+\b|"(?:\\.|[^\\"])*")\s+){0,2})(?!\d)\w+(?=\s*\()/g,
    lookbehind: true,
    greedy: true
  },
  "function": /\b[_a-z]\w*\b(?=\s*\()/i,
  "number": /\b(?:0x[a-f\d]+|\d+(?:\.\d+)?)\b/i,
  "operator": /--|\+\+|[!=]~|(?:&&|\|\||<<|>>|[%&|^!=<>/*+-])=?|[.:?]/,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=psl.js.map
