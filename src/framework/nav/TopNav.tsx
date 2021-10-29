import { useRootNav } from "../providers/NavProvider"
import { Link, useLocation } from "react-router-dom"
import { Menu } from "antd"
import * as React from "react"
import styled from "@emotion/styled"
import {GbColours} from "../utils/GbColours";

const StyledTopNav = styled.div`
    .ant-menu-submenu-title {
        :hover {
            color: ${GbColours.MainPurple};
        }   
    }
 
`

import Gblogo from '../../images/logos/small-logo.svg'

export const TopNav = () => {
    const { pathname } = useLocation()
    const nav = useRootNav()

    // we are expecting each node in the top nav to have children

    return (

        <StyledTopNav>

            <Menu mode="horizontal" selectedKeys={[pathname]}>
                {nav.children.map(({ path, title, children }) =>
                    children?.length ? (
                        <Menu.SubMenu key={path} className={"capitalize"} title={title}>
                            {children.map(({ type, path, title, children }) => {
                                const to = children.length ? children[0].path : path
                                return (
                                    <Menu.Item key={path}>
                                        <Link to={to}>{title}</Link>
                                    </Menu.Item>
                                )
                            })}
                        </Menu.SubMenu>
                    ) : (
                        <Menu.SubMenu>NO CHILDREN</Menu.SubMenu>
                    )
                )}
            </Menu>
        </StyledTopNav>
    )
}
