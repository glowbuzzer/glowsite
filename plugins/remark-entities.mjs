import { visit } from "unist-util-visit"

const entities = {
    gb: "glowbuzzer",
    fe: "front-end",
    gbc: "GBC (Core Control)",
    gbr: "Glowbuzzer for React",
    gbem: "GBEM (EtherCAT Master)",
    gbsm: "GBSM (Step Master)",
    ecat: "EtherCAT"
}

export function remarkEntities() {
    // simplified entity regex
    const regex = /&([a-zA-Z]+);?/

    return tree => {
        visit(tree, "text", (node, index, parent) => {
            const parts = []
            let start = 0
            const text = node.value
            while (true) {
                const next = text.slice(start)
                const match = next.match(regex)
                if (!match) {
                    parts.push(next)
                    break
                }
                const pre = next.slice(0, match.index)
                const entity = match[1]
                parts.push(pre, entities[entity] || match[0] /* leave unchanged if not mapped */)

                start += match.index + match[0].length
            }
            node.value = parts.join("")
        })
    }
}
