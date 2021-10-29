import * as React from "react"
import { Helmet } from "react-helmet"
import { NavProvider } from "./framework/providers/NavProvider"
import { GlowsiteRouter } from "./framework/GlowsiteRouter"
import styled from "@emotion/styled"

// this avoids lots of warnings being spat out
// TODO: put back in? seemed to be an issue with some antd components - tbd
// (React as any).useLayoutEffect = React.useEffect

const AppStyle = styled.div`
    font-family: monospace;
`

const AppTheme = {
    color: {
        red1: "#813c8c"
    }
}

declare module "@emotion/react" {
    export interface Theme extends Readonly<typeof AppTheme> {}
}

export function App() {
    return (
        <NavProvider>
            <Helmet>
                {/* default title if not set by page */}
                <title>Glowbuzzer</title>
            </Helmet>

            <AppStyle>
                <GlowsiteRouter />
            </AppStyle>
        </NavProvider>
    )
}
