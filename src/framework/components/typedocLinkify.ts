import flatMap from "unist-util-flatmap"

function h(type, props, children?) {
    switch (type) {
        case "text":
            return { type: "text", value: props.value }
        case "link":
            return {
                type: "link",
                title: props.title ? props.title : null,
                url: props.url,
                children
            }
    }
    throw new Error("Unrecognised node type")
}

function find_links_and_convert(textNode) {
    const current_text = textNode.value
    const regex = /{@link (\w+)}/g
    const replacement_nodes = []
    let current_start_index = 0
    let regex_match
    let count = 0
    while (count++ < 10 && (regex_match = regex.exec(current_text)) !== null) {
        // console.log("Regex match", output)
        const { index } = regex_match
        if (current_start_index !== index) {
            replacement_nodes.push(
                h("text", { value: current_text.slice(current_start_index, index) })
            )
        }
        const target = regex_match[1]
        replacement_nodes.push(h("link", { url: target }, [h("text", { value: target })]))
        // console.log("last index", regex.lastIndex)
        current_start_index = regex.lastIndex
    }
    const remaining_text = current_text.slice(current_start_index)
    if (remaining_text.length) {
        replacement_nodes.push(h("text", { value: remaining_text }))
    }
    return replacement_nodes
}

export function typedocLinkify() {
    return ast => {
        flatMap<{ type: string }, unknown>(ast, node => {
            if (node.type !== "text") {
                return [node]
            }
            return find_links_and_convert(node)
        })

        return ast
    }
}
