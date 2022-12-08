import * as React from "react"
import { createRoot } from "react-dom/client"

import "antd/dist/antd.css"

// @ts-ignore
import animation_url from "./src/img/short_intro_summary.gif"
// @ts-ignore
import static_url from "./src/img/short_intro_summary.png"
import { TeaserCarousel } from "../../src/framework/components/TeaserCarousel"
import { BrowserRouter } from "react-router-dom"

const stock_url = "https://via.placeholder.com/800x450"

const App = () => {
    return (
        <div>
            <div>SIMPLE TEST APP</div>
            <TeaserCarousel
                items={[
                    {
                        key: "1",
                        title: "Lorem ipsum dolor sit amet",
                        subtitle:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        to: "/",
                        animationUrl: "https://via.placeholder.com/800x450",
                        imageUrl: "https://via.placeholder.com/800x450",
                        videoUrl: "https://static.glowbuzzer.com/short_intro.mp4"
                    },
                    {
                        key: "2",
                        title: "Sit amet consectetur adipiscing elit",
                        subtitle:
                            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                        animationUrl: "https://via.placeholder.com/800x450",
                        imageUrl: "https://via.placeholder.com/800x450"
                    },
                    {
                        key: "3",
                        title: "Consectetur adipiscing elit",
                        subtitle:
                            "Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                        to: "/",
                        animationUrl: "https://via.placeholder.com/800x450",
                        imageUrl: "https://via.placeholder.com/800x450"
                    },
                    {
                        key: "4",
                        title: "Incididunt ut labore et dolore magna aliqua",
                        subtitle:
                            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                        to: "/",
                        animationUrl: "https://via.placeholder.com/800x450",
                        imageUrl: "https://via.placeholder.com/800x450"
                    },
                    /*
                                        {
                                            key: "5",
                                            title: "Labore et dolore magna aliqua",
                                            subtitle:
                                                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                                            to: "/",
                                            animation: stock_url,
                                            image: stock_url
                                        }
                    */
                ]}
            />
        </div>
    )
}

const root = createRoot(document.getElementById("app"))
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
