import { l as languages } from "../../index-XEj74r-1.js";
var variable = /[$%]\{?(?:\w\.?[:+-]?)+\}?/;
languages.apacheconf = {
  "comment": /#.*/,
  "directive-inline": {
    pattern: /(^[ 	]*)\b(?:acceptfilter|acceptpathinfo|accessfilename|action|add(?:alt|altbyencoding|altbytype|charset|defaultcharset|description|encoding|handler|icon|iconbyencoding|iconbytype|inputfilter|language|moduleinfo|outputfilter|outputfilterbytype|type)|alias|aliasmatch|allow(?:connect|encodedslashes|methods|override|overridelist)?|anonymous(?:_logemail|_mustgiveemail|_nouserid|_verifyemail)?|asyncrequestworkerfactor|auth(?:basicauthoritative|basicfake|basicprovider|basicusedigestalgorithm|dbduserpwquery|dbduserrealmquery|dbmgroupfile|dbmuserfile|digest(?:algorithm|domain|noncelifetime|provider|qop|shmemsize)|form(?:authoritative|body|disablenostore|fakebasicauth|location|loginrequiredlocation|loginsuccesslocation|logoutlocation|method|mimetype|password|provider|sitepassphrase|size|username)|groupfile|ldap(?:authorizeprefix|bindauthoritative|binddn|bindpassword|charsetconfig|compareasuser|comparednonserver|dereferencealiases|groupattribute|groupattributeisdn|initialbindasuser|initialbindpattern|maxsubgroupdepth|remoteuserattribute|remoteuserisdn|searchasuser|subgroupattribute|subgroupclass|url)|merging|name|ncache(?:context|enable|providefor|socache|timeout)|nzfcgicheckauthnprovider|nzfcgidefineprovider|type|userfile|zdbdlogintoreferer|zdbdquery|zdbdredirectquery|z?dbmtype|zsendforbiddenonfailure)|balancergrowth|balancerinherit|balancermember|balancerpersist|browsermatch|browsermatchnocase|bufferedlogs|buffersize|cache(?:defaultexpire|detailheader|dirlength|dirlevels|disable|enable|file|header|ignorecachecontrol|ignoreheaders|ignorenolastmod|ignorequerystring|ignoreurlsessionidentifiers|keybaseurl|lastmodifiedfactor|lock|lockmaxage|lockpath|maxexpire|maxfilesize|minexpire|minfilesize|negotiateddocs|quickhandler|readsize|readtime|root|socache(?:maxsize|maxtime|mintime|readsize|readtime)?|staleonerror|storeexpired|storenostore|storeprivate)|cgidscripttimeout|cgimapextension|charsetdefault|charsetoptions|charsetsourceenc|checkcaseonly|checkspelling|chrootdir|contentdigest|cookiedomain|cookieexpires|cookiename|cookiestyle|cookietracking|coredumpdirectory|customlog|dav|davdepthinfinity|davgenericlockdb|davlockdb|davmintimeout|dbdexptime|dbdinitsql|dbdkeep|dbdmax|dbdmin|dbdparams|dbdpersist|dbdpreparesql|dbdriver|defaulticon|defaultlanguage|defaultruntimedir|defaulttype|define|deflate(?:buffersize|compressionlevel|filternote|inflatelimitrequestbody|inflateratio(?:burst|limit)|memlevel|windowsize)|deny|directorycheckhandler|directoryindex|directoryindexredirect|directoryslash|documentroot|dtraceprivileges|dumpioinput|dumpiooutput|enableexceptionhook|enablemmap|enablesendfile|error|errordocument|errorlog|errorlogformat|example|expiresactive|expiresbytype|expiresdefault|extendedstatus|extfilterdefine|extfilteroptions|fallbackresource|fileetag|filterchain|filterdeclare|filterprotocol|filterprovider|filtertrace|forcelanguagepriority|forcetype|forensiclog|gprofdir|gracefulshutdowntimeout|group|header|headername|heartbeat(?:address|listen|maxservers|storage)|hostnamelookups|identitycheck|identitychecktimeout|imapbase|imapdefault|imapmenu|include|includeoptional|index(?:headinsert|ignore|ignorereset|options|orderdefault|stylesheet)|inputsed|isapi(?:appendlogtoerrors|appendlogtoquery|cachefile|fakeasync|lognotsupported|readaheadbuffer)|keepalive|keepalivetimeout|keptbodysize|languagepriority|ldap(?:cacheentries|cachettl|connectionpoolttl|connectiontimeout|librarydebug|opcacheentries|opcachettl|referralhoplimit|referrals|retries|retrydelay|sharedcachefile|sharedcachesize|timeout|trustedclientcert|trustedglobalcert|trustedmode|verifyservercert)|limit(?:internalrecursion|request(?:body|fields|fieldsize|line)|xmlrequestbody)|listen|listenbacklog|loadfile|loadmodule|logformat|loglevel|logmessage|luaauthzprovider|luacodecache|lua(?:hook(?:accesschecker|authchecker|checkuserid|fixups|insertfilter|log|maptostorage|translatename|typechecker)|inherit|inputfilter|maphandler|outputfilter|packagecpath|packagepath|quickhandler|root|scope)|max(?:connectionsperchild|keepaliverequests|memfree|rangeoverlaps|rangereversals|ranges|requestworkers|spareservers|sparethreads|threads)|mergetrailers|metadir|metafiles|metasuffix|mimemagicfile|minspareservers|minsparethreads|mmapfile|modemstandard|modmimeusepathinfo|multiviewsmatch|mutex|namevirtualhost|noproxy|nwssltrustedcerts|nwsslupgradeable|options|order|outputsed|passenv|pidfile|privilegesmode|protocol|protocolecho|proxy(?:addheaders|badheader|block|domain|erroroverride|expressdbmfile|expressdbmtype|expressenable|ftpdircharset|ftpescapewildcards|ftplistonwildcard|html(?:bufsize|charsetout|doctype|enable|events|extended|fixups|interp|links|meta|stripcomments|urlmap)|iobuffersize|maxforwards|pass(?:inherit|interpolateenv|match|reverse|reversecookiedomain|reversecookiepath)?|preservehost|receivebuffersize|remote|remotematch|requests|scgiinternalredirect|scgisendfile|set|sourceaddress|status|timeout|via)|readmename|receivebuffersize|redirect|redirectmatch|redirectpermanent|redirecttemp|reflectorheader|remoteip(?:header|internalproxy|internalproxylist|proxiesheader|trustedproxy|trustedproxylist)|remove(?:charset|encoding|handler|inputfilter|language|outputfilter|type)|requestheader|requestreadtimeout|require|rewrite(?:base|cond|engine|map|options|rule)|rlimitcpu|rlimitmem|rlimitnproc|satisfy|scoreboardfile|script(?:alias|aliasmatch|interpretersource|log|logbuffer|loglength|sock)?|securelisten|seerequesttail|sendbuffersize|server(?:admin|alias|limit|name|path|root|signature|tokens)|session(?:cookie(?:name2?|remove)|crypto(?:cipher|driver|passphrase|passphrasefile)|dbd(?:cookiename|cookiename2|cookieremove|deletelabel|insertlabel|peruser|selectlabel|updatelabel)|env|exclude|header|include|maxage)?|setenv|setenvif|setenvifexpr|setenvifnocase|sethandler|setinputfilter|setoutputfilter|ssiendtag|ssierrormsg|ssietag|ssilastmodified|ssilegacyexprparser|ssistarttag|ssitimeformat|ssiundefinedecho|ssl(?:cacertificatefile|cacertificatepath|cadnrequestfile|cadnrequestpath|carevocationcheck|carevocationfile|carevocationpath|certificatechainfile|certificatefile|certificatekeyfile|ciphersuite|compression|cryptodevice|engine|fips|honorcipherorder|insecurerenegotiation|ocsp(?:defaultresponder|enable|overrideresponder|respondertimeout|responsemaxage|responsetimeskew|userequestnonce)|opensslconfcmd|options|passphrasedialog|protocol|proxy(?:cacertificatefile|cacertificatepath|carevocation(?:check|file|path)|checkpeer(?:cn|expire|name)|ciphersuite|engine|machinecertificate(?:chainfile|file|path)|protocol|verify|verifydepth)|randomseed|renegbuffersize|require|requiressl|session(?:cache|cachetimeout|ticketkeyfile|tickets)|srpunknownuserseed|srpverifierfile|stapling(?:cache|errorcachetimeout|faketrylater|forceurl|respondertimeout|responsemaxage|responsetimeskew|returnrespondererrors|standardcachetimeout)|strictsnivhostcheck|username|usestapling|verifyclient|verifydepth)|startservers|startthreads|substitute|suexec|suexecusergroup|threadlimit|threadsperchild|threadstacksize|timeout|traceenable|transferlog|typesconfig|undefine|undefmacro|unsetenv|usecanonicalname|usecanonicalphysicalport|user?|userdir|vhostcgimode|vhostcgiprivs|vhostgroup|vhostprivs|vhostsecure|vhostuser|virtual(?:documentroot|scriptalias)(?:ip)?|watchdoginterval|xbithack|xml2encalias|xml2encdefault|xml2startparse)\b/im,
    lookbehind: true,
    alias: "property"
  },
  "directive-block": {
    pattern: /<\/?(?:auth[nz]provideralias|(?:directory|files|location)(?:match)?|else|elseif|if|ifdefine|ifmodule|ifversion|limit|limitexcept||macro|proxy|require(?:all|any|none)|virtualhost)\b.*>/i,
    inside: {
      "punctuation": /^<\/?|>$/,
      "directive-block": {
        pattern: /^\w+/,
        alias: "tag"
      },
      "directive-block-parameter": {
        pattern: /.+/,
        inside: {
          "punctuation": /:/,
          "string": {
            pattern: /(["']).*\1/,
            inside: {
              "variable": variable
            }
          }
        },
        alias: "attr-value"
      }
    },
    alias: "tag"
  },
  "directive-flags": {
    pattern: /\[(?:[\w=],?)+\]/,
    alias: "keyword"
  },
  "string": {
    pattern: /(["']).*\1/,
    inside: {
      "variable": variable
    }
  },
  "variable": variable,
  "regex": /\^?.*\$|\^.*\$?/
};
//# sourceMappingURL=apacheconf.js.map
