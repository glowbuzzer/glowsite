import * as React from "react"

import { Card, Avatar, Divider } from "antd"
import { CheckCircleOutlined } from "@ant-design/icons"

export const Tldr = ({ children }) => (
    <Card size="small" style={{ width: 300, float: "right", margin: "0 10px 0 20px" }}>
        <Card.Meta
            title={"TLDR"}
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
)
