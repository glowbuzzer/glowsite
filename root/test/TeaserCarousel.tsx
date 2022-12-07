import styled from "styled-components"
import { Carousel } from "antd"
import * as React from "react"
import { Link } from "react-router-dom"
import { ArrowRightOutlined } from "@ant-design/icons"
import { useEffect, useRef, useState } from "react"
import { CarouselRef } from "antd/es/carousel"

const StyledCarousel = styled(Carousel)`
    .slick-slide {
        padding: 20px 20px;
    }

    .slick-center {
        transition: 500ms ease;
        transform: scale(1.1);
    }
`

const StyledCarouselItem = styled.div`
    //background: red;
    padding: 10px 15px;
    border: 1px solid grey;
    border-radius: 15px;
    user-select: none;
    cursor: default;

    .wrapper {
        .title {
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }

        &.selected .title:hover {
            text-decoration: underline;
        }

        .subtitle {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
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

export const CarouselItem = ({ title, subtitle, to, animation, image, videoUrl, selected }) => {
    const [showVideo, setShowVideo] = useState(false)

    useEffect(() => {
        if (!selected) {
            setShowVideo(false)
        }
    }, [selected])

    return (
        <StyledCarouselItem>
            <div className={"wrapper" + (selected ? " selected" : "")}>
                <div className="title">{selected ? <Link to={to}>{title}</Link> : title}</div>
                <div className="subtitle">{subtitle}</div>
                <div className="media-container">
                    {showVideo ? (
                        <video className="video" src={videoUrl} autoPlay loop muted playsInline />
                    ) : (
                        <>
                            <img src={image} className={selected ? "hidden" : ""} />
                            <div className={"img" + (selected ? "" : " hidden")}>
                                <img src={animation} />
                                <svg viewBox="0 0 800 450" onClick={() => setShowVideo(true)}>
                                    <rect
                                        x={0}
                                        y={0}
                                        width={800}
                                        height={450}
                                        fill="rgba(0, 0, 0, 0.05)"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M19.2661 10.4837C20.258 11.2512 20.258 12.7487 19.2661 13.5162C16.2685 15.8356 12.9213 17.6637 9.34979 18.9322L8.69731 19.1639C7.44904 19.6073 6.13053 18.7627 5.96154 17.4742C5.48938 13.8739 5.48938 10.126 5.96154 6.52574C6.13053 5.23719 7.44904 4.39263 8.69732 4.83597L9.34979 5.06771C12.9213 6.33619 16.2685 8.16434 19.2661 10.4837ZM18.3481 12.3298C18.5639 12.1628 18.5639 11.837 18.3481 11.6701C15.4763 9.44796 12.2695 7.69648 8.84777 6.4812L8.19529 6.24947C7.87034 6.13406 7.49691 6.35401 7.44881 6.72079C6.99363 10.1915 6.99363 13.8084 7.4488 17.2791C7.49691 17.6459 7.87034 17.8658 8.19529 17.7504L8.84777 17.5187C12.2695 16.3034 15.4763 14.5519 18.3481 12.3298Z"
                                        fill="rgba(0,0,0,0.4)"
                                        transform="translate(290,115) scale(10)"
                                    />
                                </svg>
                            </div>
                        </>
                    )}
                </div>
                <div className="link">
                    <Link to={to}>
                        Read more <ArrowRightOutlined />
                    </Link>
                </div>
            </div>
        </StyledCarouselItem>
    )
}

type TeaserCarouselProps = {
    items: {
        key: string
        title: string
        subtitle: string
        to: string
        animation: string
        image: string
        videoUrl?: string
    }[]
}
export const TeaserCarousel = ({ items }: TeaserCarouselProps) => {
    const [selected, setSelected] = React.useState(0)

    function change_slide(_, n) {
        const val = n % 7
        console.log("change_slide", val)
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
                    breakpoint: 2000,
                    settings: {
                        centerPadding: "150px",
                    }
                },
                {
                    breakpoint: 1400,
                    settings: {
                        centerPadding: "50px",
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "250px",
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "200px",
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "150px",
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "50px",
                    }
                }
            ]}
        >
            {items.map(({ animation, image, videoUrl, key, subtitle, title, to }, i) => (
                <CarouselItem
                    key={key}
                    title={title}
                    subtitle={subtitle}
                    to={to}
                    animation={animation}
                    image={image}
                    videoUrl={videoUrl}
                    selected={selected === i}
                />
            ))}
        </StyledCarousel>
    )
}
