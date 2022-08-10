import * as React from "react"
import { BaseLayout } from "./BaseLayout"
import { Section } from "../components/Section"
import styled from "styled-components"

const StyledDiv = styled.div`
    margin-left: 60px;
`

export const SimpleLayout = ({ children, ...props }) => {
    return (
        <BaseLayout {...props}>
            <Section expand background="White">
                <StyledDiv>{children}</StyledDiv>
            </Section>
        </BaseLayout>
    )
}
