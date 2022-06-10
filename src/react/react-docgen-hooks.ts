import { DeclarationReflection } from "typedoc"

import docs from "react-docgen:@glowbuzzer/controls"

console.log("DOCS", docs)

export function useReactDocgen(filter) {
    return docs.filter(filter)
}

export function useReactDocgenItem(name: string) {
    return docs.find(i => i.displayName === name)
}

export const reactDocgenTileFilter = c => c.displayName.endsWith("Tile") && !c.description?.startsWith("@ignore")
export const reactDocgenControlFilter = c => !c.displayName.endsWith("Tile") && !c.description?.startsWith("@ignore")
