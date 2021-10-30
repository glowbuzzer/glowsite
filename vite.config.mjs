import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import mdx from 'vite-plugin-mdx'
import {imagetools} from 'vite-imagetools/packages/vite/dist/index.cjs'
// import macrosPlugin from "vite-plugin-babel-macros"
import remarkMermaid from "./plugins/remark-mermaid.mjs";
import remarkCodeblock from "./plugins/remark-codeblock.mjs";
import vx from 'vite-plugin-virtual'
import gbc from "./plugins/data/data-gbcschema.mjs"
import remarkGlowbuzzerFrontmatter from "./plugins/remark-gb-frontmatter.mjs";
import {glowsiteSvgrPlugin} from "./plugins/vite-plugin-gb-svgr.mjs";
import {glowsiteImageToolsPresets, glowsiteOutputFormats} from "./plugins/imagetools-ext.mjs";
import remarkPrism from "remark-prism"

// not sure why we need this hack, their ESM module looks okay
const virtual = vx.default

const {pages: gbcschema} = gbc

/**
 * @type {import('vite').UserConfig}
 */
export default {
    plugins: [
        react(),
        glowsiteSvgrPlugin(),
        imagetools({
            extendOutputFormats: glowsiteOutputFormats,
            resolveConfigs: glowsiteImageToolsPresets()
        }),
        virtual({
            // 'virtual:module': `export default { hello: 'world' }`,
            'virtual:gbcschema': gbcschema
        }),
        tsconfigPaths(),
        mdx.default({
            remarkPlugins: [
                remarkMermaid,
                remarkCodeblock,
                remarkGlowbuzzerFrontmatter,
                remarkPrism,
            ]
        })],
    build: {
        minify: false,
        // manifest: true,
        // ssrManifest: true
    }
}
