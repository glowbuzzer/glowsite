import { useRootNav } from "../providers/NavProvider"
import { Link, useLocation } from "react-router-dom"
import { Layout, Menu } from "antd"
import * as React from "react"
import styled from "@emotion/styled"

import Gblogo from "../../images/logos/small-logo.svg"

const StyledTopNav = styled.div`
    .ant-menu-submenu-title {
        :hover {
            color: ${props => props.theme.color.MainPurple};
        }

        margin: 0 20px 0 20px;
    }

    .ant-layout-header {
      background: ${props => props.theme.color.BackgroundGrey};
    }

    .ant-menu {
      background: ${props => props.theme.color.BackgroundGrey};
    }
`

// doesn't work when placed in component above, I think because menu items are created dynamically
const StyledMenuItem = styled(Menu.Item)`
    &&& {
        padding: 8px 12px;
        height: auto;
        line-height: 20px;

        :hover {
            background: ${props => props.theme.color.MainPurple};
        }

        .title {
            font-weight: bold;
        }
    }
`

const StyledNavLogo = styled.div`
    float: left;
    width: 180px;
    background: ${props => props.theme.color.BackgroundGrey};
`

const { Header } = Layout

export const TopNav = () => {
    const { pathname } = useLocation()
    const nav = useRootNav()

    console.log(nav)

    // we are expecting each node in the top nav to have children

    return (
        <StyledTopNav>
            <Layout>
                <Header>
                    <StyledNavLogo>
                        <a href="/">
                            <img src={Gblogo} alt="logo" />
                        </a>
                    </StyledNavLogo>
                    <Menu mode="horizontal" selectedKeys={[pathname]}>
                        {nav.children.map(({ path, title, children }) =>
                            children?.length ? (
                                <Menu.SubMenu key={path} className={"capitalize"} title={title}>
                                    {children.map(({ path, title, subtitle, children }) => {
                                        const to = children.length ? children[0].path : path
                                        return (
                                            <StyledMenuItem key={path}>
                                                <Link to={to}>
                                                    <div className="title">{title}</div>
                                                    <div className="subtitle">{subtitle}</div>
                                                </Link>
                                            </StyledMenuItem>
                                        )
                                    })}
                                </Menu.SubMenu>
                            ) : (
                                <Menu.SubMenu>NO CHILDREN</Menu.SubMenu>
                            )
                        )}
                    </Menu>
                </Header>
            </Layout>
        </StyledTopNav>
    )
}
