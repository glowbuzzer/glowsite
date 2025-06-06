import styled from "styled-components"
import { GlowsiteFooter } from "../footer/GlowsiteFooter"
import { BreadcrumbNav } from "../components/BreadcrumbNav"
import * as React from "react"
import { ScrollOnMount } from "../components/ScrollOnMount"
import { Button } from "antd"
import { Link } from "react-router-dom"
import { useCookieConsent } from "../providers/CookieConsentProvider"

export const StyledLayout = styled.div`
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

    .cookies {
        position: fixed;
        text-align: center;
        width: 100%;
        background: white;
        padding: 20px;
        border-top: 1px solid rgba(0, 0, 0, 0.3);

        @keyframes fadein {
            from {
                opacity: 0;
            }
            to {
                opacity: 0.97;
            }
        }
        animation: fadein 1s;

        left: 0;
        bottom: 0;

        > div {
            text-align: center;
            display: inline-flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 10px;
            max-width: ${props => props.theme.breaks.mainWidth};

            .buttons {
                margin: 0 auto;
                //width: 100%;
                text-align: center;
            }
        }
    }
`

export const BaseLayout = ({
    children,
    singleColumn,
    ...props
}: {
    children
    singleColumn?: boolean
}) => {
    const cookieConsent = useCookieConsent()

    return (
        <>
            <StyledLayout>
                <ScrollOnMount />
                <div className="main">
                    <div className={singleColumn ? "single-body" : "body"}>
                        <BreadcrumbNav />
                        {children}
                    </div>
                </div>
                <div className="footer">
                    <GlowsiteFooter />
                </div>

                {cookieConsent.state ? null : (
                    <div className="cookies">
                        <div>
                            <div>
                                We use tracking cookies to understand how people use our site so we
                                can improve our services. For more information see our{" "}
                                <Link to="/privacy">privacy policy</Link>
                            </div>
                            <div className="buttons">
                                <Button type="primary" onClick={cookieConsent.accept}>
                                    Accept
                                </Button>{" "}
                                <Button onClick={cookieConsent.reject}>Reject</Button>
                            </div>
                        </div>
                    </div>
                )}
            </StyledLayout>
        </>
    )
}
