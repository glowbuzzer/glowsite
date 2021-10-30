import { ThemeProvider } from "@emotion/react"
import styled from "@emotion/styled"

const GbColours = {
    BackgroundGrey: "#f0f0f0",
    MainPurple: "#9254de"
}

const AppStyle = styled.div`
    font-family: Roboto;
    background: ${GbColours.BackgroundGrey};
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
