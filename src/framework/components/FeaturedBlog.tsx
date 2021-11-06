import { Link } from "react-router-dom"
import * as React from "react"
import { Row, Col, Button, Carousel } from "antd"
// @ts-ignore because globEager is not defined
const imports = import.meta.globEager("../../pages/blogs/**/*.{md,mdx}")

import { RightCircleOutlined } from "@ant-design/icons"
import styled from "@emotion/styled"

export const CarouselSettings = {
    arrows: false,
    dots: true,
    pauseOnHover: false,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 3,
    speed: 10000,
    centerMode: false,
    centerPadding: "50px",
    autoplay: true,
    fade: false,
    adaptiveHeight: false,
    variableWidth: false,
    cssEase: "cubic-bezier(0.65, 0, 0.35, 1)"
}

const CarouselWrapper = styled(Carousel)`
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
        background: ${props => props.theme.color.MainPurple}!important;
    }

    .slick-slide {
    }
`

const CarouselTitle = styled.h2`
    // color: white;
    font-weight: bold;
`

const CarouselSubTitle = styled.h3`
    // color: white;
    padding: 10px 0 10px 0;
`

const CarouselDiv = styled.div`
    display: block;
    width: 300px;
    padding: 10px;
    height: 300px;
    text-align: center;
`

const entries = Object.entries<any>(imports)

interface FeaturedBlogProps {
    blogTitle: string
    blogSubtitle: string
    blogUrl: string
}

function GetFeaturedBlogList(): FeaturedBlogProps[] {
    let FeaturedBlogList: FeaturedBlogProps[] = []
    for (const entry of entries) {
        if (entry[1].featuredBlog) {
            console.log(entry[1].title)
            console.log(entry[1].subtitle)
            console.log(entry[0])
            FeaturedBlogList.push({
                blogTitle: entry[1].title,
                blogSubtitle: entry[1].subtitle,
                blogUrl: entry[0]
            })
        }
    }
    return FeaturedBlogList
}

export const FeaturedBlog = props => {
    const list = GetFeaturedBlogList()

    return (
        <CarouselWrapper {...CarouselSettings}>
            {list.map(list => (
                <CarouselDiv key="{list.blogTitle}">
                    <CarouselTitle>{list.blogTitle}</CarouselTitle>
                    <CarouselSubTitle>{list.blogSubtitle}</CarouselSubTitle>
                    <Button
                        type="primary"
                        href={list.blogUrl.replace("../../pages", "").replace(".mdx", "")}
                        icon={<RightCircleOutlined />}
                    >
                        Read more{" "}
                    </Button>
                </CarouselDiv>
            ))}
        </CarouselWrapper>
    )
}
