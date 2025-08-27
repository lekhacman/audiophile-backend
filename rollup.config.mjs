import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import run from "@rollup/plugin-run";

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
  plugins: [
    nodeResolve(),
    json(),
    commonjs(),
    ...(process.env.ROLLUP_WATCH === "true" ? [run()] : [terser()]),
  ],
};
