import { defineConfig, loadEnv } from "vite"
import typedoc from "../../plugins/vite-plugin-typedoc.mjs"

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return {
        plugins: [typedoc(mode, { "typedoc:foo": "bar" })]
    }
})
