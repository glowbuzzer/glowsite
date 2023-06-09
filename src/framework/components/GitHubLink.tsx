import * as React from "react"
import { Row, Col } from "antd"
import { GithubOutlined } from "@ant-design/icons"
import styled from "styled-components"

type GitHubLinkProps = {
    title: string
    repo: string
    directory?: string //optional
    file?: string //optional
}

const StyledDiv = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    background: ${props => props.theme.colorBgContainer};

    .col {
        padding: 10px;
        font-size: 1.2em;
    }

    .col.title {
        font-size: 1em;
    }
`

export const GitHubLink = ({ title, repo, directory, file }: GitHubLinkProps) => {
    var actualUrl
    var displayUrl

    if (!file) {
        displayUrl = `github.com/glowbuzzer/${repo}/tree/main${directory}`
        actualUrl = `https://github.com/glowbuzzer/${repo}/tree/main${directory}`
    } else {
        displayUrl = `github.com/glowbuzzer/${repo}/blob/main${directory}/${file}`
        actualUrl = `https://github.com/glowbuzzer/${repo}/blob/main${directory}/${file}`
    }

    return (
        <StyledDiv>
            <Row>
                <Col span={24} className={"col title"}>
                    {title}
                </Col>
            </Row>
            <Row>
                <Col span={1} className={"col"}>
                    <GithubOutlined />
                </Col>
                <Col span={23} className={"col"}>
                    <a href={actualUrl}>{displayUrl}</a>
                </Col>
            </Row>
        </StyledDiv>
    )
}
