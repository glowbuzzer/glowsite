import * as React from "react"
import ReactMarkdown from "react-markdown"
import { typedocLinkify } from "./typedocLinkify"
import { remarkEntities } from "../../../plugins/remark-entities.mjs"
import remarkGfm from "remark-gfm"
import { relative_path } from "../../typedoc/util"
import remarkDl from "remark-deflist"
import { GlowsiteLink } from "@glowsite"
import { Highlight } from "prism-react-renderer"

export const Markdown = props => {
    return (
        <ReactMarkdown
            {...props}
            remarkPlugins={[typedocLinkify, remarkEntities, remarkDl, remarkGfm]}
            components={{
                a: ({ node, href, ...rest }) => {
                    return href.startsWith("http") || href.startsWith("mailto") ? (
                        <a className="markdown-link" href={href} {...rest} target="_blank" />
                    ) : props.link ? (
                        props.link({ href, ...rest })
                    ) : (
                        <GlowsiteLink to={relative_path(href)} {...rest} />
                    )
                },
                pre({ node, children, ...props }) {
                    return (
                        <div className="glowbuzzer-highlight">
                            <pre {...props}>{children}</pre>
                        </div>
                    )
                },
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "")
                    return !inline && match ? (
                        <Highlight code={String(children).replace(/\n$/, "")} language={match[1]}>
                            {({ tokens, getLineProps, getTokenProps }) => (
                                <>
                                    {tokens.map((line, i) => {
                                        const { style, ...rest } = getLineProps({ line })
                                        return (
                                            <div key={i} {...rest}>
                                                {line.map((token, key) => {
                                                    const { style, ...rest } = getTokenProps({
                                                        token
                                                    })
                                                    return <span key={key} {...rest} />
                                                })}
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                        </Highlight>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                }
            }}
        >
            {props.children}
        </ReactMarkdown>
    )
}
