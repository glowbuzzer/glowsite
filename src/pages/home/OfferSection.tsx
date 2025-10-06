import styled, { keyframes } from "styled-components"
import { GlowsiteLink } from "@glowsite"
import {
    ApiOutlined,
    ControlOutlined,
    DesktopOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons"

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
        line-height: 1.7em;
        background: linear-gradient(135deg, ${props => props.theme.colorPrimary}, #6a35c2);
        border-radius: 12px;
        box-shadow: 0 10px 20px rgba(106, 53, 194, 0.15);
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
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

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(106, 53, 194, 0.2);
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
        }

        .icon {
            margin: 0 auto 15px;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            margin-bottom: 20px;
        }

        > div:first-child {
            font-size: 1.8em;
            font-weight: 600;
            margin-bottom: 5px;
        }

        > div:nth-child(2) {
            font-size: 1.1em;
            opacity: 0.8;
            margin-bottom: 20px;
        }

        .link {
            margin-top: auto;
            padding-top: 20px;

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
    return (
        <StyledDiv>
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
        </StyledDiv>
    )
}
