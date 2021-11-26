import { Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"

export const Markdown = props => {
    return (
        <ReactMarkdown
            {...props}
            components={{
                a: ({ node, ...props }) => <Link to={props.href} {...props} />
            }}
        >
            {props.children}
        </ReactMarkdown>
    )
}
