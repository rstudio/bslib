import type {
  BuildFailure,
  BuildIncremental,
  BuildOptions,
  BuildResult,
  WatchMode,
} from "esbuild";
import { build as esbuildBuild } from "esbuild";

import process from "process";
import { basename } from "path";

async function build(
  opts: BuildOptions
): Promise<BuildIncremental | BuildResult> {
  const outFileNames = opts.outfile
    ? [basename(opts.outfile)]
    : (opts.entryPoints as string[]).map((entry) => basename(entry));

  const onRebuild = function (error: BuildFailure | null) {
    if (error) {
      console.error(outFileNames.join(", "), "watch build failed:\n", error);
    } else {
      outFileNames.map(x => {
        console.log("√ -", x, "-", new Date().toJSON());
      });
    }
    return;
  };

  let incremental = false;
  let watch: WatchMode | false = false;

  if (process.argv.length >= 3 && process.argv[2] == "--watch") {
    incremental = true;
    watch = {
      onRebuild: onRebuild,
    };
  }

  outFileNames.map(x => console.log("Building " + x));
  return esbuildBuild({
    incremental: incremental,
    watch: watch,
    target: "es5",
    preserveSymlinks: true,
    ...opts,
  }).then((x) => {
    onRebuild(null);
    return x;
  });
}

export { build };
