import * as React from "react"
import {
    typedocNonEmptyEnumerationFilter,
    useTypedocGrouped,
    useTypedocItem
} from "./typedoc-hooks"
import { DocumentationPage } from "../framework/layouts/DocumentationPage"
import { ComponentProps } from "../framework/components/ComponentProps"
import { Link } from "react-router-dom"
import { Markdown } from "../framework/components/Markdown"
import { StyledLeftNavMenu } from "../framework/nav/ContexualLeftNav"
import { Menu } from "antd"
import {
    ArrayType,
    Comment,
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
import { kindOf, ReflectionKindLocal } from "./util"
import { useNavBySlug } from "../framework/nav"
import { ScrollToTopOnMount } from "../framework/components/ScrollToTopOnMount"

const StyledRender = styled.div`
    .debug {
        display: none; // comment to show raw typedoc json
    }

    .token {
        filter: brightness(0.75);
    }

    .synopsis {
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
    }

    .typedoc.array > .typedoc.compose {
        :before {
            content: "(";
        }

        :after {
            content: ")";
        }
    }

    .intersection-item:not(:last-child):after {
        content: " & ";
    }

    .union-item:not(:last-child):after {
        content: " | ";
    }

    .typedoc.synopsis {
        font-family: monospace;
    }

    .typedoc.arguments {
        > .typedoc.type:not(:last-child):after {
            content: ", ";
        }
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
            border-left: 2px solid ${props => props.theme.colorBorder};
            margin-top: 14px;
            padding-top: 0;
            padding-bottom: 0;
            padding-left: 8px;
            color: ${props => props.theme.colorTextSecondary};

            p:only-child {
                margin: 0;
            }
        }

        .text {
            padding-top: 10px;
            padding-bottom: 3px;

            p {
                margin: 0;
            }

            p + p {
                margin-top: 10px;
            }
        }

        .param .text {
            padding-top: 5px;
            margin-top: 0;
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
    if (!node) {
        return name
    }
    const to = node.path === generic_path ? generic_path.replace(":name", name) : node.path
    return (
        <Link className="markdown-link" to={to}>
            {content || name}
        </Link>
    )
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
    switch (d.kind as unknown as ReflectionKindLocal) {
        case ReflectionKindLocal.TypeLiteral:
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
            // assume it's empty
            return (
                <span>
                    {"{"}
                    {"}"}
                </span>
            )

        case ReflectionKindLocal.Property:
            return (
                <>
                    {d.name}
                    {d.flags.isOptional && "?"}: <TypedocType t={d.type} />
                    {d.defaultValue && <span> = {d.defaultValue}</span>}
                </>
            )

        case ReflectionKindLocal.Accessor:
            return (
                <>
                    <Synopsis item={d.getSignature} />
                    {d.name}: <TypedocType t={d.getSignature?.type} includeSynopsis={false} />
                </>
            )

        case ReflectionKindLocal.Constructor:
            return <TypedocConstructor s={d.signatures[0]} />

        case ReflectionKindLocal.Method:
            return (
                <TypedocSignature
                    s={d.signatures?.[0]}
                    includeSynopsis={true}
                    isOptional={d.flags.isOptional}
                />
            )

        case ReflectionKindLocal.Interface:
        case ReflectionKindLocal.Class:
            if (d.children?.length) {
                return (
                    <>
                        {"{"}
                        <span>
                            {d.children
                                .filter(
                                    p =>
                                        !(
                                            /*p.flags?.isProtected ||*/ p.flags
                                                ?.isPrivate /*|| p.inheritedFrom*/
                                        )
                                )
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
            return <span>@@{kindOf(d.kind)}</span>
    }
}

const TypedocTypeArguments = ({ args }: { args?: Type[] }) => {
    if (!args?.length) {
        return null
    }
    return (
        <>
            {"<"}
            <span className="typedoc arguments">
                {args.map((type, index) => (
                    <TypedocType key={index} t={type} />
                ))}
            </span>
            {">"}
        </>
    )
}

const TypedocType = ({ t, includeSynopsis = true }: { t: Type; includeSynopsis?: boolean }) => {
    switch (t?.type) {
        case "array":
            return (
                <span className="typedoc type array">
                    <TypedocType t={(t as ArrayType).elementType} />
                    []
                </span>
            )
        case "intrinsic":
            return (
                <span className="typedoc type intrinsic token builtin">
                    {(t as IntrinsicType).name}
                </span>
            )
        case "reference": {
            const r = t as ReferenceType & { target? }
            return (
                <span className="typedoc type reference">
                    {r.target ? <TypedocLink name={r.name} /> : <span>{r.name}</span>}
                    <TypedocTypeArguments args={r.typeArguments} />
                </span>
            )
        }
        case "reflection": {
            const r = t as ReflectionType
            return (
                <span className="typedoc type reflection">
                    <TypedocDeclaration d={r.declaration} includeSynopsis={includeSynopsis} />
                </span>
            )
        }
        case "tuple": {
            const r = t as TupleType
            return (
                <span className="typedoc type tuple">
                    [
                    {r.elements.map((subtype, index) => (
                        <span key={index} className="tuple-item">
                            <TypedocType t={subtype} />
                        </span>
                    ))}
                    ]
                </span>
            )
        }

        case "intersection": {
            const r = t as IntersectionType
            return (
                <span className="typedoc type compose intersection">
                    {r.types.map((subtype, index) => (
                        <span className="intersection-item" key={index}>
                            <TypedocType t={subtype} />
                        </span>
                    ))}
                </span>
            )
        }

        case "union": {
            const u = t as UnionType
            return (
                <span className="typedoc type compose union">
                    {u.types.map((subtype, index) => (
                        <span className="union-item" key={index}>
                            <TypedocType t={subtype} />
                        </span>
                    ))}
                </span>
            )
        }

        case "literal":
            return (
                <span className="typedoc type literal">
                    <TypedocLiteral l={t as LiteralType} />
                </span>
            )

        case "conditional":
        case "indexedAccess":
        case "inferred":
        case "mapped":
        case "optional":
        case "predicate":
        case "query":
        case "rest":
        case "templateLiteral":
        case "namedTupleMember":
        case "typeOperator":
        case "unknown":
        default:
            return <span className={"typedoc type " + t?.type}>##{t?.type}</span>
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
            <div className="typedoc type synopsis">
                type {item.name} = <TypedocType t={item.type} />
            </div>
            <PropertyTable item={item} />
        </div>
    )
}

export function typedocCommentToMarkdown(comment: Comment, shortText = false) {
    if (!comment?.summary) {
        return null
    }
    const complete = comment.summary
        .map(p => {
            switch (p.kind) {
                case "text":
                case "code":
                    return p.text
                case "inline-tag":
                    switch (p.tag) {
                        case "@link":
                            return `[${p.text}](${p.text})`
                    }
                    return p.text
            }
        })
        .join("")

    return shortText ? complete.split("\n")[0] : complete
}

const Synopsis = ({ item }: { item: Reflection }) => {
    return item?.comment ? (
        <div className="text">
            <Markdown link={({ href }) => <TypedocLink name={href} />}>
                {typedocCommentToMarkdown(item.comment)}
            </Markdown>
        </div>
    ) : null

    // return item.comment ? (
    //     <>
    //         <div className="shortText">
    //             <Markdown link={({ href }) => <TypedocLink name={href} />}>
    //                 {item.comment.shortText?.trim()}
    //             </Markdown>
    //         </div>
    //         {item.comment.text && (
    //             <div className="text">
    //                 <Markdown link={({ href }) => <TypedocLink name={href} />}>
    //                     {item.comment.text}
    //                 </Markdown>
    //             </div>
    //         )}
    //     </>
    // ) : null
}

const Enumeration = ({ item }) => {
    const props =
        item.children
            ?.map(p => ({
                key: p.name,
                name: { name: p.name, required: false },
                type: item.kindString,
                description: typedocCommentToMarkdown(p.comment),
                value: p.type?.value || "0"
            }))
            ?.sort((a, b) => a.value - b.value) || []

    return (
        <>
            <Synopsis item={item} />
            <ComponentProps
                displayName={item.name}
                properties={props}
                showValues={true}
                showDefaults={false}
            />
            <pre className="debug">{JSON.stringify(item, null, 2)}</pre>
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
                        <div className="typedoc function synopsis">
                            <TypedocSignature s={s} includeSynopsis={false} />
                        </div>
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
                        : Object.entries(groups)
                              .filter(([n]) => !["Variable", "Function"].includes(n))
                              .map(([name, items]) => ({
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
            <div className="typedoc interface synopsis">
                interface {item.name} <TypedocDeclaration d={item} />
            </div>
            <pre className="debug">{JSON.stringify(item, null, 2)}</pre>
        </div>
    )
}

const Class = ({ item }: { item: DeclarationReflection }) => {
    const supers = item.extendedTypes?.filter(t => t.type === "reference").map(t => (t as any).name)

    return (
        <div>
            <Synopsis item={item} />
            <div className="typedoc class synopsis">
                class {item.name}{" "}
                {supers?.length > 0 && (
                    <span>
                        extends{" "}
                        {supers.map(s => (
                            <TypedocLink key={s} name={s} />
                        ))}{" "}
                    </span>
                )}
                <TypedocDeclaration d={item} />
            </div>
            <pre className="debug">{JSON.stringify(item, null, 2)}</pre>
        </div>
    )
}

const render_component = {
    [ReflectionKindLocal.TypeAlias]: TypeAlias,
    [ReflectionKindLocal.Interface]: Interface,
    [ReflectionKindLocal.Enum]: Enumeration,
    [ReflectionKindLocal.Function]: Function,
    [ReflectionKindLocal.Class]: Class
}

export default ({ title, slug, standaloneTypes }) => {
    // const { name: name_from_param } = useParams()
    // const name = name_from_param || slug
    const item = useTypedocItem(slug)

    if (!item) {
        return null
    }

    const Render =
        render_component[item.kind] || (() => <h4>No render component for {kindOf(item.kind)}</h4>)

    return standaloneTypes ? (
        <DocumentationPage
            // TODO: we should filter out some of these!
            left={
                <TypedocLeftNav
                    current={item.name}
                    title={title}
                    filter={typedocNonEmptyEnumerationFilter}
                />
            }
        >
            <ScrollToTopOnMount on={[item.name]} />
            <h1>
                {item.name} ({kindOf(item.kind)})
            </h1>

            <StyledRender>
                <Render item={item} />
            </StyledRender>
        </DocumentationPage>
    ) : (
        <div>
            <ScrollToTopOnMount on={[item.name]} />
            <h1>
                {item.name} ({kindOf(item.kind)})
            </h1>

            <StyledRender>
                <Render item={item} />
            </StyledRender>
        </div>
    )
}
