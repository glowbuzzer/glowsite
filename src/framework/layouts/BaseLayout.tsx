import { TopNav } from "../nav/TopNav"
import styled from "@emotion/styled"
import { GlowsiteFooter } from "../footer/GlowsiteFooter"

const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    .body {
        flex-grow: 1;
        background: #fafafa;
    }
`

export const BaseLayout = ({ children }) => (
    <StyledLayout>
        <div className="header">
            <TopNav />
        </div>
        <div className="body">{children}</div>
        <div className="footer">
            <GlowsiteFooter />
        </div>
    </StyledLayout>
)
