// Include import dependencies in the final bundle
import { nodeResolve } from '@rollup/plugin-node-resolve';
// Transpile JSX to JS
import { babel } from '@rollup/plugin-babel';
// Resolve any require()s within the dependencies
import cjsResolve from '@rollup/plugin-commonjs';
 
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/navs.min.js',
    format: 'umd',
    name: "bslib",
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }),
    cjsResolve()
  ]
}
