type GbcSchemaItem = {
    kindString: string
    name: string
}

// @ts-ignore
import typedoc from "virtual:typedoc"

const groups = {
    Enumeration: [] as GbcSchemaItem[],
    "Type alias": [] as GbcSchemaItem[]
}

typedoc.children?.forEach((source) => groups[source.kindString]?.push(source))

export function useGbcSchema(): { [index: string]: GbcSchemaItem[] } {
    return groups
}
