import {defineConfig, loadEnv} from "vite"
import react from "@vitejs/plugin-react"
import {imagetools} from "vite-imagetools"
import remarkPrism from "remark-prism"
import remarkGfm from "remark-gfm"
import {
    glowsiteImageToolsPresets as resolveConfigsFactory,
    glowsiteOutputFormats as extendOutputFormats
} from "../../plugins/imagetools-ext.mjs"
import remarkMermaid from "../../plugins/remark-mermaid.mjs"
import remarkCodeblock from "../../plugins/remark-codeblock.mjs"
import remarkGlowbuzzerFrontmatter from "../../plugins/remark-frontmatter.mjs"
import {svgWrapper as svgr} from "../../plugins/svgr-plugin-wrapper.mjs"
import {mdxWrapper as mdx} from "../../plugins/mdx-plugin-wrapper.mjs"
import remarkDl from "remark-deflist"
import {remarkEntities} from "../../plugins/remark-entities.mjs"

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
                    remarkCodeblock,
                    remarkGlowbuzzerFrontmatter,
                    remarkPrism
                ]
            }),
            react(
                {jsxRuntime: "classic"}
            ),
            svgr(),
            imagetools({
                extendOutputFormats,
                resolveConfigs
            }),
        ],
        resolve: {
            alias: {
                // because react@17.x still uses cjs module syntax and we are fully esm
                // https://github.com/mdx-js/mdx/discussions/1794
                // "react/jsx-runtime": "react/jsx-runtime.js"
            }
        },
        build: {
            minify: false
        }
    }
})
