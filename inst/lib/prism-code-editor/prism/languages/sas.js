import { l as languages, r as rest } from "../../index-XEj74r-1.js";
import { r as re } from "../../shared-Sq5P6lf6.js";
var stringPattern = `(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!'))`;
var number = /\b(?:\d[a-f\d]*x|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i;
var numericConstant = {
  pattern: RegExp(stringPattern + "[bx]"),
  alias: "number"
};
var macroVariable = /&[a-z_]\w*/i;
var macroKeyword = {
  pattern: /(^|[\s=(])%(?:abort|by|cms|copy|display|do|else|end|eval|global|goto|go|if|inc|include|index|input|length|let|list|local|put|q?ktrim|q?scan|q?substr|q?sysfunc|q?upcase|return|run|superq|symdel|symexist|symglobl|symlocal|syscall|sysevalf|sysexec|sysget|sysrput|then|ts?o|unquote|until|while|window)\b/i,
  lookbehind: true,
  alias: "keyword"
};
var step = {
  pattern: /(^|\s)(?:proc\s+\w+|data(?!=)|quit|run)\b/i,
  alias: "keyword",
  lookbehind: true
};
var comment = {
  pattern: /\/\*[^]*?\*\/|(^[ 	]*|;\s*)\*[^;]*;/m,
  lookbehind: true
};
var string = {
  pattern: RegExp(stringPattern, "g"),
  greedy: true
};
var punctuation = /[$%@()[\]{}.,;\\]/;
var func = {
  pattern: /%?\b\w+(?=\()/,
  alias: "keyword"
};
var argValue = {
  pattern: /(=\s*)[a-z\.]+/i,
  lookbehind: true
};
var arg = {
  pattern: /[a-z]+/i,
  alias: "keyword"
};
var args = {
  "function": func,
  "arg-value": argValue,
  "operator": /=/,
  "macro-variable": macroVariable,
  "arg": arg,
  "number": number,
  "numeric-constant": numericConstant,
  "punctuation": punctuation,
  "string": string
};
var format = {
  pattern: /\b(?:format|put)\b=?[\w'$.]+/i,
  inside: {
    "keyword": /^(?:format|put)(?==)/i,
    "equals": /=/,
    "format": {
      pattern: /(?:\w|\$\d)+\.\d?/,
      alias: "number"
    }
  }
};
var altformat = {
  pattern: /\b(?:format|put)\s+[\w']+(?:\s+[$.\w]+)+(?=;)/i,
  inside: {
    "keyword": /^(?:format|put)/i,
    "format": {
      pattern: /[$\w]+\.\d?/,
      alias: "number"
    }
  }
};
var globalStatements = {
  pattern: /((?:^|\s)=?)(?:catname|checkpoint execute_always|dm|endsas|filename|footnote|%include|libname|%list|lock|missing|options|page|resetline|%run|sasfile|skip|sysecho|title\d?)\b/i,
  lookbehind: true,
  alias: "keyword"
};
var submitStatement = {
  pattern: /(^|\s)(?:submit(?:\s+(?:load|norun|parseonly))?|endsubmit)\b/i,
  lookbehind: true,
  alias: "keyword"
};
var actionSets = "astore|accesscontrol|aggregation|audio|autotune|bayesiannetclassifier|biomedimage|boolrule|builtins|cardinality|cdm|clustering|conditionalrandomfields|configuration|copula|countreg|datadiscovery|datapreprocess|datasciencepilot|datastep|decisiontree|deduplication|deeplearn|deepneural|deeprnn|ds2|ecm|entityres|espcluster|explainmodel|factmac|fastknn|fcmpact|fedsql|freqtab|gvarcluster|gam|gleam|graphsemisuplearn|hiddenmarkovmodel|hypergroup|[ip]ca|image|iml|kernalpca|langmodel|ldatopic|loadstreams|mbc|mixed|mltools|modelpublishing|network|neuralnet|nmf|nonparametricbayes|nonlinear|optnetwork|optimization|panel|percentile|phreg|pls|qkb|qlim|quantreg|recommend|regression|reinforcementlearn|robustpca|rulemining|sampling|sandwich|sccasl|search(?:analytics)?|sentimentanalysis|sequence|session(?:prop)?|severity|simsystem|simple|smartdata|sparkembeddedprocess|sparseml|spatialreg|spc|stabilitymonitoring|svdatadescription|svm|table|text(?:filters|frequency|mining|parse|rule(?:develop|score)|topic|util)|timedata|transpose|tsinfo|tsreconcile|unitimeseries|varreduce";
var casActions = {
  pattern: re("(^|\\s)(?:action\\s+)?<0>\\.[a-z]+\\b[^;]+", [actionSets], "i"),
  lookbehind: true,
  inside: {
    "keyword": re("<0>\\.[a-z]+\\b", [actionSets], "i"),
    "action": {
      pattern: /(?:action)/i,
      alias: "keyword"
    },
    "comment": comment,
    "function": func,
    "arg-value": argValue,
    "operator": /=/,
    "argument": arg,
    "number": number,
    "numeric-constant": numericConstant,
    "punctuation": punctuation,
    "string": string
  }
};
var keywords = {
  pattern: /((?:^|\s)=?)(?:after|analysis|and|array|barchart|barwidth|begingraph|by|call|cas|cbarline|cfill|class|classlev|close|column|computed?|contains|continue|data(?==)|define|delete|describe|document|do\s+over|dol?|drop|dul|else|end(?:comp|source)?|entrytitle|evaluate|eval|execute|exec|exit|filename|fillattrs|fil[el]|flist|fnc|functionlist|function|global|goto|groupby|group|headline|headskip|histogram|if|infile|keep|keylabel|keyword|label|layout|leave|legendlabel|length|libname|loadactionset|merge|midpoints|_?null_|name|noobs|nowd|ods|options|or|otherwise|output|[op]ut|overlay|over|plot|print|raise|ranexp|rannor|rbreak|retain|return|select|session|sessref|set|source|statgraph|sum|summarize|table|temp|terminate|then\s+do|[tw]hen|title\d?|to|var|where|xaxisopts|y2?axisopts)\b/i,
  lookbehind: true
};
languages.sas = {
  "datalines": {
    pattern: /^([ 	]*)(?:cards|(?:data)?lines);[^]+?^[ 	]*;/im,
    lookbehind: true,
    alias: "string",
    inside: {
      "keyword": /^(?:cards|(?:data)?lines)/i,
      "punctuation": /;/
    }
  },
  "proc-sql": {
    pattern: /(^proc\s+(?:fed)?sql(?:\s+[\w|=]+)?;)[^]+?(?=^(?:proc\s+\w+|data|quit|run);|(?![^]))/im,
    lookbehind: true,
    inside: {
      "sql": {
        pattern: re(`^[ 	]*(?:select|alter\\s+table|(?:create|describe|drop)\\s+(?:index|table(?:\\s+constraints)?|view)|create\\s+unique\\s+index|insert\\s+into|update)(?:<0>|[^;"'])+;`, [stringPattern], "im"),
        alias: "language-sql",
        inside: "sql"
      },
      "global-statements": globalStatements,
      "sql-statements": {
        pattern: /(^|\s)(?:disconnect\s+from|begin|commit|exec(?:ute)?|reset|rollback|validate)\b/i,
        lookbehind: true,
        alias: "keyword"
      },
      "number": number,
      "numeric-constant": numericConstant,
      "punctuation": punctuation,
      "string": string
    }
  },
  "proc-groovy": {
    pattern: /(^proc\s+groovy(?:\s+[\w|=]+)?;)[^]+?(?=^(?:proc\s+\w+|data|quit|run);|(?![^]))/im,
    lookbehind: true,
    inside: {
      "comment": comment,
      "groovy": {
        pattern: re(`(^[ 	]*submit(?:\\s+(?:load|norun|parseonly))?)(?:<0>|[^"'])+?(?=endsubmit;)`, [stringPattern], "im"),
        lookbehind: true,
        alias: "language-groovy",
        inside: "groovy"
      },
      "keyword": keywords,
      "submit-statement": submitStatement,
      "global-statements": globalStatements,
      "number": number,
      "numeric-constant": numericConstant,
      "punctuation": punctuation,
      "string": string
    }
  },
  "proc-lua": {
    pattern: /(^proc\s+lua(?:\s+[\w|=]+)?;)[^]+?(?=^(?:proc\s+\w+|data|quit|run);|(?![^]))/im,
    lookbehind: true,
    inside: {
      "comment": comment,
      "lua": {
        pattern: re(`(^[ 	]*submit(?:\\s+(?:load|norun|parseonly))?)(?:<0>|[^"'])+?(?=endsubmit;)`, [stringPattern], "im"),
        lookbehind: true,
        alias: "language-lua",
        inside: "lua"
      },
      "keyword": keywords,
      "submit-statement": submitStatement,
      "global-statements": globalStatements,
      "number": number,
      "numeric-constant": numericConstant,
      "punctuation": punctuation,
      "string": string
    }
  },
  "proc-cas": {
    pattern: /(^proc\s+cas(?:\s+[\w|=]+)?;)[^]+?(?=^(?:proc\s+\w+|quit|data);|(?![^]))/im,
    lookbehind: true,
    inside: {
      "comment": comment,
      "statement-var": {
        pattern: /((?:^|\s)=?)saveresult\s[^;]+/im,
        lookbehind: true,
        inside: {
          "statement": {
            pattern: /^saveresult\s+\S+/i,
            inside: {
              keyword: /^(?:saveresult)/i
            }
          },
          [rest]: args
        }
      },
      "cas-actions": casActions,
      "statement": {
        pattern: /((?:^|\s)=?)(?:default|(?:un)?set|on|output|upload)[^;]+/im,
        lookbehind: true,
        inside: args
      },
      "step": step,
      "keyword": keywords,
      "function": func,
      "format": format,
      "altformat": altformat,
      "global-statements": globalStatements,
      "number": number,
      "numeric-constant": numericConstant,
      "punctuation": punctuation,
      "string": string
    }
  },
  "proc-args": {
    pattern: re(`(^proc\\s+\\w+\\s+)(?!\\s)(?:[^;"']|<0>)+;`, [stringPattern], "im"),
    lookbehind: true,
    inside: args
  },
  /*Special keywords within macros*/
  "macro-keyword": macroKeyword,
  "macro-variable": macroVariable,
  "macro-string-functions": {
    pattern: /(^|\s|=)%(?:nr)?(?:b?quote|str)\(.*?(?:[^%]\))/i,
    lookbehind: true,
    inside: {
      "function": {
        pattern: /^[^(]+/,
        alias: "keyword"
      },
      "macro-keyword": macroKeyword,
      "macro-variable": macroVariable,
      "escaped-char": /%["'()<>=¬^~;,#]/,
      "punctuation": punctuation
    }
  },
  "macro-declaration": {
    pattern: /^%macro[^;]+(?=;)/im,
    inside: {
      "keyword": /%macro/i
    }
  },
  "macro-end": {
    pattern: /^%mend[^;]+(?=;)/im,
    inside: {
      "keyword": /%mend/i
    }
  },
  /*%_zscore(headcir, _lhc, _mhc, _shc, headcz, headcpct, _Fheadcz); */
  "macro": {
    pattern: /%_\w+(?=\()/,
    alias: "keyword"
  },
  "input": {
    pattern: /\binput\s[-\w\s/*.$&]+;/i,
    inside: {
      "input": {
        alias: "keyword",
        pattern: /^input/i
      },
      "comment": comment,
      "number": number,
      "numeric-constant": numericConstant
    }
  },
  "options-args": {
    pattern: /(^options)[()"'|:\\\w\s=<>/*+-]+(?=;)/im,
    lookbehind: true,
    inside: args
  },
  "cas-actions": casActions,
  "comment": comment,
  "function": func,
  "format": format,
  "altformat": altformat,
  "numeric-constant": numericConstant,
  "datetime": {
    // '1jan2013'd, '9:25:19pm't, '18jan2003:9:27:05am'dt
    pattern: RegExp(stringPattern + "(?:dt?|t)"),
    alias: "number"
  },
  "string": string,
  "step": step,
  "keyword": keywords,
  // In SAS Studio syntax highlighting, these operators are styled like keywords
  "operator-keyword": {
    pattern: /\b(?:eq|[gl][et]|in|ne|not)\b/i,
    alias: "operator"
  },
  // Decimal (1.2e23), hexadecimal (0c1x)
  "number": number,
  "operator": /\*\*?|\|\|?|!!?|¦¦?|<>|><|[&=/+-]|[~¬^<>]=?/,
  "punctuation": punctuation
};
//# sourceMappingURL=sas.js.map
