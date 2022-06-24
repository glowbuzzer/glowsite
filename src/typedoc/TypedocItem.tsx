import * as React from "react"
import { useTypedocGrouped, useTypedocItem } from "./typedoc-hooks"
import { DocumentationPage } from "../framework/layouts/DocumentationPage"
import { ComponentProps } from "../framework/components/ComponentProps"
import { Link } from "react-router-dom"
import { Markdown } from "../framework/components/Markdown"
import { StyledLeftNavMenu } from "../framework/nav/ContexualLeftNav"
import { Menu } from "antd"
import {
    ArrayType,
    DeclarationReflection,
    IntersectionType,
    IntrinsicType,
    LiteralType,
    ReferenceType,
    Reflection,
    ReflectionType,
    SignatureReflection,
    TupleType,
    Type,
    UnionType
} from "typedoc"
import styled from "styled-components"
import { useParams } from "react-router"
import { relative_path } from "./util"
import { useNavBySlug, useRootNav } from "../framework/nav"
import { ScrollToTopOnMount } from "../framework/components/ScrollToTopOnMount"

const StyledRender = styled.div`
    .debug {
        display: none; // comment to show raw typedoc json
    }

    .token {
        filter: brightness(0.75);
    }

    .property,
    .param,
    .tuple-item {
        display: block;
        padding-left: 20px;

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

    .union:not(:last-child):after {
        content: " | ";
    }

    pre > span > .property {
        > .shortText {
            //border-top: 2px solid rgba(0, 0, 0, 0.08);
            padding-top: 6px;
            padding-bottom: 6px;
            margin-top: 26px;
        }

        :first-child > .shortText {
            margin-top: 10px;
        }
    }

    .param,
    .property {
        .shortText,
        .text {
            font-family: Roboto, sans-serif;
            font-size: 0.9em;
            border-left: 2px solid rgba(0, 0, 0, 0.08);
            margin-top: 0;
            padding-top: 0;
            padding-bottom: 0;
            padding-left: 8px;
            color: rgba(0, 0, 0, 0.6);

            p:only-child {
                margin: 0;
            }
        }

        .text {
            padding-top: 6px;
            padding-bottom: 6px;
        }
    }

    pre.debug {
        margin-top: 300px;
        border-top: 5px dashed grey;
        padding: 10px;
        font-size: 0.7em;
        color: grey;
    }
`

export const TypedocLink = ({ name, content = undefined }) => {
    const generic_path = "/docs/types/:name"
    const node = useNavBySlug(name, generic_path)
    const to = node.path === generic_path ? generic_path.replace(":name", name) : node.path
    return <Link to={to}>{content || name}</Link>
}

const TypedocLiteral = ({ l }: { l: LiteralType }) => {
    switch (typeof l.value) {
        case "string":
            return <span>"{l.value}"</span>
        case "boolean":
            return <span>{l.value ? "true" : "false"}</span>
        case "number":
        case "bigint":
            return <span>{l.value.toString()}</span>
    }
}

const TypedocSignature = ({
    s,
    isOptional,
    includeSynopsis
}: {
    s: SignatureReflection
    isOptional?: boolean
    includeSynopsis: boolean
}) => {
    return (
        s && (
            <>
                {includeSynopsis && <Synopsis item={s} />}
                {s.name === "__type" || <span className="token function">{s.name}</span>}
                {isOptional && "?"}(
                <span>
                    {s.parameters?.map(param => (
                        <span key={param.name} className="param">
                            <Synopsis item={param} />
                            {param.name}
                            {param.flags.isOptional && "?"}: <TypedocType t={param.type} />
                        </span>
                    ))}
                </span>
                ) {"=>"} <TypedocType t={s.type} />
            </>
        )
    )
}

const TypedocConstructor = ({ s }: { s: SignatureReflection }) => {
    return (
        s && (
            <>
                <Synopsis item={s} />
                <span className="token function">constructor</span>(
                <span>
                    {s.parameters?.map(param => (
                        <span key={param.name} className="param">
                            <Synopsis item={param} />
                            {param.name}
                            {param.flags.isOptional && "?"}: <TypedocType t={param.type} />
                        </span>
                    ))}
                </span>
                )
            </>
        )
    )
}

const TypedocDeclaration = ({
    d,
    includeSynopsis = true
}: {
    d: DeclarationReflection
    includeSynopsis?: boolean
}) => {
    switch (d.kindString) {
        case "Type literal":
            if (d.signatures?.[0]) {
                return (
                    <TypedocSignature
                        s={d.signatures?.[0]}
                        includeSynopsis={includeSynopsis}
                        isOptional={d.flags.isOptional}
                    />
                )
            }
            if (d.children?.length) {
                return (
                    <>
                        {"{"}
                        <span>
                            {d.children.map(property => (
                                <span key={property.name} className="property">
                                    {includeSynopsis && <Synopsis item={property} />}
                                    <TypedocDeclaration d={property} />
                                </span>
                            ))}
                        </span>
                        {"}"}
                    </>
                )
            }
            if (d.indexSignature) {
                return (
                    <>
                        {"{"}[<ParameterList sig={d.indexSignature} />
                        ]: <TypedocType t={d.indexSignature.type} />
                        {"}"}
                    </>
                )
            }
            return <span>#{d.kindString}</span>

        case "Property":
            return (
                <>
                    {d.name}
                    {d.flags.isOptional && "?"}: <TypedocType t={d.type} />
                </>
            )

        case "Accessor":
            if (!d.getSignature) {
                return <>{d.name} has no get signature!</>
            }
            return (
                <>
                    <Synopsis item={d.getSignature[0]} />
                    {d.name}: <TypedocType t={d.getSignature[0].type} includeSynopsis={false} />
                </>
            )

        case "Constructor":
            return <TypedocConstructor s={d.signatures[0]} />

        case "Method":
            return (
                <TypedocSignature
                    s={d.signatures?.[0]}
                    includeSynopsis={true}
                    isOptional={d.flags.isOptional}
                />
            )

        case "Interface":
        case "Class":
            if (d.children?.length) {
                return (
                    <>
                        {"{"}
                        <span>
                            {d.children
                                .filter(p => !(p.flags?.isProtected || p.flags?.isPrivate))
                                .map(property => (
                                    <span key={property.name} className="property">
                                        <Synopsis item={property} />
                                        <TypedocDeclaration d={property} />
                                    </span>
                                ))}
                        </span>
                        {"}"}
                    </>
                )
            }
            return <>Interface no children</>

        default:
            return <span>@@{d.kindString}</span>
    }
}

const TypedocTypeArguments = ({ args }: { args?: Type[] }) => {
    if (!args?.length) {
        return null
    }
    return (
        <>
            {"<"}
            {args.map((type, index) => (
                <TypedocType key={index} t={type} />
            ))}
            {">"}
        </>
    )
}

const TypedocType = ({ t, includeSynopsis = true }: { t: Type; includeSynopsis?: boolean }) => {
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
            return (
                <span>
                    {r.id ? <TypedocLink name={r.name} /> : <span>{r.name}</span>}
                    <TypedocTypeArguments args={r.typeArguments} />
                </span>
            )
        }
        case "reflection": {
            const r = t as ReflectionType
            return <TypedocDeclaration d={r.declaration} includeSynopsis={includeSynopsis} />
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

        case "union": {
            const u = t as UnionType
            return (
                <span>
                    {u.types.map((subtype, index) => (
                        <span className="union" key={index}>
                            <TypedocType t={subtype} />
                        </span>
                    ))}
                </span>
            )
        }

        case "literal":
            return <TypedocLiteral l={t as LiteralType} />

        case "conditional":
        case "indexedAccess":
        case "inferred":
        case "mapped":
        case "optional":
        case "predicate":
        case "query":
        case "rest":
        case "template-literal":
        case "named-tuple-member":
        case "typeOperator":
        case "unknown":
        default:
            return <>#{t.type}</>
    }
}

type TypedocItemRenderProps = {
    item: DeclarationReflection
}

const ParameterList = ({ sig }: { sig: SignatureReflection }) => {
    return (
        <>
            {sig.parameters.map(p => (
                <span key={p.name}>
                    {p.name}: <TypedocType t={p.type} />
                </span>
            ))}
        </>
    )
}

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
}

const Synopsis = ({ item }: { item: Reflection }) => {
    return item.comment ? (
        <>
            <div className="shortText">
                <Markdown link={({ href }) => <TypedocLink name={href} />}>
                    {item.comment.shortText.trim()}
                </Markdown>
            </div>
            {item.comment.text && (
                <div className="text">
                    <Markdown link={({ href }) => <TypedocLink name={href} />}>
                        {item.comment.text}
                    </Markdown>
                </div>
            )}
        </>
    ) : null
}

const Enumeration = ({ item }) => {
    const props = item.children.map(p => ({
        key: p.name,
        name: { name: p.name, required: false },
        type: item.kindString,
        description: p.comment?.shortText || "Not available",
        value: p.defaultValue
    }))
    return (
        <>
            <Synopsis item={item} />
            <ComponentProps
                displayName={item.name}
                properties={props}
                showValues={true}
                showDefaults={false}
            />
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
                        <h3>Synopsis</h3>
                        <pre className="synopsis">
                            <TypedocSignature s={s} includeSynopsis={false} />
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
            <Menu
                mode="inline"
                defaultSelectedKeys={[current]}
                selectedKeys={[current]}
                items={
                    Object.keys(groups).length < 2
                        ? Object.values(groups)[0].map(c => ({
                              key: c.name,
                              label: <TypedocLink name={c.name} />
                          }))
                        : Object.entries(groups).map(([name, items]) => ({
                              key: name,
                              className: "capitalize",
                              label: name,
                              children: items.map(c => ({
                                  key: c.name,
                                  label: <TypedocLink name={c.name} />
                              }))
                          }))
                }
            />
            {/*
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
*/}
        </StyledLeftNavMenu>
    )
}

const Interface = ({ item }: { item }) => {
    return (
        <div>
            <Synopsis item={item} />
            <pre>
                interface {item.name} <TypedocDeclaration d={item} />
            </pre>
            <pre className="debug">{JSON.stringify(item, null, 2)}</pre>
        </div>
    )
}

const Class = ({ item }: { item }) => {
    return (
        <div>
            <Synopsis item={item} />
            <pre>
                class {item.name} <TypedocDeclaration d={item} />
            </pre>
            <pre className="debug">{JSON.stringify(item, null, 2)}</pre>
        </div>
    )
}

const render_component = {
    "Type alias": TypeAlias,
    Interface,
    Enumeration,
    Function,
    Class
}

export default ({ title, slug, standaloneTypes }) => {
    // const { name: name_from_param } = useParams()
    // const name = name_from_param || slug
    const item = useTypedocItem(slug)

    if (!item) {
        return null
    }

    const Render =
        render_component[item.kindString] ||
        (() => <h4>No render component for {item.kindString}</h4>)

    return standaloneTypes ? (
        <DocumentationPage
            left={<TypedocLeftNav current={item.name} title={title} filter={() => true} />}
        >
            <ScrollToTopOnMount on={[item.name]} />
            <h1>
                {item.name} ({item.kindString})
            </h1>

            <StyledRender>
                <Render item={item} />
            </StyledRender>
        </DocumentationPage>
    ) : (
        <div>
            <ScrollToTopOnMount on={[item.name]} />
            <h1>
                {item.name} ({item.kindString})
            </h1>

            <StyledRender>
                <Render item={item} />
            </StyledRender>
        </div>
    )
}
