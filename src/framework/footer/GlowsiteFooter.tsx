import { Col, Modal, Row } from "antd"
import styled from "@emotion/styled"
import * as React from "react"
import { GithubOutlined, YoutubeOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useCookieConsent } from "../providers/CookieConsentProvider"

const StyledFooter = styled.div`
    padding: 20px 100px;
    background-color: #d9d9d9;
    text-align: center;
`

const StyledLink = styled(Link)`
    color: ${props => props.theme.color.MainPurple};

    &:hover {
        color: #391085;
    }
`

const StyledLinkLookalike = styled.div`
    color: ${props => props.theme.color.MainPurple};
    cursor: pointer;

    &:hover {
        color: #391085;
    }
`

const OnMobileHide = styled.div`
    @media (max-width: 600px) {
        display: none;
        height: 50px;
    }
`

const OnDesktopHide = styled.div`
    @media (min-width: 601px) {
        display: none;
        height: 200px;
    }
`

const MobileFooter = ({}) => (
    <div>
        <span>©2022 by glowbuzzer All Rights Reserved </span>
    </div>
)

const DesktopFooter = ({}) => {
    const [modal, modalContext] = Modal.useModal()
    const cookieConsent = useCookieConsent()

    function show_cookie_settings() {
        modal.confirm({
            title: "Cookie Settings",
            onOk: cookieConsent.accept,
            onCancel: cookieConsent.reject,
            okText: "Accept",
            cancelText: "Reject",

            content: (
                <div>
                    <div>
                        We use tracking cookies to understand how people use our site so we can
                        improve our services.
                    </div>
                    <div>
                        For more information see our <Link to="/privacy">privacy policy</Link>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <Row>
                <Col span={3}></Col>
                <Col span={5}>
                    <h3>How it works</h3>
                    <div />
                    <div>
                        <StyledLink to="/how-it-works/basics">Basics</StyledLink>
                    </div>
                    <div>
                        <StyledLink to="/how-it-works/detail">More detail</StyledLink>
                    </div>
                    <div>
                        <StyledLink to="/how-it-works/platforms">Supported platforms</StyledLink>
                    </div>
                </Col>
                <Col span={5}>
                    <h3>Get started</h3>
                    <div />
                    <div>
                        <StyledLink to="/get-started/hardware">Required hardware</StyledLink>
                    </div>
                    <div>
                        <StyledLink to="/get-started/motion">Make a drive move</StyledLink>
                    </div>
                    <div>
                        <StyledLink to="/get-started/how_to_buy">How to buy</StyledLink>
                    </div>
                </Col>
                <Col span={5}>
                    <h3>Legal</h3>
                    <div />
                    <div>
                        <StyledLink to="/downloads">Downloads</StyledLink>
                    </div>
                    <div>
                        <StyledLink to="/privacy">Privacy policy</StyledLink>
                    </div>
                    <div>
                        <StyledLink to="/legal">Legal notice</StyledLink>
                    </div>
                    <div>
                        {modalContext}
                        <StyledLinkLookalike onClick={show_cookie_settings}>
                            Cookie settings
                        </StyledLinkLookalike>
                    </div>
                </Col>
                <Col span={5}>
                    <h3>github & youtube</h3>
                    <div />
                    <div>
                        <a href={"https://www.github.com/glowbuzzer"}>
                            <GithubOutlined style={{ fontSize: "24px", color: "#9254de" }} />
                        </a>
                    </div>
                    <div>
                        <a href={"https://www.youtube.com/glowbuzzer"}>
                            <YoutubeOutlined style={{ fontSize: "24px", color: "#9254de" }} />
                        </a>
                    </div>
                </Col>
            </Row>
            <span>©2022 by glowbuzzer All Rights Reserved </span>
        </div>
    )
}

export const GlowsiteFooter = () => {
    return (
        <StyledFooter>
            <OnMobileHide>
                <DesktopFooter />
            </OnMobileHide>
            <OnDesktopHide>
                <MobileFooter />
            </OnDesktopHide>
        </StyledFooter>
    )
}
