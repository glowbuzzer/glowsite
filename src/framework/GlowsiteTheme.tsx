import * as React from "react"
import styled from "styled-components"
import { GlobalToken } from "antd"

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
            background: ${props => props.theme.colorText} !important;
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
            background: ${props => props.theme.colorText};
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

    .markdown-link {
        color: ${props => props.theme.colorPrimary};

        &:hover {
            color: ${props => props.theme.colorPrimaryHover};
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
`

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



