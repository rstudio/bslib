// This build script must be executed from the root repo directory via
// ```
// yarn build
// ```

import { build } from "./_build";
import type { BuildOptions } from "esbuild";

const opts: BuildOptions = {
  target: ["es6"],
  bundle: true,
  sourcemap: true,
  minify: true,
  external: ["bootstrap"],
};

// TODO: build all components?
const components = ["accordion", "sidebar", "card"];

for (const component of components) {
  for (const minified of [true, false]) {
    build({
      ...opts,
      entryPoints: [`srcts/src/components/${component}.ts`],
      outfile: `inst/components/dist/${component}/${component}${
        minified ? ".min" : ""
      }.js`,
      minify: minified,
      sourcemap: !minified,
    });
  }
}
