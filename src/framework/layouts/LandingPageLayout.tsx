import * as React from "react"
import styled from "styled-components"
import { BaseLayout } from "./BaseLayout"

const MAX_WIDTH = 1200

const StyledDiv = styled.div`
    background: white;

    .top-section-container {
        background: ${props => props.theme.colorPrimary};

        .top-section {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            color: white;
            padding: 30px 0;

            .left,
            .right {
                flex-grow: 1;
                flex-basis: 300px;
            }

            .left {
                .logo {
                    width: 100px;
                }
              .title {
                    font-size: 2.5rem;
                    line-height: 2.5rem;
                    padding: 20px 0;
                                   
                  }
                }
            }

            .right {
                box-shadow: inset 0 0 15px 15px ${props => props.theme.colorPrimary};
                width: 100px;
                min-height: 400px;
                //background: white;

              .media-container {
                padding-top: 180px;

                img {
                  border: 1px solid rgba(0, 0, 0, 0.1);
                }

                img,
                .img,
                video,
                svg {
                  border-radius: 15px;
                  width: 100%;
                  height: 100%;
                }

                video {
                  background-color: transparent;
                  clip-path: inset(1px 1px);
                }

                .img {
                  position: relative;
                }

                svg {
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  display: none;
                }

                &:hover svg {
                  display: block;
                  cursor: pointer;
                }
              }
            }
        }
    }

    .bottom-section {
        display: flex;
        gap: 60px;
        padding: 60px 0;

        .left {
            min-width: 30%;
            min-height: 300px;
          .image {
            @media (max-width: 976px) {
              display: none;
            }
          }
          @media (max-width: 976px) {
            display: none;
          }
        }
      

        .right {
            .title {
                font-size: 1.5rem;
            }

            ul {
                list-style: none;
                font-size: 1.2rem;
                padding: 0;

                li {
                    padding: 3px 0;
                }
            }
          

        }
    }

    .top-section,
    .bottom-section {
        max-width: ${MAX_WIDTH}px;
        margin: 0 auto;

        @media (max-width: ${MAX_WIDTH + 200}px) {
            margin: 0 100px;
        }
      
        @media (max-width: ${1000}px) {
            margin: 0 5%;
        }
    }
`

export const LandingPageLayout = ({ children, ...props }) => {
    return (
        <BaseLayout {...props}>
            <StyledDiv>{children}</StyledDiv>
        </BaseLayout>
    )
}
