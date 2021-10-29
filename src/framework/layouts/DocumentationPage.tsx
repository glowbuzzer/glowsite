import { ContexualLeftNav } from "../nav/ContexualLeftNav"
import styled from "@emotion/styled"
import { BaseLayout } from "./BaseLayout"

const StyledDiv = styled.div`
    display: flex;
    gap: 20px;
    

`

export const DocumentationPage = ({ children }) => {
    return (
        <BaseLayout>
            <StyledDiv>
                <ContexualLeftNav />
                <div>{children}</div>
            </StyledDiv>
        </BaseLayout>
    )
}
