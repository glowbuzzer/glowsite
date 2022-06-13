import { useEffect } from "react"

export function ScrollToTopOnMount({on=[]}) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, on)

    return null
}
