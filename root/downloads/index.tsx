import * as React from "react"
import ReactDOM from "react-dom"

import { NavProvider, Node } from "../../src/framework/providers/NavProvider"
import { GlowsiteTheme } from "../../src/framework/GlowsiteTheme"
import { GlowsiteRoutes } from "../../src/framework/GlowsiteRoutes"

import "../../src/glowsite-theme.css"
import { BrowserRouter } from "react-router-dom"
import { CookieConsentProvider } from "../../src/framework/providers/CookieConsentProvider"
import { Section } from "../../src/framework/components/Section"
import { TopNav } from "../../src/framework/nav/TopNav"
import styled from "styled-components"
import {StyledLayout} from "../../src/framework/layouts/BaseLayout";

const HomePage = () => {
    return (
        <StyledLayout>
            <TopNav hideVersionLink />
            <Section expand background="White">
                <h1>Downloads</h1>
                <p>
                    This is the homepage for glowbuzzer downloads but you won't find much here. All
                    our downloads are linked to from the{" "}
                    <a href="https://www.glowbuzzer.com">main glowbuzzer site</a> and from our{" "}
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
            <GlowsiteTheme>
                <NavProvider root={nav}>
                    <GlowsiteRoutes />
                </NavProvider>
            </GlowsiteTheme>
        </CookieConsentProvider>
    </BrowserRouter>,
    document.getElementById("app")
)
