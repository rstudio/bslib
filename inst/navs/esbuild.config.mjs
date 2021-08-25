  
import {
  build as esbuildBuild,
} from "esbuild";
import process from "process";
import babelPlugin from "esbuild-plugin-babel";

async function build(opts) {

  const onRebuild = function (error) {
    if (error) {
      console.error("watch build failed:\n", error);
    } else {
      console.log("√ -", new Date().toJSON());
    }
    return;
  };

  let incremental = false;
  let watch = false;

  if (process.argv.length >= 3 && process.argv[2] == "--watch") {
    incremental = true;
    watch = {
      onRebuild: onRebuild,
    };
  }

  return esbuildBuild({
    incremental: incremental,
    watch: watch,
    //target: "es5",
    ...opts,
  }).then((x) => {
    onRebuild();
    return x;
  });
}

build({
  entryPoints: ["src/index.js"],
  bundle: true,
  sourcemap: "inline",
  plugins: [
    babelPlugin()
  ],
  outfile: "dist/navs.min.js",
  minify: true,
});
