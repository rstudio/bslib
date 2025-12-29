import { l as languages } from "../../index-XEj74r-1.js";
languages.url = languages.uri = {
  "scheme": {
    pattern: /^[a-z][a-z\d+.-]*:/img,
    greedy: true,
    inside: {
      "scheme-delimiter": /:$/
    }
  },
  "fragment": {
    pattern: /#[\w.~!$&'()*,;=%:@/?+-]*/,
    inside: {
      "fragment-delimiter": /^#/
    }
  },
  "query": {
    pattern: /\?[\w.~!$&'()*,;=%:@/?+-]*/,
    inside: {
      "query-delimiter": {
        pattern: /^\?/g,
        greedy: true
      },
      "pair-delimiter": /[&;]/,
      "pair": {
        pattern: /^[^=][^]*/,
        inside: {
          "key": /^[^=]+/,
          "value": {
            pattern: /(^=)[^]+/,
            lookbehind: true
          }
        }
      }
    }
  },
  "authority": {
    pattern: /^\/\/(?:[\w.~!$&'()*,;=%:+-]*@)?(?:\[(?:[a-fA-F\d:.]{2,48}|v[a-fA-F\d]+\.[\w.~!$&'()*,;=+-]+)\]|[\w.~!$&'()*,;=%+-]*)(?::\d*)?/m,
    inside: {
      "authority-delimiter": /^\/\//,
      "user-info-segment": {
        pattern: /^[\w.~!$&'()*,;=%:+-]*@/,
        inside: {
          "user-info-delimiter": /@$/,
          "user-info": /^[\w.~!$&'()*,;=%:+-]+/
        }
      },
      "port-segment": {
        pattern: /:\d*$/,
        inside: {
          "port-delimiter": /^:/,
          "port": /^\d+/
        }
      },
      "host": {
        pattern: /[^]+/,
        inside: {
          "ip-literal": {
            pattern: /^\[[^]+\]$/,
            inside: {
              "ip-literal-delimiter": /^\[|\]$/,
              "ipv-future": /^v[^]+/,
              "ipv6-address": /^[^]+/
            }
          },
          "ipv4-address": /^(?:(?:[03-9]\d?|[12]\d{0,2})\.){3}(?:[03-9]\d?|[12]\d{0,2})$/
        }
      }
    }
  },
  "path": {
    pattern: /^[\w.~!$&'()*,;=%:@/+-]+/m,
    inside: {
      "path-separator": /\//
    }
  }
};
//# sourceMappingURL=uri.js.map
