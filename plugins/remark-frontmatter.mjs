// Very basic plugin to parse front-matter and convert to exported properties
// Note that this does NOT support any fancy yaml, only name/value pairs

import {createExports} from "./util/mdast-util.mjs"

export default function remarkGlowbuzzerFrontmatter() {
    return (tree, vFile) => {
        const sourcePath = vFile.history[0]
        // if (sourcePath.indexOf("frontmatter") >= 0) {
        //     console.log("TREE", JSON.stringify(tree, null, 2))
        // }

        const contents = vFile.value
        const fm_node_index = tree.children?.findIndex(c => c.type === "thematicBreak")

        if (fm_node_index >= 0) {
            const fm_node = tree.children[fm_node_index]
            const start = fm_node.position.end.offset
            const end = contents.substr(start).indexOf("---")
            const fm = contents.substr(start, end)
            const pairs = fm
                .trim()
                .split("\n")
                .map(s => s.split(":").map(p => p.trim()))
                .map(([name, value]) => ({name, value}))

            // the node immediately after the thematicBreak is the yaml content and we want to replace both
            tree.children.splice(fm_node_index, 2, createExports(pairs))
        }
        return tree
    }
}
