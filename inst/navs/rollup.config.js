// Include import dependencies in the final bundle
import { nodeResolve } from '@rollup/plugin-node-resolve';
// Transpile JSX to JS
import { babel } from '@rollup/plugin-babel';
// Resolve any require()s within the dependencies
import cjsResolve from '@rollup/plugin-commonjs';
// https://github.com/rollup/rollup/issues/487#issuecomment-177596512
import replace from '@rollup/plugin-replace';

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
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
    babel({ babelHelpers: 'bundled' }),
    cjsResolve()
  ]
}
