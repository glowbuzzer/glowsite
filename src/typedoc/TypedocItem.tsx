import { useRouteMatch } from "react-router"

// TODO: commented for now to demonstrate chunking (if we include it here without lazy loading it will be included in the main chunk)
import { useTypedocItem } from "./typedoc-hooks"
import { DocumentationPage } from "../framework/layouts/DocumentationPage"
import { ComponentProps } from "../framework/components/ComponentProps"
import { Link } from "react-router-dom"
import { GbcSchemaLeftNav } from "../framework/components/GbcSchemaLeftNav"

const TypeAlias = ({ item }) => {
    const props = item.type.declaration.children.map(p => ({
        key: p.name,
        name: { name: p.name, required: false },
        type: p.type.id ? <Link to={"./" + p.type.name}>{p.type.name}</Link> : p.type.name,
        description: p.comment?.shortText || ""
    }))

    return (
        <>
            <h1>{item.name}</h1>
            <div className="shortText">{item.comment?.shortText}</div>
            <div className="text">{item.comment?.text}</div>
            <ComponentProps displayName={item.name} properties={props} showDefaults={false} />
        </>
    )
}

export const TypedocItem = () => {
    const { params } = useRouteMatch<{ name: string }>()

    const item = useTypedocItem(params.name)
    // const item=useTypedocItem(params.name)
    // const item={kindString: "TODO"}

    return (
        <DocumentationPage left={<GbcSchemaLeftNav current={item.name} />}>
            <h1>
                {params.name} ({item.kindString})
            </h1>
            {item.kindString === "Type alias" ? <TypeAlias item={item} /> : <div>TODO ENUM</div>}
        </DocumentationPage>
    )
}
