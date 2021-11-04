import { Route, Switch } from "react-router"
import { TypedocItem } from "../typedoc/TypedocItem"
import * as React from "react"
import { useRoutes } from "./providers/NavProvider"
import { Helmet } from "react-helmet"
import { FallbackLayout } from "./layouts/FallbackLayout"
import * as NotFound from "../pages/404.mdx"
import { BaseLayout } from "./layouts/BaseLayout"

/**
 * Emits all site routes
 */

export const GlowsiteRouter = () => {
    const routes = useRoutes()

    return (
        <Switch>
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
            <Route path={"/docs/gbc/schema/:name"} component={TypedocItem} />
            <Route>
                {/* 404 route */}
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Not Found</title>
                </Helmet>
                <BaseLayout>
                    <NotFound.default />
                </BaseLayout>
            </Route>
        </Switch>
    )
}
