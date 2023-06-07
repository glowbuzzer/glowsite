import * as React from "react"
import { useEffect, useState } from "react"
import { Carousel } from "antd"
import { Link } from "react-router-dom"
import { ArrowRightOutlined } from "@ant-design/icons"
import styled from "styled-components"

const StyledCarousel = styled(Carousel)`
  border-top: 1px solid ${props => props.theme.colorBorder};
  border-bottom: 1px solid ${props => props.theme.colorBorder};
  padding: 30px 0;
  background: ${props => props.theme.colorBgContainer};

  .slick-slide {
    padding: 20px 20px;
  }

  .slick-center {
    transition: 500ms ease;
    transform: scale(1.1);
  }
`

const StyledCarouselItem = styled.div`
  padding: 10px 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  user-select: none;
  cursor: default;
  background: ${props => props.theme.colorBgLayout};

  .wrapper {
    .title {
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    &.selected .title:hover a {
      text-decoration: underline;
    }

    .subtitle {
      height: 8em;
      @media (max-width: 768px) {
        line-height: 1.15em;
      }
    }

    .media-container {
      padding-top: 5px;

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

    .link {
      padding-top: 5px;
      display: none;
      text-align: right;
    }

    &.selected .link {
      display: block;
    }

    .hidden {
      display: none !important;
    }
  }
`

type CarouselItemProps = Exclude<TeaserCarouselItem, "key"> & {
    selected: boolean
}

export const CarouselItem = ({
    title,
    subtitle,
    to,
    animationUrl,
    imageUrl,
    videoUrl,
    selected
}: CarouselItemProps) => {
    const [showVideo, setShowVideo] = useState(false)

    useEffect(() => {
        if (!selected) {
            setShowVideo(false)
        }
    }, [selected])

    return (
        <StyledCarouselItem>
            <div className={"wrapper" + (selected ? " selected" : "")}>
                <div className="title">{selected && to ? <Link to={to}>{title}</Link> : title}</div>
                <div className="subtitle">{subtitle}</div>
                <div className="media-container">
                    {showVideo ? (
                        <video className="video" src={videoUrl} autoPlay loop muted playsInline />
                    ) : (
                        <>
                            <img src={imageUrl} alt={title} className={selected ? "hidden" : ""} />
                            <div className={"img" + (selected ? "" : " hidden")}>
                                <img src={animationUrl} alt={title} />
                                <svg viewBox="0 0 800 450" onClick={() => setShowVideo(true)}>
                                    <rect
                                        x={0}
                                        y={0}
                                        width={800}
                                        height={450}
                                        fill="rgba(0, 0, 0, 0.05)"
                                    />
                                    <g transform="translate(310,145) scale(7)">
                                        <path
                                            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-2 14.5v-9l6 4.5z"
                                            fill="rgba(0,0,0,0.4)"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </>
                    )}
                </div>
                {to && (
                    <div className="link">
                        <Link to={to}>
                            Read more <ArrowRightOutlined />
                        </Link>
                    </div>
                )}
            </div>
        </StyledCarouselItem>
    )
}

type TeaserCarouselItem = {
    key: string
    title: string
    subtitle: string
    to?: string
    animationUrl: string
    imageUrl: string
    videoUrl?: string
}

type TeaserCarouselProps = {
    items: TeaserCarouselItem[]
}

export const TeaserCarousel = ({ items }: TeaserCarouselProps) => {
    const [selected, setSelected] = React.useState(0)

    function change_slide(_, n) {
        const val = n % 7
        setSelected(val)
    }

    return (
        <StyledCarousel
            slidesToShow={3}
            dots={false}
            draggable
            focusOnSelect={true}
            centerMode={true}
            centerPadding={"250px"}
            beforeChange={change_slide}
            responsive={[
                {
                    breakpoint: 4000,
                    settings: {
                        centerPadding: "450px"
                    }
                },
                {
                    breakpoint: 2300,
                    settings: {
                        centerPadding: "300px"
                    }
                },
                {
                    breakpoint: 2200,
                    settings: {
                        centerPadding: "250px"
                    }
                },
                {
                    breakpoint: 2100,
                    settings: {
                        centerPadding: "200px"
                    }
                },
                {
                    breakpoint: 2000,
                    settings: {
                        centerPadding: "150px"
                    }
                },
                {
                    breakpoint: 1400,
                    settings: {
                        centerPadding: "0px"
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "350px"
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "250px"
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "200px"
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "150px"
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "30px"
                    }
                }
            ]}
        >
            {items.map(({ animationUrl, imageUrl, videoUrl, key, subtitle, title, to }, i) => (
                <CarouselItem
                    key={key}
                    title={title}
                    subtitle={subtitle}
                    to={to}
                    animationUrl={animationUrl}
                    imageUrl={imageUrl}
                    videoUrl={videoUrl}
                    selected={selected === i}
                />
            ))}
        </StyledCarousel>
    )
}
