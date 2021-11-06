import { BaseLayout } from "./BaseLayout"
import { Row, Col, Space } from "antd"
import styled from "@emotion/styled"
import { HomeCarousel } from "../components/HomeCarousel"
import { YoutubeEmbed } from "../components/Video"

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

const FeatureTitle = styled.h2``

const FeatureSubTitle = styled.h3``

import HexImage from "../../home/hex_components.svg"

export const HomePage = () => {
    return (
        <BaseLayout>
            <div>
                <HomeCarousel desktop={true} />

                <img src={HexImage} />

                <YoutubeEmbed embedId="VnhS6107czk" />

                <Space
                    direction="horizontal"
                    style={{ width: "100%", justifyContent: "center", marginTop: "30px" }}
                >
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
