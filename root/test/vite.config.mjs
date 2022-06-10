import {defineConfig, loadEnv} from "vite"
import react_docgen from "../../plugins/vite-plugin-react-docgen.mjs"
import typedoc from "../../plugins/vite-plugin-typedoc.mjs"

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd())

    return {
        plugins: [react_docgen(mode), typedoc(mode)]
    }
})
