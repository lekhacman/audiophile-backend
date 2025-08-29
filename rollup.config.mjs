import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "src/main.js",
  output: {
    file: "dist/bundle.min.js",
    format: "cjs",
  },
  watch: {
    clearScreen: true,
    include: "src/**",
  },
  plugins: [nodeResolve(), json(), commonjs(), terser()],
};
