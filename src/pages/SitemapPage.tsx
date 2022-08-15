import * as React from "react"
import { Section } from "../framework/components/Section"
import { root } from "../nav"
import { Node } from "../framework/providers/NavProvider"
import { Link } from "react-router-dom"

const SitemapItem = ({ node }: { node: Node }) => {
    const remove_unlinked = c => !c.unlinked
    const children = node.children?.filter(remove_unlinked)

    return (
        <div>
            {node.component || node.include ? (
                <Link className="sitemap-link" to={node.path}>
                    {node.title}
                </Link>
            ) : (
                <span>{node.title}</span>
            )}

            {children?.length > 0 && (
                <ul>
                    {children.map(child => (
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
