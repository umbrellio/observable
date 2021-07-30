import { babel } from "@rollup/plugin-babel"
import { nodeResolve } from "@rollup/plugin-node-resolve"

const shared = {
  input: "src/index.js",
  external: ["react"],
  plugins: [
    nodeResolve({
      moduleDirectories: ["node_modules"],
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
  ],
}

const config = [
  ({ ...shared,
    ...{
      output: {
        file: "dist/observable.cjs.js",
        format: "cjs",
      },
    } }),
  ({ ...shared,
    ...{
      output: {
        file: "dist/observable.es.js",
        format: "es",
      },
    } }),
  ({ ...shared,
    ...{
      output: {
        file: "dist/observable.iife.js",
        format: "iife",
        name: "T",
      },
    } }),
]

export default config
