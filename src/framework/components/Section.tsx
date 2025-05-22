import * as React from "react"
import { FC, ReactNode } from "react"
import styled from "styled-components"
import { css } from "styled-components"

const StyledSection = styled.div<{
    $color: string
    $inverted: boolean
    $spaced: boolean
    $guttered: boolean
    $expand: boolean
}>`
    display: flex;
    background: ${props => props.$color || "inherit"};
    padding: 0 10px;

    > .section {
        max-width: ${props => props.theme.breaks.mainWidth};
        min-width: 0;
        margin: 0 auto;
        flex-grow: 1;

        ${props =>
            props.$spaced &&
            css`
                @media (min-width: 767px) {
                    padding: 40px 0;
                }
            `}

        ${props =>
            props.$expand &&
            css`
                flex-grow: 1;
                align-items: stretch;
            `}
    }

    ${props =>
        props.$expand &&
        css`
            flex-grow: 1;
        `}

    ${props =>
        props.$expand &&
        css`
            padding: 0 40px;
        `}


  ${props =>
        props.$inverted &&
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
            $color={background}
            $inverted={inverted}
            $spaced={spaced}
            $guttered={guttered}
            $expand={expand}
        >
            <div className="section">{children}</div>
        </StyledSection>
    )
}
