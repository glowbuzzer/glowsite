import { useCurrentNav, useRootNav } from "../nav"
import { Link, useLocation } from "react-router-dom"
import { Menu, Space, Tooltip } from "antd"
import * as React from "react"
import { MouseEvent, useState } from "react"
import styled from "styled-components"

import { ReactComponent as StandardLogo } from "../../images/logos/small-logo.svg?inline"
import { ReactComponent as SmallLogo } from "../../images/logos/tiny-logo.svg?inline"

import {
    CloseOutlined,
    DownloadOutlined,
    GithubOutlined,
    MenuOutlined,
    TwitterOutlined,
    YoutubeOutlined
} from "@ant-design/icons"
import { Section } from "../components/Section"

import { LATEST_VERSIONS } from "../../versions.mjs"
import { Search } from "./Search"

const StyledTopNav = styled.div`
    border-bottom: 1px solid ${props => props.theme.colorBorder};

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

        .ant-menu-submenu,
        .ant-menu-item-only-child {
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
        margin: -4px 0;
        display: flex;
        align-items: center;
        //flex-direction: column;
        gap: 8px;
        border: 1px solid ${props => props.theme.colorBorder};
        color: ${props => props.theme.colorPrimary};
        padding: 2px 8px 2px 5px;

        .anticon {
            font-size: 24px;
        }

        div {
            div {
                line-height: 1.2em;
                font-size: 12px;
                font-family: monospace;
            }
        }
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
            padding: 0 10px;
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
        .map((_p, index, paths) => mode + ":/" + paths.slice(0, index + 1).join("/"))

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
            mode={mode}
            openKeys={openKeys}
            defaultSelectedKeys={[...ancestors, mode + ":" + pathname]}
            onOpenChange={onOpenChange}
            subMenuCloseDelay={1}
            items={nav.children
                // don't include nodes like 404 that have no children
                // or nodes that are outside of nav
                .filter(node => /*node.children.length &&*/ !node.unlinked)
                .map(({ path, title, children }) => {
                    if (!children?.length) {
                        return {
                            key: mode + ":" + path,
                            label: (
                                <Link to={path} onClick={() => send_gtag(path)}>
                                    {title}
                                </Link>
                            )
                        }
                    }
                    return {
                        key: mode + ":" + path,
                        label: title,
                        popupOffset: [0, 20],
                        popupClassName: "nav-sub-menu-" + mode,
                        children: children
                            .filter(n => !n.unlinked) // don't include nodes that are outside of nav
                            .map(
                                ({ path: child_path, title, subtitle, children, anchor, slug }) => {
                                    const to = anchor
                                        ? `${path}#${slug}`
                                        : children.length
                                          ? children[0].path
                                          : child_path

                                    function handle_click() {
                                        send_gtag(to)
                                        onNavigate?.()
                                    }

                                    return {
                                        key: mode + ":" + child_path,
                                        label: (
                                            <Link to={to} onClick={handle_click}>
                                                <div className="title">{title}</div>
                                                {mode === "horizontal" && (
                                                    <div className="subtitle">{subtitle}</div>
                                                )}
                                            </Link>
                                        )
                                    }
                                }
                            )
                    }
                })}
        />
    )
}

declare const gtag: any

function send_gtag(to: string) {
    gtag("event", "www_engagement", {
        event_label: to
    })
}

type TopNavProps = {
    hideVersionLink?: boolean
    hideSearch?: boolean
}

export const TopNav = ({ hideVersionLink = true, hideSearch = true }: TopNavProps) => {
    const [showMenu, setShowMenu] = useState(false)

    const node = useCurrentNav()

    if (node?.landing) {
        return null
    }

    // we are expecting each node in the top nav to have children
    const downloads_site = window.location.href.indexOf("downloads.glowbuzzer.com") >= 0

    return (
        <StyledTopNav>
            <Section guttered>
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
                            <Tooltip title="Go to Downloads">
                                <Link
                                    className="latest-release"
                                    to="/downloads"
                                    onClick={() => send_gtag("/downloads")}
                                >
                                    <DownloadOutlined />
                                    <div>
                                        <div>GBC {LATEST_VERSIONS.gbc_version}</div>
                                        <div>GBR {LATEST_VERSIONS.gbr_version}</div>
                                    </div>
                                </Link>
                            </Tooltip>
                        )}
                        <a href={"https://www.github.com/glowbuzzer"}>
                            <GithubOutlined style={{ fontSize: "24px", color: "#9254de" }} />
                        </a>
                        <a href={"https://twitter.com/glowbuzzer"}>
                            <TwitterOutlined style={{ fontSize: "24px", color: "#9254de" }} />
                        </a>
                        <a href={"https://www.youtube.com/channel/UCd5lSqWK5Ep4su1sHx6kkUA"}>
                            <YoutubeOutlined style={{ fontSize: "24px", color: "#9254de" }} />
                        </a>
                        {!hideSearch && <Search />}
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
                <Section>
                    <div className="nav-narrow-open">
                        <NavMenu mode="inline" onNavigate={() => setShowMenu(false)} />
                    </div>
                </Section>
            )}
        </StyledTopNav>
    )
}
