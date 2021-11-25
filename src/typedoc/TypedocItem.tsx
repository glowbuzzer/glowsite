import { useRouteMatch } from "react-router"

// TODO: commented for now to demonstrate chunking (if we include it here without lazy loading it will be included in the main chunk)
import { useTypedocItem } from "./typedoc-hooks"
import { DocumentationPage } from "../framework/layouts/DocumentationPage"
import { ComponentProps } from "../framework/components/ComponentProps"
import { Link } from "react-router-dom"
import { GbcSchemaLeftNav } from "../framework/components/GbcSchemaLeftNav"
import ReactMarkdown from "react-markdown"

// const transformLinkUri = (uri) => (
// deafult link transformer does fancy xss filter
// access here require('react-markdown').uriTransformer
// )

const TypeAlias = ({ item }) => {
    let props
    if (!item.type.declaration.children) {
        console.log("EMPTY!")
        console.log(item)
        props = [
            {
                key: item.name,
                name: { name: "NULL", required: false },
                type: "no type",
                description: `${item.name} has no properties `
            }
        ]
    } else {
        console.log(item)
        props = item.type.declaration.children.map(p => ({
            key: p.name,
            name: { name: p.name, required: false },
            type: p.type.id ? <Link to={"./" + p.type.name}>{p.type.name}</Link> : p.type.name,
            description: <ReactMarkdown children={p.comment?.shortText || "Not available"} />
        }))
    }
    // console.log(props)
    //undefined type for arrays
    // need fancier in type:

    return (
        <>
            <h1>{item.name}</h1>
            <div className="shortText">
                <ReactMarkdown children={item.comment?.shortText || "Not available"} />
            </div>
            <div className="text">{item.comment?.text && <ReactMarkdown children={item.comment.text} />}</div>
            <ComponentProps displayName={item.name} properties={props} showDefaults={false} />
        </>
    )
}

const Enumeration = ({ item }) => {
    const props = item.children.map(p => ({
        key: p.name,
        name: { name: p.name, required: false },
        type: item.kindString,
        description: p.comment?.shortText || "Not available"
    }))
    return (
        <>
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

            {item.kindString === "Type alias" ? (
                <TypeAlias item={item} />
            ) : (
                <Enumeration item={item} />
            )}
        </DocumentationPage>
    )
}
