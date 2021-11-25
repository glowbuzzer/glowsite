import { TopNav } from "../nav/TopNav"
import styled from "@emotion/styled"
import { GlowsiteFooter } from "../footer/GlowsiteFooter"
import { BreadcrumbNav } from "../components/BreadcrumbNav"
import * as React from "react"
import {ScrollToTopOnMount} from "../components/ScrollToTopOnMount";

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
    <>
        <StyledLayout>
            <ScrollToTopOnMount/>
            <div className="main">
                <nav>
                    <TopNav />
                </nav>
                <div className="body">
                    <BreadcrumbNav/>
                    {children}
                </div>
            </div>
            <div className="footer">
                <GlowsiteFooter />
            </div>
        </StyledLayout>
    </>
)
