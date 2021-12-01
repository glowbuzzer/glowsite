import { Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { typedocLinkify } from "./typedocLinkify"

export const Markdown = props => {
    return (
        <ReactMarkdown
            {...props}
            remarkPlugins={[typedocLinkify]}
            components={{
                a: ({ node, href, ref, ...rest }) => <Link to={href} {...rest} />
            }}
        >
            {props.children}
        </ReactMarkdown>
    )
}
