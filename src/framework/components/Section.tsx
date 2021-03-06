import * as React from "react"
import {FC, ReactNode} from "react"
import { GbColours } from "../GlowsiteTheme"
import styled from "styled-components"
import { css } from "styled-components"

type Colors = keyof typeof GbColours

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
        max-width: ${props => props.theme.breaks.mainWidth};
        min-width: 0;
        margin: 0 auto;
        flex-grow: 1;

        ${props =>
            props.dataSpaced &&
            css`
                @media (min-width: 767px) {
                    padding: 40px 0;
                }
            `}

        ${props =>
            props.dataExpand &&
            css`
                flex-grow: 1;
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

type SectionProps = {
    background?: Colors
    inverted?: boolean
    spaced?: boolean
    guttered?: boolean
    expand?: boolean
    children: ReactNode
}

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
