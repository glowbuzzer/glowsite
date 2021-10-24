import * as React from "react";
import {Link} from "react-router-dom";
import {Route} from "react-router";

// this avoids lots of warnings being spat out
// (React as any).useLayoutEffect = React.useEffect

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
// @ts-ignore
const pages = import.meta.globEager('./pages/*.{jsx,tsx,mdx}')

const routes: any[] = Object.keys(pages).map((path) => {
    const name = path.match(/\.\/pages\/(.*)\.(jsx|tsx|mdx)$/)[1]

    return {
        name,
        path: `/${name.toLowerCase()}`,
        component: pages[path].default,
        title: pages[path].title
    }
})

// demo of how we can put anything we like in the nav
routes.push({
    name: "Foo Bar",
    path: "/foo",
    component: () => <div>HELLO</div>
})

export function App() {
    return (
        <div>
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

            {routes.map(({path, component: RouteComp}) => {
                return (
                    <Route key={path} path={path}>
                        <RouteComp/>
                    </Route>
                )
            })}
        </div>
    )
}
