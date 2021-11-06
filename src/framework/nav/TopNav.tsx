import { useRootNav } from "../providers/NavProvider"
import { Link, useLocation } from "react-router-dom"
import { Layout, Menu, Space } from "antd"
import * as React from "react"
import styled from "@emotion/styled"

import { ReactComponent as StandardLogo } from "../../images/logos/small-logo.svg?inline"
import { ReactComponent as SmallLogo } from "../../images/logos/tiny-logo.svg?inline"

import { GithubOutlined, MenuOutlined, YoutubeOutlined } from "@ant-design/icons"

const StyledTopNav = styled.div`
    .nav-narrow {
        display: none;
    }

    @media (max-width: 950px) {
        .nav-wide {
            display: none;
        }

        .nav-narrow {
            display: block;
            text-align: right;
            font-size: 1.5em;
            cursor: pointer;
        }
    }

    &&& {
        .ant-menu-submenu {
            margin: 0 8px;
        }
    }

    .ant-menu-submenu-title {
        :hover {
        }

        margin: 0 20px 0 20px;

        @media (max-width: 1080px) {
            margin: 0 8px 0 8px;
        }
    }

    .ant-layout-header {
        background: ${props => props.theme.color.TopNav};
    }

    .ant-menu {
        background: ${props => props.theme.color.TopNav};
    }

    height: 66px;
`

// doesn't work when placed in component above, I think because menu items are created dynamically
const StyledMenuItem = styled(Menu.Item)`
    &&& {
        padding: 8px 12px;
        height: auto;
        line-height: 20px;

        a {
            color: grey;
        }

        :hover {
            background: ${props => props.theme.color.MainPurple};

            a {
                color: white;
            }
        }

        .title {
            font-weight: bold;
        }
    }
`

const StyleOffsiteLinks = styled.div`
    float: right;
`

const StyledNavLogo = styled.div`
    float: left;
    padding: 10px 20px 10px 0;
    height: 64px;
`

const { Header } = Layout

export const TopNav = () => {
    const { pathname } = useLocation()
    const nav = useRootNav()

    // we are expecting each node in the top nav to have children

    return (
        <StyledTopNav>
            <Layout>
                <Header>
                    <div className="nav-wide">
                        <StyledNavLogo>
                            <a href="/">
                                <StandardLogo height={"43px"} width={"139px"} />
                            </a>
                        </StyledNavLogo>
                        <StyleOffsiteLinks>
                            <Space size="middle">
                                <a href={"https://www.github.com/glowbuzzer"}>
                                    <GithubOutlined
                                        style={{ fontSize: "24px", color: "#9254de" }}
                                    />
                                </a>
                                <a href={"https://www.youtube.com/glowbuzzer"}>
                                    <YoutubeOutlined
                                        style={{ fontSize: "24px", color: "#9254de" }}
                                    />
                                </a>
                            </Space>
                        </StyleOffsiteLinks>

                        <Menu mode="horizontal" selectedKeys={[pathname]}>
                            {nav.children.map(({ path, title, children }) =>
                                children?.length ? (
                                    <Menu.SubMenu key={path} title={title}>
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
                                    <Menu.SubMenu key={path}>NO CHILDREN</Menu.SubMenu>
                                )
                            )}
                        </Menu>
                    </div>
                    <div className="nav-narrow">
                        <StyledNavLogo>
                            <a href="/">
                                <SmallLogo height={"43px"} width={"43px"} />
                            </a>
                        </StyledNavLogo>
                        <MenuOutlined onClick={() => alert("todo")} />
                    </div>
                </Header>
            </Layout>
        </StyledTopNav>
    )
}
