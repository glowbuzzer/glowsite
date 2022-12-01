import * as React from "react"
import styled from "styled-components"
import { BaseLayout } from "./BaseLayout"

const MAX_WIDTH = 1200

const StyledDiv = styled.div`
    background: white;

    .top-section-container {
        background: ${props => props.theme.color.MainPurple};

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

            .right {
                box-shadow: inset 0 0 15px 15px ${props => props.theme.color.MainPurple};
                width: 100px;
                min-height: 400px;
                //background: white;
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
            border: 1px solid black;
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

        @media (max-width: ${MAX_WIDTH+200}px) {
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
