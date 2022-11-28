import * as React from "react"
import { Link, LinkProps } from "react-router-dom"

declare const gtag

export const LandingPageLink = ({ children, ...props }: LinkProps) => {
    function click() {
        console.log("landing page link click")
        gtag("event", "exit_landing", {
            event_label: props.to
        })
    }

    return (
        <Link {...props} onClick={click}>
            {children}
        </Link>
    )
}
