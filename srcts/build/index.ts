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
build({
  ...opts,
  entryPoints: ["srcts/src/components/accordion.ts"],
  outfile: "inst/components/accordion.min.js",
});

build({
  ...opts,
  entryPoints: ["srcts/src/components/sidebar.ts"],
  outfile: "inst/components/sidebar.min.js",
});

build({
  ...opts,
  entryPoints: ["srcts/src/components/card.ts"],
  outfile: "inst/components/card.min.js",
});
