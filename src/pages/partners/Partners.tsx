import * as React from "react"
import styled from "styled-components"
import SynapticonImage from "./synapticon.png?glowsite"
import BbhImage from "./bbh.png?glowsite"
import IbtImage from "./ibt.png?glowsite"
import { Image } from "../../framework/components"
import { Link } from "react-router-dom"
import { ScrollToAnchorOnMount } from "../../framework/components/ScrollToAnchorOnMount"

const StyledPartnerSection = styled.div<{ $reverse?: boolean }>`
    display: flex;
    align-items: flex-start;
    flex-direction: ${props => (props.$reverse ? "row-reverse" : "row")};
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px 0;
    width: 100%;
    min-width: 300px;
    box-sizing: border-box;

    img {
        flex-basis: 30%;
        flex-grow: 1;
        min-width: 300px;
        width: 100%;
        object-fit: contain;
        height: auto;
    }

    .content {
        font-size: 1.2em;
        min-width: 300px;
        flex-basis: 0;
        flex-grow: 3;
    }
`

const PartnerSection = ({ id, image, children, url, reverse = false }) => {
    return (
        <>
            <a id={id} />
            <StyledPartnerSection $reverse={reverse}>
                <Image meta={image} alt={"partner image"} />
                <div className="content">
                    <div className="text">{children}</div>
                    <div className="url">
                        <Link className="markdown-link" to={url}>
                            {url}
                        </Link>
                    </div>
                </div>
            </StyledPartnerSection>
        </>
    )
}

export default () => {
    return (
        <div style={{padding: "20px"}}>
            <ScrollToAnchorOnMount/>
            <PartnerSection id="synapticon" image={SynapticonImage} url={"www.synapticon.com"}>
                Synapticon is a leading provider of motion control solutions for robotics and
                automation. We are a team of engineers, designers, and business professionals who
                are passionate about creating innovative products that help our customers succeed.
                Our mission is to make it easy for anyone to build and deploy robots that are safe,
                reliable, and efficient. We believe that robots have the potential to transform the
                way we live and work, and we are committed to making that vision a reality.
            </PartnerSection>
            <PartnerSection id="bbh" image={BbhImage} url="www.bbh.com" reverse>
                BBH is a leading provider of EtherCAT safety master devices for industrial
                automation. Our products are designed to help manufacturers improve the safety and
                efficiency of their operations. We offer a wide range of safety master devices that
                are compatible with a variety of industrial protocols, including EtherCAT, PROFINET,
                and Modbus. Our products are used by manufacturers around the world to protect their
                workers and equipment from harm. We are committed to providing our customers with
                the highest quality products and service, and we are constantly innovating to meet
                the evolving needs of the industrial automation industry.
            </PartnerSection>
            <PartnerSection id="ibt" image={IbtImage} url="www.innobotics.it">
                IBT's mission is to provide advanced and collaborative robotics products, as well as
                automation solutions completely customized to the customer's needs, from design to
                installation and maintenance of the finished system. Our team of engineers and
                technicians is specialized in the development of robotic systems for the industrial
                sector, with a focus on the integration of collaborative robots and the development of
                innovative solutions for the automation of industrial processes.
            </PartnerSection>
        </div>
    )
}
