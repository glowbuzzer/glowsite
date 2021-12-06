import { useParams } from "react-router"
import { Link, useLocation } from "react-router-dom"
import { useNavTaggedNodes } from "../../framework/nav"
import { DocumentationPage } from "../../framework/layouts/DocumentationPage"
import * as React from "react"
import { Suspense } from "react"
import { Loading } from "../../framework/components/Loading"
import { Node } from "../../framework/providers/NavProvider"
import { StyledLeftNavMenu } from "../../framework/nav/ContexualLeftNav"
import { Menu } from "antd"
import styled from "styled-components"

const BlogRender = ({ node }: { node: Node }) => {
    if (!node?.component) {
        console.warn("Node or component not found for", node)
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

const StyledMenuItem = styled(Menu.Item)`
    &&& {
        height: auto;
        line-height: 30px;
        max-width: 300px;
        white-space: normal;
        padding-right: 8px;
    }

    .item-title {
        padding-top: 8px;
        padding-bottom: 4px;
        line-height: normal;
        font-weight: bold;
    }

    .item-subtitle {
        line-height: normal;
        padding-bottom: 8px;
    }
`

export const BlogListByTag = () => {
    const { pathname, search } = useLocation()
    const { tag:tag_raw } = useParams<{ tag: string }>()
    const tag=decodeURIComponent(tag_raw)
    const blogs = useNavTaggedNodes(tag).sort((a, b) => a.title.localeCompare(b.title))

    const url_tag = search?.substr(1)
    const currentNode = blogs.find(b => b.path === url_tag) || blogs[0]

    return (
        <DocumentationPage
            left={
                <StyledLeftNavMenu>
                    <div className="title">Blogs tagged '{tag}'</div>
                    <Menu mode="inline" defaultSelectedKeys={[currentNode.path]}>
                        {blogs.map(({ name, title, subtitle, path, children }) => {
                            return (
                                <StyledMenuItem key={path}>
                                    <Link to={pathname + "?" + path}>
                                        <div className="item-title">{title}</div>
                                        <div className="item-subtitle">{subtitle}</div>
                                    </Link>
                                </StyledMenuItem>
                            )
                        })}
                    </Menu>
                </StyledLeftNavMenu>
            }
        >
            <BlogRender node={currentNode} />
        </DocumentationPage>
    )
}
