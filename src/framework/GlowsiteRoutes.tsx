import { Route, Switch } from "react-router"
import { TypedocItem } from "../typedoc/TypedocItem"
import * as React from "react"
import { Suspense, useEffect, useState } from "react"
import { useRoutes } from "./nav"
import { Helmet } from "react-helmet"
import { FallbackLayout } from "./layouts/FallbackLayout"
import * as NotFound from "../pages/404.mdx"
import { BaseLayout } from "./layouts/BaseLayout"
import { Spin } from "antd"
import styled from "@emotion/styled"

const StyledSpin = styled(Spin)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    height: 100%;
    text-align: center;
`

const Loading = () => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    return show ? <StyledSpin size="large" /> : null
}

/**
 * Emits all site routes
 */

export const GlowsiteRoutes = () => {
    const routes = useRoutes()

    console.log("ROUTES", routes)

    return (
        <>
            <Switch>
                {routes.map(({ path, title, layout, component }) => {
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
                                        <Component />
                                    </Suspense>
                                )}
                            </Layout>
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
        </>
    )
}
