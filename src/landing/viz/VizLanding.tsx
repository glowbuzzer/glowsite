
import { LandingPageLink } from "../../framework/conversions/LandingPageLink"
import * as React from "react"
import {
     Suspense
} from "react"
import { ReactComponent as Logo } from "../../images/logos/tiny-logo.svg?inline"
import {Image} from "../../framework/components"
import screenShot from "./skew_points.png?glowsite"
import Icon from '@ant-design/icons';
import { StarFilled } from "@ant-design/icons"
import Robot from "./robot/Robot"
import AniLogo from "./aniLogo/aniLogo";
import {Col, Row} from "antd"

import {
    GlowbuzzerApp,
} from "@glowbuzzer/controls/app"

const VizLandingPage = () => {
    return (
        <GlowbuzzerApp>
        <div>
            <div className="top-section-container">
                <div className="top-section">
                    <div className="left">
                        <div className="logo">
                            {/*<Logo />*/}

                            <AniLogo/>

                        </div>
                        <div className="title">
                            Create robot visualisations with react-three-fiber
                        </div>
                        <div className="description">
                            <p>The glowbuzzer toolkit allows you to build robot and machine controls with a web-stack.
                            Visualisations are developed with react-three-fibre (three.js) and allow you to simulate
                                control code in realistic physical environments.</p>
                            <p>
                            Simulation supports a physics engine (cannon.js) allowing you to model the physical behaviour of
                            objects you interact with.
                            </p>
                        <p>
                            It is easy to integrate sensor data with your simulation. From simple digital and analog sensors through to camera and LIDAR data.
                            </p>
                        <p>
                            All developed in very familiar JavaScript/TypeScript code with React and a huge online community supporting the packages.
                        </p>
                        </div>
                    </div>
                    <div className="right">
                        {/*<Canvas>*/}
                        {/*    <ambientLight />*/}
                        {/*    <gridHelper />*/}
                        {/*    <OrbitControls />*/}
                        {/*    <mesh>*/}
                        {/*        <boxBufferGeometry args={[1, 1, 1]} />*/}
                        {/*    </mesh>*/}
                        {/*</Canvas>*/}
                        <Robot/>
                    </div>
                </div>
            </div>
            <div className="bottom-section">
                <div className="left">
                    <div className="image">
                        <Image meta={screenShot} alt="glowbuzzer UI screen shot"/>
                    </div>
                </div>
                <div className="right">
                    <div className="title">Find out more</div>

                    <p>Take a look at the <LandingPageLink to="/"> introductory video on YouTube.</LandingPageLink></p>

                    <p>Or have a look on twitter for <LandingPageLink to="/"> our latest product news.</LandingPageLink></p>

                    <p>For more detailled information take a look at:</p>
                    <Row gutter={30} align="middle">
                        <Col xs={2} lg={1}>
                            <StarFilled style={{color: "#9254de"}}/>
                        </Col>
                        <Col xs={22} lg={22}>
                            <LandingPageLink to="/blogs/webdev/threejs">Read the introduction to R3F blog</LandingPageLink>
                        </Col>
                    </Row>
                    <Row gutter={30} align="middle">
                        <Col xs={2} lg={1}>
                            <StarFilled style={{color: "#9254de"}}/>
                        </Col>
                        <Col xs={22} lg={22}>
                            <LandingPageLink to="/get-started/frontend">
                                Start a project using the glowbuzzer Create React App template
                            </LandingPageLink>
                        </Col>
                    </Row>

                    <Row gutter={30} align="middle">
                        <Col xs={2} lg={1}>
                            <StarFilled style={{color: "#9254de"}}/>
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

export default VizLandingPage
