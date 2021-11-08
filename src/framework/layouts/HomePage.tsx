import { BaseLayout } from "./BaseLayout"
import { Row, Col, Space, Button } from "antd"
import styled from "@emotion/styled"
import { RightCircleOutlined } from "@ant-design/icons"
import { HomeCarousel } from "../components/HomeCarousel"
import { YoutubeEmbed } from "../components/Video"
import { FeaturedBlog } from "../components/FeaturedBlog"

import { ReactComponent as RocketIcon } from "../../home/rocket.svg?inline"
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
import * as React from "react"

const GetStartedBar = styled.div`
    background: #22075e;
    color: white;
    height: 350px;
`

const BlogIntro = styled.div`
    background: #22075e;
    color: white;
    height: 80px;
`

export const HomePage = () => {
    return (
        <BaseLayout>
            <div>
                <HomeCarousel desktop={true} />

                <img src={HexImage} />

                <YoutubeEmbed embedId="VnhS6107czk" />

                <GetStartedBar>
                    <Row>
                        <Col span={1} />
                        <Col span={11}>
                            <h1
                                style={{
                                    color: "white",
                                    paddingBottom: "20px",
                                    paddingTop: "40px"
                                }}
                            >
                                Get started
                            </h1>
                            <p style={{ color: "white", paddingBottom: "20px" }}>
                                With our starter-kit and easy to follow instructions, it is easy to
                                quickly build a React application to control motors and IO and get
                                started controlling with machines with web-tech
                            </p>
                            <p>
                                <Button
                                    type="primary"
                                    href="/get-started/motion"
                                    icon={<RightCircleOutlined />}
                                >
                                    Find out more{" "}
                                </Button>
                            </p>
                        </Col>
                        <Col span={2} />
                        <Col span={10}>
                            <RocketIcon height={"350px"} />
                        </Col>
                        <Col span={2} />
                    </Row>
                </GetStartedBar>

                <Space
                    direction="horizontal"
                    style={{ width: "100%", justifyContent: "center", marginTop: "30px" }}
                >
                    <div style={{ textAlign: "center", fill: "#9254de" }}>
                        <Row justify={"center"}>
                            <Col span={8} style={{ padding: "20px" }}>
                                <Html5Icon width={"15%"} />
                                <FeatureTitle>Web stack</FeatureTitle>
                                <FeatureSubTitle>
                                    Build complex machine control applications in a web stack - no
                                    proprietary languages or IDEs
                                </FeatureSubTitle>
                            </Col>
                            <Col span={8} style={{ padding: "20px" }}>
                                <CoordinatedIcon width={"15%"} />
                                <FeatureTitle>Co-ordinated motion</FeatureTitle>
                                <FeatureSubTitle>
                                    Control robots and machines with complex kinematic
                                    configurations
                                </FeatureSubTitle>
                            </Col>
                            <Col span={8} style={{ padding: "20px" }}>
                                <EmbeddedIcon width={"15%"} />
                                <FeatureTitle>Embeddable</FeatureTitle>
                                <FeatureSubTitle>
                                    Runs on a Linux or microcontroller platform making it easy to
                                    embed into your product
                                </FeatureSubTitle>
                            </Col>
                        </Row>

                        <Row justify={"center"}>
                            <Col span={8} style={{ padding: "20px" }}>
                                <RealTimeIcon width={"15%"} />
                                <FeatureTitle>Real-time</FeatureTitle>
                                <FeatureSubTitle>
                                    Handle complex real-time machine control challenges in a
                                    software stack you are familiar with
                                </FeatureSubTitle>
                            </Col>
                            <Col span={8} style={{ padding: "20px" }}>
                                <FieldbusIcon width={"15%"} />
                                <FeatureTitle>Fieldbus integration</FeatureTitle>
                                <FeatureSubTitle>
                                    Integrates common fieldbusses (EtherCAT, PROFINET, Ethernet/IP
                                    and so on)
                                </FeatureSubTitle>
                            </Col>
                            <Col span={8} style={{ padding: "20px" }}>
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
                            <Col span={8} style={{ padding: "20px" }}>
                                <IntegratedIcon width={"15%"} />
                                <FeatureTitle>PLC integration</FeatureTitle>
                                <FeatureSubTitle>
                                    Integrates with PLCs from leading manufacturers - Codesys,
                                    Siemens, Allen Bradley, ABB, Omron...
                                </FeatureSubTitle>
                            </Col>
                            <Col span={8} style={{ padding: "20px" }}>
                                <IndependenceIcon width={"15%"} />
                                <FeatureTitle>Vendor independence</FeatureTitle>
                                <FeatureSubTitle>
                                    Work with any hardware so you can mix and match to get the
                                    performance you want at the price point you need
                                </FeatureSubTitle>
                            </Col>
                            <Col span={8} style={{ padding: "20px" }}>
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
                <BlogIntro>
                    <h1 style={{ color: "white", paddingLeft: "50px", paddingTop: "15px" }}>
                        Blogs that might interest you
                    </h1>
                </BlogIntro>
                <FeaturedBlog />
            </div>
        </BaseLayout>
    )
}
