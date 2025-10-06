import * as React from "react"
import { createContext, ReactNode, useContext, useState } from "react"
import styled from "styled-components"
import { GlowsiteLink } from "@glowsite"

const featuresContext = createContext(null)

const StyledFeaturesSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    text-align: center;

    > div {
        fill: rgb(146, 84, 222);
        flex-basis: 33%;
        //padding: 20px;

        @media (max-width: 1200px) {
            flex-basis: 50%;
            .flip-card-back {
                font-size: 0.9em;
            }
        }

        @media (max-width: 768px) {
            flex-basis: 100%;
            .flip-card-back {
                font-size: inherit;
            }
        }
    }

    .flip-card {
        background-color: transparent;
        //width: 300px;
        height: 250px;
        border: 1px solid ${props => props.theme.colorPrimaryBorder};
        perspective: 1000px; /* Remove this if you don't want the 3D effect */
        //cursor: pointer;

        //&.front {
        //    > :hover {
        //        background: rgb(0, 0, 0, 0.05);
        //    }
        //}

        &.back {
            .flip-card-inner {
                transform: rotateY(180deg);
            }
        }

        .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            //text-align: center;
            transition: transform 0.8s;
            transform-style: preserve-3d;
        }

        .flip-card-front,
        .flip-card-back {
            position: absolute;
            padding: 20px;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
        }

        .flip-card-back {
            background-color: ${props => props.theme.colorPrimary};
            color: white;
            transform: rotateY(180deg);

            display: flex;
            flex-direction: column;

            .content {
                flex-grow: 1;
            }

            a {
                color: white;
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

export const FeaturesSection = ({ children }) => {
    const [selected, setSelected] = useState(null)

    return (
        <featuresContext.Provider value={[selected, setSelected]}>
            <StyledFeaturesSection>{children}</StyledFeaturesSection>
        </featuresContext.Provider>
    )
}

type CardFlipProps = {
    children: ReactNode
}

export const FeaturedItem = ({ children }: CardFlipProps) => {
    const [selected, setSelected] = useContext(featuresContext)

    return (
        <div className={"flip-card " + (selected === children ? "back" : "front")}>
            <div className="flip-card-inner">
                <div className="flip-card-front">{children}</div>
            </div>
        </div>
    )
}
