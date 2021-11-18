import { BaseLayout } from "./BaseLayout"
import { Button, Col, Row } from "antd"
import styled from "@emotion/styled"
import { RightCircleOutlined } from "@ant-design/icons"
import { FeaturedBlog } from "../components/FeaturedBlog"
import { ReactComponent as CoordinatedIcon } from "../../images/home_icons/coordinated-icon.svg?inline"
import { ReactComponent as EmbeddedIcon } from "../../images/home_icons/embedded-icon.svg?inline"
import { ReactComponent as FieldbusIcon } from "../../images/home_icons/fieldbus-icon.svg?inline"
import { ReactComponent as GearsIcon } from "../../images/home_icons/gears.svg?inline"
import { ReactComponent as IndependenceIcon } from "../../images/home_icons/independence-icon.svg?inline"
import { ReactComponent as IntegratedIcon } from "../../images/home_icons/integrated-icon.svg?inline"
import { ReactComponent as RealTimeIcon } from "../../images/home_icons/real-time-icon.svg?inline"
import { ReactComponent as RoboticArmIcon } from "../../images/home_icons/robotic-arm-icon.svg?inline"
import { ReactComponent as Html5Icon } from "../../images/home_icons/html5-icon.svg?inline"
import * as React from "react"
import { Section } from "../components/Section"
import { ReactComponent as RocketIcon } from "../../home/rocket.svg?inline"
import { HomeCarousel } from "../components/HomeCarousel"
import { YoutubeEmbed } from "../components/Video"
import HexImage from "../../home/hex_components.svg"

const HeroSection = styled.div`
    position: relative;
    display: flex;
    align-items: stretch;
    max-height: 300px;

    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 50px 100px;
    }

    h1 {
        margin-top: 0;
    }

    .hero-image {
        min-height: 100%;
        margin-left: 100px;
        margin-right: 100px;
    }
`

export const HomePage = () => {
    return (
        <BaseLayout>
            <HomeCarousel desktop={true} />

            <Section>
                <img src={HexImage} alt="hex image" />
            </Section>

            <Section background={"White"} spaced>
                <YoutubeEmbed embedId="VnhS6107czk" />
            </Section>

            <Section background={"BackgroundDarkSection"} inverted guttered>
                <HeroSection>
                    <main>
                        <h1>Get started</h1>
                        <p>
                            With our starter-kits and easy to follow instructions, you can quickly
                            build a React application to control motors and IO and get started
                            controlling with machines with web-tech
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
                    </main>
                    <RocketIcon className="hero-image" />
                </HeroSection>
            </Section>

            <Section spaced>
                <div style={{ textAlign: "center", fill: "#9254de" }}>
                    <Row justify={"center"}>
                        <Col span={8} style={{ padding: "20px" }}>
                            <Html5Icon width={"15%"} />
                            <h2>Web stack</h2>
                            <h3>
                                Build complex machine control applications in a web stack - no
                                proprietary languages or IDEs
                            </h3>
                        </Col>
                        <Col span={8} style={{ padding: "20px" }}>
                            <CoordinatedIcon width={"15%"} />
                            <h2>Co-ordinated motion</h2>
                            <h3>
                                Control robots and machines with complex kinematic configurations
                            </h3>
                        </Col>
                        <Col span={8} style={{ padding: "20px" }}>
                            <EmbeddedIcon width={"15%"} />
                            <h2>Embeddable</h2>
                            <h3>
                                Runs on a Linux or microcontroller platform making it easy to embed
                                into your product
                            </h3>
                        </Col>
                    </Row>

                    <Row justify={"center"}>
                        <Col span={8} style={{ padding: "20px" }}>
                            <RealTimeIcon width={"15%"} />
                            <h2>Real-time</h2>
                            <h3>
                                Handle complex real-time machine control challenges in a software
                                stack you are familiar with
                            </h3>
                        </Col>
                        <Col span={8} style={{ padding: "20px" }}>
                            <FieldbusIcon width={"15%"} />
                            <h2>Fieldbus integration</h2>
                            <h3>
                                Integrates common fieldbusses (EtherCAT, PROFINET, Ethernet/IP and
                                so on)
                            </h3>
                        </Col>
                        <Col span={8} style={{ padding: "20px" }}>
                            <RoboticArmIcon width={"15%"} />
                            <h2>Solve challenging machine control problems</h2>
                            <h3>
                                Handles complex requirements, for example sensor guided real-time
                                motion
                            </h3>
                        </Col>
                    </Row>

                    <Row justify={"center"}>
                        <Col span={8} style={{ padding: "20px" }}>
                            <IntegratedIcon width={"15%"} />
                            <h2>PLC integration</h2>
                            <h3>
                                Integrates with PLCs from leading manufacturers - Codesys, Siemens,
                                Allen Bradley, ABB, Omron...
                            </h3>
                        </Col>
                        <Col span={8} style={{ padding: "20px" }}>
                            <IndependenceIcon width={"15%"} />
                            <h2>Vendor independence</h2>
                            <h3>
                                Work with any hardware so you can mix and match to get the
                                performance you want at the price point you need
                            </h3>
                        </Col>
                        <Col span={8} style={{ padding: "20px" }}>
                            <GearsIcon width={"15%"} />
                            <h2>Develop using technology you understand</h2>
                            <h3>
                                Runs on a Linux or microcontroller platform making it easy to embed
                                into your product
                            </h3>
                        </Col>
                    </Row>
                </div>
            </Section>
            <Section background={"BackgroundDarkSection"} inverted spaced guttered>
                <HeroSection>
                    <h1>Blogs that might interest you</h1>
                </HeroSection>
            </Section>
            <Section>
                <FeaturedBlog />
            </Section>
        </BaseLayout>
    )
}
