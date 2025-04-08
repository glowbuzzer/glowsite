import { useLocation } from "react-router-dom"
import { useEffect } from "react"

export const ScrollToAnchorOnMount = () => {
    const location = useLocation()

    useEffect(() => {
        // Scroll to the anchor when the component mounts
        if (location.hash) {
            console.log("hash", location.hash)
            const id = location.hash.replace("#", "")
            setTimeout(() => {
                const element = document.getElementById(id)
                if (element) {
                    console.log("scrolling to", element)
                    element.scrollIntoView({ behavior: "smooth" })
                }
            }, 200)
        }
    }, [location.hash])

    return null
}