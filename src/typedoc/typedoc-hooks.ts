import { DeclarationReflection } from "typedoc"

import typedoc from "typedoc:@glowbuzzer/store"

export function useTypedoc(filter): DeclarationReflection[] {
    return typedoc.children.filter(filter)
}

export function useTypedocGrouped(filter): { [index: string]: DeclarationReflection[] } {
    const items = useTypedoc(filter)

    const groups: { [index: string]: DeclarationReflection[] } = {}

    items.forEach(item => {
        groups[item.kindString] ??= []
        return groups[item.kindString].push(item)
    })

    return groups
}

export function useTypedocItem(name: string) {
    return typedoc.children.find(i => i.name === name)
}

export const typedocHookFilter = c => c.name.startsWith("use")
export const typedocGbcSchemaFilter = c =>
    c.sources?.some(s => s.fileName === "gbc.ts" || s.fileName === "gbc.d.ts")
