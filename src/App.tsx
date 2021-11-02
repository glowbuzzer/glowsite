import * as React from "react"
import { Helmet } from "react-helmet"
import { NavProvider } from "./framework/providers/NavProvider"
import { GlowsiteTheme } from "./framework/GlowsiteTheme"
import { GlowsiteRouter } from "./framework/GlowsiteRouter"

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
            </GlowsiteTheme>
        </NavProvider>
    )
}
