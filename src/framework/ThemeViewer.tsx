import * as React from "react"
import { BaseLayout } from "./layouts/BaseLayout"
import { TopNav } from "./nav/TopNav"
import { Section } from "./components/Section"
import styled, { useTheme } from "styled-components"
import { themes } from "prism-react-renderer"

const StyledDiv = styled.div`
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

const StyledColumns = styled.div`
  display: flex;
  justify-content: space-between;
`

const ThemeEntry = ({ name, value }) => {
    return (
        <React.Fragment>
            <div className="rect" style={{ background: value }}></div>
            <div className="value">{value}</div>
            <div className="name">{name}</div>
        </React.Fragment>
    )
}

const PrismViewer = ({ theme }) => {
    const flat = theme.styles.flatMap(({ types, style }) => {
        return types.map(t => ({ type: t, style }))
    }).sort((a, b) => a.type.localeCompare(b.type))

    return (
        <StyledDiv>
            <ThemeEntry name="Background" value={theme.plain.backgroundColor} />
            <ThemeEntry name="Text" value={theme.plain.color} />
            {flat.map(({ type, style }) => {
                return <ThemeEntry key={type} name={type} value={style.color} />
            })}
        </StyledDiv>
    )
}

export const ThemeViewer = () => {
    const theme = useTheme()

    const items = Object.entries(theme)
        // .filter(([k, v]) => typeof v === "string")
        .filter(([k, v]) => k.startsWith("color"))

    return (
        <BaseLayout>
            <Section spaced>
                <StyledColumns>
                    <div>
                        <h1>Glowsite Theme Colours</h1>
                        <StyledDiv>
                            {items.map(([name, v]) => {
                                return <ThemeEntry key={name} name={name} value={v} />
                            })}
                        </StyledDiv>
                    </div>
                    <div>
                        <h1>Prism "Pale Night" Theme</h1>
                        <PrismViewer theme={themes.palenight} />
                    </div>
                    <div>
                        <h1>Prism "Shades of Purple" Theme</h1>
                        <PrismViewer theme={themes.shadesOfPurple} />
                    </div>
                </StyledColumns>
            </Section>
        </BaseLayout>
    )
}
