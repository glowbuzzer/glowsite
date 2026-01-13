import { BaseLayout } from "../../framework/layouts/BaseLayout"
import { ReactComponent as CoordinatedIcon } from "../../images/home_icons/coordinated-icon.svg?inline"
import { ReactComponent as EmbeddedIcon } from "../../images/home_icons/embedded-icon.svg?inline"
import { ReactComponent as FieldbusIcon } from "../../images/home_icons/fieldbus-icon.svg?inline"
import { ReactComponent as GearsIcon } from "../../images/home_icons/gears.svg?inline"
import { ReactComponent as IndependenceIcon } from "../../images/home_icons/independence-icon.svg?inline"
import { ReactComponent as IntegratedIcon } from "../../images/home_icons/integrated-icon.svg?inline"
import { ReactComponent as RealTimeIcon } from "../../images/home_icons/real-time-icon.svg?inline"
import { ReactComponent as RoboticArmIcon } from "../../images/home_icons/robotic-arm-icon.svg?inline"
import { ReactComponent as Html5Icon } from "../../images/home_icons/html5-icon.svg?inline"
import { ReactComponent as RocketIcon } from "../../home/rocket.svg?inline"
import * as React from "react"
import { Section, StyledSection } from "../../framework/components/Section"
import { FeaturedItem, FeaturesSection } from "../../framework/components/FeaturesSection"
import styled, { keyframes, useTheme } from "styled-components"
import { OfferSection } from "./OfferSection"
import { HeroTeasers } from "../../framework/components/HeroTeasers"
import { HeroSection } from "./HeroSection"
import { Button } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons"
// @ts-ignore
import background from "./img-cropped.png"
import { Link } from "react-router-dom"
import { HomeCarousel2 } from "../../framework/components/HomeCarousel2"

const Strapline = styled.div`
    text-align: center;
    font-size: 2.5em;
    padding: 40px 0;
`

const StyledDiv = styled.div`
    position: relative;
    height: 800px;
    video {
        position: absolute;
        width: 100%;
        //opacity: 0.5;
        top: 0;
        left: 0;
        right: 0;
    }

    .strapline {
        padding: 40px 0;
        font-size: 2.5em;
        font-weight: bold;
        color: ${props => props.theme.colorPrimaryTextActive};
        text-align: center;
    }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const TopHeroSection = styled(StyledSection).withConfig({ displayName: "HeroSection" })`
    position: relative;
    //background: ${props => props.theme.colorPrimaryTextActive};
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        //background: url(${background}) center center no-repeat;
        //background-size: cover;
        //opacity: 0.2;
        //max-width: 600px;
        //z-index: -1;
    }
`

const HomepageHeroContent = styled.div.withConfig({ displayName: "HomepageHeroContent" })`
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;

    //&::before {
    //    content: "";
    //    position: absolute;
    //    top: 0;
    //    left: 0;
    //    right: 0;
    //    bottom: 0;
    //    background: radial-gradient(circle at 30% 50%, rgba(146, 84, 222, 0.1) 0%, transparent 70%);
    //    z-index: 0;
    //}

    > div.logo-container {
        z-index: 1;
        animation: ${fadeIn} 0.8s ease-out;
    }

    > div.content {
        z-index: 1;
        margin-top: 60px;
        margin-left: 400px;
        padding: 70px 40px;
        animation: ${fadeIn} 0.8s ease-out 0.2s backwards;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 30px;

        color: #2e035a;

        .first {
            font-size: 2.8em;
            line-height: 1.2;
            font-weight: 700;
            //color: #ffffff;
            margin-bottom: 20px;
        }

        .second {
            display: inline-block;
            margin-top: 20px;
            font-size: 1.6em;
            line-height: 1.4;
            //color: #e0e0e0;
            max-width: 600px;
        }
    }

    @media (max-width: 1200px) {
        flex-direction: column;
        align-items: center;
        text-align: center;

        > div.logo-container {
            margin-bottom: 20px;
        }

        > div.content {
            padding: 60px 40px;

            .first,
            .second {
                text-align: center;
            }
        }
    }

    @media (max-width: 767px) {
        > div.logo-container {
            display: none;
        }
    }
`

export const HomePage = () => {
    const theme = useTheme()

    return (
        <BaseLayout>
            <Section background={theme.colorPrimaryTextActive} inverted guttered>
                <Strapline>Robot Product Development with Stepper Motors</Strapline>
                {/*
                <HeroSection>
                    <main>
                        <Link to="/services">
                            <Button type="primary" icon={<ArrowRightOutlined />}>
                                Explore Our Services
                            </Button>
                        </Link>
                    </main>
                </HeroSection>
*/}
            </Section>
            <StyledDiv>
                <video autoPlay muted loop id="bgvid" src="/assets/website 2025.mp4" />
                <HomeCarousel2 />
                {/*
                <TopHeroSection $spaced $background={theme.colorPrimaryTextActive} $inverted>
                    <div className="section">
                        <HomepageHeroContent>
                            <div className="content">
                                <div className="first">
                                    Software for OEMs to embed in their machines
                                </div>
                                <div className="second">
                                    We are a product development engineering firm providing
                                    pre-built electronics and software components. Our products and
                                    services enable companies to design and build next-generation
                                    machines.
                                </div>
                            </div>
                        </HomepageHeroContent>
                    </div>
                </TopHeroSection>
*/}
            </StyledDiv>
            <Section>
                <OfferSection />
            </Section>
            <HeroTeasers
                items={[
                    /*
                    {
                        key: "agv",
                        title: "AGV and robot arm combo",
                        subtitle:
                            "The glowbuzzer toolkit supports multiple kinematics models (concurrently). In this demo we show a simple AGV with a robot arm moving independently",
                        imageUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/agv/short_agv_keyframe.png",
                        videoUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/agv/short_agv.mp4"
                    },
                    {
                        key: "palletising",
                        title: "Palletising with a robot arm and lift",
                        subtitle:
                            "Creating robot paths from the geometry of imported STEP files for robotic welding using the buerli.io CAD components",
                        imageUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/palletiser/short_pallet_keyframe.jpg",
                        videoUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/palletiser/short_pallet.mp4"
                    },
*/
                    {
                        key: "5",
                        title: "3,4, 5 axis CNC controls",
                        subtitle:
                            "Use the glowbuzzer toolkit  for your 3, 4 and 5 axis CNC control. Software used to control the machine is React/TypeScript that machine builders can customise. In this demo we show the integration of an automatic tool changer (ATC)",
                        // to: "/",
                        animationUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/cnc/short_cnc_summary.gif",
                        imageUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/cnc/short_cnc_keyframe.jpg",
                        videoUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/cnc/short_cnc.mp4"
                    },
                    {
                        key: "welding",
                        title: "Creating paths from imported STEP files",
                        subtitle:
                            "Creating robot paths from the geometry of imported STEP files for robotic welding using the buerli.io CAD components",
                        animationUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/welding/short_welding_summary.gif",
                        imageUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/welding/short_welding_keyframe.jpg",
                        videoUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/welding/short_welding.mp4"
                    },
                    // {
                    //     key: "1",
                    //     title: "Knock down the dominos!",
                    //     subtitle:
                    //         "Introducing physics into your glowbuzzer toolkit 3D scene is straightforward with use-cannon, physics based hooks for react-three-fibre. Here’s a simple example, use the robot to knock down the dominos!",
                    //     // to: "/",
                    //     animationUrl:
                    //         "https://static.glowbuzzer.com/glowsite/carousel/physics/short_physics_summary.gif",
                    //     imageUrl:
                    //         "https://static.glowbuzzer.com/glowsite/carousel/physics/short_physics_keyframe.jpg",
                    //     videoUrl:
                    //         "https://static.glowbuzzer.com/glowsite/carousel/physics/short_physics.mp4"
                    // },
                    /*
                    {
                        key: "0",
                        title: "Dancing robots",
                        subtitle:
                            "Two robots dancing! Here we show an application of time synchronised trajectories. Two robots perform different cartesian moves (one two lines and the other an arc) and both arrive at their destination at exactly the same time",
                        animationUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/dancing/short_dancing_summary.gif",
                        imageUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/dancing/short_dancing_keyframe.jpg",
                        videoUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/dancing/short_dancing.mp4"
                    },
*/
                    {
                        key: "teeth",
                        title: "Stewart platform for precise control",
                        subtitle:
                            "The glowbuzzer toolkit supports stewart platform kinematics. This allows you to control machines with 6 degrees of freedom (6DOF) such as hexapods, flight simulators and so on. In this demo we show a digital twin of teeth chewing",
                        // to: "/",
                        imageUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/teeth/short_teeth_keyframe.jpg",
                        videoUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/teeth/short_teeth.mp4"
                    },
                    // {
                    //     key: "2",
                    //     title: "Introducing hexapod kinematics",
                    //     subtitle:
                    //         "We have been testing stewart-platform kinematics with the glowbuzzer control. Here we are controlling the hexapod with JavaScript/TypeScript+React code.  Messages from the web layer are passed into the real-time layer and then onto the fieldbus (EtherCAT) to control the motors.",
                    //     animationUrl:
                    //         "https://static.glowbuzzer.com/glowsite/carousel/hexapod/short_hexapod_summary.gif",
                    //     imageUrl:
                    //         "https://static.glowbuzzer.com/glowsite/carousel/hexapod/short_hexapod_keyframe.jpg",
                    //     videoUrl:
                    //         "https://static.glowbuzzer.com/glowsite/carousel/hexapod/short_hexapod.mp4"
                    // },
                    // {
                    //     key: "3",
                    //     title: "Drive testing",
                    //     subtitle:
                    //         "We recently completed a round of drive testing in which we tested the glowbuzzer toolkit with various manufacturers' drives. This round was focussed on EtherCAT drives from manufacturers including JVL, Oriental Motor, Delta, Kollmorgen, Beckhoff & Omron.",
                    //     animationUrl:
                    //         "https://static.glowbuzzer.com/glowsite/carousel/drive_testing/short_drive_testing_summary.gif",
                    //     imageUrl:
                    //         "https://static.glowbuzzer.com/glowsite/carousel/drive_testing/short_drive_testing_keyframe.jpg",
                    //     videoUrl:
                    //         "https://static.glowbuzzer.com/glowsite/carousel/drive_testing/short_drive_testing.mp4"
                    // },
                    /*
                    {
                        key: "1",
                        title: "Robot collision avoidance and path planning",
                        subtitle:
                            "Obstacle avoidance and path planning for machines and robots. Create a path to follow from a number of points. Add an obstacle somewhere along the path. Uses different strategies to avoid collision.",
                        animationUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/avoidance/short_avoidance_summary.gif",
                        imageUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/avoidance/short_avoidance_keyframe.jpg",
                        videoUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/avoidance/short_avoidance.mp4"
                    },
*/
                    {
                        key: "4",
                        title: "CAM integration",
                        subtitle:
                            "We have been working on integrating CAM into the glowbuzzer toolkit. In this demonstration, we are using eCAM to generate a toolpath for a laser cut part. We import the gcode into the glowbuzzer control then run the job on a machine.",
                        // to: "/",
                        animationUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/gcode/short_gcode_summary.gif",
                        imageUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/gcode/short_gcode_keyframe.jpg",
                        videoUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/gcode/short_gcode.mp4"
                    },
                    {
                        key: "6",
                        title: "Control automation hardware with web-tech",
                        subtitle:
                            "Control automation kit (servos, digital IO, industrial cameras) with web-technology like React is now easy. Dorner Conveyor + Kollmorgen servos + Basler GigE camera is doing object sorting. Written entirely in react / typescript.",
                        // to: "/",
                        animationUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/conveyors/short_conveyors_summary.gif",
                        imageUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/conveyors/short_conveyors_keyframe.jpg",
                        videoUrl:
                            "https://static.glowbuzzer.com/glowsite/carousel/conveyors/short_conveyors.mp4"
                    }
                ]}
            />
            <Section background={theme.colorPrimaryTextActive} inverted guttered>
                <HeroSection>
                    <main>
                        <h1>What We Do</h1>
                        <p>
                            We partner with customers throughout the entire product development
                            journey. From initial concept and business case development through the
                            engineering process to product launch and ongoing field support.
                        </p>
                        <Link to="/services">
                            <Button type="primary" icon={<ArrowRightOutlined />}>
                                Explore Our Services
                            </Button>
                        </Link>
                    </main>
                    <RocketIcon className="hero-image" />
                </HeroSection>
            </Section>

            <Section spaced>
                <FeaturesSection>
                    <FeaturedItem>
                        <Html5Icon width={"15%"} />
                        <h2>Web stack</h2>
                        <h3>
                            Build complex machine control applications in a web stack - no
                            proprietary languages or IDEs
                        </h3>
                    </FeaturedItem>
                    <FeaturedItem>
                        <CoordinatedIcon width={"15%"} />
                        <h2>Co-ordinated motion</h2>
                        <h3>Control robots and machines with complex kinematic configurations</h3>
                    </FeaturedItem>
                    <FeaturedItem>
                        <EmbeddedIcon width={"15%"} />
                        <h2>Embeddable</h2>
                        <h3>
                            Runs on a Linux or microcontroller platform making it easy to embed into
                            your product
                        </h3>
                    </FeaturedItem>
                    <FeaturedItem>
                        <RealTimeIcon width={"15%"} />
                        <h2>Real-time</h2>
                        <h3>
                            Handle complex real-time machine control challenges in a software stack
                            you are familiar with
                        </h3>
                    </FeaturedItem>
                    <FeaturedItem>
                        <FieldbusIcon width={"15%"} />
                        <h2>EtherCAT</h2>
                        <h3>
                            Integrates with EtherCAT to control servo drives, digital IO and Modbus
                            devices (indirectly)
                        </h3>
                    </FeaturedItem>
                    <FeaturedItem>
                        <RoboticArmIcon width={"15%"} />
                        <h2>Integration ready</h2>
                        <h3>
                            Rich APIs allow you to handle complex machine control requirements and
                            coordinate with external systems
                        </h3>
                    </FeaturedItem>

                    <FeaturedItem>
                        <IntegratedIcon width={"15%"} />
                        <h2>Stepper drives</h2>
                        <h3>
                            Reference TMC board designs for accurate control of stepper drives,
                            including homing
                        </h3>
                    </FeaturedItem>
                    <FeaturedItem>
                        <IndependenceIcon width={"15%"} />
                        <h2>Vendor independence</h2>
                        <h3>
                            Work with any hardware so you can mix and match to get the performance
                            you want at the price point you need
                        </h3>
                    </FeaturedItem>
                    <FeaturedItem>
                        <GearsIcon width={"15%"} />
                        <h2>Diagnostics and tuning</h2>
                        <h3>
                            Real-time telemetry and fault logs simplify commissioning, tuning, and
                            maintenance
                        </h3>
                    </FeaturedItem>
                </FeaturesSection>
            </Section>
        </BaseLayout>
    )
}
