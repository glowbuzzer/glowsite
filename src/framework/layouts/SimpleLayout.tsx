import { BaseLayout } from "./BaseLayout"
import { Section } from "../components/Section"
import styled from "@emotion/styled"

const StyledDiv = styled.div`
    margin-left: 60px;
`

export const SimpleLayout = ({ children }) => (
    <BaseLayout>
        <Section expand background="White">
            <StyledDiv>{children}</StyledDiv>
        </Section>
    </BaseLayout>
)
