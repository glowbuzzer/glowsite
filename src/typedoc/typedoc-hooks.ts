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

export const typedocHookFilter = c => {
    // console.log("filter", c.name, c.name.startsWith("use"))
    return c.name.startsWith("use")
}

export const typedocNonEmptyEnumerationFilter = c =>
    c.kindString !== "Enumeration" || c.children?.length

const typedocGbcFilter = c =>
    c.sources?.some(
        s =>
            s.fileName === "gbc.ts" ||
            s.fileName === "gbc.d.ts" ||
            s.fileName === "gbc_extra.ts" ||
            s.fileName === "gbc_extra.d.ts"
    )

export const typedocGbcSchemaFilter = c =>
    typedocGbcFilter(c) && typedocNonEmptyEnumerationFilter(c)
