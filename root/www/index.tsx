import * as React from "react"
import { BrowserRouter } from "react-router-dom"
import { NavProvider } from "../../src/framework/providers/NavProvider"
import { GlowbuzzerThemeProvider } from "@glowbuzzer/controls"
import { GlowsiteRoutes } from "../../src/framework/GlowsiteRoutes"
import { CookieConsentProvider } from "../../src/framework/providers/CookieConsentProvider"
import { ChatlioFirstMessageConversion } from "../../src/framework/conversions/ChatlioFirstMessageConversion"
import { createRoot } from "react-dom/client"
import { AppStyle, AppTheme } from "../../src/framework/GlowsiteTheme"
import { TopNav } from "../../src/framework/nav/TopNav"

import { root } from "../../src/nav"

import "prismjs/themes/prism-tomorrow.css"
import "antd/dist/reset.css"
import {Button} from "antd";

const rootNode = createRoot(document.getElementById("app"))
rootNode.render(
    <BrowserRouter>
        <ChatlioFirstMessageConversion />
        <CookieConsentProvider>
            <GlowbuzzerThemeProvider theme={AppTheme}>
                <AppStyle>
                    <NavProvider root={root}>
                        <TopNav />
                        <GlowsiteRoutes />
                    </NavProvider>
                </AppStyle>
            </GlowbuzzerThemeProvider>
        </CookieConsentProvider>
    </BrowserRouter>
)
