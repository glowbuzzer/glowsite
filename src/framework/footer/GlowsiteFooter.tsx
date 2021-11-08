import { Row, Col } from "antd"
import styled from "@emotion/styled"
import * as React from "react"
import { GithubOutlined, YoutubeOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

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

const DesktopFooter = ({}) => (
    <div>
        <Row>
            <Col span={3}></Col>
            <Col span={5}>
                <h3>How it works</h3>
                <p />
                <p>
                    <StyledLink to="/how-it-works/basics">Basics</StyledLink>
                </p>
                <p>
                    <StyledLink to="/how-it-works/detail">More detail</StyledLink>
                </p>
                <p>
                    <StyledLink to="/how-it-works/platforms">Supported platforms</StyledLink>
                </p>
            </Col>
            <Col span={5}>
                <h3>Get started</h3>
                <p />
                <p>
                    <StyledLink to="/get-started/hardware">Required hardware</StyledLink>
                </p>
                <p>
                    <StyledLink to="/get-started/motion">Make a drive move</StyledLink>
                </p>
                <p>
                    <StyledLink to="/get-started/how_to_buy">How to buy</StyledLink>
                </p>
            </Col>
            <Col span={5}>
                <h3>Legal</h3>
                <p />
                <p>
                    <StyledLink to="/privacy">Privacy policy</StyledLink>
                </p>
                <p>
                    <StyledLink to="/legal">Legal notice</StyledLink>
                </p>
            </Col>
            <Col span={5}>
                <h3>github & youtube</h3>
                <p />
                <p>
                    <a href={"https://www.github.com/glowbuzzer"}>
                        <GithubOutlined style={{ fontSize: "24px", color: "#9254de" }} />
                    </a>
                </p>
                <p>
                    <a href={"https://www.youtube.com/glowbuzzer"}>
                        <YoutubeOutlined style={{ fontSize: "24px", color: "#9254de" }} />
                    </a>
                </p>
            </Col>
        </Row>
        <span>©2022 by glowbuzzer All Rights Reserved </span>
    </div>
)

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
