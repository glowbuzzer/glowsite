import * as React from "react"
import ReactDOM from "react-dom"

import { NavProvider, Node } from "../../src/framework/providers/NavProvider"
import { AppTheme } from "../../src/framework/GlowsiteTheme"
import { GlowsiteRoutes } from "../../src/framework/GlowsiteRoutes"

import { BrowserRouter } from "react-router-dom"
import { CookieConsentProvider } from "../../src/framework/providers/CookieConsentProvider"
import { Section } from "../../src/framework/components/Section"
import { TopNav } from "../../src/framework/nav/TopNav"
import { StyledLayout } from "../../src/framework/layouts/BaseLayout"
import { useTheme } from "styled-components"
import { GlowbuzzerThemeProvider } from "@glowbuzzer/controls"

import "antd/dist/reset.css"

const HomePage = () => {
    const theme = useTheme()

    return (
        <StyledLayout>
            <TopNav hideVersionLink hideSearch />
            <Section expand background={theme.colorBgContainer} spaced>
                <h1>Downloads for glowbuzzer</h1>
                <p>
                    All our downloads are linked to from the{" "}
                    <a href="https://www.glowbuzzer.com">main glowbuzzer site</a> or from our{" "}
                    <a href="https://www.github.com/glowbuzzer">Github account</a>.
                </p>
            </Section>
        </StyledLayout>
    )
}

const nav: Node = {
    slug: "",
    title: "Home",
    layout: HomePage,
    path: "/",
    children: []
}

ReactDOM.render(
    <BrowserRouter>
        <CookieConsentProvider>
            <GlowbuzzerThemeProvider theme={AppTheme}>
                <NavProvider root={nav}>
                    <GlowsiteRoutes />
                </NavProvider>
            </GlowbuzzerThemeProvider>
        </CookieConsentProvider>
    </BrowserRouter>,
    document.getElementById("app")
)
