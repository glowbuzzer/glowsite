import {visit} from "unist-util-visit"

import {LATEST_VERSIONS} from "../src/versions.mjs"

const entities = {
    gb: "glowbuzzer",
    fe: "front-end",
    gbc: "GBC",
    gbcl: "GBC (Core control)",
    gbr: "GBR",
    gbrl: "GBR (React)",
    gbem: "GBEM",
    gbeml: "GBEM (EtherCAT master)",
    gbsm: "GBSM",
    gbsml: "GBSM (Step Master)",
    gbt: "glowbuzzer toolkit",
    gbotg: "globuzzer online trajectory planner",
    ui: "user interface",
    pi: "Raspberry Pi",
    kc: "kinematics configuration",
    gcode: "G-Code",
    ws: "WebSockets",
    ...LATEST_VERSIONS
}

export function remarkEntities() {
    // simplified entity regex
    const regex = /&([a-zA-Z-_]+);?/

    return tree => {
        visit(tree, ["text", "code", "inlineCode"], (node, index, parent) => {
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
