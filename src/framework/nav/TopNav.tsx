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
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    .logo {
        display: block;
        padding-top: 10px;
    }

    .ant-menu-horizontal {
        display: inline-block;
        text-align: right;
        background: none;
        border: none;
        padding-top: 5px;
        flex-grow: 1;
        font-size: 1.1em;

        .ant-menu-submenu {
            padding-bottom: 10px !important;
        }

        .ant-menu-submenu {
            margin: 0 12px !important;

            @media (max-width: 1200px) {
                margin: 0 4px !important;
            }
        }

        .ant-menu-submenu-title {
            margin: 0 12px;

            @media (max-width: 1200px) {
                margin: 0 4px;
            }
        }
    }

    .nav-narrow,
    .nav-narrow-open {
        display: none;
    }

    .nav-wide {
        display: flex;
        gap: 20px;
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

        .nav-narrow-open {
            display: block;
        }
    }
`

// doesn't work when placed in component above, I think because menu items are created dynamically
const StyledMenuItem = styled(Menu.Item)`
    &&&.horizontal {
        padding: 8px 12px;
        height: auto;
        line-height: 20px;

        @media (max-width: 950px) {
            // avoids annoying flash of horizontal menu in mobile mode
            display: none;
        }

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
    const ancestors = pathname
        .split("/")
        .slice(1, -1)
        .map((p, index, paths) => mode + ":/" + paths.slice(0, index + 1).join("/"))

    const [openKeys, setOpenKeys] = React.useState(mode === "inline" ? ancestors : [])

    const onOpenChange = keys => {
        const last = keys[keys.length - 1]
        setOpenKeys(last ? [last] : [])
    }

    // antd uses the key to construct an id, so we need to make them different based on mode, to avoid odd things happening
    // (because we render this menu twice in different modes: inline on mobile and horizontal on desktop)

    return (
        <Menu
            key={mode}
            className={mode}
            mode={mode}
            openKeys={openKeys}
            defaultSelectedKeys={[...ancestors, mode + ":" + pathname]}
            onOpenChange={onOpenChange}
            forceSubMenuRender
        >
            {nav.children
                .filter(node => node.children.length) // don't include nodes like 404 that have no children
                .map(({ path, title, children }) => (
                    <Menu.SubMenu key={mode + ":" + path}  title={<span>{title}</span>} popupOffset={[0, 20]}>
                        {children.map(({ path, title, subtitle, children }) => {
                            const to = children.length ? children[0].path : path
                            return (
                                <StyledMenuItem key={mode + ":" + path} className={mode}>
                                    <Link to={to}>
                                        <div className="title">{title}</div>
                                        <div className="subtitle">{subtitle}</div>
                                    </Link>
                                </StyledMenuItem>
                            )
                        })}
                    </Menu.SubMenu>
                ))}
        </Menu>
    )
}

export const TopNav = () => {
    const [showMenu, setShowMenu] = useState(false)

    // we are expecting each node in the top nav to have children

    return (
        <StyledTopNav>
            <Section background={"BackgroundGrey"} guttered>
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
            </Section>
            {showMenu && (
                <Section background={"White"}>
                    <div className="nav-narrow-open">
                        <NavMenu mode="inline" />
                    </div>
                </Section>
            )}
        </StyledTopNav>
    )
}
