import {defineConfig, loadEnv} from "vite"
import react_docgen from "../../plugins/vite-plugin-react-docgen.mjs"
import typedoc from "../../plugins/vite-plugin-typedoc.mjs"
import {testPlugin} from "./plugins/test_plugin.mjs";

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd())

    return {
        server: {
            port: 8001,
            host: true
        },
        plugins: [react_docgen(mode), typedoc(mode), testPlugin()]
    }
})
