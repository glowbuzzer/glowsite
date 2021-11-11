import { ThemeProvider } from "@emotion/react"
import styled from "@emotion/styled"

export const GbColours = {
    White: "#ffffff",
    LightGrey: "#f9f9f9",
    BackgroundGrey: "#f0f0f0",
    MainPurple: "#9254de",
    TopNav: "#d9d9d9",
    BackgroundDarkSection: "#22075e"
}

const Background = styled.div`
    background: ${GbColours.BackgroundGrey};
`

const AppStyle = styled.div`
    font-family: Roboto, sans-serif;
    font-size: 1.1em;
    background: ${GbColours.BackgroundGrey};
    //max-width: 1400px;
    min-height: 100vh;
    margin: auto;

    h1 {
        margin: 28px 0 0 0;
    }

    h2 {
        margin: 20px 0 0 0;
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
        <Background>
            <AppStyle>{children}</AppStyle>
        </Background>
    </ThemeProvider>
)
