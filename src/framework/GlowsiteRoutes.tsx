import { useRoutes } from "react-router"
import * as React from "react"
import { Suspense } from "react"
import { Helmet } from "react-helmet"
import { FallbackLayout } from "./layouts/FallbackLayout"
import * as NotFound from "../pages/404.mdx"
import { BaseLayout } from "./layouts/BaseLayout"
import { Loading } from "./components/Loading"
import { BlogListByTag } from "../pages/blogs/BlogListByTag"
import { useGlowsiteRoutes } from "./nav"

/**
 * Emits all site routes
 */

export const GlowsiteRoutes = () => {
    const nav = useGlowsiteRoutes()

    return useRoutes([
        {
            path: "*",
            element: (
                <>
                    {/* 404 route */}
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Not Found</title>
                    </Helmet>
                    <BaseLayout>
                        <NotFound.default />
                    </BaseLayout>
                </>
            )
        },
        ...nav.map(({ path, title, layout, component, ...props }) => {
            const Layout = layout || FallbackLayout
            const Component = component && React.lazy(component)
            return {
                path,
                element: (
                    <>
                        <Helmet>
                            <meta charSet="utf-8" />
                            {/** if component exported a title use it **/}
                            {title && <title>{title}</title>}
                        </Helmet>
                        <Layout {...props}>
                            {Component && (
                                <Suspense fallback={<Loading />}>
                                    <Component title={title} {...props} />
                                </Suspense>
                            )}
                        </Layout>
                    </>
                )
            }
        }),
        {
            path: "/blogs/tag/:tag",
            element: <BlogListByTag />
        }
    ])
}
