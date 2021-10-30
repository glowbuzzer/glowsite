import * as React from "react"
import { Helmet } from "react-helmet"
import { NavProvider } from "./framework/providers/NavProvider"
import { GlowsiteTheme } from "./framework/GlowsiteTheme"
import { GlowsiteRouter } from "./framework/GlowsiteRouter"

import "prismjs/themes/prism-tomorrow.css"
import styled from "@emotion/styled"

import {Layout} from "antd";
import {GlowsiteFooter} from "./framework/footer/footer"



// this avoids lots of warnings being spat out
// TODO: put back in? seemed to be an issue with some antd components - tbd
// (React as any).useLayoutEffect = React.useEffect







export function App() {
    return (
        <NavProvider>
            <Helmet>
                {/* default title if not set by page */}
                <title>Glowbuzzer</title>
            </Helmet>

            <GlowsiteTheme>
                <GlowsiteRouter />
                <Layout><GlowsiteFooter/></Layout>
            </GlowsiteTheme>
        </NavProvider>
    )
}