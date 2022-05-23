import styled, {ThemeProvider} from "styled-components"

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

  p {
    margin: 1em 0 1.5em 0;
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

  .remark-highlight {
    pre {
      background: ${GbColours.BackgroundCodeBlock};
    }
  }

  .codeblock-demo {
    padding: 16px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    background: white;
    margin-bottom: -10px;
  }

  ul,ol {
    margin-bottom: 24px;
    
    li {
      margin: 0.5em 0;
    }
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

  .codeblock-toolpath {
    // hack to make toolpath tile taller
    height: 600px;
  }

  .codeblock-tasks {
    height: 400px;
  }
  
  .ant-divider-horizontal {
    border-top-color: rgba(0,0,0,0.2);
  }
`

const AppTheme = {
    color: {
        ...GbColours
    },
    breaks: {
        mainWidth: "1400px",
        leftNavCollapse: "768px"
    }
}

declare module "styled-components" {
    interface DefaultTheme extends Readonly<typeof AppTheme> {
    }
}

export const GlowsiteTheme = ({children}) => (
    <ThemeProvider theme={AppTheme}>
        <Background>
            <AppStyle>{children}</AppStyle>
        </Background>
    </ThemeProvider>
)
