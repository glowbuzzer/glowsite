import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import { imagetools } from "vite-imagetools/packages/vite/dist/index.cjs"
import vx from "vite-plugin-virtual"
import gbc from "./plugins/data/data-gbcschema.mjs"
// import { glowsiteSvgrPlugin as svgr } from "./plugins/vite-plugin-svgr.mjs"
import {
    glowsiteImageToolsPresets as resolveConfigsFactory,
    glowsiteOutputFormats as extendOutputFormats
} from "./plugins/imagetools-ext.mjs"
import remarkMermaid from "./plugins/remark-mermaid.mjs"
import remarkCodeblock from "./plugins/remark-codeblock.mjs"
import remarkGlowbuzzerFrontmatter from "./plugins/remark-frontmatter.mjs"
import remarkPrism from "remark-prism"
import remarkGfm from "remark-gfm"
import { svgWrapper as svgr } from "./plugins/svr-plugin-wrapper.mjs"
import { mdxWrapper as mdx } from "./plugins/mdx-plugin-wrapper.mjs"

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
export default {
    plugins: [
        mdx({
            remarkPlugins: [
                remarkGfm,
                remarkMermaid,
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
        tsconfigPaths()
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
