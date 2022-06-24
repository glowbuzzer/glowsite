import * as React from "react"
import { ReactNode } from "react"
import styled from "styled-components"
import { GlowsiteLink } from "@glowsite"

const StyledFlipCard = styled.div`
  /* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */

  background-color: transparent;
  //width: 300px;
  height: 250px;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    //text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  :hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }

  .flip-card-front {
    //background-color: #bbb;
    //color: black;
  }

  .flip-card-back {
    background-color: ${props => props.theme.color.MainPurple};
    color: white;
    transform: rotateY(180deg);
    margin-top: -10px;
    padding: 10px;

    display: flex;
    flex-direction: column;

    .content {
      flex-grow: 1;
    }

    a {
      color: white;
      border: 1px solid white;
      padding: 4px 8px;
    }

    a: hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`

type CardFlipProps = {
    back: ReactNode
    children: ReactNode
    to?: string
}

export const CardFlip = ({ children, back, to }: CardFlipProps) => {
    return (
        <StyledFlipCard>
            <div className="flip-card-inner">
                <div className="flip-card-front">{children}</div>
                <div className="flip-card-back">
                    <div className="content">{back}</div>
                    {to && (
                        <div>
                            <GlowsiteLink to={to}>More Info</GlowsiteLink>
                        </div>
                    )}
                </div>
            </div>
        </StyledFlipCard>
    )
}
