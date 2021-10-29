import { useRootNav } from "../providers/NavProvider"
import { Link, useLocation } from "react-router-dom"
import { Menu, Layout } from "antd"
import * as React from "react"
import styled from "@emotion/styled"

import {GbColours} from "../utils/GbColours";

import Gblogo from '../../images/logos/small-logo.svg'

const StyledTopNav = styled.div`
    .ant-menu-submenu-title {
        :hover {
            color: ${GbColours.MainPurple};
        }   
            margin: 0px 20px 0px 20px;

    }
 
 .ant-layout-header {
    background: ${GbColours.BackgroundGrey};
    }

.ant-menu {
        background: ${GbColours.BackgroundGrey};
        }

 }
`


const StyledNavLogo = styled.div`
 float: left;
  width: 180px;
    background: ${GbColours.BackgroundGrey};
`

const { Header } = Layout;

export const TopNav = () => {
    const { pathname } = useLocation()
    const nav = useRootNav()

    // we are expecting each node in the top nav to have children

    return (

        <StyledTopNav>
            <Layout>
                <Header>
                    <StyledNavLogo>
                        <a href="/"><img src={Gblogo}/></a>
                    </StyledNavLogo>
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

                </Header>
            </Layout>
        </StyledTopNav>
    )
}
