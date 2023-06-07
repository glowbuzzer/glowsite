import { LandingPageLink } from "../../framework/conversions/LandingPageLink"
import * as React from "react"
import { Image } from "../../framework/components"
import screenShot from "./skew_points.png?glowsite"
import { StarFilled } from "@ant-design/icons"
// import Robot from "./robot/Robot"
import AniLogo from "../utils/aniLogo/aniLogo"
import { Col, Row } from "antd"

import { GlowbuzzerApp } from "@glowbuzzer/controls/app"

import { useTheme } from "styled-components"

const EmbeddedLandingPage = () => {
    const theme=useTheme()
    return (
        <GlowbuzzerApp appName={"glowsite"}>
            <div>
                <div className="top-section-container">
                    <div className="top-section">
                        <div className="left">
                            <div className="logo">
                                {/*<Logo />*/}

                                <AniLogo color={theme.colorPrimary} />
                            </div>
                            <div className="title">Create embedded machine and robot controls</div>
                            <div className="description">
                                <p>
                                    Use either embedded Linux or high-end microcontroller platforms
                                    to create machine and robot controls
                                </p>
                                <p>EtherCAT interface</p>
                                <p>PLC</p>
                                <p></p>
                            </div>
                        </div>
                        <div className="right">
                            <div className="media-container">
                                {/*<Canvas>*/}
                                {/*    <ambientLight />*/}
                                {/*    <gridHelper />*/}
                                {/*    <OrbitControls />*/}
                                {/*    <mesh>*/}
                                {/*        <boxBufferGeometry args={[1, 1, 1]} />*/}
                                {/*    </mesh>*/}
                                {/*</Canvas>*/}
                                {/*<Robot color={GbColours.MainPurple}/>*/}
                                <video
                                    className="video"
                                    src="https://static.glowbuzzer.com/glowsite/landing/gb_blizzard.mp4"
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

export default EmbeddedLandingPage
