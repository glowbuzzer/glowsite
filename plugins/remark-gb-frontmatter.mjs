// Very basic plugin to parse front-matter and convert to exported properties
// Note that this does NOT support any fancy yaml, only name/value pairs

export default function remarkGlowbuzzerFrontmatter() {
    return (tree, vFile) => {
        const contents = vFile.contents
        const fm_node_index = tree.children?.findIndex(c => c.type === "thematicBreak")

        if (fm_node_index >= 0) {
            const fm_node = tree.children[fm_node_index]
            const start = fm_node.position.end.offset;
            const end = contents.substr(start).indexOf("---")
            const fm = contents.substr(start, end)
            const pairs = fm.trim().split("\n").map(s => s.split(":").map(p => p.trim())).map(([name, value]) => ([
                name, isNaN(value) ? `"${value}"` : Number(value)
            ]))
            // the paras after the thematicBreak are the yaml content
            tree.children.splice(fm_node_index, pairs.length + 1, {
                    type: "export",
                    value: pairs.map(([name, value]) => `export const ${name}=${value}`).join("\n")
                }
            )
        }
        return tree
    }
}
