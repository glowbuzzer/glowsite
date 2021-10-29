import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import mdx from 'vite-plugin-mdx'
import {imagetools} from 'vite-imagetools'
// import macrosPlugin from "vite-plugin-babel-macros"
import remarkMermaid from "./plugins/remark-mermaid.mjs";
import remarkCodeblock from "./plugins/remark-codeblock.mjs";
import vx from 'vite-plugin-virtual'
import gbc from "./plugins/data/data-gbcschema.mjs"
import remarkGlowbuzzerFrontmatter from "./plugins/remark-gb-frontmatter.mjs";
import {glowsiteSvgrPlugin} from "./plugins/vite-plugin-gb-svgr.mjs";
import {glowsiteImageToolsPresets} from "./plugins/imagetools-ext.mjs";

// not sure why we need this hack, their ESM module looks okay
const virtual = vx.default

const {pages: gbcschema} = gbc

// const myformat = (args) => {
//     console.log("MYFORMAT", args)
//     return metadatas => {
//         // console.log("META", meta)
//         const sources = metadatas.map((meta) => `${meta.src} ${meta.width}w`)
//         const metas = metadatas.map((meta) => {
//             const {image, ...rest} = meta
//             return {...rest}
//         })
//         return {
//             sources: sources.join(', '),
//             metas
//         }
//     }
// }

/**
 * @type {import('vite').UserConfig}
 */
export default {
    plugins: [
        react(),
        // macrosPlugin.default(),
        glowsiteSvgrPlugin(),
        imagetools({
            // extendTransforms: builtins => [...builtins, ...glowsiteDirectives()]
            // extendOutputFormats: defaults => ({...defaults, myformat})
            resolveConfigs: glowsiteImageToolsPresets()
        }),
        virtual({
            'virtual:module': `export default { hello: 'world' }`,
            'virtual:gbcschema': gbcschema
        }),
        tsconfigPaths(),
        mdx.default({
            remarkPlugins: [
                remarkMermaid,
                remarkCodeblock,
                remarkGlowbuzzerFrontmatter
            ]
        })],
    // css: {
    //     preprocessorOptions: {
    //         less: {
    //             javascriptEnabled: true,
    //         }
    //     }
    // },
    build: {
        minify: false,
        // manifest: true,
        // ssrManifest: true
    }
}
