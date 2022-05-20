import styled from "styled-components"
import * as React from "react"
import { Image } from "./Image"
import { LinkOutlined } from "@ant-design/icons"

const WrapperStyledDiv = styled.div`
    > div {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        margin: 10px 0;
        background-color: #d9d9d9;
        border: 1px solid #d9d9d9;
        border-radius: 15px;

        @media (max-width: 767px) {
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
        flex-grow: 1;
        margin: 0 20px;
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
