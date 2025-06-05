import * as React from "react"
import { Link } from "react-router-dom"
import { useGlowsiteRoutes } from "./nav"
import { Node } from "./providers/NavProvider"

function find_node(nav: Node[], pathname) {
    for (const n of nav) {
        if (n.path === pathname) {
            return true
        }
        if (n.children && find_node(n.children, pathname)) {
            return true
        }
    }
    return false
}

/**
 * Wrapper around the react router link that handles relative links correctly
 */
export const GlowsiteLink = ({ to, children }) => {
    const nav = useGlowsiteRoutes()
    const next = new URL(to, window.location.href)
    const exists = find_node(nav, next.pathname)
    if (!exists) {
        console.error("BROKEN LINK FOUND", next.pathname)
        return (
            <Link to={next.pathname} className="broken">
                ***{children}***
            </Link>
        )
    }
    return (
        <Link to={next.pathname + next.hash} className="markdown-link">
            {children}
        </Link>
    )
}
