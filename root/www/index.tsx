import * as React from "react"
import { BrowserRouter } from "react-router-dom"

import { NavProvider } from "../../src/framework/providers/NavProvider"
import { GlowsiteTheme } from "../../src/framework/GlowsiteTheme"
import { GlowsiteRoutes } from "../../src/framework/GlowsiteRoutes"

import { CookieConsentProvider } from "../../src/framework/providers/CookieConsentProvider"
import { ChatlioFirstMessageConversion } from "../../src/framework/conversions/ChatlioFirstMessageConversion"
import { createRoot } from "react-dom/client"
import { TopNav } from "../../src/framework/nav/TopNav"

import "prismjs/themes/prism-tomorrow.css"
import "../../src/glowsite-theme.css"

import { root } from "../../src/nav"

const rootNode = createRoot(document.getElementById("app"))
rootNode.render(
    <BrowserRouter>
        <ChatlioFirstMessageConversion />
        <CookieConsentProvider>
            <GlowsiteTheme>
                <NavProvider root={root}>
                    <TopNav />
                    <GlowsiteRoutes />
                </NavProvider>
            </GlowsiteTheme>
        </CookieConsentProvider>
    </BrowserRouter>
)
