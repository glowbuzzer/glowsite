import { Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { typedocLinkify } from "./typedocLinkify"
// @ts-ignore not sure why but IDEA doesn't like this reference but vite is happy
import { remarkEntities } from "../../../plugins/remark-entities.mjs"
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {tomorrow} from 'react-syntax-highlighter/dist/esm/styles/prism'

export const Markdown = props => {
    return (
        <ReactMarkdown
            {...props}
            remarkPlugins={[typedocLinkify, remarkEntities]}
            components={{
                a: ({ node, href, ref, ...rest }) => <Link to={href} {...rest} />,
                code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            style={tomorrow}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        />
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
