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
        <GlowbuzzerApp>
            <div>
                <div className="top-section-container">
                    <div className="top-section">
                        <div className="left">
                            <div className="logo">
                                <AniLogo color={GbColours.MainPurple} />
                            </div>
                            <div className="title">
                                Migrate from Ros & build machine and robot controls with modern web
                                technologies
                            </div>
                            <div className="description">
                                <p>
                                    Unlike Ros, the glowbuzzer toolkit is focussed on real-world
                                    applications rather than academia or research.
                                </p>
                                <p>
                                    If you are sick-of Ros with huge volume of wierd dependencies
                                    and hurdles to get through to do fairly simple things then we
                                    have the answer. With the glowbuzzer toolkit it easy to get
                                    started.
                                </p>
                                <p>
                                    With Ros you need to learn a new, complex C++ framework spread
                                    across several dozens of packages in several repos. With
                                    glowbuzzer everything is integarted and you are using familar
                                    JavaScript/TypeScript code.
                                </p>
                                <p>
                                    Unlike the Ros build system which has been described as "CMake
                                    but with even more boilerplate configuration and also outside
                                    config files" you are in the of npm and HMR.
                                </p>
                                <p>
                                    Our engineering team can help migrate existing solutions or
                                    prototypes from Ros to the glowbuzzer platform.
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

                        <p>For more detailled information take a look at:</p>
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