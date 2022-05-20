import * as React from "react"

import { Card, Avatar, Divider } from "antd"
import { CheckCircleOutlined } from "@ant-design/icons"
import styled from "styled-components"

const StyledTldr = styled.div`
    .ant-card {
        float: right;
        width: 300px;
        margin: 20px;
        padding-top: 20px;
    }

    @media (max-width: 950px) {
        .tldr-wide {
            display: none;
        }
    }
`

export const Tldr = ({ children }) => (
    <StyledTldr>
        <div className="tldr-wide">
            <Card size="small" className={"tldr-wide"}>
                <Card.Meta
                    title={"TL;DR"}
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
            </Card>
        </div>
    </StyledTldr>
)
