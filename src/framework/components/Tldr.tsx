import * as React from "react"

import { Card, Avatar, Divider } from "antd"
import { CheckCircleOutlined } from "@ant-design/icons"
import styled from "@emotion/styled"

const StyledTldr = styled.div`
    @media (max-width: 950px) {
        .tldr-wide {
            display: none;
        }
    }
`

export const Tldr = ({ children }) => (
    <StyledTldr>
        <div className="tldr-wide">
            <Card
                size="small"
                style={{ width: 300, float: "right", margin: "0 10px 0 20px" }}
                className={"tldr-wide"}
            >
                <Card.Meta
                    title={"TL;DR"}
                    style={{ padding: "10px 0 0 0" }}
                    avatar={
                        <Avatar
                            style={{ backgroundColor: "#fff", color: "#000000" }}
                            size="small"
                            icon={<CheckCircleOutlined />}
                        />
                    }
                />
                <Divider />
                {children}
                {/*
        <ul>
            {React.Children.map(children, child => (
                <li>{child}</li>
            ))}
        </ul>
*/}
            </Card>
        </div>
    </StyledTldr>
)
