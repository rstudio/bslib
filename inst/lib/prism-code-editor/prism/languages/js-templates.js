import { l as languages, t as tokenize, r as rest } from "../../index-XEj74r-1.js";
import { e as embeddedIn } from "../../templating-CGPRy7qI.js";
import "./javascript.js";
var js = languages.js;
var templateString = js["template-string"];
var templateLiteralPattern = templateString.pattern.source;
var interpolationPattern = templateString.inside.interpolation.pattern;
var createTemplate = (language, tag) => ({
  pattern: RegExp("((?:" + tag + ")\\s*)" + templateLiteralPattern, "g"),
  lookbehind: true,
  greedy: true,
  inside: {
    "template-punctuation": {
      pattern: /^`|`$/,
      alias: "string"
    },
    ["language-" + language]: {
      pattern: /[^]+/,
      inside: {
        "interpolation": {
          pattern: interpolationPattern,
          lookbehind: true,
          alias: "language-javascript",
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            [rest]: "js"
          }
        },
        [tokenize]: embeddedIn(language)
      }
    }
  }
});
js["template-string"] = [
  // styled-jsx:
  //   css`a { color: #25F; }`
  // styled-components:
  //   styled.h1`color: red;`
  createTemplate("css", "\\b(?:styled(?:\\([^)]*\\))?(?:\\s*\\.\\s*\\w+(?:\\([^)]*\\))*)*|css(?:\\s*\\.\\s*(?:global|resolve))?|createGlobalStyle|keyframes)"),
  // html`<p></p>`
  // div.innerHTML = `<p></p>`
  createTemplate("html", "\\bhtml|\\.\\s*(?:inner|outer)HTML\\s*\\+?="),
  // svg`<path fill="#fff" d="M55.37 ..."/>`
  createTemplate("svg", "\\bsvg"),
  // md`# h1`, markdown`## h2`
  createTemplate("markdown", "\\b(?:markdown|md)"),
  // gql`...`, graphql`...`, graphql.experimental`...`
  createTemplate("graphql", "\\b(?:gql|graphql(?:\\s*\\.\\s*experimental)?)"),
  // sql`...`
  createTemplate("sql", "\\bsql"),
  // vanilla template string
  templateString
];
//# sourceMappingURL=js-templates.js.map
