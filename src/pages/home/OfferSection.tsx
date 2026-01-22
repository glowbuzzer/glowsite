import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { GlowsiteLink } from "@glowsite"
import {
    ControlOutlined,
    DesktopOutlined,
    SafetyCertificateOutlined,
    UserOutlined
} from "@ant-design/icons"

// @ts-ignore
import boardsImg from "./boards.jpeg?glowsite&w=600"
// @ts-ignore
import motorImg from "./motor.png?glowsite&w=600"
// @ts-ignore
import machineImg from "./machine.jpeg?glowsite&w=600"
// @ts-ignore
import jointImg from "./joint.jpeg?glowsite&w=600"

const backgroundImages = [boardsImg, motorImg, machineImg, jointImg]

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(146, 84, 222, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(146, 84, 222, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(146, 84, 222, 0);
  }
`

const StyledDiv = styled.div`
    margin: 50px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    gap: 30px;
    color: white;

    @media (max-width: 1400px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 767px) {
        margin: 30px 0;
        grid-template-columns: repeat(1, 1fr);
        gap: 25px;
    }

    > div {
        display: flex;
        flex-direction: column;
        padding: 30px 25px;
        line-height: 1.3em;
        background: linear-gradient(135deg, ${props => props.theme.colorPrimary}, #6a35c2);
        border-radius: 12px;
        box-shadow: 0 10px 20px rgba(106, 53, 194, 0.15);
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            background 0.3s ease;
        animation: ${fadeInUp} 0.6s ease-out backwards;
        position: relative;
        overflow: hidden;

        &:nth-child(1) {
            animation-delay: 0.1s;
        }

        &:nth-child(2) {
            animation-delay: 0.2s;
        }

        &:nth-child(3) {
            animation-delay: 0.3s;
        }

        &:nth-child(4) {
            animation-delay: 0.4s;
        }

        &:nth-child(5) {
            animation-delay: 0.5s;
        }

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            opacity: 0.5;
            filter: grayscale(100%);
            transition:
                opacity 0.3s ease,
                filter 0.3s ease;
            pointer-events: none;
            z-index: 0;
        }

        &:nth-child(1)::after {
            background-image: url(${boardsImg.replaceAll("\\", "/")});
        }

        &:nth-child(2)::after {
            background-image: url(${motorImg.replaceAll("\\", "/")});
        }

        &:nth-child(3)::after {
            background-image: url(${machineImg.replaceAll("\\", "/")});
        }

        &:nth-child(4)::after {
            background-image: url(${jointImg.replaceAll("\\", "/")});
        }

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(106, 53, 194, 0.2);
            background: rgba(255, 255, 255, 1);
            color: black;

            .icon {
                background: rgba(106, 53, 194, 0.15);
            }

            .link a {
                color: #6a35c2 !important;
                border-color: rgba(106, 53, 194, 0.5);
            }

            .link a:hover {
                background: rgba(106, 53, 194, 0.1);
                border-color: #6a35c2;
            }
        }

        &:hover::after {
            opacity: 0.25;
            filter: grayscale(0%);
        }

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: white;
            opacity: 0.3;
            z-index: 1;
        }

        .icon {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            margin: 0 auto 20px;
            position: relative;
            z-index: 1;
        }

        > div:first-child {
            font-size: 1.8em;
            font-weight: 600;
            margin-bottom: 5px;
            position: relative;
            z-index: 1;
        }

        > div:nth-child(2) {
            font-size: 1.2em;
            opacity: 1;
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
        }

        > div:nth-child(3) {
            position: relative;
            font-size: 1.1em;
            margin-bottom: 15px;
            z-index: 1;
        }

        .link {
            margin-top: auto;
            padding-top: 20px;
            position: relative;
            z-index: 1;

            a {
                color: white !important;
                border: 2px solid rgba(255, 255, 255, 0.5);
                border-radius: 30px;
                padding: 8px 20px;
                text-decoration: none;
                font-weight: 500;
                transition: all 0.3s ease;
                display: inline-block;
            }

            a:hover {
                background: rgba(255, 255, 255, 0.2);
                border-color: white;
                animation: ${pulse} 1.5s infinite;
            }
        }
    }
`

export const OfferSection = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false)

    useEffect(() => {
        let loadedCount = 0
        const totalImages = backgroundImages.length

        const handleImageLoad = () => {
            loadedCount++
            if (loadedCount === totalImages) {
                setImagesLoaded(true)
            }
        }

        backgroundImages.forEach(src => {
            const img = new Image()
            img.onload = handleImageLoad
            img.onerror = handleImageLoad // Count errors as loaded to prevent blocking
            img.src = src.replaceAll("\\", "/")
        })
    }, [])

    if (!imagesLoaded) {
        return null
    }

    return (
        <StyledDiv>
            <div>
                <div className="icon">
                    <SafetyCertificateOutlined style={{ fontSize: "28px", color: "white" }} />
                </div>
                <div className="title">Reference Designs</div>
                <div>
                    One-stop multi-axis stepper electronics designs for rapid robotic prototyping
                    through to production
                </div>
                <div className="link">
                    <GlowsiteLink to="/solution#electronics">Explore electronics</GlowsiteLink>
                </div>
            </div>
            {/*
            <div>
                <div className="icon">
                    <ControlOutlined style={{ fontSize: "28px", color: "white" }} />
                </div>
                <div>Motion Control Firmware</div>
                <div>
                    Production-grade real-time control firmware for stepper based robotic systems
                </div>
                <div className="link">
                    <GlowsiteLink to="/overview/software-stack#control">
                        Explor firmware layer
                    </GlowsiteLink>
                </div>
            </div>
*/}
            <div>
                <div className="icon">
                    <ControlOutlined style={{ fontSize: "28px", color: "white" }} />
                    {/*
                    <ApiOutlined style={{ fontSize: "28px", color: "white" }} />
*/}
                </div>
                <div>Advanced Motion Control</div>
                <div>
                    Real-time trajectory generation, kinematics, and robot-level coordination for
                    complex machines
                </div>
                <div className="link">
                    <GlowsiteLink to="/solution#firmware">See motion stack</GlowsiteLink>
                </div>
            </div>
            <div>
                <div className="icon">
                    <DesktopOutlined style={{ fontSize: "28px", color: "white" }} />
                </div>
                <div>Simulation and Digital Twin</div>
                <div>
                    Run applications in simulation to test, debug, and optimise before deployment to
                    real machine
                </div>
                <div className="link">
                    <GlowsiteLink to="/solution#sim">Explore simulation</GlowsiteLink>
                </div>
            </div>
            <div>
                <div className="icon">
                    <UserOutlined style={{ fontSize: "28px", color: "white" }} />
                </div>
                <div>Expert Engineering Support</div>
                <div>Practical guidance from sizing and safety to production-ready electronics</div>
                <div className="link">
                    <GlowsiteLink to="/solution#services">Our services</GlowsiteLink>
                </div>
            </div>
            {/*
            <div>
                <div className="icon">
                    <DesktopOutlined style={{ fontSize: "28px", color: "white" }} />
                </div>
                <div>HMI Framework</div>
                <div>Modern React-based interface for intuitive machine control</div>
                <div className="link">
                    <GlowsiteLink to="/overview/software-stack#hmi">Explore Features</GlowsiteLink>
                </div>
            </div>
            <div>
                <div className="icon">
                    <ControlOutlined style={{ fontSize: "28px", color: "white" }} />
                </div>
                <div>Motion Control Firmware</div>
                <div>Advanced kinematics for flexible and precise automation control</div>
                <div className="link">
                    <GlowsiteLink to="/overview/software-stack#control">
                        Discover Capabilities
                    </GlowsiteLink>
                </div>
            </div>
            <div>
                <div className="icon">
                    <ApiOutlined style={{ fontSize: "28px", color: "white" }} />
                </div>
                <div>Motor Control Algorithms</div>
                <div>For stepper and BLDC motors and encoders</div>
                <div className="link">
                    <GlowsiteLink to="/overview/software-stack#ethercat">Learn More</GlowsiteLink>
                </div>
            </div>
            <div>
                <div className="icon">
                    <SafetyCertificateOutlined style={{ fontSize: "28px", color: "white" }} />
                </div>
                <div>Electronics Reference Designs</div>
                <div>Working board design as a template for your development</div>
                <div className="link">
                    <GlowsiteLink to="/overview/software-stack#supervisor">
                        View Details
                    </GlowsiteLink>
                </div>
            </div>
*/}
        </StyledDiv>
    )
}
