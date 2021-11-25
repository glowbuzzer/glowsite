import * as React from "react"
import { Helmet } from "react-helmet"
import { NavProvider } from "./framework/providers/NavProvider"
import { GlowsiteTheme } from "./framework/GlowsiteTheme"
import { GlowsiteRoutes } from "./framework/GlowsiteRoutes"

// this avoids lots of warnings being spat out
// TODO: put back in? seemed to be an issue with some antd components - tbd
// (React as any).useLayoutEffect = React.useEffect

// NOT USED????????!!!!!!!!!!!!!!!!!

export function App() {
    return (
        <>
            <Helmet>
                {/* default title if not set by page */}
                <title>glowbuzzer</title>
            </Helmet>

            <GlowsiteTheme>
                <GlowsiteRoutes />
            </GlowsiteTheme>
        </>
    )
}
