import { Link, useLocation } from "react-router-dom"
import * as React from "react"
import { Node, useOuterNav } from "../providers/NavProvider"
import { Menu } from "antd"
import styled from "@emotion/styled"

function* ancestors(node: Node): IterableIterator<Node> {
    yield node
    if (node.parent) {
        yield* ancestors(node.parent)
    }
}

const StyledMenu = styled.div`
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
    const { title, children } = node
    const open = Array.from(ancestors(current.parent)).map(n => n.path)

    return (
        <StyledMenu>
            <div className="title capitalize">{title}</div>
            <Menu mode="inline" defaultSelectedKeys={[pathname]} defaultOpenKeys={open}>
                {children.map(({ name, title, path, children }) => {
                    if (children?.length) {
                        return (
                            <Menu.SubMenu key={path} className={"capitalize"} title={title}>
                                {children.map(({ path, title, name }) => (
                                    <Menu.Item key={path} className="capitalize">
                                        <Link to={path}>{title || name}</Link>
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        )
                    }
                    return (
                        <Menu.Item key={path} className="capitalize">
                            <Link to={path}>{title || name}</Link>
                        </Menu.Item>
                    )
                })}
            </Menu>
        </StyledMenu>
    )
}
