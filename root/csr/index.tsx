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

ReactDOM.render(
    <BrowserRouter>
        <CookieConsentProvider>
            <GlowsiteTheme>
                <NavProvider root={root}>
                    <GlowsiteRoutes />
                </NavProvider>
            </GlowsiteTheme>
        </CookieConsentProvider>
    </BrowserRouter>,
    document.getElementById("app")
)
