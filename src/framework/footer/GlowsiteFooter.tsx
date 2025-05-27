import { Col, Modal, Row, Space } from "antd"
import styled from "styled-components"
import * as React from "react"
import { GithubOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useCookieConsent } from "../providers/CookieConsentProvider"

const StyledFooter = styled.div`
    margin-top: 50px;
    border-top: 1px solid ${props => props.theme.colorBorder};
    padding: 10px 100px;
    text-align: center;

    .copyright {
        margin-top: 20px;
    }

    @media (max-width: 767px) {
        padding: 10px 20px;
    }
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

const CopyrightVersion = () => {
    // @ts-ignore
    const version = import.meta.env.VITE_GLOWBUZZER_VERSION || "dev"

    return (
        <div className="copyright">©2025 by glowbuzzer All Rights Reserved. Build {version}</div>
    )
}

export const GlowsiteFooter = ({}) => {
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
        <StyledFooter>
            {modalContext}
            <Row>
                <Col span={12}>
                    <h3>Legal</h3>
                    <div>
                        <StyledLink to="/privacy">Privacy policy</StyledLink>
                    </div>
                    <div>
                        <StyledLink to="/legal">Legal notice</StyledLink>
                    </div>
                    <div>
                        <StyledLinkLookalike onClick={show_cookie_settings}>
                            Cookie settings
                        </StyledLinkLookalike>
                    </div>
                </Col>
                <Col span={12}>
                    <h3>Resources</h3>
                    <Space direction="vertical">
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
                        <StyledLink to="/contact">Contact us</StyledLink>
                    </Space>
                </Col>
            </Row>
            <CopyrightVersion />
        </StyledFooter>
    )
}
