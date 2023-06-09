import {DeclarationReflection, Reflection} from "typedoc"

import typedoc from "typedoc:@glowbuzzer/store"
import {kindOf} from "./util";

export function useTypedoc(filter): DeclarationReflection[] {
    return typedoc.children.filter(filter)
}

export function useTypedocGrouped(filter): { [index: string]: DeclarationReflection[] } {
    const items = useTypedoc(filter)

    const groups: { [index: string]: DeclarationReflection[] } = {}

    items.forEach(item => {
        const kind = kindOf(item.kind);
        groups[kind] ??= []
        return groups[kind].push(item)
    })

    return groups
}

export function useTypedocItem(name: string):Reflection {
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
            s.fileName.endsWith("gbc.ts") ||
            s.fileName.endsWith("gbc.d.ts") ||
            s.fileName.endsWith("gbc_extra.ts") ||
            s.fileName.endsWith("gbc_extra.d.ts")
    )

export const typedocGbcSchemaFilter = c =>
    typedocGbcFilter(c) && typedocNonEmptyEnumerationFilter(c)
