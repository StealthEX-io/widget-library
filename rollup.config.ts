import { defineConfig } from "rollup"
import typescript from "@rollup/plugin-typescript"
import terser from "@rollup/plugin-terser"
import dts from "rollup-plugin-dts"

import cleanBeforeWrite from "./build-plugins/clean-before-write"
import cleanAfterWrite from "./build-plugins/clean-after-write"
import packageJson from "./package.json" assert { type: "json" }

export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs"
      },
      {
        file: packageJson.module,
        format: "esm"
      },
      {
        file: "dist/index.browser.js",
        format: "iife",
        name: "stealthexWidget",
        plugins: [terser()]
      }
    ],
    plugins: [
      typescript({
        include: ["src/**/*"]
      }),
      cleanBeforeWrite("dist")
    ]
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts(), cleanAfterWrite("dist/types")]
  }
])
