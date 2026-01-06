// This build script must be executed from the root repo directory via
// ```
// yarn build
// ```

import { build } from "./_build";
import type { BuildOptions } from "esbuild";
import { copyFileSync } from "fs";

const opts: BuildOptions = {
  target: ["es6"],
  bundle: true,
  sourcemap: true,
  minify: true,
  external: ["bootstrap"],
};

for (const minified of [true, false]) {
  build({
    ...opts,
    entryPoints: ["srcts/src/components/index.ts"],
    outfile: `inst/components/dist/components${minified ? ".min" : ""}.js`,
    minify: minified,
  });

  build({
    ...opts,
    entryPoints: ["srcts/src/components/webcomponents/index.ts"],
    outfile: `inst/components/dist/web-components${minified ? ".min" : ""}.js`,
    minify: minified,
  });

  // Code editor bundle (separate from main components for lazy loading).
  // Uses ESM format because codeEditor.ts dynamically imports prism-code-editor
  // modules at runtime for language grammars and themes. This keeps the main
  // bslib bundle small while loading editor features on-demand.
  // See codeEditor.ts header comment for related tsconfig requirements.
  build({
    ...opts,
    entryPoints: ["srcts/src/components/codeEditor.ts"],
    outfile: `inst/components/dist/code-editor${minified ? ".min" : ""}.js`,
    minify: minified,
    format: "esm",
  });
}

// Copy code editor CSS to dist
copyFileSync(
  "srcts/src/components/codeEditor.css",
  "inst/components/dist/code-editor.css"
);
console.log("√ -", "code-editor.css", "-", new Date().toJSON());
