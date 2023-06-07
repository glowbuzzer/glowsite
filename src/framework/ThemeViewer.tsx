import * as React from "react";
import {BaseLayout} from "./layouts/BaseLayout";
import {TopNav} from "./nav/TopNav";
import {Section} from "./components/Section";
import styled, {useTheme} from "styled-components";

const StyledDiv=styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto 1fr;
  gap: 10px;

  .rect {
    width: 30px;
    height: 30px;
  }
  
  .value {
    font-family: monospace;
    font-size: 1.1em;
  }
  
  .name {
  }
`

export const ThemeViewer=() => {
    const theme=useTheme()

    const items=    Object.entries(theme)
        .filter(([k, v]) => k.startsWith("color"))

    return <BaseLayout>
        <TopNav/>
        <Section spaced>
            <h1>Glowsite Theme Colours</h1>
            <StyledDiv>{items.map(([name, v]) => {
                return <React.Fragment key={name}>
                    <div className="rect" style={{background: v}}></div>
                    <div className="value">{v}</div>
                    <div className="name">{name}</div>
                </React.Fragment>
            })}</StyledDiv>
        </Section>
    </BaseLayout>
}