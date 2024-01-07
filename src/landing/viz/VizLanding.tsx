import { LandingPageLink } from "../../framework/conversions/LandingPageLink"
import * as React from "react"
import { Image } from "../../framework/components"
import screenShot from "./skew_points.png?glowsite"
import { StarFilled } from "@ant-design/icons"
import Robot from "./robot/Robot"
import AniLogo from "../utils/aniLogo/aniLogo"
import {Col, Layout, Row} from "antd"

import { GlowbuzzerApp } from "@glowbuzzer/controls/app"
import { useTheme } from "styled-components"

const VizLandingPage = () => {
    const theme=useTheme()
    return (
        <GlowbuzzerApp appName={"myapp"}>
            <Layout>
                <div className="top-section-container">
                    <div className="top-section">
                        <div className="left">
                            <div className="logo">
                                {/*<Logo />*/}

                                <AniLogo color={theme.colorPrimary} />
                            </div>
                            <div className="title">
                                Create robot visualisations with React and three.js
                            </div>
                            <div className="description">
                                <p>
                                    The glowbuzzer toolkit allows you to build robot and machine
                                    controls with a web-stack. Visualisations are developed with
                                    react-three-fibre (three.js) and allow you to simulate control
                                    code in realistic physical environments.
                                </p>
                                <p>
                                    Simulation supports a physics engine (cannon.js) allowing you to
                                    model the physical behaviour of objects you interact with.
                                </p>
                                <p>
                                    It is easy to integrate sensor data with your simulation. From
                                    simple digital and analog sensors through to camera and LIDAR
                                    data.
                                </p>
                                <p>All developed in very familiar JavaScript/TypeScript code.</p>
                            </div>
                        </div>
                        <div className="right">
                            <Robot color={theme.colorPrimary} />
                        </div>
                    </div>
                </div>
                <div className="bottom-section">
                    <div className="left">
                        <div className="image">
                            <Image
                                meta={screenShot}
                                alt="glowbuzzer UI screen shot"
                                maxWidth={600}
                            />
                        </div>
                    </div>
                    <div className="right">
                        <div className="title">Find out more</div>

                        <p>
                            Take a look at the{" "}
                            <LandingPageLink to="https://www.youtube.com/watch?v=LPFD4kW1ILw">
                                {" "}
                                introductory video on YouTube.
                            </LandingPageLink>
                        </p>

                        <p>
                            Have a look on twitter for{" "}
                            <LandingPageLink to="https://www.twitter.com/glowbuzzer">
                                {" "}
                                our latest product news.
                            </LandingPageLink>
                        </p>

                        <p>
                            If you want to dive into the code have a look on{" "}
                            <LandingPageLink to="https://www.github.com/glowbuzzer">
                                {" "}
                                GitHub.
                            </LandingPageLink>
                        </p>
                        <p>
                            Or browse the{" "}
                            <LandingPageLink to="/"> glowbuzzer website.</LandingPageLink>
                        </p>

                        <p>For more detailed information take a look at:</p>
                        <Row gutter={30} align="middle">
                            <Col xs={2} lg={1}>
                                <StarFilled style={{ color: "#9254de" }} />
                            </Col>
                            <Col xs={22} lg={22}>
                                <LandingPageLink to="/blogs/webdev/threejs">
                                    Read the introduction to three.js blog
                                </LandingPageLink>
                            </Col>
                        </Row>
                        <Row gutter={30} align="middle">
                            <Col xs={2} lg={1}>
                                <StarFilled style={{ color: "#9254de" }} />
                            </Col>
                            <Col xs={22} lg={22}>
                                <LandingPageLink to="/get-started/frontend">
                                    Start a project using the glowbuzzer Create React App template
                                </LandingPageLink>
                            </Col>
                        </Row>

                        <Row gutter={30} align="middle">
                            <Col xs={2} lg={1}>
                                <StarFilled style={{ color: "#9254de" }} />
                            </Col>
                            <Col xs={22} lg={22}>
                                <LandingPageLink to="/docs/gbr/overview">
                                    Understanding how glowbuzzer uses React
                                </LandingPageLink>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Layout>
        </GlowbuzzerApp>
    )
}

export default VizLandingPage
