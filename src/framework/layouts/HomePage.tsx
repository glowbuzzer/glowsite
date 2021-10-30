import { BaseLayout } from "./BaseLayout"
import { Carousel, Col, Row } from "antd"
import styled from "@emotion/styled"
import BackgroundImage1 from "../../home/background_motor_w.jpg"
import BackgroundImage2 from "../../home/background_board_w.jpg"
import BackgroundImage3 from "../../home/background_io_w.jpg"

import ForegroundImage1 from "../../home/iso_laptop_linux.svg"
import ForegroundImage2 from "../../home/iso_cpu.svg"
import ForegroundImage3 from "../../home/iso_pc_ethercat_master.svg"
import HexImage from "../../home/hex_components.svg"

export const CarouselSettings = {
    arrows: false,
    dots: true,
    pauseOnHover: true,
    infinite: true,
    speed: 5000,
    centerMode: false,
    autoplay: true,
    fade: false,
    adaptiveHeight: false,
    variableWidth: false,
    cssEase: "cubic-bezier(0.600, -0.020, 0.0735, 0.045)"
}

const CarouselWrapper = styled(Carousel)`
    > .slick-dots li button {
        width: 6px;
        height: 6px;
        border-radius: 100%;
        background: grey;
    }

    > .slick-dots li.slick-active button {
        width: 7px;
        height: 7px;
        border-radius: 100%;
        background: ${props => props.theme.color.MainPurple};
    }
`

const CarouselTitle = styled.h1`
    font-size: 3.5em;
    // color: white;
    font-weight: bold;
`

const CarouselSubTitle = styled.h2`
    font-size: 1.5em;
    // color: white;
`

export const HomePage = () => {
    return (
        <BaseLayout>
            <div>
                <CarouselWrapper {...CarouselSettings}>
                    <div>
                        <div
                            style={{
                                background: `url(${BackgroundImage1})`,
                                backgroundRepeat: "no-repeat",
                                height: 610
                            }}
                        >
                            <Row>
                                <Col span={1} />
                                <Col span={11}>
                                    <CarouselTitle>
                                        Control machines and robots with a web stack
                                    </CarouselTitle>
                                    <CarouselSubTitle>
                                        Build complex machine control applications with React &
                                        node.js
                                    </CarouselSubTitle>
                                    <p></p>
                                    <p></p>
                                    <CarouselSubTitle>
                                        Take the glowbuzzer toolkit’s React components and use them
                                        either unchanged, extended or added to with your own custom
                                        components to build the visual front-end and control logic
                                        for your machine control.
                                    </CarouselSubTitle>
                                    <p></p>
                                    <CarouselSubTitle>
                                        Control a wide variety of types of machine including robots.
                                    </CarouselSubTitle>
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                    <CarouselSubTitle>
                                        React components can run in web browsers or with React
                                        Native on Android/IoS or Windows/MacOs (or Electron).
                                    </CarouselSubTitle>
                                </Col>
                                <Col span={1} />
                                <Col span={11}>
                                    <img src={ForegroundImage1} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                background: `url(${BackgroundImage2})`,
                                backgroundRepeat: "no-repeat",
                                height: 610
                            }}
                        >
                            <Row>
                                <Col span={1} />
                                <Col span={11}>
                                    <CarouselTitle>
                                        Deploy to embedded Linux or microcontroller
                                    </CarouselTitle>
                                    <CarouselSubTitle>
                                        The real-time components of the glowbuzzer toolkit will run
                                        on desktop or embedded Linux or a microcontroller (e.g.
                                        STM32).
                                    </CarouselSubTitle>
                                    <p></p>
                                    <p></p>
                                    <CarouselSubTitle>
                                        This gives the flexibility to deploy the toolkit to a wide
                                        range of different environments.
                                    </CarouselSubTitle>
                                    <p></p>
                                    <p></p>
                                    <CarouselSubTitle>
                                        The components are highly performant and multi-core ARM SoCs
                                        or dual core microcontrollers will supports 6 axis robots at
                                        a 1 msec cycle time to the drives.
                                    </CarouselSubTitle>
                                </Col>
                                <Col span={1} />
                                <Col span={11}>
                                    <img src={ForegroundImage2} height={600} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                background: `url(${BackgroundImage3})`,
                                backgroundRepeat: "no-repeat",
                                height: 610
                            }}
                        >
                            <Row>
                                <Col span={1} />
                                <Col span={11}>
                                    <CarouselTitle>
                                        Work with industrial fieldbusses e.g. EtherCAT
                                    </CarouselTitle>
                                    <CarouselSubTitle>
                                        Work with drives and IO from any manufacturer that offers a
                                        real-time fieldbus interface or on an embedded platform
                                        integrate over SPI with motor driver ICs
                                    </CarouselSubTitle>
                                    <p></p>
                                    <p></p>
                                    <CarouselSubTitle>
                                        Supports, out of the box, IO and drives from leading vendors
                                        such as Beckhoff, Kollmorgen, Omron, Delta.
                                    </CarouselSubTitle>
                                    <p></p>
                                    <p></p>
                                    <CarouselSubTitle>
                                        This means you can control motors ranging from tiny 4mm
                                        diameter 50,000 rpm BLDC devices through to multi-megawatt
                                        motors the size of trucks.
                                    </CarouselSubTitle>
                                </Col>
                                <Col span={1} />
                                <Col span={11}>
                                    <img src={ForegroundImage3} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </CarouselWrapper>

                <img src={HexImage} />
            </div>
        </BaseLayout>
    )
}
