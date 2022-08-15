import {useCurrentNav, useRootNav} from "../nav"
import { Link, useLocation } from "react-router-dom"
import { Menu, Space } from "antd"
import * as React from "react"
import { useState } from "react"
import styled from "styled-components"

import { ReactComponent as StandardLogo } from "../../images/logos/small-logo.svg?inline"
import { ReactComponent as SmallLogo } from "../../images/logos/tiny-logo.svg?inline"

import { CloseOutlined, GithubOutlined, MenuOutlined, YoutubeOutlined } from "@ant-design/icons"
import { Section } from "../components/Section"

import { LATEST_VERSIONS } from "../../versions.mjs"
import { Search } from "./Search"

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

        @media (max-width: 1200px) {
            font-size: inherit;
        }

        .ant-menu-submenu {
            padding-bottom: 10px !important;
        }

        .ant-menu-submenu {
            margin: 0 0 !important;

            @media (max-width: 1600px) {
                margin: 0 0 !important;
                padding: 0 10px 10px 10px !important;
            }
        }

        .ant-menu-submenu-title {
            margin: 0 6px;

            @media (max-width: 1600px) {
                margin: 0 0;
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

    .latest-release {
        color: ${props => props.theme.color.MainPurple};
        border: 1px dashed ${props => props.theme.color.MainPurple};
        border-radius: 14px;
        padding: 2px 8px;
    }

    @media (max-width: 1010px) {
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

const NavMenu = ({ mode, onNavigate = undefined }) => {
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
            className="nav-menu"
            // className={mode}
            mode={mode}
            openKeys={openKeys}
            defaultSelectedKeys={[...ancestors, mode + ":" + pathname]}
            onOpenChange={onOpenChange}
            subMenuCloseDelay={1}
            // forceSubMenuRender
            items={nav.children
                // don't include nodes like 404 that have no children
                // or nodes that are outside of nav
                .filter(node => node.children.length && !node.unlinked)
                .map(({ path, title, children }) => ({
                    key: mode + ":" + path,
                    label: title,
                    popupOffset: [0, 20],
                    popupClassName: "nav-sub-menu-" + mode,
                    children: children
                        .filter(n => !n.unlinked) // don't include nodes that are outside of nav
                        .map(({ path, title, subtitle, children }) => {
                            const to = children.length ? children[0].path : path
                            return {
                                key: mode + ":" + path,
                                label: (
                                    <Link to={to} onClick={onNavigate}>
                                        <div className="title">{title}</div>
                                        {mode === "horizontal" && (
                                            <div className="subtitle">{subtitle}</div>
                                        )}
                                    </Link>
                                )
                            }
                        })
                }))}
        />
    )
}

export const TopNav = ({ hideVersionLink }: { hideVersionLink?: boolean }) => {
    const [showMenu, setShowMenu] = useState(false)

    const node=useCurrentNav()

    if ( node?.landing ) {
        return null
    }

    // we are expecting each node in the top nav to have children
    const downloads_site = window.location.href.indexOf("downloads.glowbuzzer.com") >= 0

    return (
        <StyledTopNav>
            <Section background={"BackgroundGrey"} guttered>
                <div className="nav-wide">
                    {downloads_site ? (
                        <a href="https://www.glowbuzzer.com">
                            <StandardLogo height={"43px"} width={"139px"} />
                        </a>
                    ) : (
                        <Link className="logo" to="/">
                            <StandardLogo height={"43px"} width={"139px"} />
                        </Link>
                    )}

                    <NavMenu mode="horizontal" />

                    <Space size="middle" align="center">
                        {hideVersionLink || (
                            <Link className="latest-release" to="/downloads">
                                {LATEST_VERSIONS.gbc_version}
                            </Link>
                        )}
                        <a href={"https://www.github.com/glowbuzzer"}>
                            <GithubOutlined style={{ fontSize: "24px", color: "#9254de" }} />
                        </a>
                        <a href={"https://www.youtube.com/channel/UCd5lSqWK5Ep4su1sHx6kkUA"}>
                            <YoutubeOutlined style={{ fontSize: "24px", color: "#9254de" }} />
                        </a>
                        <Search />
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
                        <NavMenu mode="inline" onNavigate={() => setShowMenu(false)} />
                    </div>
                </Section>
            )}
        </StyledTopNav>
    )
}
