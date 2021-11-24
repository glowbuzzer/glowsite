import { useLocation } from "react-router-dom"
import { navContext, Node } from "../providers/NavProvider"
import { useContext } from "react"

export function useOuterNav(path: string): [Node, Node] {
    const { all } = useContext(navContext)
    // console.log("Find nav for", path, "in", all)
    const node = all.find(n => n.path === path)
    if (node?.parent?.parent?.section) {
        return [node, node.parent.parent]
    }
    return [node, node?.parent]
}

export function useRootNav() {
    const { root } = useContext(navContext)
    return root
}

export function useNav() {
    const { pathname } = useLocation()
    const { all } = useContext(navContext)
    return all.find(r => r.path === pathname)
}

export function useNavCrumbs() {
    const current = useNav()

    function ancestors(node: Node): Node[] {
        return node ? [...ancestors(node.parent), node] : []
    }

    return ancestors(current).slice(2) // remove empty root node, home and current node
}

// console.log("ALL", all)

export function useRoutes() {
    const { all } = useContext(navContext)
    // all routes are created even for paths not of type "page", because we can navigate to things like the homepage at "/"
    // and use _meta.ts to control the rendering, eg. layout component
    return all
}

export function usePages(re: RegExp, filter?: (unknown) => boolean) {
    const { all } = useContext(navContext)
    return all
        .filter(node => node.path.match(re) && (!filter || filter(node))) // filter
        .map(({ component, children, parent, ...props }) => props) // remove some props
}
