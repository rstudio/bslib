import { l as languages } from "../../index-XEj74r-1.js";
languages.log = {
  "string": {
    // Single-quoted strings must not be confused with plain text. E.g. Can't isn't Susan's Chris' toy
    pattern: /"(?:\\.|[^\\\n"])*"|'(?![st] | \w)(?:\\.|[^\\\n'])*'/g,
    greedy: true
  },
  "exception": {
    pattern: /(^|[^\w.])[a-z][\w.]*(?:Error|Exception):.*(?:\n[ 	]*(?:at[ 	].+|\.{3}.*|Caused by:.*))+(?:\n[ 	]*\.{3} .*)?/g,
    lookbehind: true,
    greedy: true,
    alias: "language-javastacktrace",
    inside: languages["javastacktrace"] || {
      "keyword": /\bat\b/,
      "function": /[a-z_][$\w]*(?=\()/,
      "punctuation": /[().:]/
    }
  },
  "level": [
    {
      pattern: /\b(?:ALERT|CRIT|CRITICAL|EMERG|EMERGENCY|ERR|ERROR|FAILURE|FATAL|SEVERE)\b/,
      alias: "error important"
    },
    {
      pattern: /\b(?:WARN|WARNING|WRN)\b/,
      alias: "warning important"
    },
    {
      pattern: /\b(?:DISPLAY|INFO?|NOTICE|STATUS)\b/,
      alias: "info keyword"
    },
    {
      pattern: /\b(?:DBG|DEBUG|FINE)\b/,
      alias: "debug keyword"
    },
    {
      pattern: /\b(?:FINER|FINEST|TRACE|TRC|VERBOSE|VRB)\b/,
      alias: "trace comment"
    }
  ],
  "property": {
    pattern: /((?:^|[\]|])[ 	]*)[a-z_](?:[\w-]|\b\/\b)*(?:[. ]\(?\w(?:[\w-]|\b\/\b)*\)?)*:(?!\S)/im,
    lookbehind: true
  },
  "separator": {
    pattern: /(^|[^-+])-{3,}|={3,}|\*{3,}|- - /m,
    lookbehind: true,
    alias: "comment"
  },
  "url": /\b(?:file|ftp|https?):\/\/[^\s|,;"']*[^\s|,;"'>.]/,
  "email": {
    pattern: /(^|\s)[-\w+.]+@[a-z][a-z\d-]*(?:\.[a-z][a-z\d-]*)+(?!\S)/,
    lookbehind: true,
    alias: "url"
  },
  "ip-address": {
    pattern: /\b(?:\d{1,3}(?:\.\d{1,3}){3})\b/,
    alias: "constant"
  },
  "mac-address": {
    pattern: /\b[a-f\d]{2}(?::[a-f\d]{2}){5}\b/i,
    alias: "constant"
  },
  "domain": {
    pattern: /(^|\s)[a-z][a-z\d-]*(?:\.[a-z][a-z\d-]*)*\.[a-z][a-z\d-]+(?!\S)/,
    lookbehind: true,
    alias: "constant"
  },
  "uuid": {
    pattern: /\b[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}\b/i,
    alias: "constant"
  },
  "hash": {
    pattern: /\b(?:[a-f\d]{32}){1,2}\b/i,
    alias: "constant"
  },
  "file-path": {
    pattern: /\b[a-z]:[\\/][^\s()[\]{},:;|"']+|(^|[\s:[\](>|])\.{0,2}\/\w[^\s()[\]{},:;|"']*/gi,
    lookbehind: true,
    greedy: true,
    alias: "string"
  },
  "date": {
    pattern: /\b\d{4}[-/]\d\d[-/]\d\d(?:t(?=\d\d?:)|(?=\s\d\d?:))|\b\d{1,4}[-/ ](?:\d\d?|apr|aug|dec|feb|jan|jul|jun|mar|may|nov|oct|sep)[-/ ]\d{2,4}t?\b|\b(?:(?:fri|mon|sat|sun|thu|tue|wed)(?:\s\s?(?:apr|aug|dec|feb|jan|jul|jun|mar|may|nov|oct|sep))?|apr|aug|dec|feb|jan|jul|jun|mar|may|nov|oct|sep)\s\s?\d\d?\b/i,
    alias: "number"
  },
  "time": {
    pattern: /\b\d\d?:\d\d?:\d\d?(?:[.,:]\d+)?(?:\s?[+-]\d\d:?\d\d|Z)?\b/,
    alias: "number"
  },
  "boolean": /\b(?:false|true|null)\b/i,
  "number": {
    pattern: /(^|[^.\w])(?:0x[a-f\d]+|0o[0-7]+|0b[01]+|v?\d[a-f\d]*(?:\.\d+)*(?:e[+-]?\d+)?[a-z]{0,3}\b)\b(?!\.\w)/i,
    lookbehind: true
  },
  "operator": /[(){}:;?~@$#%&|^!=<>/*+-]/,
  "punctuation": /[[\].,]/
};
//# sourceMappingURL=log.js.map
