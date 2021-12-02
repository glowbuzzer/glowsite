import { Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { typedocLinkify } from "./typedocLinkify"
// @ts-ignore not sure why but IDEA doesn't like this reference but vite is happy
import {remarkEntities} from "../../../plugins/remark-entities.mjs"

export const Markdown = props => {
    return (
        <ReactMarkdown
            {...props}
            remarkPlugins={[typedocLinkify, remarkEntities]}
            components={{
                a: ({ node, href, ref, ...rest }) => <Link to={href} {...rest} />
            }}
        >
            {props.children}
        </ReactMarkdown>
    )
}
