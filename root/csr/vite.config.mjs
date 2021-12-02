import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import { imagetools } from "vite-imagetools"
import radar from "vite-plugin-radar"
import vx from "vite-plugin-virtual"
import remarkPrism from "remark-prism"
import remarkGfm from "remark-gfm"
import gbc from "../../plugins/data/data-gbcschema.mjs"
import {
    glowsiteImageToolsPresets as resolveConfigsFactory,
    glowsiteOutputFormats as extendOutputFormats
} from "../../plugins/imagetools-ext.mjs"
import remarkMermaid from "../../plugins/remark-mermaid.mjs"
import remarkCodeblock from "../../plugins/remark-codeblock.mjs"
import remarkGlowbuzzerFrontmatter from "../../plugins/remark-frontmatter.mjs"
import { svgWrapper as svgr } from "../../plugins/svr-plugin-wrapper.mjs"
import { mdxWrapper as mdx } from "../../plugins/mdx-plugin-wrapper.mjs"
import remarkDl from "remark-deflist"
import { remarkEntities } from "../../plugins/remark-entities.mjs"

//
// not sure why we need this hack, their ESM module looks okay
const virtual = vx.default

const { pages: gbcschema } = gbc

const resolveConfigs = resolveConfigsFactory({
    presets: {
        default: {
            widths: [480, 800, 1400]
        }
    }
})

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return {
        plugins: [
            mdx({
                remarkPlugins: [
                    remarkGfm,
                    remarkEntities,
                    remarkMermaid,
                    remarkDl,
                    remarkCodeblock,
                    remarkGlowbuzzerFrontmatter,
                    remarkPrism
                ]
            }),
            react(),
            svgr(),
            imagetools({
                extendOutputFormats,
                resolveConfigs
            }),
            virtual({
                // 'virtual:module': `export default { hello: 'world' }`,
                "virtual:gbcschema": gbcschema
            }),
            // tsconfigPaths(),
            radar.default({
                analytics: {
                    id: env.VITE_GA_TRACKING_ID
                    // disable: true
                },
                enableDev: true
            })
        ],
        resolve: {
            alias: {
                // because react@17.x still uses cjs module syntax and we are fully esm
                // https://github.com/mdx-js/mdx/discussions/1794
                "react/jsx-runtime": "react/jsx-runtime.js"
            }
        },
        build: {
            minify: false
            // manifest: true,
            // ssrManifest: true
        }
    }
})
