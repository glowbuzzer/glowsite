import styled from "styled-components"
import * as React from "react"
import { Image } from "./Image"
import { LinkOutlined } from "@ant-design/icons"

const WrapperStyledDiv = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #d9d9d9;
    border: 1px solid #d9d9d9;
    border-radius: 15px;
    width: 500px;
    img {
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
    }

    .text {
        margin-left: 20px;
        margin-right: 20px;
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
            <table>
                <tr>
                    <td>
                        <a href={link}>
                            <Image meta={image} alt={alt} maxWidth={200} />
                        </a>
                    </td>
                    <td>
                        <div className={"text"}>
                            <div>
                                <b>{title}</b>
                            </div>
                            <div>{description}</div>
                            <div>
                                <LinkOutlined style={{ paddingRight: "5px" }} />
                                <a href={link}>{link}</a>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </WrapperStyledDiv>
    )
}
