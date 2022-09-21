import { useRoutes } from "react-router"
import * as React from "react"
import { Suspense } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
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
                <HelmetProvider>
                    {/* 404 route */}
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Not Found</title>
                    </Helmet>
                    <BaseLayout>
                        <NotFound.default />
                    </BaseLayout>
                </HelmetProvider>
            )
        },
        ...nav.map(({ path, title, layout, component, ...props }) => {
            const Layout = layout || FallbackLayout
            const Component = component && React.lazy(component)
            return {
                path,
                element: (
                    <HelmetProvider>
                        <Helmet>
                            <meta charSet="utf-8" />
                            {/** if component exported a title use it **/}
                            {props.description && (
                                <meta name="description" content={props.description} />
                            )}
                            {title && <title>{title}</title>}
                        </Helmet>
                        <Layout title={title} path={path} {...props}>
                            {Component && (
                                <Suspense fallback={<Loading />}>
                                    <Component title={title} {...props} />
                                </Suspense>
                            )}
                        </Layout>
                    </HelmetProvider>
                )
            }
        }),
        {
            path: "/blogs/tag/:tag",
            element: <BlogListByTag />
        }
    ])
}
