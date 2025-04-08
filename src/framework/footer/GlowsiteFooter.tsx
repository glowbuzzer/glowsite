import { Col, Modal, Row, Space } from "antd"
import styled from "styled-components"
import * as React from "react"
import { GithubOutlined, YoutubeOutlined, TwitterOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useCookieConsent } from "../providers/CookieConsentProvider"

const StyledFooter = styled.div`
    border-top: 1px solid ${props => props.theme.colorBorder};
    padding: 10px 100px;
    text-align: center;
`

const StyledLink = styled(Link)`
    color: ${props => props.theme.colorPrimary};

    &:hover {
        color: #391085;
    }
`

const StyledLinkLookalike = styled.div`
    color: ${props => props.theme.colorPrimary};
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

const CopyrightVersion = () => {
    // @ts-ignore
    const version = import.meta.env.VITE_GLOWBUZZER_VERSION || "dev"

    return <span className="copyright">©2023 by glowbuzzer All Rights Reserved. Build {version}</span>
}

const MobileFooter = ({}) => (
    <div>
        <CopyrightVersion />
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
                    <h3>Legal</h3>
                    <div />
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
                    <h3>Resources</h3>
                    <div />
                    <div>
                        <Space>
                            <a href={"https://www.github.com/glowbuzzer"}>
                                <GithubOutlined style={{ fontSize: "24px", color: "#9254de" }} />
                            </a>
                            <a href={"https://www.twitter.com/glowbuzzer"}>
                                <TwitterOutlined style={{ fontSize: "24px", color: "#9254de" }} />
                            </a>
                            <a href={"https://www.youtube.com/glowbuzzer"}>
                                <YoutubeOutlined style={{ fontSize: "24px", color: "#9254de" }} />
                            </a>
                        </Space>
                    </div>
                    <div>
                        <StyledLink to="/downloads">Downloads</StyledLink>
                    </div>
                    <div>
                        <StyledLink className="sitemap-nav-link" to="/sitemap">
                            Sitemap
                        </StyledLink>
                    </div>
                </Col>
            </Row>
            <CopyrightVersion />
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
