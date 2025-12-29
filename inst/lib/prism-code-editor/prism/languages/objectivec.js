import { l as languages } from "../../index-XEj74r-1.js";
import { e as extend } from "../../language-DxUX0ITY.js";
import "./c.js";
languages.objc = languages.objectivec = extend("c", {
  "string": {
    pattern: /@?"(?:\\[^]|[^\\\n"])*"/g,
    greedy: true
  },
  "keyword": /\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int?|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
  "operator": /-[->]?|\+\+?|!=?|==?|>>?=?|<<?=?|&&?|\|\|?|[~^@%?/*]/
});
delete languages.objc["class-name"];
//# sourceMappingURL=objectivec.js.map
