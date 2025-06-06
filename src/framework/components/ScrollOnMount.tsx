import { useEffect } from "react"

export function ScrollOnMount({ on = [], anchor = false }) {
    useEffect(() => {
        if (anchor) {
            if (on.length > 1) {
                console.warn(
                    "ScrollOnMount: anchor prop is set, but 'on' prop should only contain one element."
                )
            }
            if (on.length && on[0].length) {
                const element = document.getElementById(on[0].slice(1))
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                } else {
                    console.warn(`ScrollOnMount: Element with id '${on[0]}' not found.`)
                }
            }
        } else {
            window.scrollTo(0, 0)
        }
    }, on)

    return null
}
