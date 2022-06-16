import * as React from "react"
import { Link } from "react-router-dom"

/**
 * Wrapper around the react router link that handles relative links correctly
 */
export const GlowsiteLink = ({ to, children }) => {
    const next = new URL(to, window.location.href)
    return <Link to={next.pathname}>{children}</Link>
}
