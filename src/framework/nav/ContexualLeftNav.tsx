import { Link, useLocation } from "react-router-dom"
import * as React from "react"
import { Node } from "../providers/NavProvider"
import { useOuterNav } from "../nav"
import { Menu } from "antd"
import styled from "styled-components"

function* ancestors(node: Node): IterableIterator<Node> {
    yield node
    if (node?.parent) {
        yield* ancestors(node.parent)
    }
}

export const StyledLeftNavMenu = styled.div`
    background: white;
  
    .title {
        padding: 12px;
        font-size: 1.2em;
        font-weight: bold;
    }

    .ant-menu {
        height: 100%;
    }
`

export const ContexualLeftNav = () => {
    const { pathname } = useLocation()

    const [current, node] = useOuterNav(pathname)
    const open = Array.from(ancestors(current?.parent)).map(n => n?.path)

    return (
        <StyledLeftNavMenu>
            <div className="title">{node?.title}</div>
            <Menu mode="inline" defaultSelectedKeys={[pathname]} defaultOpenKeys={open}>
                {node?.children.map(({ name, title, path, children }) => {
                    if (children?.length) {
                        return (
                            <Menu.SubMenu key={path} title={title}>
                                {children.map(({ path, title, name }) => (
                                    <Menu.Item key={path}>
                                        <Link to={path}>{title || name}</Link>
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        )
                    }
                    return (
                        <Menu.Item key={path}>
                            <Link to={path}>{title || name}</Link>
                        </Menu.Item>
                    )
                })}
            </Menu>
        </StyledLeftNavMenu>
    )
}
