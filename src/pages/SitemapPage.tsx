import * as React from "react"
import { Section } from "../framework/components/Section"
import { root } from "../nav"
import { Node } from "../framework/providers/NavProvider"
import { Link } from "react-router-dom"

const SitemapItem = ({ node }: { node: Node }) => {
    return (
        <div>
            <Link to={node.path}>{node.title}</Link>
            {node.children?.length > 0 && (
                <ul>
                    {node.children.map(child => (
                        <li key={child.path}>
                            <SitemapItem node={child} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default () => {
    return (
        <Section>
            <h1>Site Map</h1>
            <SitemapItem node={root} />
        </Section>
    )
}
