import { ThemeProvider } from "@emotion/react"
import styled from "@emotion/styled"

const GbColours = {
    BackgroundGrey: "#f0f0f0",
    MainPurple: "#9254de",
    TopNav: "#d9d9d9"
}

const AppStyle = styled.div`
    font-family: Roboto, sans-serif;
    background: ${GbColours.BackgroundGrey};

    max-width: 1400px;
    height: 100vh;
    margin: auto;

    .capitalize {
        text-transform: capitalize;
    }
`

const AppTheme = {
    color: {
        ...GbColours
    }
}

declare module "@emotion/react" {
    export interface Theme extends Readonly<typeof AppTheme> {}
}

export const GlowsiteTheme = ({ children }) => (
    <ThemeProvider theme={AppTheme}>
        <AppStyle>{children}</AppStyle>
    </ThemeProvider>
)
