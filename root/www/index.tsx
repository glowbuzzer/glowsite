import * as React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import { NavProvider } from "../../src/framework/providers/NavProvider"
import { GlowsiteTheme } from "../../src/framework/GlowsiteTheme"
import { GlowsiteRoutes } from "../../src/framework/GlowsiteRoutes"

import { root } from "../../src/nav"

import "prismjs/themes/prism-tomorrow.css"
import "../../src/glowsite-theme.css"
import { CookieConsentProvider } from "../../src/framework/providers/CookieConsentProvider"
import { createRoot } from "react-dom/client"
import {SettingOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import {TopNav} from "../../src/framework/nav/TopNav";

const items = [
    {
        label: 'Navigation One - Submenu',
        key: 'SubMenu1',
        icon: <SettingOutlined />,
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    {
                        label: 'Option 1',
                        key: 'setting:1',
                    },
                    {
                        label: 'Option 2',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:4',
                    },
                ],
            },
        ],
    },
    {
        label: 'Navigation Two - Submenu',
        key: 'SubMenu2',
        icon: <SettingOutlined />,
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    {
                        label: 'Option 1',
                        key: 'settingx:1',
                    },
                    {
                        label: 'Option 2',
                        key: 'settingx:2',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    {
                        label: 'Option 3',
                        key: 'settingx:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'settingx:4',
                    },
                ],
            },
        ],
    },
];

const rootNode = createRoot(document.getElementById("app"))
rootNode.render(
    <BrowserRouter>
        <CookieConsentProvider>
            <GlowsiteTheme>
                <NavProvider root={root}>
                    <TopNav/>
                    <GlowsiteRoutes />
                </NavProvider>
            </GlowsiteTheme>
        </CookieConsentProvider>
    </BrowserRouter>
)
