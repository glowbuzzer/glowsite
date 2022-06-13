import { DeclarationReflection } from "typedoc"

import docs from "react-docgen:@glowbuzzer/controls"
import reactDocgenControls from "react-docgen:*"

console.log("DOCS", docs)

export function useReactDocgen(filter) {
    const filtered = Object.entries(docs).filter(([, doc]) => filter(doc))
    return filtered.map(e => e[1]) // strip out the path name
}

export const reactDocgenTileFilter = c =>
    c.displayName.endsWith("Tile") && !c.description?.startsWith("@ignore")

export const reactDocgenControlFilter = c =>
    !c.displayName.endsWith("Tile") && !c.description?.startsWith("@ignore")
