import { useRootNav } from "../providers/NavProvider"
import { Link, useLocation } from "react-router-dom"
import { Menu, Space } from "antd"
import * as React from "react"
import { useState } from "react"
import styled from "@emotion/styled"

import { ReactComponent as StandardLogo } from "../../images/logos/small-logo.svg?inline"
import { ReactComponent as SmallLogo } from "../../images/logos/tiny-logo.svg?inline"

import { CloseOutlined, GithubOutlined, MenuOutlined, YoutubeOutlined } from "@ant-design/icons"
import { Section } from "../components/Section"

const StyledTopNav = styled.div`
    .logo {
        display: block;
        padding-top: 10px;
    }

    .ant-menu {
        padding-top: 5px;
        flex-grow: 1;
        font-size: 1.1em;
    }

    .ant-menu-submenu {
        padding-bottom: 10px !important;
    }

    .nav-narrow {
        display: none;
    }

    .nav-wide {
        display: flex;
    }

    @media (max-width: 950px) {
        .nav-wide {
            display: none;
        }

        .nav-narrow {
            display: flex;
            align-items: center;
            justify-content: space-between;
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
        margin: 0 20px 0 20px;

        @media (max-width: 1080px) {
            margin: 0 8px 0 8px;
        }
    }

    .ant-menu {
        background: none;
        border: none;
    }

    //height: 66px;
`

// doesn't work when placed in component above, I think because menu items are created dynamically
const StyledMenuItem = styled(Menu.Item)`
    &.horizontal {
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

const NavMenu = ({ mode }) => {
    const { pathname } = useLocation()
    const nav = useRootNav()
    const ancestors = pathname.split("/").map((_, index, path) => path.slice(0, index).join("/"))

    return (
        <Menu mode={mode} defaultOpenKeys={ancestors} selectedKeys={[pathname]}>
            {nav.children.map(({ path, title, children }) =>
                children?.length ? (
                    <Menu.SubMenu key={path} title={title} popupOffset={[0, 20]}>
                        {children.map(({ path, title, subtitle, children }) => {
                            const to = children.length ? children[0].path : path
                            return (
                                <StyledMenuItem key={path} className={mode}>
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
    )
}

export const TopNav = () => {
    const [showMenu, setShowMenu] = useState(false)

    // we are expecting each node in the top nav to have children

    return (
        <>
            <Section background={"BackgroundGrey"} guttered>
                <StyledTopNav>
                    <div className="nav-wide">
                        <Link className="logo" to="/">
                            <StandardLogo height={"43px"} width={"139px"} />
                        </Link>
                        <NavMenu mode="horizontal" />
                        <Space size="middle">
                            <a href={"https://www.github.com/glowbuzzer"}>
                                <GithubOutlined style={{ fontSize: "24px", color: "#9254de" }} />
                            </a>
                            <a href={"https://www.youtube.com/channel/UCd5lSqWK5Ep4su1sHx6kkUA"}>
                                <YoutubeOutlined style={{ fontSize: "24px", color: "#9254de" }} />
                            </a>
                        </Space>
                    </div>
                    <div className="nav-narrow">
                        <Link className="logo" to="/">
                            <SmallLogo height={"43px"} width={"43px"} />
                        </Link>
                        {showMenu ? (
                            <CloseOutlined onClick={() => setShowMenu(false)} />
                        ) : (
                            <MenuOutlined onClick={() => setShowMenu(true)} />
                        )}
                    </div>
                </StyledTopNav>
            </Section>
            <Section>{showMenu && <NavMenu mode="inline" />}</Section>
        </>
    )
}
