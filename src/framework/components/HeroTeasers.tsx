import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowRightOutlined, DownOutlined, UpOutlined } from "@ant-design/icons"
import styled from "styled-components"

const StyledHeroTeasers = styled.div`
  border-top: 1px solid ${props => props.theme.colorBorder};
  border-bottom: 1px solid ${props => props.theme.colorBorder};
  padding: 30px 0;
  background: ${props => props.theme.colorBgContainer};

  .hero-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .more-container {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .show-more-button {
    margin-top: 20px;
    text-align: center;

    button {
      background: ${props => props.theme.colorPrimary};
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      margin: 0 auto;

      &:hover {
        background: ${props => props.theme.colorPrimaryHover};
      }

      .icon {
        margin-left: 8px;
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

    video {
      max-width: 100%;
      max-height: 100%;
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
    }
  }
`

const StyledTeaser = styled.div`
  padding: 10px 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  user-select: none;
  background: ${props => props.theme.colorBgLayout};

  .title {
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .subtitle {
    height: 8em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;

    @media (max-width: 768px) {
      line-height: 1.15em;
    }
  }

  .media-container {
    padding-top: 5px;
    position: relative;
    cursor: pointer;

    img {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 15px;
      width: 100%;
      height: auto;
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
      transition: opacity 0.3s;

      svg {
        width: 60px;
        height: 60px;
      }
    }

    &:hover .play-overlay {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .link {
    padding-top: 5px;
    text-align: right;
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
            if (e.key === 'Escape' && activeVideo) {
                handleCloseVideo()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
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
            <div className="hero-container">
                {heroItems.map(item => (
                    <Teaser key={item.key} item={item} onVideoClick={handleVideoClick} />
                ))}
            </div>

            {moreItems.length > 0 && (
                <div className="show-more-button">
                    <button onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Show Less' : 'Show More'} 
                        <span className="icon">
                            {showMore ? <UpOutlined /> : <DownOutlined />}
                        </span>
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
