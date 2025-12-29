import { l as languages } from "../../index-XEj74r-1.js";
import { e as extend, i as insertBefore } from "../../language-DxUX0ITY.js";
import { n as nested, a as replace, r as re } from "../../shared-Sq5P6lf6.js";
import "./clike.js";
var keywordsToPattern = (words) => `\\b(?:${words})\\b`;
var typeKeyword = "bool|char|decimal|double|dynamic|float|object|s?byte|string|u?int|u?long|u?short|var|void";
var typeDeclarationKeyword = "class|enum|interface|record|struct";
var contextualKeyword = "add|alias|and|ascending|async|await|by|descending|from(?!\\s*[^\\s\\w])|[gls]et|global|group|into|init(?=\\s*;)|join|nameof|not|notnull|on|or|orderby|partial|remove|select|unmanaged|value|when|where|with(?=\\s*{)";
var otherKeyword = "abstract|as|[bc]ase|break|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|i[fns]|implicit|internal|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield";
var typeDeclarationKeywords = keywordsToPattern(typeDeclarationKeyword);
var keywords = RegExp(keywordsToPattern(typeKeyword + "|" + typeDeclarationKeyword + "|" + contextualKeyword + "|" + otherKeyword));
var nonTypeKeywords = keywordsToPattern(typeDeclarationKeyword + "|" + contextualKeyword + "|" + otherKeyword);
var nonContextualKeywords = keywordsToPattern(typeKeyword + "|" + typeDeclarationKeyword + "|" + otherKeyword);
var generic = nested("<(?:[^<>;=*/%&|^+-]|<self>)*>", 2);
var nestedRound = nested("\\((?:[^()]|<self>)*\\)", 2);
var name = "@?\\b(?!\\d)\\w+\\b";
var genericName = replace("<0>(?:\\s*<1>)?", [name, generic]);
var identifier = replace("(?!<0>)<1>(?:\\s*\\.\\s*<1>)*", [nonTypeKeywords, genericName]);
var array = "\\[\\s*(?:,\\s*)*\\]";
var typeExpressionWithoutTuple = replace("<0>(?:\\s*(?:\\?\\s*)?<1>)*(?:\\s*\\?)?", [identifier, array]);
var tupleElement = replace("[^()[\\],;%&|^=<>/*+-]|<0>|<1>|<2>", [generic, nestedRound, array]);
var tuple = replace("\\(<0>+(?:,<0>+)+\\)", [tupleElement]);
var typeExpression = replace("(?:<0>|<1>)(?:\\s*(?:\\?\\s*)?<2>)*(?:\\s*\\?)?", [tuple, identifier, array]);
var typeInside = {
  "keyword": keywords,
  "punctuation": /[()[\].,:<>?]/
};
var character = "'(?:\\\\.|[^\n'\\\\]|\\\\[Uux][a-fA-F\\d]{1,8})'";
var regularString = '"(?:\\\\.|[^\\\\\n"])*"';
var verbatimString = '@"(?:""|\\\\[\\s\\S]|[^\\\\"])*"(?!")';
var cs = languages.dotnet = languages.cs = languages.csharp = extend("clike", {
  "string": [
    {
      pattern: re("(^|[^$\\\\])<0>", [verbatimString], "g"),
      lookbehind: true,
      greedy: true
    },
    {
      pattern: re("(^|[^@$\\\\])<0>", [regularString], "g"),
      lookbehind: true,
      greedy: true
    }
  ],
  "class-name": [
    {
      // Using static
      // using static System.Math;
      pattern: re("(\\busing\\s+static\\s+)<0>(?=\\s*;)", [identifier]),
      lookbehind: true,
      inside: typeInside
    },
    {
      // Using alias (type)
      // using Project = PC.MyCompany.Project;
      pattern: re("(\\busing\\s+<0>\\s*=\\s*)<1>(?=\\s*;)", [name, typeExpression]),
      lookbehind: true,
      inside: typeInside
    },
    {
      // Using alias (alias)
      // using Project = PC.MyCompany.Project;
      pattern: re("(\\busing\\s+)<0>(?=\\s*=)", [name]),
      lookbehind: true
    },
    {
      // Type declarations
      // class Foo<A, B>
      // interface Foo<out A, B>
      pattern: re("(\\b<0>\\s+)<1>", [typeDeclarationKeywords, genericName]),
      lookbehind: true,
      inside: typeInside
    },
    {
      // Single catch exception declaration
      // catch(Foo)
      // (things like catch(Foo e) is covered by variable declaration)
      pattern: re("(\\bcatch\\s*\\(\\s*)<0>", [identifier]),
      lookbehind: true,
      inside: typeInside
    },
    {
      // Name of the type parameter of generic constraints
      // where Foo : class
      pattern: re("(\\bwhere\\s+)<0>", [name]),
      lookbehind: true
    },
    {
      // Casts and checks via as and is.
      // as Foo<A>, is Bar<B>
      // (things like if(a is Foo b) is covered by variable declaration)
      pattern: re("(\\b(?:is(?:\\s+not)?|as)\\s+)<0>", [typeExpressionWithoutTuple]),
      lookbehind: true,
      inside: typeInside
    },
    {
      // Variable, field and parameter declaration
      // (Foo bar, Bar baz, Foo[,,] bay, Foo<Bar, FooBar<Bar>> bax)
      pattern: re("\\b<0>(?=\\s+(?!<1>|with\\s*\\{)<2>(?:\\s*[=,:;{)\\]]|\\s+(?:in|when)\\b))", [typeExpression, nonContextualKeywords, name]),
      inside: typeInside
    }
  ],
  "keyword": keywords,
  // https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/lexical-structure#literals
  "number": /(?:\b0(?:x[a-f\d_]*[a-f\d]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[+-]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
  "operator": /[=-]>|([&|+-])\1|~|\?\?=?|>>=?|<<=?|[%&|^!=<>/*+-]=?/,
  "punctuation": /\?\.?|::|[()[\]{}.,:;]/
});
insertBefore(cs, "number", {
  "range": {
    pattern: /\.\./,
    alias: "operator"
  }
});
insertBefore(cs, "punctuation", {
  "named-parameter": {
    pattern: re("([(,]\\s*)<0>(?=\\s*:)", [name]),
    lookbehind: true,
    alias: "punctuation"
  }
});
insertBefore(cs, "class-name", {
  "namespace": {
    // namespace Foo.Bar {}
    // using Foo.Bar;
    pattern: re("(\\b(?:namespace|using)\\s+)<0>(?:\\s*\\.\\s*<0>)*(?=\\s*[;{])", [name]),
    lookbehind: true,
    inside: {
      "punctuation": /\./
    }
  },
  "type-expression": {
    // default(Foo), typeof(Foo<Bar>), sizeof(int)
    pattern: re("(\\b(?:default|sizeof|typeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<0>)+(?=\\s*\\))", [nestedRound]),
    lookbehind: true,
    alias: "class-name",
    inside: typeInside
  },
  "return-type": {
    // Foo<Bar> ForBar(); Foo IFoo.Bar() => 0
    // int this[int index] => 0; T IReadOnlyList<T>.this[int index] => this[index];
    // int Foo => 0; int Foo { get; set } = 0;
    pattern: re("<0>(?=\\s+(?:<1>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))", [typeExpression, identifier]),
    alias: "class-name",
    inside: typeInside
  },
  "constructor-invocation": {
    // new List<Foo<Bar[]>> { }
    pattern: re("(\\bnew\\s+)<0>(?=\\s*[[({])", [typeExpression]),
    lookbehind: true,
    alias: "class-name",
    inside: typeInside
  },
  /*'explicit-implementation': {
  	// int IFoo<Foo>.Bar => 0; void IFoo<Foo<Foo>>.Foo<T>();
  	pattern: replace(/\b<0>(?=\.<1>)/, className, methodOrPropertyDeclaration),
  	inside: classNameInside,
  	alias: 'class-name'
  },*/
  "generic-method": {
    // foo<Bar>()
    pattern: re("<0>\\s*<1>(?=\\s*\\()", [name, generic]),
    inside: {
      "function": re("^<0>", [name]),
      "generic": {
        pattern: RegExp(generic),
        alias: "class-name",
        inside: typeInside
      }
    }
  },
  "type-list": {
    // The list of types inherited or of generic constraints
    // class Foo<F> : Bar, IList<FooBar>
    // where F : Bar, IList<int>
    pattern: re(
      "\\b((?:<0>\\s+<1>|record\\s+<1>\\s*<5>|where\\s+<2>)\\s*:\\s*)(?:<3>|<4>|<1>\\s*<5>|<6>)(?:\\s*,\\s*(?:<3>|<4>|<6>))*(?=\\s*(?:where|[{;]|=>|$))",
      [typeDeclarationKeywords, genericName, name, typeExpression, keywords.source, nestedRound, "\\bnew\\s*\\(\\s*\\)"]
    ),
    lookbehind: true,
    inside: {
      "record-arguments": {
        pattern: re("(^(?!new\\s*\\()<0>\\s*)<1>", [genericName, nestedRound], "g"),
        lookbehind: true,
        greedy: true,
        inside: cs
      },
      "keyword": keywords,
      "class-name": {
        pattern: RegExp(typeExpression, "g"),
        greedy: true,
        inside: typeInside
      },
      "punctuation": /[(),]/
    }
  },
  "preprocessor": {
    pattern: /(^[ 	]*)#.*/m,
    lookbehind: true,
    alias: "property",
    inside: {
      // highlight preprocessor directives as keywords
      "directive": {
        pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
        lookbehind: true,
        alias: "keyword"
      }
    }
  }
});
var regularStringOrCharacter = regularString + "|" + character;
var regularStringCharacterOrComment = replace("/(?![*/])|//[^\n]*\n|/\\*(?:[^*]|\\*(?!/))*\\*/|<0>", [regularStringOrCharacter]);
var roundExpression = nested(replace(`[^()"'/]|<0>|\\(<self>*\\)`, [regularStringCharacterOrComment]), 2);
var attrTarget = "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b";
var attr = replace("<0>(?:\\s*\\(<1>*\\))?", [identifier, roundExpression]);
var formatString = ":[^\n}]+";
var mInterpolationRound = nested(replace(`[^()"'/]|<0>|\\(<self>*\\)`, [regularStringCharacterOrComment]), 2);
var mInterpolation = replace("\\{(?!\\{)(?:(?![}:])<0>)*<1>?\\}", [mInterpolationRound, formatString]);
var sInterpolationRound = nested(replace(`[^()"'/]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<0>|\\(<self>*\\)`, [regularStringOrCharacter]), 2);
var sInterpolation = replace("\\{(?!\\{)(?:(?![}:])<0>)*<1>?\\}", [sInterpolationRound, formatString]);
var createInterpolationInside = (interpolation, interpolationRound) => ({
  "interpolation": {
    pattern: re("((?:^|[^{])(?:\\{\\{)*)<0>", [interpolation]),
    lookbehind: true,
    inside: {
      "format-string": {
        pattern: re("(^\\{(?:(?![}:])<0>)*)<1>(?=\\}$)", [interpolationRound, formatString]),
        lookbehind: true,
        inside: {
          "punctuation": /^:/
        }
      },
      "punctuation": /^\{|\}$/,
      "expression": {
        pattern: /[^]+/,
        alias: "language-csharp",
        inside: cs
      }
    }
  },
  "string": /[^]+/
});
insertBefore(cs, "class-name", {
  "attribute": {
    // Attributes
    // [Foo], [Foo(1), Bar(2, Prop = "foo")], [return: Foo(1), Bar(2)], [assembly: Foo(Bar)]
    pattern: re("((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<0>\\s*:\\s*)?<1>(?:\\s*,\\s*<1>)*(?=\\s*\\])", [attrTarget, attr], "g"),
    lookbehind: true,
    greedy: true,
    inside: {
      "target": {
        pattern: re("^<0>(?=\\s*:)", [attrTarget]),
        alias: "keyword"
      },
      "attribute-arguments": {
        pattern: re("\\(<0>*\\)", [roundExpression]),
        inside: cs
      },
      "class-name": {
        pattern: RegExp(identifier),
        inside: {
          "punctuation": /\./
        }
      },
      "punctuation": /[,:]/
    }
  }
});
insertBefore(cs, "string", {
  "interpolation-string": [
    {
      pattern: re('(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[\\s\\S]|\\{\\{|<0>|[^\\\\{"])*"', [mInterpolation], "g"),
      lookbehind: true,
      greedy: true,
      inside: createInterpolationInside(mInterpolation, mInterpolationRound)
    },
    {
      pattern: re('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<0>|[^\\\\"{])*"', [sInterpolation], "g"),
      lookbehind: true,
      greedy: true,
      inside: createInterpolationInside(sInterpolation, sInterpolationRound)
    }
  ],
  "char": {
    pattern: RegExp(character, "g"),
    greedy: true
  }
});
//# sourceMappingURL=csharp.js.map
