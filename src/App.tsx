import * as React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import {Route} from "react-router";
import {TypedocItem} from "./typedoc/TypedocItem";
import {Helmet} from "react-helmet";

import "antd/dist/antd.css"

// this avoids lots of warnings being spat out
// TODO: put back in? seemed to be an issue with some antd components - tbd
// (React as any).useLayoutEffect = React.useEffect

// auto generate routes from files under ./pages. See also plugins/data/data-pages.js for pre-render behaviour
// @ts-ignore
const pages = import.meta.globEager('./pages/**/*.{jsx,tsx,mdx}')

// convert imported modules to route metadata
const routes: any[] = Object.keys(pages).map((path) => {
    const name = path.match(/\.\/pages\/(.*)\.(jsx|tsx|mdx)$/)[1]

    // console.log(pages[path])

    return {
        name,
        path: `/${name.toLowerCase()}`,
        component: pages[path].default,
        title: pages[path].title // this can be exported by the tsx/mdx file
    }
})

export function App() {
    return (
        <div>
            <Helmet>
                {/* default title if not set by page */}
                <title>Glowbuzzer</title>
            </Helmet>
            <nav>
                <ul>
                    {routes.map(({name, title, path}) => {
                        return (
                            <li key={path}>
                                <Link to={path}>{title || name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <Route path={"/docs/gbc/schema/:name"} component={TypedocItem}/>
            {routes.map(({path, title, component: RouteComp}) => {
                return (
                    <Route key={path} path={path}>
                        <Helmet>
                            <meta charSet="utf-8" />
                            {/*** if component exported a title use it ***/}
                            {title && <title>{title}</title>}
                        </Helmet>
                        <RouteComp/>
                    </Route>
                )
            })}
        </div>
    )
}
