import * as React from "react"
import styled from "@emotion/styled"
import { Carousel } from "antd"

type CarouselProps = {
    width: string
    height: string
    fade: boolean
    dotsTop: string
    pauseOnHover: boolean
    dotsOn: boolean
    imgdata: [url: string, name: string][]
}

const StandardCarouselStyle = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};

    margin-top: 1vh;
    margin-bottom: 1vh;
    margin-left: auto;
    margin-right: auto;

    .slide {
        width: 100%;
        height: 100%;
    }

    .slide img {
        height: calc(${props => props.height} - 50px);
        margin-left: auto;
        margin-right: auto;
    }

    .slick-dots {
        top: ${props => props.dotsTop}; // play with the number of pixels to position it as you want
    }

    .slick-dots li button {
        width: 6px !important;
        height: 6px !important;
        border-radius: 100% !important;
        background: blue !important;
    }

    .slick-dots li.slick-active button {
        width: 7px !important;
        height: 7px !important;
        border-radius: 100% !important;
        background: ${props => props.theme.color.MainPurple}!important;
    }
`

export const StandardCarousel = ({
    width,
    height,
    fade,
    dotsTop,
    pauseOnHover,
    dotsOn,
    imgdata
}: CarouselProps) => (
    <StandardCarouselStyle width={width} height={height} dotsTop={dotsTop}>
        <Carousel
            arrows={false}
            dots={dotsOn}
            infinite={true}
            adaptiveHeight={false}
            variableWidth={false}
            centerMode={true}
            autoplay={true}
            pauseOnHover={pauseOnHover}
            fade={fade}
        >
            {imgdata.map(([url, name], index) => (
                <div className="slide" key={index}>
                    <img src={url} />
                    <h3 style={{ padding: "0 0 0 50px" }}>{name}</h3>
                </div>
            ))}
        </Carousel>
    </StandardCarouselStyle>
)
