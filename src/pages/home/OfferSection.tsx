import styled from "styled-components"
import { GlowsiteLink } from "@glowsite"

const StyledDiv = styled.div`
    margin: 30px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    gap: 30px;
    color: white;

    @media (max-width: 1400px) {
        //margin: 20px 0;
        grid-template-columns: repeat(2, 1fr);
        //gap: 20px;
    }

    @media (max-width: 767px) {
        margin: 20px 0;
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
    }

    > div {
        display: flex;
        flex-direction: column;
        padding: 20px;
        line-height: 1.7em;
        background: ${props => props.theme.colorPrimary};
        border-radius: 5px;

        > div:first-child {
            font-size: 1.6em;
        }

        .link {
            margin-top: 40px;

            a {
                color: white !important;
                border: 1px solid white;
                padding: 4px 8px;
                text-decoration: none;
            }

            a:hover {
                background: rgba(255, 255, 255, 0.1);
            }
        }
    }
`

export const OfferSection = () => {
    return (
        <StyledDiv>
            <div>
                <div>HMI Framework</div>
                <div>(React based)</div>
                <div className="link">
                    <GlowsiteLink to="/how-it-works">Read More</GlowsiteLink>
                </div>
            </div>
            <div>
                <div>Real-time Motion Control</div>
                <div>(complex kinematics)</div>
                <div className="link">
                    <GlowsiteLink to="/how-it-works">Read More</GlowsiteLink>
                </div>
            </div>
            <div>
                <div>EtherCAT Master</div>
                <div>(plus Modbus support)</div>
                <div className="link">
                    <GlowsiteLink to="/how-it-works">Read More</GlowsiteLink>
                </div>
            </div>
            <div>
                <div>Safety Supervisor</div>
                <div>(FSoE functional safety)</div>
                <div className="link">
                    <GlowsiteLink to="/how-it-works">Read More</GlowsiteLink>
                </div>
            </div>
        </StyledDiv>
    )
}
