import {Route, Switch} from "react-router"
import * as React from "react"
import {Suspense} from "react"
import {useRoutes} from "./nav"
import {Helmet} from "react-helmet"
import {FallbackLayout} from "./layouts/FallbackLayout"
import * as NotFound from "../pages/404.mdx"
import {BaseLayout} from "./layouts/BaseLayout"
import {Loading} from "./components/Loading"

/**
 * Emits all site routes
 */

export const GlowsiteRoutes = ({children}:{children?}) => {
    const routes = useRoutes()

    return (
        <>
            <Switch>
                {routes.map(({ path, title, layout, component, ...props }) => {
                    const Layout = layout || FallbackLayout
                    const Component = component && React.lazy(component)
                    return (
                        <Route key={path} path={path} exact={true}>
                            <Helmet>
                                <meta charSet="utf-8" />
                                {/*** if component exported a title use it ***/}
                                {title && <title>{title}</title>}
                            </Helmet>
                            <Layout {...props}>
                                {Component && (
                                    <Suspense fallback={<Loading />}>
                                        <Component title={title} {...props} />
                                    </Suspense>
                                )}
                            </Layout>
                        </Route>
                    )
                })}
                {children}
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
        </>
    )
}
