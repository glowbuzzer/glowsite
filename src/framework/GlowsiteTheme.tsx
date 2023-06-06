import * as React from "react"
import styled, { DefaultTheme, ThemeProvider } from "styled-components"
import { ConfigProvider, GlobalToken, theme, ThemeConfig } from "antd"

export const GbColours = {
    White: "#ffffff",
    LightGrey: "#f9f9f9",
    BackgroundGrey: "#f0f0f0",
    MainPurple: "#9254de",
    TopNav: "#d9d9d9",
    BackgroundDarkSection: "#22075e",
    BackgroundCodeBlock: "rgba(0,0,0,0.75)"
}

const Background = styled.div`
    background: ${GbColours.BackgroundGrey};
`

export const AppStyle = styled.div`
    font-family: Roboto, sans-serif;
    line-height: 1.5715;
    font-size: 15.45px;
    background: ${props => props.theme.colorBgContainerDisabled};
    min-height: 100vh;
    margin: auto;

    h1 {
        margin: 28px 0 0 0;
    }

    h2 {
        margin: 20px 0 0 0;
    }

    p {
        margin: 1em 0 1.5em 0;
    }

    .content {
        // only applies to main body of pages
        ul,
        ol {
            margin-bottom: 24px;

            li {
                margin: 0.5em 0;
            }
        }
    }

    // only format code elements outside of pre block
    code {
        //background: #d9d9d9;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        padding: 0 3px 0 3px;
    }

    pre code {
        border: none;
        padding: 0;
    }

    pre {
        display: block;
        width: 100%;
        max-width: 100%;
        overflow-x: auto;
        white-space: pre;

        > div {
            background: ${GbColours.BackgroundCodeBlock} !important;
        }
    }

    p + .remark-highlight {
        // tighten gap between p and following codeblock
        margin-top: -14px;
    }

    .remark-highlight,
    .glowbuzzer-highlight {
        margin-bottom: 24px;

        pre {
            color: rgba(255, 255, 255, 0.7);
            background: ${GbColours.BackgroundCodeBlock};
            padding: 10px;
        }
    }

    .glowbuzzer-highlight {
        pre > div {
            margin: 0 !important;
            background: none !important;
        }
    }

    .codeblock-demo {
        padding: 16px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        background: white;
        margin-bottom: -10px;
    }

    .codeblock-tile {
        > div {
            width: 500px;
            height: 100%;
        }
    }

    .codeblock-wide {
        > div {
            width: 800px;
        }
    }

    .codeblock-narrow {
        > div {
            max-width: 300px;
        }
    }

    .codeblock-tall {
        height: auto;

        > div {
            height: 300px;
        }
    }

    .codeblock-toolpath {
        // hack to make toolpath tile taller
        height: 600px;
    }

    dt {
        //font-weight: bold;
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 2px;
    }

    dd {
        margin-left: 20px;
        margin-bottom: 24px;
    }

    .codeblock-tasks {
        height: 400px;
    }

    .ant-divider-horizontal {
        border-top-color: rgba(0, 0, 0, 0.2);
    }

    a {
        color: ${props => props.theme.colorLink};
    }

    a.broken {
        color: red;
        text-decoration: line-through;
    }

    // not sure why we need this, but without it tabs appear stacked horizontally
    .ant-tabs-tabpane-hidden {
        display: none;
    }
`

export const AppTheme = {
    color: {
        ...GbColours
    },
    breaks: {
        mainWidth: "1400px",
        leftNavCollapse: "768px"
    }
}

type MergedThemeTypes = typeof AppTheme & GlobalToken
declare module "styled-components" {
    interface DefaultTheme extends Readonly<MergedThemeTypes> {}
}

const GlowsiteThemeInner = ({ children }) => {
    const { token } = theme.useToken()

    const combined_theme = {
        ...token,
        ...AppTheme
    }

    return (
        <ThemeProvider theme={combined_theme}>
            <Background>
                <AppStyle>{children}</AppStyle>
            </Background>
        </ThemeProvider>
    )
}
export const GlowsiteTheme = ({ children }) => {
    const antd_theme: ThemeConfig = {
        token: {
            colorPrimary: "rgb(146, 84, 222)",
            colorLink: "rgb(146, 84, 222)"
        }
    }
    return (
        <ConfigProvider theme={antd_theme}>
            <GlowsiteThemeInner>{children}</GlowsiteThemeInner>
        </ConfigProvider>
    )
}
