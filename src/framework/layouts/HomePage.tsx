import { BaseLayout } from "./BaseLayout"
import { Row, Col, Carousel, Space } from "antd"
import styled from "@emotion/styled"

import { ReactComponent as StackIcon } from "../../images/home_icons/stack-icon.svg?inline"
import { ReactComponent as BeautifulIcon } from "../../images/home_icons/beautiful-icon.svg?inline"
import { ReactComponent as CoordinatedIcon } from "../../images/home_icons/coordinated-icon.svg?inline"
import { ReactComponent as DrivesIcon } from "../../images/home_icons/drives-icon.svg?inline"
import { ReactComponent as EmbeddedIcon } from "../../images/home_icons/embedded-icon.svg?inline"
import { ReactComponent as FieldbusIcon } from "../../images/home_icons/fieldbus-icon.svg?inline"
import { ReactComponent as GearsIcon } from "../../images/home_icons/gears.svg?inline"
import { ReactComponent as IndependenceIcon } from "../../images/home_icons/independence-icon.svg?inline"
import { ReactComponent as IntegratedIcon } from "../../images/home_icons/integrated-icon.svg?inline"
import { ReactComponent as KnittingIcon } from "../../images/home_icons/knitting-icon.svg?inline"
import { ReactComponent as ModernIcon } from "../../images/home_icons/modern-icon.svg?inline"
import { ReactComponent as OpenSourceIcon } from "../../images/home_icons/open-source-icon.svg?inline"
import { ReactComponent as RealTimeIcon } from "../../images/home_icons/real-time-icon.svg?inline"
import { ReactComponent as RecycleIcon } from "../../images/home_icons/recycle-icon.svg?inline"
import { ReactComponent as RoboticArmIcon } from "../../images/home_icons/robotic-arm-icon.svg?inline"
import { ReactComponent as TabletIcon } from "../../images/home_icons/tablet-icon.svg?inline"
import { ReactComponent as SoftwareDevIcon } from "../../images/home_icons/software-dev-icon.svg?inline"
import { ReactComponent as TrajectoryIcon } from "../../images/home_icons/trajectory-icon.svg?inline"
import { ReactComponent as Html5Icon } from "../../images/home_icons/html5-icon.svg?inline"

export const CarouselSettings = {
    arrows: false,
    dots: true,
    pauseOnHover: true,
    infinite: true,
    speed: 5000,
    centerMode: false,
    autoplay: true,
    fade: false,
    adaptiveHeight: false,
    variableWidth: false,
    cssEase: "cubic-bezier(0.65, 0, 0.35, 1)"
}

const CarouselWrapper = styled(Carousel)`
    > .slick-dots li button {
        width: 6px !important;
        height: 6px !important;
        border-radius: 100% !important;
        background: grey !important;
    }

    > .slick-dots li.slick-active button {
        width: 7px !important;
        height: 7px !important;
        border-radius: 100% !important;
        background: ${props => props.theme.color.MainPurple}!important;
    }
`

const CarouselTitle = styled.h1`
    font-size: 3.5em;
    // color: white;
    font-weight: bold;
`

const CarouselSubTitle = styled.h2`
    font-size: 1.5em;
    // color: white;
    padding: 10px 0 10px 0;
`

const FeatureTitle = styled.h2``

const FeatureSubTitle = styled.h3``

import BackgroundImage1 from "../../home/background_motor_w.jpg"
import BackgroundImage2 from "../../home/background_board_w.jpg"
import BackgroundImage3 from "../../home/background_io_w.jpg"

import ForegroundImage1 from "../../home/iso_laptop_linux.svg"
import ForegroundImage2 from "../../home/iso_cpu.svg"
import ForegroundImage3 from "../../home/iso_pc_ethercat_master.svg"

import GBLogo from "../../images/logos/small-logo.svg"
import HexImage from "../../home/hex_components.svg"
// <MyImageHome width={"5%"}/>

export const HomePage = () => {
    return (
        <BaseLayout>
            <div>
                <CarouselWrapper {...CarouselSettings}>
                    <div>
                        <div
                            style={{
                                background: `url(${BackgroundImage1})`,
                                backgroundRepeat: "no-repeat",
                                height: 610
                            }}
                        >
                            <Row>
                                <Col span={1} />
                                <Col span={11}>
                                    <CarouselTitle>
                                        Control machines and robots with a web stack
                                    </CarouselTitle>
                                    <CarouselSubTitle>
                                        Build complex machine control applications with React &
                                        node.js
                                    </CarouselSubTitle>
                                    <CarouselSubTitle>
                                        Take the glowbuzzer toolkit’s React components and use them
                                        either unchanged, extended or added to with your own custom
                                        components to build the visual front-end and control logic
                                        for your machine control.
                                    </CarouselSubTitle>

                                    <CarouselSubTitle>
                                        Control a wide variety of types of machine including robots.
                                    </CarouselSubTitle>
                                    <CarouselSubTitle>
                                        React components can run in web browsers or with React
                                        Native on Android/IoS or Windows/MacOs (or Electron).
                                    </CarouselSubTitle>
                                </Col>
                                <Col span={1} />
                                <Col span={11}>
                                    <img src={ForegroundImage1} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                background: `url(${BackgroundImage2})`,
                                backgroundRepeat: "no-repeat",
                                height: 610
                            }}
                        >
                            <Row>
                                <Col span={1} />
                                <Col span={11}>
                                    <CarouselTitle>
                                        Deploy to embedded Linux or microcontroller
                                    </CarouselTitle>
                                    <CarouselSubTitle>
                                        The real-time components of the glowbuzzer toolkit will run
                                        on desktop or embedded Linux or a microcontroller (e.g.
                                        STM32).
                                    </CarouselSubTitle>
                                    <CarouselSubTitle>
                                        This gives the flexibility to deploy the toolkit to a wide
                                        range of different environments.
                                    </CarouselSubTitle>
                                    <CarouselSubTitle>
                                        The components are highly performant and multi-core ARM SoCs
                                        or dual core microcontrollers will supports 6 axis robots at
                                        a 1 msec cycle time to the drives.
                                    </CarouselSubTitle>
                                </Col>
                                <Col span={1} />
                                <Col span={11}>
                                    <img src={ForegroundImage2} height={600} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                background: `url(${BackgroundImage3})`,
                                backgroundRepeat: "no-repeat",
                                height: 610
                            }}
                        >
                            <Row>
                                <Col span={1} />
                                <Col span={11}>
                                    <CarouselTitle>
                                        Work with industrial fieldbusses e.g. EtherCAT
                                    </CarouselTitle>
                                    <CarouselSubTitle>
                                        Work with drives and IO from any manufacturer that offers a
                                        real-time fieldbus interface or on an embedded platform
                                        integrate over SPI with motor driver ICs
                                    </CarouselSubTitle>
                                    <CarouselSubTitle>
                                        Supports, out of the box, IO and drives from leading vendors
                                        such as Beckhoff, Kollmorgen, Omron, Delta.
                                    </CarouselSubTitle>
                                    <CarouselSubTitle>
                                        This means you can control motors ranging from tiny 4mm
                                        diameter 50,000 rpm BLDC devices through to multi-megawatt
                                        motors the size of trucks.
                                    </CarouselSubTitle>
                                </Col>
                                <Col span={1} />
                                <Col span={11}>
                                    <img src={ForegroundImage3} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </CarouselWrapper>

                <img src={HexImage} />

                <Space direction="horizontal" style={{ width: "100%", justifyContent: "center" }}>
                    <div style={{ textAlign: "center", fill: "#9254de" }}>
                        <Row justify={"center"}>
                            <Col span={8}>
                                <Html5Icon width={"15%"} />
                                <FeatureTitle>Web stack</FeatureTitle>
                                <FeatureSubTitle>
                                    Build complex machine control applications in a web stack - no
                                    proprietary languages or IDEs
                                </FeatureSubTitle>
                            </Col>
                            <Col span={8}>
                                <CoordinatedIcon width={"15%"} />
                                <FeatureTitle>Co-ordinated motion</FeatureTitle>
                                <FeatureSubTitle>
                                    Control robots and machines with complex kinematic
                                    configurations
                                </FeatureSubTitle>
                            </Col>
                            <Col span={8}>
                                <EmbeddedIcon width={"15%"} />
                                <FeatureTitle>Embeddable</FeatureTitle>
                                <FeatureSubTitle>
                                    Runs on a Linux or microcontroller platform making it easy to
                                    embed into your product
                                </FeatureSubTitle>
                            </Col>
                        </Row>

                        <Row justify={"center"}>
                            <Col span={8}>
                                <RealTimeIcon width={"15%"} />
                                <FeatureTitle>Real-time</FeatureTitle>
                                <FeatureSubTitle>
                                    Handle complex real-time machine control challenges in a
                                    software stack you are familiar with
                                </FeatureSubTitle>
                            </Col>
                            <Col span={8}>
                                <FieldbusIcon width={"15%"} />
                                <FeatureTitle>Fieldbus integration</FeatureTitle>
                                <FeatureSubTitle>
                                    Integrates common fieldbusses (EtherCAT, PROFINET, Ethernet/IP
                                    and so on)
                                </FeatureSubTitle>
                            </Col>
                            <Col span={8}>
                                <RoboticArmIcon width={"15%"} />
                                <FeatureTitle>
                                    Solve challenging machine control problems
                                </FeatureTitle>
                                <FeatureSubTitle>
                                    Handles complex requirements, for example sensor guided
                                    real-time motion
                                </FeatureSubTitle>
                            </Col>
                        </Row>

                        <Row justify={"center"}>
                            <Col span={8}>
                                <IntegratedIcon width={"15%"} />
                                <FeatureTitle>PLC integration</FeatureTitle>
                                <FeatureSubTitle>
                                    Integrates with PLCs from leading manufacturers - Codesys,
                                    Siemens, Allen Bradley, ABB, Omron...
                                </FeatureSubTitle>
                            </Col>
                            <Col span={8}>
                                <IndependenceIcon width={"15%"} />
                                <FeatureTitle>Vendor independence</FeatureTitle>
                                <FeatureSubTitle>
                                    Work with any hardware so you can mix and match to get the
                                    performance you want at the price point you need
                                </FeatureSubTitle>
                            </Col>
                            <Col span={8}>
                                <GearsIcon width={"15%"} />
                                <FeatureTitle>Develop using technology you understand</FeatureTitle>
                                <FeatureSubTitle>
                                    Runs on a Linux or microcontroller platform making it easy to
                                    embed into your product
                                </FeatureSubTitle>
                            </Col>
                        </Row>
                    </div>
                </Space>
            </div>
        </BaseLayout>
    )
}
