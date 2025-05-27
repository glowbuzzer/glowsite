import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowRightOutlined, DownOutlined, UpOutlined } from "@ant-design/icons"
import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const StyledHeroTeasers = styled.div`
    position: relative;
    padding: 30px 0;
    background: ${props => props.theme.colorBgContainer};

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            ${props => props.theme.colorBorder},
            transparent
        );
    }

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            ${props => props.theme.colorBorder},
            transparent
        );
    }

    .section-title {
        text-align: center;
        margin-bottom: 40px;
        animation: ${fadeIn} 0.6s ease-out;

        h2 {
            font-size: 2.2em;
            font-weight: 700;
            margin: 0;
            background: linear-gradient(90deg, #9254de, #6a35c2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        p {
            font-size: 1.2em;
            color: #666;
            max-width: 700px;
            margin: 0 auto;
        }
    }

    .hero-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 0 20px;
        gap: 30px;
        animation: ${fadeIn} 0.6s ease-out 0.2s backwards;

        @media (max-width: 992px) {
            grid-template-columns: 1fr;
            //grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }
    }

    .more-container {
        margin-top: 30px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
        animation: ${fadeIn} 0.6s ease-out;

        @media (max-width: 992px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }
    }

    .show-more-button {
        margin-top: 40px;
        text-align: center;
        animation: ${fadeIn} 0.6s ease-out 0.4s backwards;

        button {
            background: ${props => props.theme.colorPrimary};
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 30px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            display: flex;
            align-items: center;
            margin: 0 auto;
            box-shadow: 0 4px 15px rgba(146, 84, 222, 0.3);
            transition: all 0.3s ease;

            &:hover {
                background: ${props => props.theme.colorPrimaryHover};
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(146, 84, 222, 0.4);
            }

            .icon {
                margin-left: 10px;
            }
        }
    }

    .fullscreen-video {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: ${fadeIn} 0.3s ease-out;

        video {
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .close-button {
            position: absolute;
            top: 20px;
            right: 20px;
            background: white;
            color: black;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;

            &:hover {
                transform: scale(1.1);
                background: #f0f0f0;
            }
        }
    }
`

const StyledTeaser = styled.div`
    padding: 20px;
    border-radius: 16px;
    user-select: none;
    background: ${props => props.theme.colorBgLayout};
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .title {
        font-weight: 700;
        font-size: 1.3em;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        color: ${props => props.theme.colorPrimary};

        a {
            color: ${props => props.theme.colorPrimary};
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .subtitle {
        height: 6em;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        color: #555;
        line-height: 1.5;
        margin-bottom: 15px;

        @media (max-width: 768px) {
            line-height: 1.4;
        }
    }

    .media-container {
        margin: 15px 0;
        position: relative;
        cursor: pointer;
        flex-grow: 1;
        overflow: hidden;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

        img {
            width: 100%;
            height: auto;
            transition: transform 0.5s ease;
            display: block;
        }

        .play-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: all 0.3s ease;
            background-color: rgba(0, 0, 0, 0);

            svg {
                width: 70px;
                height: 70px;
                filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
        }

        &:hover {
            img {
                transform: scale(1.05);
            }

            .play-overlay {
                opacity: 1;
                background-color: rgba(0, 0, 0, 0.2);

                svg {
                    transform: scale(1);
                }
            }
        }
    }

    .link {
        padding-top: 15px;
        text-align: right;

        a {
            display: inline-flex;
            align-items: center;
            color: ${props => props.theme.colorPrimary};
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s ease;

            svg {
                margin-left: 5px;
                transition: transform 0.2s ease;
            }

            &:hover {
                color: ${props => props.theme.colorPrimaryHover};

                svg {
                    transform: translateX(3px);
                }
            }
        }
    }
`

type TeaserItem = {
    key: string
    title: string
    subtitle: string
    to?: string
    animationUrl?: string // Kept for compatibility with existing data
    imageUrl: string
    videoUrl?: string
}

type TeaserProps = {
    item: TeaserItem
    onVideoClick: (videoUrl: string) => void
}

const Teaser = ({ item, onVideoClick }: TeaserProps) => {
    const { title, subtitle, to, imageUrl, videoUrl } = item

    const handleClick = () => {
        if (videoUrl) {
            onVideoClick(videoUrl)
        }
    }

    return (
        <StyledTeaser>
            <div className="title">{to ? <Link to={to}>{title}</Link> : title}</div>
            <div className="subtitle">{subtitle}</div>
            <div className="media-container" onClick={handleClick}>
                <img src={imageUrl} alt={title} />
                {videoUrl && (
                    <div className="play-overlay">
                        <svg viewBox="0 0 24 24" fill="white">
                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-2 14.5v-9l6 4.5z" />
                        </svg>
                    </div>
                )}
            </div>
            {to && (
                <div className="link">
                    <Link to={to}>
                        Read more <ArrowRightOutlined />
                    </Link>
                </div>
            )}
        </StyledTeaser>
    )
}

type HeroTeasersProps = {
    items: TeaserItem[]
}

export const HeroTeasers = ({ items }: HeroTeasersProps) => {
    const [showMore, setShowMore] = useState(false)
    const [activeVideo, setActiveVideo] = useState<string | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    // Get the first three items for the hero section
    const heroItems = items.slice(0, 3)

    // Get the remaining items for the "more" section
    const moreItems = items.slice(3)

    const handleVideoClick = (videoUrl: string) => {
        setActiveVideo(videoUrl)
    }

    const handleCloseVideo = () => {
        setActiveVideo(null)
    }

    // Handle escape key to close video
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && activeVideo) {
                handleCloseVideo()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [activeVideo])

    // Auto-play video when it becomes active
    useEffect(() => {
        if (activeVideo && videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Error playing video:", error)
            })
        }
    }, [activeVideo])

    return (
        <StyledHeroTeasers>
            <div className="section-title">
                <h2>Showcase</h2>
                <p>
                    Explore our innovative solutions and capabilities through these demonstration
                    videos
                </p>
            </div>

            <div className="hero-container">
                {heroItems.map(item => (
                    <Teaser key={item.key} item={item} onVideoClick={handleVideoClick} />
                ))}
            </div>

            {moreItems.length > 0 && (
                <div className="show-more-button">
                    <button onClick={() => setShowMore(!showMore)}>
                        {showMore ? "Show Less" : "Show More Examples"}
                        <span className="icon">{showMore ? <UpOutlined /> : <DownOutlined />}</span>
                    </button>
                </div>
            )}

            {showMore && moreItems.length > 0 && (
                <div className="more-container">
                    {moreItems.map(item => (
                        <Teaser key={item.key} item={item} onVideoClick={handleVideoClick} />
                    ))}
                </div>
            )}

            {activeVideo && (
                <div className="fullscreen-video" onClick={handleCloseVideo}>
                    <video
                        ref={videoRef}
                        src={activeVideo}
                        controls
                        autoPlay
                        onClick={e => e.stopPropagation()}
                    />
                    <button className="close-button" onClick={handleCloseVideo}>
                        ✕
                    </button>
                </div>
            )}
        </StyledHeroTeasers>
    )
}
