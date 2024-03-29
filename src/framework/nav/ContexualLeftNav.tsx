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
  background: ${props => props.theme.colorBgContainer};

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
            <Menu
                mode="inline"
                defaultSelectedKeys={[pathname]}
                selectedKeys={[pathname]}
                defaultOpenKeys={open}
                // openKeys={open}
                items={node?.children.map(({ name, title, path, children }) => {
                    return {
                        key: path,
                        label: children?.length ? title : <Link to={path}>{title || name}</Link>,
                        children:
                            children.length &&
                            children?.map(({ path, title, name }) => ({
                                key: path,
                                label: <Link to={path}>{title || name}</Link>
                            }))
                    }
                })}
            />
        </StyledLeftNavMenu>
    )
}
