import { Row, Col } from "antd"
import { GithubOutlined } from "@ant-design/icons"
import styled from "@emotion/styled"

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
    background: white;

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
        displayUrl = `github.com/glowbuzzer/${repo}/tree/master${directory}`
        actualUrl = `https://github.com/glowbuzzer/${repo}/tree/master${directory}`
    } else {
        displayUrl = `github.com/glowbuzzer/${repo}/blob/master${directory}/${file}`
        actualUrl = `https://github.com/glowbuzzer/${repo}/blob/master${directory}/${file}`
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
