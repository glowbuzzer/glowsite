
import { LandingPageLink } from "../framework/conversions/LandingPageLink"
import * as React from "react"
import { ReactComponent as Logo } from "../images/logos/tiny-logo.svg?inline"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

const TestLandingPage = () => {
    return (
        <div>
            <div className="top-section-container">
                <div className="top-section">
                    <div className="left">
                        <div className="logo">
                            <Logo />
                        </div>
                        <div className="title">
                            Test landing
                        </div>
                        <div className="description">
                            Use web stack blah lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel
                            eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
                            risus, porta ac consectetur ac.
                        </div>
                    </div>
                    <div className="right">
                        <Canvas>
                            <ambientLight />
                            <gridHelper />
                            <OrbitControls />
                            <mesh>
                                <boxBufferGeometry args={[1, 1, 1]} />
                            </mesh>
                        </Canvas>
                    </div>
                </div>
            </div>
            <div className="bottom-section">
                <div className="left">
                    <div className="image">?????</div>
                </div>
                <div className="right">
                    <div className="title">Find out more</div>
                    <ul>
                        <li>
                            <LandingPageLink to="/">Read the blog</LandingPageLink>
                        </li>
                        <li>
                            <LandingPageLink to="/">
                                Start a project using the glowbuzzer Create React App template
                            </LandingPageLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TestLandingPage
