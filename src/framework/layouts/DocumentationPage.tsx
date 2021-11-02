import { ContexualLeftNav } from "../nav/ContexualLeftNav"
import styled from "@emotion/styled"
import { BaseLayout } from "./BaseLayout"
import { Col, Row } from "antd"
import {MenuUnfoldOutlined} from "@ant-design/icons";

const StyledDiv = styled.div`
    //display: flex;
    //gap: 20px;
    height: 100%;

    .ant-row {
        height: 100%;
    }

    .left {
        background: white;

        .collapsed {
            display: none;
            font-size: 2em;
            padding: 10px;
        }

        @media (max-width: 768px) {
            width: 50px;
            .full {
                display: none;
            }

            .collapsed {
                display: block;
            }
        }
    }

    .content {
        margin: 20px;
        //flex-grow: 1;
    }

    // only format code elements outside of pre block
    *:not(pre) > code {
        //background: #d9d9d9;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        padding: 0 3px 0 3px;
    }
`

export const DocumentationPage = ({ children }) => {
    return (
        <BaseLayout>
            <StyledDiv>
                <Row>
                    <Col md={4} className="left">
                        <div className="full">
                            <ContexualLeftNav />
                        </div>
                        <div className="collapsed">
                            <MenuUnfoldOutlined onClick={() => alert("TODO")}/>
                        </div>
                    </Col>
                    <Col flex="auto">
                        <div className="content">{children}</div>
                    </Col>
                </Row>
            </StyledDiv>
        </BaseLayout>
    )
}
