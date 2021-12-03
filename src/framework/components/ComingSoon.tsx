import coming_soon from "./images/coming_soon.png?glowsite"
import { Image } from "./Image"
import { Col, Row } from "antd"
import styled from "styled-components"

const StyledDiv = styled.div`
    .div-text {
        margin-top: auto;
        margin-bottom: auto;
    }
`

export const ComingSoon = () => {
    return (
        <StyledDiv>
            <Row>
                <Col span={12} className="div-text">
                    <h2>Coming soon!</h2>
                    <h3>
                        This content is coming soon. Please let us know if you need it urgently and
                        we hurry it up in the lab.
                    </h3>
                </Col>
                <Col span={12}>
                    <Image meta={coming_soon} alt="Coming Soon" maxWidth={300} />
                </Col>
            </Row>
        </StyledDiv>
    )
}
