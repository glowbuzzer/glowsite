import * as React from "react"
import { useEffect, useState } from "react"
import { Button, Carousel } from "antd"
import { RightCircleOutlined } from "@ant-design/icons"
import styled from "@emotion/styled"
import { useNavNode } from "../nav"
import { Image } from "./Image"
import { Link } from "react-router-dom"
import {Loading} from "./Loading";

export const CarouselSettings = {
    arrows: false,
    dots: true,
    pauseOnHover: false,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 3,
    responsive: [
        {
            breakpoint: 975,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 1
            }
        }
    ],
    speed: 2000,
    autoplaySpeed: 10000,
    centerMode: false,
    centerPadding: "50px",
    autoplay: true,
    fade: false,
    adaptiveHeight: false,
    variableWidth: false,
    cssEase: "cubic-bezier(0.420, 0.000, 1.000, 1.000)"
}

const CarouselWrapper = styled(Carousel)`
    .slick-dots {
        padding-top: 10px;
    }

    > .slick-dots li button {
        width: 6px !important;
        height: 6px !important;
        border-radius: 100% !important;
        background: grey !important;
    }

    > .slick-dots li.slick-active button {
        width: 7px !important;
        height: 7px !important;
        border-radius: 100% !important;
        background: ${props => props.theme.color.MainPurple} !important;
    }

    .slick-track {
        display: flex !important;
        background: rgba(0, 0, 0, 0.01);
    }

    .slick-dots {
        top: 700px; // play with the number of pixels to position it as you want
    }

    .slick-slide {
        height: inherit !important;
        margin: 20px 10px;

        > div {
            height: 100%;
        }
    }
`
//vals
const CarouselDiv = styled.div`
    height: 100%;
    padding: 10px;
    text-align: center;
    color: rgba(0, 0, 0, 0.9);
    background: white;

    :hover {
        background: rgba(0, 0, 0, 0.05);
    }

    a {
        display: flex;
        flex-direction: column;
        height: 100%;
        color: black !important;
    }

    figure {
        flex-grow: 1;
        display: flex;
        padding-left: 75px;
        padding-right: 75px;
        padding-top: 10px;
        padding-bottom: 10px;
        align-items: center;
    }

    .missing {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 30px;
        font-weight: bold;
        font-size: 1.2em;
        height: 200px;
        background: rgba(0, 0, 0, 0.05);
    }

    header {
        font-weight: bold;
        font-size: 1.5em;
    }

    .content {
        font-size: 1.1em;
    }

    footer {
        padding: 10px;
    }
`

// const entries = Object.entries<any>(imports)

// interface FeaturedBlogProps {
//     blogTitle: string
//     blogSubtitle: string
//     blogUrl: string
// }

// function GetFeaturedBlogList(): FeaturedBlogProps[] {
//     let FeaturedBlogList: FeaturedBlogProps[] = []
//     for (const entry of entries) {
//         if (entry[1].featuredBlog) {
//             console.log(entry[1].title)
//             console.log(entry[1].subtitle)
//             console.log(entry[0])
//             FeaturedBlogList.push({
//                 blogTitle: entry[1].title,
//                 blogSubtitle: entry[1].subtitle,
//                 blogUrl: entry[0]
//             })
//         }
//     }
//     return FeaturedBlogList
// }

export const FeaturedBlog = () => {
    const [components, setComponents] = useState<any[]>()

    const blogs = useNavNode("/blogs")
    const featured = blogs?.featured?.map(path => useNavNode("/blogs/" + path)) || []

    useEffect(() => {
        Promise.all(featured.map(node => node.component())).then(setComponents)
    }, [])

    if (!components) {
        return <Loading/>
    }



    return (
        <CarouselWrapper {...CarouselSettings}>
            {featured.map((item, index) => {
                const component = components[index]
                return (
                    <CarouselDiv key="{item.path}">
                        <Link to={item.path}>
                            <header>{item.title}</header>
                            <div className="content">{item.subtitle}</div>
                            <figure>
                                {component.heroImage ? (
                                    <Image
                                        meta={component.heroImage}
                                        preset="narrow"
                                        alt="item.title"
                                    />
                                ) : (
                                    <div className="missing">NO IMAGE</div>
                                )}
                            </figure>
                            <p>{item.description}</p>
                            <footer>
                                <Button type="primary" icon={<RightCircleOutlined />}>
                                    Read more{" "}
                                </Button>
                            </footer>
                        </Link>
                    </CarouselDiv>
                )
            })}
        </CarouselWrapper>
    )
}
