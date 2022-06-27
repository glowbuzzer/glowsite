import { BaseLayout } from "./BaseLayout"
import { Button } from "antd"
import styled from "styled-components"
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
import { ReactComponent as BlogIcon } from "../../home/blog.svg?inline"
import { CardFlip } from "../components/CardFlip"

const FeaturesSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    text-align: center;

    > div {
        fill: rgb(146, 84, 222);
        flex-basis: 33%;
        padding: 20px;

        @media (max-width: 968px) {
            flex-basis: 50%;
        }

        @media (max-width: 768px) {
            flex-basis: 100%;
        }
    }
`

const HeroSection = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    font-size: 1.3em;
    //max-height: 300px;

    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 50px 100px;

        @media (max-width: 976px) {
            padding: 25px 50px;
        }

        @media (max-width: 767px) {
            font-size: 0.8em;
            padding: 20px 0;
        }
    }

    h1 {
        margin-top: 0;
    }

    .hero-image {
        min-height: 100%;
        margin-left: auto;
        margin-right: 100px;
        fill: white;

        @media (max-width: 976px) {
            display: none;
        }
    }
`

const HexImageSection = styled.div`
    @media (max-width: 767px) {
        display: none;
    }
`

export const HomePage = () => {
    return (
        <BaseLayout>
            <HomeCarousel />

            <HexImageSection>
                <Section>
                    <img src={HexImage} alt="hex image" />
                </Section>
            </HexImageSection>

            <Section background={"White"} spaced>
                <YoutubeEmbed embedId="13eCFw1BnDo"/>
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
                                href="/get-started/simulation"
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
                <FeaturesSection>
                    <CardFlip
                        back={
                            <>
                                With the glowbuzzer toolkit, you take our React components and use
                                them either unchanged, extended or added to with your own custom components
                                to build the visual front-end and control logic for your machine control.
                                With this you will be writing machine control programs using familiar web technologies.
                            </>
                        }
                        to="/how-it-works/overview"
                    >
                        <Html5Icon width={"15%"} />
                        <h2>Web stack</h2>
                        <h3>
                            Build complex machine control applications in a web stack - no
                            proprietary languages or IDEs
                        </h3>
                    </CardFlip>
                    <CardFlip
                        back={
                            <>
                                The glowbuzzer toolkit supports complex machines: from basic x,y,z cartesian machines through to industrial robots.
                                These kinematics models are fully parameterised and can be adapted to a variety of types of machine.
                                If different kinematics models are required, we can either add these for you or you can provide the models.
                            </>
                        }
                        to="/docs/gbc/configuration/config_joints_and_kinematics"
                    >
                        <CoordinatedIcon width={"15%"} />
                        <h2>Co-ordinated motion</h2>
                        <h3>
                            Control robots and machines with complex kinematic configurations
                        </h3>
                    </CardFlip>
                    <CardFlip
                        back={
                            <>
                                The glowbuzzer toolkit will run on either a microcontroller or embedded Linux allowing you to embed a sophisticated motion/machine control into your product.
                                The toolkit’s real-time core (GBC) needs a high-performance dual-core microcontroller.
                                Our reference design uses an STM32H7 with ST ARM Cortex-M7 and Cortex-M4 cores running up to 480 MHz and 240 MHz respectively.
                            </>
                        }
                        to="/how-it-works/embedded"
                    >
                        <EmbeddedIcon width={"15%"} />
                        <h2>Embeddable</h2>
                        <h3>
                            Runs on a Linux or microcontroller platform making it easy to embed into
                            your product
                        </h3>
                    </CardFlip>
                    <CardFlip
                        back={
                            <>
                                If you need guaranteed millisecond response times then you will need to write C code in the software PLC layer.
                                If you have a greater degree of tolerance to your response times (e.g. 10ms) then you can deploy code written in JavaScript or if you can cope with say 20ms response times then you can have code in React responding.
                            </>
                        }
                        to="/how-it-works/real_time"
                    >
                        <RealTimeIcon width={"15%"} />
                        <h2>Real-time</h2>
                        <h3>
                            Handle complex real-time machine control challenges in a software stack
                            you are familiar with
                        </h3>
                    </CardFlip>
                    <CardFlip
                        back={
                            <>
                                Interoperability with the major fieldbus protocols is at the heart of the glowbuzzer toolkit.
                                EtherCAT is the primary fieldbus we support. Mainly because of the wide range of drives and IO available for it.
                            </>
                        }
                        to="/how-it-works/fieldbus"
                    >
                    <FieldbusIcon width={"15%"} />
                        <h2>Fieldbus integration</h2>
                        <h3>
                            Integrates common fieldbusses (EtherCAT, PROFINET, Ethernet/IP and so
                            on)
                        </h3>
                    </CardFlip>
                    <CardFlip
                        back={
                            <>
                                Machine controls can be complex. You requirements might well be unique and are ofte highly custom.
                                The glowbuzzer toolkit has deep and wide APIs that allow you to tackle the most challenging of projects.
                            </>
                        }
                        to="/docs/gbr/overview"
                    >
                    <RoboticArmIcon width={"15%"} />
                        <h2>Solve challenging machine control problems</h2>
                        <h3>
                            Rich APIs allow you to write code to handle complex machine control requirements
                        </h3>
                    </CardFlip>

                    <CardFlip
                        back={
                            <>
                                The glowbuzzer toolkit includes a software PLC but you can also
                                integrate with off-the-shelf PLCs. We can sit on an fieldbus network
                                either as a Master or Slave (with say the Hilscher netX) allowing
                                real-time communication with the PLC.
                            </>
                        }
                        to="/how-it-works/fieldbus"
                    >
                        <IntegratedIcon width={"15%"} />
                        <h2>PLC integration</h2>
                        <h3>
                            Integrates with PLCs from leading manufacturers - Codesys, Siemens,
                            Allen Bradley, ABB, Omron...
                        </h3>
                    </CardFlip>
                    <CardFlip
                        back={
                            <>
                                The glowbuzzer toolkit is not based on proprietary technologies or is tied to any hardware.
                                This allows you to work with pretty much any hardware on the market using software that is used by millions of developers around the world.
                            </>
                        }
                        to="/how-it-works/drives"
                    >
                    <IndependenceIcon width={"15%"} />
                        <h2>Vendor independence</h2>
                        <h3>
                            Work with any hardware so you can mix and match to get the performance
                            you want at the price point you need
                        </h3>
                    </CardFlip>
                    <CardFlip
                        back={
                            <>
                                From React for the front-end and machine control to C for the embedded PLC, we use technologies that are easy for you understand.
                                There is nothing proprietary and nothing you can't find a million answers to on stack overflow.
                            </>
                        }
                        to="/how-it-works/overview"
                    >
                    <GearsIcon width={"15%"} />
                        <h2>Develop using technology you understand</h2>
                        <h3>
                            Basic web development skills for the front-end and C for the embedded PLC.
                        </h3>
                    </CardFlip>
                </FeaturesSection>
            </Section>

            <Section background={"BackgroundDarkSection"} inverted spaced guttered>
                <HeroSection>
                    <main>
                        <h1>Blogs that might interest you</h1>
                    </main>
                    <BlogIcon className="hero-image" style={{ maxHeight: "100px" }} />
                </HeroSection>
            </Section>

            <FeaturedBlog />
        </BaseLayout>
    )
}
