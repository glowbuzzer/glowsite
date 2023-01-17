import * as React from "react"
import { Link, LinkProps } from "react-router-dom"

declare const gtag

export const LandingPageLink = ({ children, ...props }: LinkProps) => {
    function click() {
        gtag("event", "exit_landing", {
            event_label: props.to
        })
    }

    function click_href() {
        try {
            const url = new URL(props.to as string)
            gtag("event", "exit_landing", {
                event_label: url.hostname
            })
        } catch (e) {
            console.error(e)
        }
    }

    if (typeof props.to === "string" && props.to.startsWith("http")) {
        return (
            <a href={props.to} onClick={click_href}>
                {children}
            </a>
        )
    }

    return (
        <Link {...props} onClick={click}>
            {children}
        </Link>
    )
}
