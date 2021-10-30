import {Row, Col} from 'antd'
import styled from "@emotion/styled"


const StyledFooter = styled.div`
        padding:20px 100px;
        background-color: #d9d9d9;
        height: 200px;
        

`;


export const GlowsiteFooter  = () => {
    return(
        <StyledFooter>
            <Row>
                <Col span={3}></Col>
                <Col span={5}>
                    <h3>How it works</h3>
                    <p/>
                    <p>item1</p>
                    <p>item2</p>
                    <p>item3</p>
                </Col>
                <Col span={5}>
                    <h3>Get started</h3>
                    <p/>
                    <p>item1</p>
                    <p>item2</p>
                    <p>item3</p>
                </Col>
                <Col span={5}>
                    <h3>Legal</h3>
                    <p/>
                    <p>item1</p>
                    <p>item2</p>
                </Col>
                <Col span={5}>
                    <h3>github & youtube</h3>
                    <p/>
                    <p>item1</p>
                    <p>item2</p>
                </Col>
            </Row>
        </StyledFooter>

    )

}