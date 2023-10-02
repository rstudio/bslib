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
}
