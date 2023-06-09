import styled from "styled-components"
import * as React from "react"
import { Image } from "./Image"
import { LinkOutlined } from "@ant-design/icons"

const WrapperStyledDiv = styled.div`

    > div {
        max-width: 60%;
        display: inline-flex;
        align-items: center;
        margin: 10px 0;
        background-color: ${props => props.theme.colorFillContent};
        border: 1px solid ${props => props.theme.colorBorder};
        border-radius: 15px;

        @media (max-width: 767px) {
            max-width: 100%;
            flex-wrap: wrap;
            background-color: inherit;
            width: 100%;
            padding: 12px;
            text-align: center;

            .img {
                width: 100%;
            }
        }
    }

    img {
        margin: 2px;
        border-radius: 15px;
    }

    .text {
        //flex-basis: 0;
        //flex-grow: 1;
        margin: 20px 20px;
    }
`

type LinkPreviewProps = {
    link: string
    title: string
    description: string
    image: any
    alt: string
}

export const LinkPreview = ({ link, title, description, image, alt }: LinkPreviewProps) => {
    return (
        <WrapperStyledDiv>
            <div>
                <div className="img">
                    <a href={link}>
                        <Image meta={image} alt={alt} maxWidth={200} />
                    </a>
                </div>
                <div className="text">
                    <div>
                        <b>{title}</b>
                    </div>
                    <div>{description}</div>
                    <div>
                        <LinkOutlined style={{ paddingRight: "5px" }} />
                        <a href={link}>{link}</a>
                    </div>
                </div>
            </div>
        </WrapperStyledDiv>
    )
}
