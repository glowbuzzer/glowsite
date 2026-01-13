import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import useEmblaCarousel from "embla-carousel-react"
import {
    ArrowRightOutlined,
    DownloadOutlined,
    LeftOutlined,
    RightOutlined
} from "@ant-design/icons"
import { Link } from "react-router-dom"
import { Button } from "antd"

const CarouselContainer = styled.div`
    overflow: hidden;
    width: 50%;
    margin: 20px auto;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 25px;
    user-select: none;
`

const CarouselViewport = styled.div`
    overflow: hidden;
`

const CarouselSlides = styled.div`
    display: flex;
    touch-action: pan-y pinch-zoom;
`

const Slide = styled.div`
    flex: 0 0 100%;
    min-width: 0;
    padding: 40px 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    //min-height: 400px;

    .slide-content {
        max-width: 1000px;
        text-align: center;

        h2 {
            margin: 0 0 20px 0;
            font-size: 1.8em;
            color: ${props => props.theme.colorPrimaryTextActive};
            font-weight: 600;
            line-height: 1.3;
        }

        p {
            font-size: 1.3em;
            color: #555555;
            line-height: 1.6;
            margin: 0;
        }
    }

    @media (max-width: 1200px) {
        min-height: 350px;
        padding: 30px 40px;

        .slide-content h2 {
            font-size: 2em;
        }

        .slide-content p {
            font-size: 1.1em;
        }
    }

    @media (max-width: 767px) {
        min-height: 300px;
        padding: 20px 20px;

        .slide-content h2 {
            font-size: 1.5em;
        }

        .slide-content p {
            font-size: 1em;
        }
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px 0;

    @media (max-width: 767px) {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
`

const StyledButton = styled.button`
    padding: 12px 24px;
    font-size: 1em;
    font-weight: 500;
    border: 2px solid ${props => props.theme.colorPrimary};
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: ${props => props.theme.colorPrimary};
    color: white;

    &:hover {
        background: transparent;
        color: ${props => props.theme.colorPrimary};
    }

    @media (max-width: 767px) {
        padding: 10px 20px;
        font-size: 0.9em;
    }
`

const NavigationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding: 10px 0 30px 0;
`

const ArrowButton = styled.button`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    //border: 2px solid ${props => props.theme.colorPrimary};
    background: transparent;
    color: ${props => props.theme.colorPrimary};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    font-size: 1.2em;

    &:hover {
        background: ${props => props.theme.colorPrimary};
        color: white;
    }

    @media (max-width: 767px) {
        width: 32px;
        height: 32px;
        font-size: 1em;
    }
`

const DotsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const Dot = styled.button<{ $active: boolean }>`
    width: ${props => (props.$active ? "16px" : "8px")};
    height: ${props => (props.$active ? "16px" : "8px")};
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
    background: ${props => (props.$active ? props.theme.colorPrimary : "grey")};
    transition: all 0.2s ease;

    &:hover {
        background: ${props => props.theme.colorPrimary};
    }
`

const slides = [
    {
        title: "Order of Magnitude BOM Reduction",
        description:
            "Extend hybrid stepper motors into robotic applications traditionally reserved for servo systems — achieving order-of-magnitude reduction in system cost"
    },
    {
        title: "Joint Level Electronics",
        description:
            "Enable joint-level electronics and distributed drive architectures, eliminating bulky centralized control cabinets and reducing wiring complexity"
    },
    {
        title: "5x Lower Development Costs",
        description:
            "Offload step generation and real-time motion primitives to dedicated hardware, allowing control software to run on Embedded Linux — cutting development costs up to 5×"
    },
    {
        title: "Hybrid Stepper Motor, Advanced Dynamics",
        description:
            "Leverage hybrid stepper motors with encoder-based supervision and advanced motion profiling to extract the highest achievable dynamic performance"
    },
    {
        title: "Web-Native HMI",
        description:
            "Push high-level control, orchestration, and HMI into modern web stacks (React / Python), minimizing software complexity and long-term maintenance cost"
    }
]

export const HomeCarousel2 = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        dragFree: false
    })
    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSelect = useCallback(() => {
        if (!emblaApi) {
            return
        }
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) {
            return
        }
        onSelect()
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", onSelect)

        return () => {
            emblaApi.off("select", onSelect)
            emblaApi.off("reInit", onSelect)
        }
    }, [emblaApi, onSelect])

    useEffect(() => {
        if (!emblaApi) {
            return
        }

        const autoplay = setInterval(() => {
            // emblaApi.scrollNext()
        }, 6000)

        return () => clearInterval(autoplay)
    }, [emblaApi])

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index)
        },
        [emblaApi]
    )

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <CarouselContainer>
            <CarouselViewport ref={emblaRef}>
                <CarouselSlides>
                    {slides.map((slide, index) => (
                        <Slide key={index}>
                            <div className="slide-content">
                                <h2>{slide.title}</h2>
                                <p>{slide.description}</p>
                            </div>
                        </Slide>
                    ))}
                </CarouselSlides>
            </CarouselViewport>
            <ButtonsContainer>
                <Link to="/services">
                    <Button type="primary" icon={<DownloadOutlined />}>
                        Download Whitepaper
                    </Button>
                </Link>
                <Link to="/services">
                    <Button type="primary" icon={<ArrowRightOutlined />}>
                        Technical Blueprint
                    </Button>
                </Link>
                {/*

                <StyledButton>Download Whitepaper</StyledButton>
                <StyledButton>Technical Blueprint</StyledButton>
*/}
            </ButtonsContainer>
            <NavigationContainer>
                <ArrowButton onClick={scrollPrev} aria-label="Previous slide">
                    <LeftOutlined />
                </ArrowButton>
                <DotsContainer>
                    {slides.map((_, index) => (
                        <Dot
                            key={index}
                            $active={index === selectedIndex}
                            onClick={() => scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </DotsContainer>
                <ArrowButton onClick={scrollNext} aria-label="Next slide">
                    <RightOutlined />
                </ArrowButton>
            </NavigationContainer>
        </CarouselContainer>
    )
}
