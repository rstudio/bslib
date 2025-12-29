import { l as languages } from "../../index-XEj74r-1.js";
import { b as boolean } from "../../patterns-Cp3h1ylA.js";
languages.autohotkey = {
  "comment": [
    {
      pattern: /(^|\s);.*/,
      lookbehind: true
    },
    {
      pattern: /((?:^|\n)[ 	]*)\/\*[^]*?(?:\n[ 	]*\*\/|$)/g,
      lookbehind: true,
      greedy: true
    }
  ],
  "tag": {
    // labels
    pattern: /^([ 	]*)[^\s,`":]+(?=:[ 	]*$)/m,
    lookbehind: true
  },
  "string": /"(?:[^\n"]|"")*"/,
  "variable": /%\w+%/,
  "number": /\b0x[a-fA-F\d]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
  "operator": /\?|:=|--|\+\+|\*\*|&&|<>|(?:\|\||\/\/|<<|>>|[~.&|^!=<>/*+-])=?|\b(?:AND|NOT|OR)\b/,
  "boolean": boolean,
  "command": {
    pattern: /\b(?:autotrim|blockinput|break|click|clipwait|continue|control(?:click|focus|get|getfocus|getpos|[gs]ettext|move|send|sendraw)?|coordmode|critical|detecthiddentext|detecthiddenwindows|drive|driveget|drivespacefree|envadd|envdiv|envget|envmult|envset|envsub|envupdate|exit|exitapp|file(?:append|copy|copydir|createdir|createshortcut|delete|encoding|[gs]etattrib|getshortcut|getsize|[gs]ettime|getversion|install|move|movedir|read|readline|recycle|recycleempty|removedir|selectfile|selectfolder)|formattime|getkeystate|gosub|goto|groupactivate|groupadd|groupclose|groupdeactivate|gui|guicontrol|guicontrolget|hotkey|imagesearch|inidelete|iniread|iniwrite|input|inputbox|keywait|listhotkeys|listlines|listvars|loop|menu|mouseclick|mouseclickdrag|mousegetpos|mousemove|msgbox|onexit|outputdebug|pause|pixelgetcolor|pixelsearch|postmessage|process|progress|random|regdelete|regread|regwrite|reload|repeat|return|run|runas|runwait|send(?:event|input|message|mode|play|raw)?|set(?:batchlines|capslockstate|controldelay|defaultmousespeed|env|format|keydelay|mousedelay|numlockstate|regview|scrolllockstate|storecapslockmode|timer|titlematchmode|windelay|workingdir)|shutdown|sleep|sort|sound(?:beep|[gs]et|[gs]etwavevolume|play)|splashimage|splashtextoff|splashtexton|splitpath|statusbargettext|statusbarwait|string(?:casesense|getpos|left|len|lower|mid|replace|right|split|trimleft|trimright|upper)|suspend|sysget|thread|tooltip|transform|traytip|urldownloadtofile|win(?:activate|activatebottom|close|[gs]et|getactivestats|getactivetitle|getclass|getpos|gettext|[gs]ettitle|hide|kill|maximize|menuselectitem|minimize|minimizeall|minimizeallundo|move|restore|show|wait|waitactive|waitclose|waitnotactive))\b/i,
    alias: "selector"
  },
  "constant": /\b(?:a_(?:ahkpath|ahkversion|appdata|appdatacommon|autotrim|batchlines|caret[xy]|computername|controldelay|cursor|ddd?d?|defaultmousespeed|desktop|desktopcommon|detecthiddentext|detecthiddenwindows|endchar|eventinfo|exitreason|fileencoding|formatfloat|formatinteger|gui|guicontrol|guicontrolevent|guievent|guiheight|guiwidth|gui[xy]|hour|iconfile|iconhidden|iconnumber|icontip|index|ipaddress[1-4]|is64bitos|isadmin|iscompiled|iscritical|ispaused|issuspended|isunicode|keydelay|language|lasterror|linefile|linenumber|loopfield|loopfile(?:attrib|dir|ext|fullpath|longpath|name|shortname|shortpath|size[km]b|size|timeaccessed|timecreated|timemodified)|loopreadline|loopregkey|loopregname|loopregsubkey|loopregtimemodified|loopregtype|[mwy]day|min|mmm?m?|mon|mousedelay|m?sec|mydocuments|now|nowutc|numbatchlines|ostype|osversion|priorhotkey|priorkey|programfiles|programs|programscommon|ptrsize|regview|screendpi|screenheight|screenwidth|scriptdir|scriptfullpath|scripthwnd|scriptname|space|startmenu|startmenucommon|startup|startupcommon|stringcasesense|tab|temp|this(?:func|hotkey|label|menu|menuitem|menuitempos)|tickcount|timeidle|timeidlephysical|timesincepriorhotkey|timesincethishotkey|titlematchmode|titlematchmodespeed|username|windelay|windir|workingdir|year|yweek|yyyy)|clipboard|clipboardall|comspec|errorlevel|programfiles)\b/i,
  "builtin": /\b(?:abs|a?cos|asc|a?sin|a?tan|ceil|chr|class|comobj(?:active|array|connect|create|error|flags|get|query|type|value)|dllcall|exp|fileexist|fileopen|floor|format|il_add|il_create|il_destroy|instr|isfunc|islabel|isobject|ln|log|[lr]trim|lv_(?:add|delete|deletecol|getcount|get[nt]ext|insert|insertcol|modify|modifycol|setimagelist)|mod|numget|numput|onmessage|regexmatch|regexreplace|registercallback|round|sb_seticon|sb_setparts|sb_settext|sqrt|strlen|strreplace|strsplit|substr|tv_(?:add|delete|get|getchild|getcount|get[nt]ext|getparent|getprev|getselection|modify)|varsetcapacity|winactive|winexist|__call|__[gs]et|__new)\b/i,
  "symbol": /\b(?:alt|altdown|altup|appskey|backspace|browser_(?:back|favorites|forward|home|refresh|search|stop)|bs|capslock|ctrl|ctrlbreak|ctrldown|ctrlup|del|delete|down|end|enter|esc|escape|f[01]\d|f2[0-4]?|f\d|home|ins|insert|joy[012]\d|joy3[012]?|joy\d|joyaxes|joybuttons|joyinfo|joyname|joypov|joy[ruvxyz]|[lr]alt|launch_app[12]|launch_mail|launch_media|[lmrx]button|[lr]control|[lr]ctrl|left|[lr]?shift|[lr]win|[lr]windown|[rl]winup|media_next|media_play_pause|media_prev|media_stop|numlock|numpad(?:\d|add|clear|del|div|dot|down|end|enter|home|ins|left|mult|pgdn|pgup|right|sub|up)|pgdn|pgup|printscreen|right|scrolllock|shift|shiftdown|shiftup|space|tab|up|volume_down|volume_mute|volume_up|wheeldown|wheelleft|wheelright|wheelup|xbutton[12])\b/i,
  "directive": {
    pattern: /#[a-z]+\b/i,
    alias: "important"
  },
  "keyword": /\b(?:abort|abovenormal|add|ahk_class|ahk_exe|ahk_group|ahk_id|ahk_pid|all|alnum|alpha|altsubmit|alttab|alttabandmenu|alttabmenu|alttabmenudismiss|alwaysontop|autosize|background|backgroundtrans|belownormal|between|bitand|bitnot|bitshiftleft|bitshiftright|bitx?or|bold|border|button|byref|catch|checkbox|checked|checkedgray|choose|choosestring|close|color|combobox|contains|controllist|count|date|datetime|days|ddl|default|deleteall|delimiter|deref|destroy|disabled?|dropdownlist|edit|eject|else|enabled?|error|exist|expand|exstyle|filesystem|finally|first|flash|float|floatfast|focus|font|for|global|grid|group|groupbox|guiclose|guicontextmenu|guidropfiles|guiescape|guisize|hdr|hidden|hide|high|hkc[cru]|hkey_(?:classes_root|current_config|current_user|local_machine|users)|hklm|hku|hours|[hv]scroll|icon|iconsmall|i[dfns]|idlast|if(?:equal|exist|greater|greaterorequal|instring|less|lessorequal|msgbox|notequal|notexist|notinstring|winactive|winexist|winnotactive|winnotexist)|ignore|imagelist|integer|integerfast|interrupt|italic|join|label|lastfound|lastfoundexist|limit|lines|list|listbox|listview|local|lock|logoff|low|lower|lowercase|mainwindow|margin|maximize|maximizebox|maxsize|minimize|minimizebox|minmax|minsize|minutes|monthcal|mouse|move|multi|na|noactivate|nodefault|nohide|noicon|nomainwindow|norm|normal|nosort|nosorthdr|nostandard|not?|notab|notimers|number|off|ok|on|owndialogs|owner|parse|password|picture|pixel|po[sw]|priority|processname|radio|range|read|readonly|realtime|redraw|region|reg_binary|reg_dword|reg_expand_sz|reg_multi_sz|reg_sz|relative|rename|report|resize|restore|retry|rgb|screen|seconds|section|serial|setlabel|shiftalttab|show|single|slider|sortdesc|standard|static|status|statusbar|statuscd|strike|style|submit|sysmenu|tab2|tabstop|text|theme|throw|tile|togglecheck|toggleenable|toolwindow|top|topmost|transcolor|transparent|tra?y|treeview|tryagain|type|uncheck|underline|unicode|unlock|until|updown|upper|uppercase|useerrorlevel|vis|visfirst|visible|wait|waitclose|wantctrla|wantf2|wantreturn|while|wrap|x?digit|[xy][mps]|yes)\b/i,
  "function": /[^(); 	,\n*=?>:\\/<&%[\]+-]+(?=\()/,
  "punctuation": /[()[\]{},:]/
};
//# sourceMappingURL=autohotkey.js.map
