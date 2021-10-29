import { Route } from "react-router"
import { TypedocItem } from "../typedoc/TypedocItem"
import * as React from "react"
import { useRoutes } from "./providers/NavProvider"
import { Helmet } from "react-helmet"
import { FallbackLayout } from "./layouts/FallbackLayout"

/**
 * Emits all site routes
 */

export const GlowsiteRouter = () => {
    const routes = useRoutes()

    return (
        <>
            <Route path={"/docs/gbc/schema/:name"} component={TypedocItem} />
            {routes.map(({ path, title, layout, component: RouteComp }) => {
                const Layout = layout || FallbackLayout
                return (
                    <Route key={path} path={path} exact={true}>
                        <Helmet>
                            <meta charSet="utf-8" />
                            {/*** if component exported a title use it ***/}
                            {title && <title>{title}</title>}
                        </Helmet>
                        <Layout>{RouteComp && <RouteComp />}</Layout>
                    </Route>
                )
            })}
        </>
    )
}
