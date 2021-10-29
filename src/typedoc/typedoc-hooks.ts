type GbcSchemaItem = {
    kindString: string
    name: string
    slug: string
}

// @ts-ignore
import gbcschema from "virtual:gbcschema"

const groups = {
    Enumeration: [] as GbcSchemaItem[],
    "Type alias": [] as GbcSchemaItem[]
}

gbcschema.forEach((source) => groups[source.kindString]?.push(source))

export function useGbcSchema(): { [index: string]: GbcSchemaItem[] } {
    return groups
}

export function useTypedocItem(name: string) {
    return gbcschema.find(i => i.slug === name)
}
