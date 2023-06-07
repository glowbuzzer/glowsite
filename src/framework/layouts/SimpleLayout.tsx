import * as React from "react"
import { BaseLayout } from "./BaseLayout"
import { Section } from "../components/Section"
import styled, {useTheme} from "styled-components"

const StyledDiv = styled.div`
    margin-left: 60px;
`

export const SimpleLayout = ({ children, ...props }) => {
    const theme=useTheme()

    return (
        <BaseLayout {...props}>
            <Section expand background={theme.colorBgContainer}>
                <StyledDiv>{children}</StyledDiv>
            </Section>
        </BaseLayout>
    )
}
