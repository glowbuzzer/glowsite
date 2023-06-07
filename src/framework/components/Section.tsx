import * as React from "react"
import {FC, ReactNode} from "react"
import styled from "styled-components"
import { css } from "styled-components"

const StyledSection = styled.div<{
    dataColor: string
    dataInverted: boolean
    dataSpaced: boolean
    dataGuttered: boolean
    dataExpand: boolean
}>`
    display: flex;
    background: ${props => props.dataColor || "inherit"};

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
            h5,
            a {
                // override the antd black
                color: white;
            }
        `}
`

type SectionProps = {
    background?: string
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
