import styled from "styled-components"
import { Carousel } from "antd"
import BackgroundImage1 from "../../home/background_motor_w.jpg"
import ForegroundImage1 from "../../home/iso_laptop_linux.svg"
import BackgroundImage2 from "../../home/background_board_w.jpg"
import ForegroundImage2 from "../../home/iso_cpu.svg"
import BackgroundImage3 from "../../home/background_io_w.jpg"
import ForegroundImage3 from "../../home/iso_pc_ethercat_master.svg"
import { FC } from "react"

export const CarouselSettings = {
    arrows: false,
    dots: true,
    pauseOnHover: true,
    infinite: true,
    speed: 5000,
    centerMode: false,
    autoplay: true,
    fade: true,
    adaptiveHeight: true,
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
        background: ${props => props.theme.color.MainPurple} !important;
    }
`

const CarouselDiv: FC<{ className?: string }> = ({ className, children }) => (
    <div className={className}>
        <div className="carousel-item">{children}</div>
    </div>
)

const CarouselItem = styled(CarouselDiv)<{ backgroundImage: string }>`
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    text-align: center;
    padding: 20px 40px;

    .carousel-item {
        text-align: left;
        display: inline-flex;
        max-width: 1400px;
        gap: 40px;
        justify-content: center;
        align-items: center;
        min-height: 400px;

        h1 {
            margin: 0 0 18px 0;
            font-size: 3em;
        }

        p {
            font-size: 1.4em;
            color: black;
        }

        img {
            height: 500px;
        }

        @media (max-width: 1200px) {
            min-height: 500px;

            img {
                display: none;
            }
        }

        @media (max-width: 767px) {
            min-height: 475px;

            h1 {
                font-size: 2em;
            }

            p {
                font-size: 1em;
            }
        }
    }
`

export const HomeCarousel = () => {
    return (
        <CarouselWrapper {...CarouselSettings}>
            <CarouselItem backgroundImage={BackgroundImage1}>
                <main>
                    <h1>Control machines and robots with a web stack</h1>
                    <p>Build complex machine control applications with React & node.js</p>
                    <p>
                        Take the glowbuzzer toolkit’s React components and use them either
                        unchanged, extended or added to with your own custom components to build the
                        visual front-end and control logic for your machine control.
                    </p>

                    <p>Control a wide variety of types of machine including robots.</p>
                    <p>
                        React components can run in web browsers or with React Native on Android/IoS
                        or Windows/MacOs (or Electron).
                    </p>
                </main>
                <img src={ForegroundImage1} alt="carousel image" />
            </CarouselItem>
            <CarouselItem backgroundImage={BackgroundImage2}>
                <main>
                    <h1>Deploy to embedded Linux or microcontroller</h1>
                    <p>
                        The real-time components of the glowbuzzer toolkit will run on desktop or
                        embedded Linux or a microcontroller (e.g. STM32).
                    </p>
                    <p>
                        This gives the flexibility to deploy the toolkit to a wide range of
                        different environments.
                    </p>
                    <p>
                        The components are highly performant and multi-core ARM SoCs or dual core
                        microcontrollers will supports 6 axis robots at a 1 msec cycle time to the
                        drives.
                    </p>
                </main>
                <img src={ForegroundImage2} alt="carousel image" />
            </CarouselItem>
            <CarouselItem backgroundImage={BackgroundImage3}>
                <main>
                    <h1>Work with industrial fieldbusses e.g. EtherCAT</h1>
                    <p>
                        Work with drives and IO from any manufacturer that offers a real-time
                        fieldbus interface or on an embedded platform integrate over SPI with motor
                        driver ICs
                    </p>
                    <p>
                        Supports, out of the box, IO and drives from leading vendors such as
                        Beckhoff, Kollmorgen, Omron, Delta.
                    </p>
                    <p>
                        This means you can control motors ranging from tiny 4mm diameter 50,000 rpm
                        BLDC devices through to multi-megawatt motors the size of trucks.
                    </p>
                </main>
                <img src={ForegroundImage3} alt="carousel image" />
            </CarouselItem>
        </CarouselWrapper>
    )
}
