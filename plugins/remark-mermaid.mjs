/**
 * Remark plugin to find mermaid codeblocks and invoke mermaid using puppeteer.
 *
 * Heavily based on https://github.com/mermaidjs/mermaid.cli/blob/master/index.js
 *
 * The goal is to run processing async and report meaningful errors when there are issues with the markup
 *
 */
import {visit} from "unist-util-visit"
import path from "path"
import puppeteer from "puppeteer"
import {createElement, createImport, handler} from "./util/mdast-util.mjs"
import {createCache} from "./util/cache-util.mjs"

// puppeteer seems to set a load of listeners on process, so increase the limit
process.setMaxListeners(100)

const OUTDIR = ".cache/mermaid"
const PLUGIN_NAME = "remark-mermaid"

/**
 * @param definition The mermaid source
 * @returns SVG (string)
 */
async function renderMermaidToSvg(definition) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })
    const page = await browser.newPage()

    try {
        const html = `
            <!doctype html>
            <html lang="en">
              <body>
                <div id="container"></div>
              </body>
            </html>
        `

        await page.setContent(html)
        // assumes we have mermaid installed
        await page.addScriptTag({ path: "./node_modules/mermaid/dist/mermaid.min.js" })
        return await page.evaluate(
            async ({ definition }) => {
                // run the mermaid magic "client side"
                window.mermaid.initialize({})
                return new Promise((resolve, reject) => {
                    try {
                        window.mermaid.mermaidAPI.render("container", definition, svgCode => {
                            resolve(svgCode)
                        })
                    } catch (e) {
                        reject(e)
                    }
                })
            },
            { definition } /* pass in the mermaid source */
        )
    } finally {
        await page.close()
        await browser.close()
    }
}

export default function remarkMermaid() {
    const cache = createCache(PLUGIN_NAME, OUTDIR, "svg")

    return async (tree, vFile) => {
        const sourcePath = vFile.history[0]

        // we want to run async and then mutate the tree at the end, so we build an array of
        // promises that we'll then resolve with Promise.all
        // const promises = []
        const future=handler("mermaid", sourcePath)

        visit(tree, "code", (node, index, parent) => {
            if (node.lang === "mermaid") {
                const source = node.value
                // push a new promise

                future.img(node, parent, index, cache(source, sourcePath, renderMermaidToSvg))
            }
        })

        return await future.finalize(tree)
    }
}
