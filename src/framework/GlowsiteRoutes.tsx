import { Route, Switch } from "react-router"
import { TypedocItem } from "../typedoc/TypedocItem"
import * as React from "react"
import { Suspense } from "react"
import { useRoutes } from "./nav"
import { Helmet } from "react-helmet"
import { FallbackLayout } from "./layouts/FallbackLayout"
import * as NotFound from "../pages/404.mdx"
import { BaseLayout } from "./layouts/BaseLayout"
import { Loading } from "./components/Loading"
import { BlogListByTag } from "../pages/blogs/BlogListByTag"

/**
 * Emits all site routes
 */

export const GlowsiteRoutes = () => {
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
                            <Layout>
                                {Component && (
                                    <Suspense fallback={<Loading />}>
                                        <Component title={title} {...props} />
                                    </Suspense>
                                )}
                            </Layout>
                        </Route>
                    )
                })}
                <Route path={"/docs/gbc/schema/:name"} component={TypedocItem} />
                <Route path={"/blogs/tag/:tag"} component={BlogListByTag} />
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
