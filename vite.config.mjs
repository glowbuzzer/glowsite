import react from '@vitejs/plugin-react'
import mdx from 'vite-plugin-mdx'
import {imagetools} from 'vite-imagetools'
import macrosPlugin from "vite-plugin-babel-macros"
import remarkMermaid from "./plugins/remark-mermaid.mjs";
import remarkCodeblock from "./plugins/remark-codeblock.mjs";
import vx from 'vite-plugin-virtual'
import loadTypedoc from "./plugins/virtual/typedoc.mjs";

// not sure why we need this hack, their ESM module looks okay
const virtual = vx.default

const typedoc = loadTypedoc("./src/gbc.ts")

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
        macrosPlugin.default(),
        imagetools({
            // extendOutputFormats: defaults => ({...defaults, myformat})
        }),
        virtual({
            'virtual:module': `export default { hello: 'world' }`,
            'virtual:typedoc': typedoc
        }),
        mdx.default({
            remarkPlugins: [
                remarkMermaid,
                remarkCodeblock
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
