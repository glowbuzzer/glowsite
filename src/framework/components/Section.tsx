import { FC } from "react"
import { GbColours } from "../GlowsiteTheme"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

type Colors = keyof typeof GbColours

type SectionProps = {
    background?: Colors
    inverted?: boolean
    spaced?: boolean
    guttered?: boolean
    expand?: boolean
}

const StyledSection = styled.div<{
    dataColor: Colors
    dataInverted: boolean
    dataSpaced: boolean
    dataGuttered: boolean
    dataExpand: boolean
}>`
    label: Section;
    display: flex;
    background: ${props => props.theme.color[props.dataColor] || "inherit"};

    > .section {
        max-width: 1400px;
        margin: 0 auto;
        flex-grow: 1;

        ${props =>
            props.dataGuttered &&
            css`
                max-width: 1400px;
            `}

        ${props =>
            props.dataSpaced &&
            css`
                color: green;
                padding: 40px 0;
            `}

    ${props =>
            props.dataExpand &&
            css`
                display: flex;
                align-items: stretch;
            `}
    }

    ${props =>
        props.dataExpand &&
        css`
            flex-grow: 1;
        `}

    ${props =>
        props.dataGuttered &&
        css`
            padding: 0 40px;
        `}


  ${props =>
        props.dataInverted &&
        css`
            color: white;

            h1,
            h2,
            h3,
            h4,
            h5 {
                // override the antd black
                color: white;
            }
        `}
`

export const Section: FC<SectionProps> = ({
    background,
    inverted,
    spaced,
    guttered,
    expand,
    children
}) => {
    return (
        <StyledSection
            dataColor={background}
            dataInverted={inverted}
            dataSpaced={spaced}
            dataGuttered={guttered}
            dataExpand={expand}
        >
            <div className="section">{children}</div>
        </StyledSection>
    )
}
