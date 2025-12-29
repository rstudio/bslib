import { l as languages } from "../../index-XEj74r-1.js";
import { d as clikePunctuation, a as clikeComment } from "../../patterns-Cp3h1ylA.js";
languages.al = {
  "comment": clikeComment(),
  "string": {
    pattern: /'(?:''|[^\n'])*'(?!')|"(?:""|[^\n"])*"(?!")/g,
    greedy: true
  },
  "function": {
    pattern: /(\b(?:event|procedure|trigger)\s+|(?:^|[^.])\.\s*)[a-z_]\w*(?=\s*\()/i,
    lookbehind: true
  },
  "keyword": /\b(?:actions?|addafter|addbefore|addfirst|addlast|area|array|assembly|asserterror|begin|break|case|chartpart|codeunit|column|controladdin|cuegroup|customizes|dataitem|dataset|do|dotnet|downto|elements|else|end|enum|enumextension|event|exit|extends|fieldattribute|fieldelement|fieldgroups?|fields?|filter|fixed|for|foreach|function|grid|group|if|implements|in|indataset|interface|internal|keys?|labels?|layout|local|modify|moveafter|movebefore|movefirst|movelast|of|page|pagecustomization|pageextension|part|procedure|profile|program|protected|query|repeat|repeater|report|requestpage|runonclient|schema|securityfiltering|separator|suppressdispose|systempart|table|tableelement|tableextension|temporary|textattribute|textelement|then|to|trigger|type|until|usercontrol|value|var|while|with|withevents|xmlport)\b/i,
  "number": /\b(?:0x[a-f\d]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)(?:f|ll?|u(?:ll?)?)?\b/i,
  "boolean": /\b(?:false|true)\b/i,
  "variable": /\b(?:Curr(?:FieldNo|Page|Report)|x?Rec|RequestOptionsPage)\b/,
  "class-name": /\b(?:automation|biginteger|bigtext|blob|boolean|byte|char|clienttype|code|completiontriggererrorlevel|connectiontype|database|dataclassification|datascope|date|dateformula|datetime|decimal|defaultlayout|dialog|dictionary|dotnetassembly|dotnettypedeclaration|duration|errorinfo|errortype|executioncontext|executionmode|fieldclass|fieldref|fieldtype|file|filterpagebuilder|guid|httpclient|httpcontent|httpheaders|httprequestmessage|httpresponsemessage|instream|integer|joker|jsonarray|jsonobject|jsontoken|jsonvalue|keyref|list|moduledependencyinfo|moduleinfo|none|notification|notificationscope|objecttype|option|outstream|pageresult|record|recordid|recordref|reportformat|securityfilter|sessionsettings|tableconnectiontype|tablefilter|testaction|testfield|testfilterfield|testpage|testpermissions|testrequestpage|text|textbuilder|textconst|textencoding|time|transactionmodel|transactiontype|variant|verbosity|version|views?|webserviceactioncontext|webserviceactionresultcode|xmlattribute|xmlattributecollection|xmlcdata|xmlcomment|xmldeclaration|xmldocument|xmldocumenttype|xmlelement|xmlnamespacemanager|xmlnametable|xmlnode|xmlnodelist|xmlprocessinginstruction|xmlreadoptions|xmltext|xmlwriteoptions)\b/i,
  "operator": /\.\.|:[=:]|<>|[<>/*+-]=?|=|\b(?:and|div|mod|not|x?or)\b/i,
  "punctuation": clikePunctuation
};
//# sourceMappingURL=al.js.map
