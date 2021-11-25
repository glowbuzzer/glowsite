import { useParams } from "react-router"
import { Link, useLocation } from "react-router-dom"
import { useNavNode, useNavTaggedNodes } from "../../framework/nav"
import { Section } from "../../framework/components/Section"
import { DocumentationPage } from "../../framework/layouts/DocumentationPage"
import * as React from "react"
import { Suspense } from "react"
import { Loading } from "../../framework/components/Loading"

const BlogRender = ({ path }) => {
    if (!path?.length) {
        return null
    }

    const node = useNavNode(path)
    if (!node?.component) {
        console.warn("Node or component not found for", path)
        return null
    }

    const { title, ...props } = node
    const Component = React.lazy(node.component)

    return (
        <Suspense fallback={<Loading />}>
            <Component title={title} {...props} />
        </Suspense>
    )
}

export const BlogListByTag = () => {
    const { pathname, search } = useLocation()
    const { tag } = useParams<{ tag: string }>()
    const blogs = useNavTaggedNodes(tag).sort((a, b) => a.title.localeCompare(b.title))

    return (
        <DocumentationPage
            left={
                <>
                    <Section>
                        <h2>Blogs tagged '{tag}'</h2>
                    </Section>
                    <Section>
                        <div>
                            {blogs.map(node => (
                                <div key={node.path}>
                                    <div className="title">
                                        <Link to={pathname + "?" + node.path}>{node.title}</Link>
                                    </div>
                                    <div className="subtitle">{node.subtitle}</div>
                                </div>
                            ))}
                        </div>
                    </Section>
                </>
            }
        >
            <BlogRender path={search?.substr(1)} />
        </DocumentationPage>
    )
}
