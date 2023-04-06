import { rm } from "node:fs/promises"
import type { Plugin } from "rollup"

export default function cleanAfterWrite(directory: string): Plugin {
  let removePromise: Promise<void>

  return {
    writeBundle() {
      removePromise ??= rm(directory, {
        force: true,
        recursive: true
      })

      return removePromise
    },
    name: "clean-after-write"
  }
}
