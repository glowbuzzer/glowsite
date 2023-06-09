import * as React from "react"
import styled, { css } from "styled-components"
import {ConfigProvider, GlobalToken, theme, ThemeConfig} from "antd"
import { themes } from "prism-react-renderer"
import { useGlowbuzzerTheme } from "@glowbuzzer/controls"

type PrismTheme = typeof themes.vsLight

const StyledApp = styled.div<{ prism: PrismTheme }>`
  font-family: Roboto, sans-serif;
  line-height: 1.5715;
  font-size: 15.45px;
  color: ${props => props.theme.colorText};
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
    border: 1px solid ${props => props.theme.colorBorder};
    color: ${props => props.theme.colorTextSecondary};
    border-radius: 5px;
    padding: 0 4px 0 4px;
  }

  pre code {
    // undo styles from inline code
    border: inherit;
    color: inherit;
    padding: 0;
  }

    /*

  p + .remark-highlight {
    // tighten gap between p and following codeblock
    margin-top: -14px;
  }

  .remark-highlight,
  .glowbuzzer-highlight {
    margin-bottom: 24px;

    pre {
      color: ${props => props.theme.colorFillContent};
      background: ${props => props.theme.colorTextSecondary};
      padding: 10px;
    }
  }

  .glowbuzzer-highlight {
    pre > div {
      margin: 0 !important;
      background: none !important;
    }
  }
*/

  p + .remark-highlight {
    // tighten gap between p and following codeblock
    margin-top: -14px;
  }

  .remark-highlight,
  .glowbuzzer-highlight {
    pre {
      background: ${props => props.prism.plain.backgroundColor};
      color: ${props => props.prism.plain.color};
      padding: 10px;
    }

    ${props =>
            props.prism.styles.map(({types, style}) =>
                    types.map(
                            type => css`
                              pre .${type} {
                                color: ${style.color};
                              }
                            `
                    )
            )}
  }

  .codeblock-demo {
    padding: 16px;
    border: 1px solid ${props => props.theme.colorBorder};
    background: ${props => props.theme.colorBgContainer};
    //margin-bottom: -10px;
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

  .codeblock-tasks {
    height: 400px;
  }

  dt {
    color: ${props => props.theme.colorTextBase};
    margin-bottom: 2px;
  }

  dd {
    margin-left: 20px;
    margin-bottom: 24px;
  }

  .ant-divider-horizontal {
    border-top-color: ${props => props.theme.colorFill};
  }

  .markdown-link {
    color: ${props => props.theme.purple8};

    &:hover {
      color: ${props => props.theme.purple9};
    }
  }

  a.broken {
    color: red;
    text-decoration: line-through;
  }

  // not sure why we need this, but without it tabs appear stacked horizontally
  .ant-tabs-tabpane-hidden {
    display: none;
  }

  .bg-light {
    background: #f5f5f5;
  }
`

export const AppStyle = ({ children }) => {
    const { darkMode } = useGlowbuzzerTheme()
    const {token}=theme.useToken()

    const custom:ThemeConfig={
        token: {
            ...token,
            colorPrimary: token.purple8
        }
    }
    return (
        <ConfigProvider theme={custom}>
            <StyledApp prism={darkMode ? themes.palenight : themes.shadesOfPurple}>
                {children}
            </StyledApp>
        </ConfigProvider>
    )
}

export const AppTheme = {
    // this will be merged into the antd token by GlowbuzzerThemeProvider
    // and made available in the styled components theme for use by components
    breaks: {
        mainWidth: "1400px",
        leftNavCollapse: "768px"
    }
}

declare module "styled-components" {
    // ensure our additions are available in the styled components theme
    interface DefaultTheme extends Readonly<typeof AppTheme & GlobalToken> {}
}
