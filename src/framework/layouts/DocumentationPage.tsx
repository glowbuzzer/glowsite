import { ContexualLeftNav } from "../nav/ContexualLeftNav"
import styled from "@emotion/styled"
import { BaseLayout } from "./BaseLayout"

const StyledDiv = styled.div`
    display: flex;
    gap: 20px;
    
    code {
    background: #d9d9d9;
    border-radius: 5px;
    padding: 0 3px 0 3px;
    }

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
