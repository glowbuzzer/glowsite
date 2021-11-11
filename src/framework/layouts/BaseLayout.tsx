import { TopNav } from "../nav/TopNav"
import styled from "@emotion/styled"
import { GlowsiteFooter } from "../footer/GlowsiteFooter"

const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-height: 100vh;

    .main {
        min-height: 100vh;
        display: flex;
        flex-direction: column;

        nav {
            flex-basis: 0;
        }

        .body {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            flex-grow: 1;
        }
    }
`

export const BaseLayout = ({ children }) => (
    <StyledLayout>
        <div className="main">
            <nav>
                <TopNav />
            </nav>
            <div className="body">
                {children}
            </div>
        </div>
        <div className="footer">
            <GlowsiteFooter />
        </div>
    </StyledLayout>
)
