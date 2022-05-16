import {visit} from "unist-util-visit"
import crypto from "crypto"
import path from "path"
import fs from "fs"
import {createCache} from "./util/cache-util.mjs"
import {handler} from "./util/mdast-util.mjs"

const OUTDIR = ".cache/codeblock"
const PLUGIN_NAME = "remark-codeblock"

function render(source, destination) {
    const unique = crypto.createHmac("sha1", PLUGIN_NAME).update(source).digest("hex")
    const jsxFilename = `${unique}.tsx`
    const jsxPath = path.join(destination, jsxFilename)

    if (!fs.existsSync(jsxPath)) {
        // Write temporary file
        fs.writeFileSync(jsxPath, source)
    }

    return [jsxFilename, unique]
}

export default function remarkCodeblock() {
    const cache = createCache(PLUGIN_NAME, OUTDIR, "tsx")

    // fs.mkdirSync(OUTDIR, {recursive: true})
    return async (tree, vFile) => {
        const sourcePath = vFile.history[0]
        // if (sourcePath.indexOf("comments") >= 0) {
        //     console.log("COMMENTS TREE", JSON.stringify(tree, null, 2))
        // }

        const future = handler("CodeBlock", sourcePath)

        visit(tree, "code", (node, index, parent) => {
            if (node.meta?.startsWith("demo")) {
                // meta can be 'demo' followed by list of classes, eg. "demo toolpath", see ToolPathTile.mdx (to control height, etc)
                const classes = node.meta.split(" ")
                delete node.meta

                const source = node.value
                future.component(
                    node,
                    parent,
                    index,
                    cache(source, sourcePath),
                    classes.map(c => `codeblock-${c}`).join(" ")
                )
            }
        })

        return future.finalize(tree)
        // tree.children = [...importAST, ...tree.children]
    }
}
