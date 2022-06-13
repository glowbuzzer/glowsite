import { useLocation } from "react-router-dom"
import { navContext, Node } from "../providers/NavProvider"
import { useContext } from "react"

export function useOuterNav(path: string): [Node, Node] {
    const { all } = useContext(navContext)
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

export function useNavNode(location: string) {
    const { all } = useContext(navContext)
    return all.find(r => r.path === location)
}

export function useNavBySlug(slug: string, backup: string) {
    const { all } = useContext(navContext)
    return all.find(r => r.slug === slug) || all.find(r => r.path === backup)
}

export function useNavTaggedNodes(tag: string) {
    const { all } = useContext(navContext)
    return all.filter(r => r.tags?.includes(tag))
}

export function useNavCrumbs() {
    const { pathname } = useLocation()
    const current = useNavNode(pathname)

    function ancestors(node: Node): Node[] {
        return node ? [...ancestors(node.parent), node] : []
    }

    return ancestors(current).slice(2) // remove empty root node, home and current node
}

export function useRoutes() {
    const { all } = useContext(navContext)
    // all routes are created even for paths not of type "page", because we can navigate to things like the homepage at "/"
    // and use _meta.ts to control the rendering, eg. layout component
    return all
}
