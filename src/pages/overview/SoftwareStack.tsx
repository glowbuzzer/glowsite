import { Col, Row } from "antd"
import {
    ApiOutlined,
    ControlOutlined,
    DesktopOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons"
import styled from "styled-components"

const StyledDiv = styled.div`
    h1 {
        text-align: center;
        margin-bottom: 20px;
    }
`

const Section = styled.div`
    //padding: 40px 0;
    .ant-col {
        font-size: 1.2em;
    }

    border-top: 1px solid ${props => props.theme.colorBorder};

    //&:nth-child(even) {
    //    background-color: white;
    //}
`

const IconWrapper = styled.div`
    font-size: 250px;
    color: ${props => props.theme.colorPrimaryHover};
    text-align: center;
    //margin-bottom: 24px;
`

const SoftwareStack = () => {
    return (
        <StyledDiv>
            <h1>We provide four key software components for your control solution</h1>

            <Section>
                <a id="hmi" />
                <Row align="middle" gutter={[32, 32]}>
                    <Col xs={24} md={12}>
                        <IconWrapper>
                            <DesktopOutlined />
                        </IconWrapper>
                    </Col>
                    <Col xs={24} md={12}>
                        <h2>HMI Framework</h2>
                        <p>
                            A modern, web-based framework built with React for creating responsive,
                            user-friendly machine interfaces. It includes:
                        </p>
                        <ul>
                            <li>Basic motion control: jog, point-to-point, and velocity moves</li>
                            <li>G-code handling and visualization</li>
                            <li>Flow-Maker: a no-code programming tool</li>
                            <li>3D machine cell simulation environment</li>
                            <li>Configuration, diagnostics, and logging tools</li>
                        </ul>
                        <p>
                            This software typically runs on a machine-mounted tablet or a standard
                            PC. It's provided under an open-source license and customized for each
                            machine's unique requirements.
                        </p>
                    </Col>
                </Row>
            </Section>

            <Section>
                <a id="control" />
                <Row align="middle" gutter={[32, 32]}>
                    <Col xs={24} md={{ span: 12, order: 2 }}>
                        <IconWrapper>
                            <ControlOutlined />
                        </IconWrapper>
                    </Col>
                    <Col xs={24} md={{ span: 12, order: 1 }}>
                        <h2>Core Control System</h2>
                        <p>This is the real-time brain of the machine. It handles:</p>
                        <ul>
                            <li>Trajectory generation</li>
                            <li>Kinematics and dynamics computation</li>
                            <li>Real-time communication to the machine hardware</li>
                        </ul>
                        <p>
                            It runs on embedded Linux within the machine and communicates via
                            WebSockets to the HMI. This software is closed-source and usually
                            licensed per machine.
                        </p>
                    </Col>
                </Row>
            </Section>

            <Section>
                <a id="ethercat" />
                <Row align="middle" gutter={[32, 32]}>
                    <Col xs={24} md={12}>
                        <IconWrapper>
                            <ApiOutlined />
                        </IconWrapper>
                    </Col>
                    <Col xs={24} md={12}>
                        <h2>Interface to Drives and I/O (EtherCAT & Modbus)</h2>
                        <p>
                            This component connects the control software to fieldbus devices via
                            EtherCAT and Modbus. It provides real-time communication between the
                            machine's sensors, actuators, and drives and our control software.
                        </p>
                        <p>
                            This low-level layer operates silently in the background, ensuring that
                            all hardware behaves correctly and responds predictably. It's
                            open-source and available under a permissive license.
                        </p>
                    </Col>
                </Row>
            </Section>

            <Section>
                <a id="supervisor" />
                <Row align="middle" gutter={[32, 32]}>
                    <Col xs={24} md={{ span: 12, order: 2 }}>
                        <IconWrapper>
                            <SafetyCertificateOutlined />
                        </IconWrapper>
                    </Col>
                    <Col xs={24} md={{ span: 12, order: 1 }}>
                        <h2>Safety Supervisor</h2>
                        <p>
                            Functional Safety ensures machines respond safely and predictably, even
                            in the presence of faults. Our safety layer supports:
                        </p>
                        <ul>
                            <li>SIL3 / PL-e level safety</li>
                            <li>EtherCAT FSoE (Fail Safe over EtherCAT) technology</li>
                            <li>
                                Compatibility with advanced FSoE drives (e.g. Synapticon Circulo,
                                Kollmorgen AKD2G, Baumüller b maXX, Bosch Indradrive)
                            </li>
                            <li>Integration with BBH's FSoE master (SCU-X-EC)</li>
                        </ul>
                        <p>
                            This allows OEMs to build machines that can operate safely around people
                            without compromise.
                        </p>
                    </Col>
                </Row>
            </Section>
        </StyledDiv>
    )
}

export default SoftwareStack
