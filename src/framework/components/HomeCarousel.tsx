import styled from "@emotion/styled"
import { Carousel, Col, Row } from "antd"
import BackgroundImage1 from "../../home/background_motor_w.jpg"
import ForegroundImage1 from "../../home/iso_laptop_linux.svg"
import BackgroundImage2 from "../../home/background_board_w.jpg"
import ForegroundImage2 from "../../home/iso_cpu.svg"
import BackgroundImage3 from "../../home/background_io_w.jpg"
import ForegroundImage3 from "../../home/iso_pc_ethercat_master.svg"

export const CarouselSettings = {
    arrows: false,
    dots: true,
    pauseOnHover: true,
    infinite: true,
    speed: 5000,
    centerMode: false,
    autoplay: true,
    fade: true,
    adaptiveHeight: false,
    variableWidth: false,
    cssEase: "cubic-bezier(0.65, 0, 0.35, 1)"
}

const CarouselWrapper = styled(Carousel)`
    > .slick-dots li button {
        width: 6px !important;
        height: 6px !important;
        border-radius: 100% !important;
        background: grey !important;
    }

    > .slick-dots li.slick-active button {
        width: 7px !important;
        height: 7px !important;
        border-radius: 100% !important;
        background: ${props => props.theme.color.MainPurple}!important;
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
    padding: 10px 0 10px 0;
`

const HomeCarouselText = props => {
    switch (props.slidenum) {
        case 1: {
            return (
                <div>
                    <CarouselTitle>Control machines and robots with a web stack</CarouselTitle>
                    <CarouselSubTitle>
                        Build complex machine control applications with React & node.js
                    </CarouselSubTitle>
                    <CarouselSubTitle>
                        Take the glowbuzzer toolkit’s React components and use them either
                        unchanged, extended or added to with your own custom components to build the
                        visual front-end and control logic for your machine control.
                    </CarouselSubTitle>

                    <CarouselSubTitle>
                        Control a wide variety of types of machine including robots.
                    </CarouselSubTitle>
                    <CarouselSubTitle>
                        React components can run in web browsers or with React Native on Android/IoS
                        or Windows/MacOs (or Electron).
                    </CarouselSubTitle>
                </div>
            )
        }
        case 2: {
            return (
                <div>
                    <CarouselTitle>Deploy to embedded Linux or microcontroller</CarouselTitle>
                    <CarouselSubTitle>
                        The real-time components of the glowbuzzer toolkit will run on desktop or
                        embedded Linux or a microcontroller (e.g. STM32).
                    </CarouselSubTitle>
                    <CarouselSubTitle>
                        This gives the flexibility to deploy the toolkit to a wide range of
                        different environments.
                    </CarouselSubTitle>
                    <CarouselSubTitle>
                        The components are highly performant and multi-core ARM SoCs or dual core
                        microcontrollers will supports 6 axis robots at a 1 msec cycle time to the
                        drives.
                    </CarouselSubTitle>
                </div>
            )
        }
        case 3: {
            return (
                <div>
                    <CarouselTitle>Work with industrial fieldbusses e.g. EtherCAT</CarouselTitle>
                    <CarouselSubTitle>
                        Work with drives and IO from any manufacturer that offers a real-time
                        fieldbus interface or on an embedded platform integrate over SPI with motor
                        driver ICs
                    </CarouselSubTitle>
                    <CarouselSubTitle>
                        Supports, out of the box, IO and drives from leading vendors such as
                        Beckhoff, Kollmorgen, Omron, Delta.
                    </CarouselSubTitle>
                    <CarouselSubTitle>
                        This means you can control motors ranging from tiny 4mm diameter 50,000 rpm
                        BLDC devices through to multi-megawatt motors the size of trucks.
                    </CarouselSubTitle>
                </div>
            )
        }
        default: {
            return <p> error</p>
        }
    }
}

export const HomeCarousel = props => {
    if (props.desktop) {
        return (
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
                                <HomeCarouselText slidenum={1} />
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
                                <HomeCarouselText slidenum={2} />
                            </Col>
                            <Col span={1} />
                            <Col span={11}>
                                <img src={ForegroundImage2} />
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
                                <HomeCarouselText slidenum={3} />
                            </Col>
                            <Col span={1} />
                            <Col span={11}>
                                <img src={ForegroundImage3} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </CarouselWrapper>
        )
    } else {
        return (
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
                            <Col span={23}>
                                <HomeCarouselText slidenum={1} />
                            </Col>
                            `{" "}
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
                            <Col span={23}>
                                <HomeCarouselText slidenum={2} />
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
                            <Col span={23}>
                                <HomeCarouselText slidenum={3} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </CarouselWrapper>
        )
    }
}
