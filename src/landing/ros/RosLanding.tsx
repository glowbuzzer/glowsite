import { LandingPageLink } from "../../framework/conversions/LandingPageLink"
import * as React from "react"
import { Suspense } from "react"
import { ReactComponent as Logo } from "../../images/logos/tiny-logo.svg?inline"
import { Image } from "../../framework/components"
import screenShot from "./skew_points.png?glowsite"
import Icon from "@ant-design/icons"
import { StarFilled } from "@ant-design/icons"
// import Robot from "./robot/Robot"
import AniLogo from "../utils/aniLogo/aniLogo"
import { Col, Row } from "antd"

import { GlowbuzzerApp } from "@glowbuzzer/controls/app"

import { GbColours, GlowsiteTheme } from "../../framework/GlowsiteTheme"

const RosLandingPage = () => {
    return (
        <GlowbuzzerApp appName={"glowsite"}>
            <div>
                <div className="top-section-container">
                    <div className="top-section">
                        <div className="left">
                            <div className="logo">
                                <AniLogo color={GbColours.MainPurple} />
                            </div>
                            <div className="title">
                                Migrate from ROS & build machine and robot controls with modern web
                                technologies
                            </div>
                            <div className="description">
                                <p>
                                    There are no easy ways to write a robot control and ROS has
                                    faced difficult design decisions over its long history.
                                </p>
                                <p>
                                    You will be landing here either because you are frustrated with
                                    ROS or because you have enough experience to know that ROS has
                                    too many limitations:
                                    <ul>
                                        <li>
                                            Unfederated project with endless confusing dependencies
                                            spread across dozens of packages. It takes a long time
                                            to figure out how to do even very simple things.
                                        </li>
                                        <li>
                                            A complex build system described as “CMake but with more
                                            boilerplate config and config outside of config files”.
                                        </li>
                                        <li>
                                            It is more of a tool for robotics research than
                                            fully-fledged commercial applications.
                                        </li>
                                    </ul>
                                </p>
                                <p>
                                    glowbuzzer is an integrated toolkit developed for commercial
                                    machine and robot builders who are shipping real product to real
                                    customers. It uses modern programming languages and frameworks
                                    (React/Typescript/three.js) making developing machine controls
                                    quicker and easier.
                                </p>
                            </div>
                        </div>
                        <div className="right">
                            <div className="media-container">
                                <video
                                    className="video"
                                    src="https://static.glowbuzzer.com/glowsite/landing/staubli_landing.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            </div>
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
                            Or have a look on twitter for{" "}
                            <LandingPageLink to="https://www.twitter.com/glowbuzzer">
                                {" "}
                                our latest product news.
                            </LandingPageLink>
                        </p>

                        <p>
                            Or or you want to dive into the code have a look on{" "}
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
                                <LandingPageLink to="/how-it-works/overview">
                                    Read a basic technical introduction
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
            </div>
        </GlowbuzzerApp>
    )
}

export default RosLandingPage
