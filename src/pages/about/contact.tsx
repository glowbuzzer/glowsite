import * as React from "react"
import styled from "styled-components"
import { Card, Space, Divider } from "antd"
import { MailOutlined, EnvironmentOutlined, CommentOutlined } from "@ant-design/icons"

const StyledDiv = styled.div`
    .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
        margin-top: 24px;

        .ant-card {
            height: 100%;
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.09);
            }

            .ant-card-head-title {
                display: flex;
                align-items: center;

                .icon {
                    font-size: 20px;
                    margin-right: 12px;
                    color: ${props => props.theme.colorPrimary};
                }
            }

            .ant-card-body {
                font-size: 16px;

                a {
                    color: ${props => props.theme.colorPrimary};
                    transition: color 0.3s;

                    &:hover {
                        color: ${props => props.theme.colorPrimaryActive};
                        text-decoration: underline;
                    }
                }
            }
        }
    }

    h1 {
        margin-bottom: 24px;
        position: relative;
    }
`

export default ({ subtitle }) => {
    return (
        <StyledDiv>
            <h1>{subtitle}</h1>

            <div className="contact-grid">
                <Card
                    title={
                        <span>
                            <MailOutlined className="icon" /> By Email
                        </span>
                    }
                    bordered={true}
                >
                    <a href="mailto:hello@glowbuzzer.com">hello@glowbuzzer.com</a>
                </Card>

                <Card
                    title={
                        <span>
                            <EnvironmentOutlined className="icon" /> By Post
                        </span>
                    }
                    bordered={true}
                >
                    <Space direction="vertical" size={0}>
                        <div>glowbuzzer Ltd</div>
                        <div>30 Hercules Way</div>
                        <div>Farnborough Aerospace Centre</div>
                        <div>GU14 6UU</div>
                        <div>UK</div>
                    </Space>
                </Card>

                <Card
                    title={
                        <span>
                            <CommentOutlined className="icon" /> Chat With Us
                        </span>
                    }
                    bordered={true}
                >
                    <p>
                        Please use the chat function at the bottom of the page. We're standing by
                        and ready to help!
                    </p>
                </Card>
            </div>
        </StyledDiv>
    )
}
