import {defineConfig, loadEnv} from "vite"
import react from "@vitejs/plugin-react"
import {imagetools} from "vite-imagetools"
import radar from "vite-plugin-radar"
import remarkPrism from "remark-prism"
import remarkGfm from "remark-gfm"
import {
    glowsiteImageToolsPresets as resolveConfigsFactory,
    glowsiteOutputFormats as extendOutputFormats
} from "../../plugins/imagetools-ext.mjs"
import remarkMermaid from "../../plugins/remark-mermaid.mjs"
import remarkCodeblock from "../../plugins/remark-codeblock.mjs"
import remarkGlowbuzzerFrontmatter from "../../plugins/remark-frontmatter.mjs"
import {svgWrapper as svgr} from "../../plugins/svr-plugin-wrapper.mjs"
import {mdxWrapper as mdx} from "../../plugins/mdx-plugin-wrapper.mjs"
import remarkDl from "remark-deflist"
import {remarkEntities} from "../../plugins/remark-entities.mjs"
import {remarkLinks} from "../../plugins/remark-links.mjs"
import typedoc from "../../plugins/vite-plugin-typedoc.mjs";
import react_docgen from "../../plugins/vite-plugin-react-docgen.mjs"

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
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd())

    return {
        plugins: [
            mdx({
                remarkPlugins: [
                    remarkGfm,
                    remarkEntities,
                    remarkMermaid,
                    remarkDl,
                    remarkLinks,
                    remarkCodeblock,
                    remarkGlowbuzzerFrontmatter,
                    remarkPrism
                ]
            }),
            react(
                {jsxRuntime: "classic"}
            ),
            svgr(),
            typedoc(mode),
            react_docgen(mode),
            imagetools({
                extendOutputFormats,
                resolveConfigs
            }),
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
                // "react/jsx-runtime": "react/jsx-runtime.js"
                "@glowsite": process.cwd()+"/src/framework/index.ts"
            }
        },
        build: {
            minify: false
            // manifest: true,
            // ssrManifest: true
        }
    }
})
