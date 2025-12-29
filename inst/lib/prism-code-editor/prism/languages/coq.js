import { l as languages } from "../../index-XEj74r-1.js";
import { n as nested, r as re } from "../../shared-Sq5P6lf6.js";
var string = {
  pattern: /"(?:[^"]|"")*"(?!")/g,
  greedy: true
};
var commentSource = nested("\\(\\*(?:[^(*]|\\((?!\\*)|\\*(?!\\))|<self>)*\\*\\)", 2);
languages.coq = {
  "comment": RegExp(commentSource),
  "string": string,
  "attribute": [
    {
      pattern: re('#\\[(?:[^[\\]("]|"(?:[^"]|"")*"(?!")|\\((?!\\*)|<0>)*\\]', [commentSource], "g"),
      greedy: true,
      alias: "attr-name",
      inside: {
        "comment": RegExp(commentSource),
        "string": string,
        "operator": /=/,
        "punctuation": /^#\[|\]$|[(),]/
      }
    },
    {
      pattern: /\b(?:Cumulative|Global|Local|Monomorphic|NonCumulative|Polymorphic|Private|Program)\b/,
      alias: "attr-name"
    }
  ],
  "keyword": /\b(?:Abort|About|Add|Admit|Admitted|All|Arguments|As|Assumptions|Axioms?|Back|BackTo|Backtrace|BinOp|BinOpSpec|BinRel|Bind|Blacklist|Canonical|Case|Cd|Check|Class|Classes|Close|CoFixpoint|CoInductive|Coercions?|Collection|Combined|Compute|Conjectures?|Constants?|Constraint|Constructors|Context|Corollary|Create|CstOp|Custom|Cut|Debug|Declare|Defined|Definition|Delimit|Dependencies|Dependent|Derive|Diffs|Drop|Elimination|End|Entry|Equality|Eval|Example|Existentials?|Existing|Export|Extern|Extraction|Fact|Fail|Field|File|Firstorder|Fixpoint|Flags|Focus|From|Funclass|Function|Functional|GC|Generalizable|Goal|Grab|Grammar|Graph|Guarded|Haskell|Heap|Hide|HintDb|Hints?|Hypothes[ei]s|IF|Identity|Immediate|Implicits?|Import|Include|Induction|Inductive|Infix|Info|Initial|InjTyp|Inline|Inspect|Instances?|Intros?|Inversion|Inversion_clear|JSON|Language|Left|Lemma|Lia|Libraries|Library|Load|LoadPath|Locate|Ltac2?|ML|Match|Method|Minimality|Modules?|Morphism|Next|NoInline|Notation|Number|OCaml|Obligations?|Opaque|Open|Optimize|Parameters?|Parametric|Paths?|Prenex|Preterm|Primitive|Print|Profile|Projections|Proof|S?Prop|PropBinOp|PropU?Op|Property|Proposition|Pwd|Qed|Quit|Rec|Record|Recursive|Redirect|Reduction|Register|Relation|Remark|Remove|Require|Reserved|Reset|Resolve|Restart|Rewrite|Right|Rings?|Saturate|Save|Scheme|Scopes?|Search|SearchHead|SearchPattern|SearchRewrite|Section|Separate|Setoid|Show|Signatures|Solver?|Sort|Sortclass|Sorted|Spec|Step|Strategies|Strategy|String|Structure|SubClass|Subgraph|SuchThat|Tactic|Term|TestCompile|Theorem|Time|Timeout|To|Transparent|Typeclasses|Types?|Typing|UnOp|UnOpSpec|Undelimit|Undo|Unfocus|Unfocused|Unfold|Universes?|Unshelve|Variables?|Variant|Verbose|View|Visibility|Zify|_|apply|as|at|by|cofix|else|end|exists2?|fix|for|forall|fun|if|in|[lLS]et|match|measure|move|removed|return|struct|then|using|wf|where|with)\b/,
  "number": /\b(?:0x[a-f\d][a-f\d_]*(?:\.[a-f\d_]+)?(?:p[+-]?\d[\d_]*)?|\d[\d_]*(?:\.[\d_]+)?(?:e[+-]?\d[\d_]*)?)\b/i,
  "punct": {
    pattern: /@\{|\{\||\[=|:>/,
    alias: "punctuation"
  },
  "operator": /\/\\|\\\/|\.{2,3}|::?=|\*\*|[=-]>|<->?|<<:|<[+:=<>]|>=|>->|\|[-|]|[?@~'%&|^!=<>/*+-]/,
  "punctuation": /\.\(|`[({]|@\{|\{\||\[=|:>|[()[\]{}.,:;]/
};
//# sourceMappingURL=coq.js.map
