import {defineConfig, loadEnv} from "vite"
import {mdxWrapper as mdx} from "../../plugins/mdx-plugin-wrapper.mjs";
import remarkGfm from "remark-gfm";
import {remarkEntities} from "../../plugins/remark-entities.mjs";
import remarkMermaid from "../../plugins/remark-mermaid.mjs";
import remarkDl from "remark-deflist";
import {remarkLinks} from "../../plugins/remark-links.mjs";
import remarkCodeblock from "../../plugins/remark-codeblock.mjs";
import remarkPrism from "remark-prism";

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
        plugins: [
            mdx({
                remarkPlugins: [
                    remarkCodeblock
                ]
            })
        ],
        resolve: {
            alias: {
                "@glowsite": process.cwd() + "/src/framework/index.ts"
            }
        },

    }
})
