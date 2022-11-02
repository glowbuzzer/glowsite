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
import {GlowbuzzerTileDefinitions} from "@glowbuzzer/controls";

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
