import { useRouteMatch } from "react-router"

import { useTypedocGrouped, useTypedocItem } from "./typedoc-hooks"
import { DocumentationPage } from "../framework/layouts/DocumentationPage"
import { ComponentProps } from "../framework/components/ComponentProps"
import { Link } from "react-router-dom"
import { Markdown } from "../framework/components/Markdown"
import { StyledLeftNavMenu } from "../framework/nav/ContexualLeftNav"
import { Menu, Table } from "antd"
import {
    ArrayType,
    DeclarationReflection,
    IntersectionType,
    IntrinsicType,
    ReferenceType,
    Reflection,
    ReflectionType,
    SignatureReflection,
    TupleType,
    Type
} from "typedoc"
import styled from "styled-components"

const TypedocSignature = ({ s }: { s: SignatureReflection }) => {
    return (
        s && (
            <>
                {s.name === "__type" || <span className="token function">{s.name}</span>}(
                <span>
                    {s.parameters?.map(param => (
                        <span className="param">
                            <Synopsis item={param} />
                            {param.name}: <TypedocType t={param.type} />
                        </span>
                    ))}
                </span>
                ): <TypedocType t={s.type} />
            </>
        )
    )
}

const TypedocDeclaration = ({ d }: { d: DeclarationReflection }) => {
    switch (d.kindString) {
        case "Type literal":
            if (d.signatures?.[0]) {
                return <TypedocSignature s={d.signatures?.[0]} />
            }
            if (d.children?.length) {
                return (
                    <>
                        {"{"}
                        <span>
                            {d.children.map(property => (
                                <span className="property">
                                    <Synopsis item={property} />
                                    <TypedocDeclaration d={property} />
                                </span>
                            ))}
                        </span>
                        {"}"}
                    </>
                )
            }
            break
        case "Property":
            return (
                <>
                    {d.name}: <TypedocType t={d.type} />
                </>
            )

        case "Method":
            return <TypedocSignature s={d.signatures?.[0]} />
    }
    return <span>#{d.kindString}</span>
}

const TypedocType = ({ t }: { t: Type }) => {
    switch (t.type) {
        case "array":
            return (
                <span>
                    <TypedocType t={(t as ArrayType).elementType} />
                    []
                </span>
            )
        case "intrinsic":
            return <span className="token builtin">{(t as IntrinsicType).name}</span>
        case "reference": {
            const r = t as ReferenceType & { id? }
            return r.id ? <Link to={"./" + r.name}>{r.name}</Link> : <span>{r.name}</span>
        }
        case "reflection": {
            const r = t as ReflectionType
            return <TypedocDeclaration d={r.declaration} />
        }
        case "tuple": {
            const r = t as TupleType
            return (
                <>
                    [
                    {r.elements.map((subtype, index) => (
                        <span key={index} className="tuple-item">
                            <TypedocType t={subtype} />
                        </span>
                    ))}
                    ]
                </>
            )
        }

        case "intersection": {
            const r = t as IntersectionType
            return (
                <span>
                    {r.types.map((subtype, index) => (
                        <span className="intersection" key={index}>
                            <TypedocType t={subtype} />
                        </span>
                    ))}
                </span>
            )
        }

        case "conditional":
        case "indexedAccess":
        case "inferred":
        case "literal":
        case "mapped":
        case "optional":
        case "predicate":
        case "query":
        case "rest":
        case "template-literal":
        case "named-tuple-member":
        case "typeOperator":
        case "union":
        case "unknown":
        default:
            return <>#{t.type}</>
    }
}

type TypedocItemRenderProps = {
    item: DeclarationReflection
}

const StyledRender = styled.div`
    .synopsis .token {
        filter: brightness(0.75);
    }

    .property,
    .param,
    .tuple-item {
        display: block;
        padding-left: 20px;
      padding-bottom: 10px;

        :only-child {
            //display: inline;
            //padding-left: 0;
        }

        :not(:last-child):after {
            content: ", ";
        }
    }

    .intersection:not(:last-child):after {
        content: " & ";
    }

    .param,
    .property {
        .shortText {
            font-family: Roboto, sans-serif;
            font-size: 0.9em;
            border-left: 2px solid rgba(0, 0, 0, 0.08);
            margin-top: 8px;
            margin-bottom: 0;
            padding-top: 4px;
            padding-bottom: 4px;
            padding-left: 8px;
            color: rgba(0, 0, 0, 0.6);

            p:only-child {
                margin: 0;
            }
        }
    }

    pre.debug {
        border-top: 5px dashed grey;
        padding: 10px;
        font-size: 0.7em;
        color: grey;
    }
`

const PropertyTable = ({ item }) => {
    return <pre className="debug">{JSON.stringify(item, null, 2)}</pre>
}

export const TypeAlias = ({ item }) => {
    return (
        <div>
            <Synopsis item={item} />
            <pre>
                type {item.name} = <TypedocType t={item.type} />
            </pre>
            <PropertyTable item={item} />
        </div>
    )

    // const props = defaultItem.map(p => ({
    //     key: p.name,
    //     name: { name: p.name, required: false },
    //     type: emitType(p.type),
    //     description: <Markdown children={p.comment?.shortText || "Not available"} />
    // }))
    //
    // return (
    //     <>
    //         <h1>{item.name}</h1>
    //         <div className="shortText">
    //             <Markdown children={item.comment?.shortText || "Not available"} />
    //         </div>
    //         <div className="text">
    //             {item.comment?.text && <Markdown children={item.comment.text} />}
    //         </div>
    //         {<ComponentProps displayName={item.name} properties={props} showDefaults={false} />}
    //     </>
    // )
}

const Synopsis = ({ item }: { item: Reflection }) => {
    return item.comment ? (
        <>
            <div className="shortText">
                <Markdown>{item.comment.shortText.trim()}</Markdown>
            </div>
            <div className="text">
                <Markdown>{item.comment.text}</Markdown>
            </div>
        </>
    ) : null
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
            <Synopsis item={item} />
            <ComponentProps displayName={item.name} properties={props} showDefaults={false} />
        </>
    )
}

/*
const Parameters = ({ sig }: { sig: SignatureReflection }) => {
    if (!sig?.parameters) {
        return null
    }

    const data = sig.parameters.map(p => ({
        key: p.name,
        name: p.name,
        description: <Synopsis item={p} />,
        type: <TypedocType t={p.type} />,
        default: p.defaultValue
    }))
    const cols = ["Name", "Description", "Type", "Default"].map(c => ({
        title: c,
        dataIndex: c.toLowerCase(),
        key: c.toLowerCase()
    }))

    return (
        <>
            <h3>Parameters</h3>
            <Table columns={cols} dataSource={data} pagination={false} />
        </>
    )
}
*/

const Function = ({ item }: TypedocItemRenderProps) => {
    return (
        <div>
            {item.signatures.map(s => {
                return (
                    <div key={s.id}>
                        <Synopsis item={s} />
                        <pre className="synopsis">
                            <TypedocSignature s={s} />
                        </pre>
{/*
                        <Parameters sig={s} />
*/}
                    </div>
                )
            })}
            <pre className="debug">{JSON.stringify(item, null, 2)}</pre>
        </div>
    )
}

const TypedocLeftNav = ({ current, title, filter }) => {
    const groups = useTypedocGrouped(filter)

    return (
        <StyledLeftNavMenu>
            <div className="title">{title}</div>
            <Menu mode="inline" defaultSelectedKeys={[current]} selectedKeys={[current]}>
                {Object.keys(groups).length < 2
                    ? Object.values(groups)[0].map(c => (
                          <Menu.Item key={c.name}>
                              <Link to={"./" + c.name}>{c.name}</Link>
                          </Menu.Item>
                      ))
                    : Object.entries(groups).map(([name, items]) => (
                          <Menu.SubMenu key={name} className={"capitalize"} title={name}>
                              {items.map(c => (
                                  <Menu.Item key={c.name}>
                                      <Link to={"./" + c.name}>{c.name}</Link>
                                  </Menu.Item>
                              ))}
                          </Menu.SubMenu>
                      ))}
            </Menu>
        </StyledLeftNavMenu>
    )
}

const render_component = {
    "Type alias": TypeAlias,
    Enumeration,
    Function
}

export default ({ title, filter }) => {
    const { params } = useRouteMatch<{ name: string }>()
    const item = useTypedocItem(params.name)

    if (!item) {
        return null
    }

    const Render =
        render_component[item.kindString] ||
        (() => <h4>No render component for {item.kindString}</h4>)

    return (
        <DocumentationPage
            left={<TypedocLeftNav current={item.name} title={title} filter={filter} />}
        >
            <h1>
                {params.name} ({item.kindString})
            </h1>

            <StyledRender>
                <Render item={item} />
            </StyledRender>
        </DocumentationPage>
    )
}
