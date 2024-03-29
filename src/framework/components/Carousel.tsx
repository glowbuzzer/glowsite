import * as React from "react"
import styled from "styled-components"
import { Carousel } from "antd"

type CarouselStyleProps = {
    width?: string
    height: string
    dotsTop: string
}

type CarouselProps = CarouselStyleProps & {
    fade: boolean
    pauseOnHover: boolean
    dotsOn: boolean
    labelsOn: boolean
    imgdata: [url: string, name: string][]
}

const StandardCarouselStyle = styled.div<CarouselStyleProps>`
  max-width: ${props => props.width};
  max-height: ${props => props.height};

  margin: 1vh auto;

  .slide {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .slide img {
    max-height: calc(${props => props.height} - 50px);
    display: inline-block;
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
    background: ${props => props.theme.colorPrimary} !important;
  }
`

export const StandardCarousel = ({
    width,
    height,
    fade,
    dotsTop,
    pauseOnHover,
    dotsOn,
    labelsOn,
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
                    <img alt={name} src={url} />
                    {labelsOn && (
                        <h3 className="caption">
                            <em>{name}</em>
                        </h3>
                    )}
                </div>
            ))}
        </Carousel>
    </StandardCarouselStyle>
)
