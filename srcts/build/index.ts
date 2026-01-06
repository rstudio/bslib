// This build script must be executed from the root repo directory via
// ```
// yarn build
// ```

import { build } from "./_build";
import type { BuildOptions, Plugin } from "esbuild";
import { copyFileSync, readFileSync } from "fs";

const opts: BuildOptions = {
  target: ["es6"],
  bundle: true,
  sourcemap: true,
  minify: true,
  external: ["bootstrap"],
};

// Plugin to copy CSS file on every build and watch for changes
function copyCssPlugin(source: string, dest: string): Plugin {
  return {
    name: "copy-css",
    setup(build) {
      // Resolve a virtual module to watch the CSS file
      build.onResolve({ filter: /^watch-css$/ }, () => ({
        path: source,
        namespace: "watch-css",
      }));

      // Load the CSS file so it's part of the dependency graph
      build.onLoad({ filter: /.*/, namespace: "watch-css" }, () => ({
        contents: "",
        loader: "js",
        watchFiles: [source],
      }));

      build.onEnd(() => {
        copyFileSync(source, dest);
        console.log("√ -", "code-editor.css", "-", new Date().toJSON());
      });
    },
  };
}

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
    inject: ["watch-css"],
    plugins: [
      copyCssPlugin(
        "srcts/src/components/codeEditor.css",
        "inst/components/dist/code-editor.css"
      ),
    ],
  });
}
