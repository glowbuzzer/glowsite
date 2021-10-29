/**
 * Globs everything under src/pages and provides access to nav data for rest of app
 *
 * Note that the pre-render script also does a simple glob to discover flat list of urls to render
 *
 * Excuse horrible munging but we need to reconstruct full tree from sparse file glob results!
 *
 */

import { createContext, FC } from "react"

// @ts-ignore because globEager is not defined
const imports = import.meta.globEager("../../pages/**/*.{jsx,tsx,md,mdx,ts}")

// console.log("IMPORTS", imports)

export type Node = {
    parent?: Node
    slug: string
    path: string
    title: string
    children: Node[]
    [key: string]: any
}

const sortFn = (...args) => {
    const [asort, bsort] = args.map(a => a.sort || 1000000)
    if (asort !== bsort) {
        // sort provided by at least one page so use it
        return asort - bsort
    }
    // sort by title
    const [atitle, btitle] = args.map(a => a.title || a.path)
    return atitle.localeCompare(btitle)
}

function* walk(node: Node): IterableIterator<Node> {
    yield node
    for (const child of node.children) {
        yield* walk(child)
    }
}

const root = Object.entries<any>(imports)
    // we want sort by paths
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce(
        (r, [fullPath, page]) => {
            const [, dirPath, ext] = fullPath.match(/\.\/pages(.*)\.(jsx|tsx|md|mdx|ts)$/)

            const path = dirPath.split("/")
            if (ext === "ts") {
                path.pop()
            }

            // console.log("PROCESS", path.join("#"))

            const level = path.length

            const { default: component, title, ...props } = page

            function add(parent: Node, slug: string, level_attach) {
                // switch (ext) {
                //     case "ts":
                //         Object.assign(parent, { ...page, path: "/" + path.slice(0, -1).join("/") })
                //         console.log("PARENT AFTER MERGE", parent)
                //         return parent
                //     default:
                const common_props = {
                    ...parent,
                    parent,
                    slug,
                    level: level_attach + 1,
                    path: level_attach === 0 ? "/" : path.slice(0, level_attach + 1).join("/"),
                    children: []
                }
                // if (level_attach === level - 1) {
                //     console.log("Create node with parent layout", common_props)
                // } else {
                //     console.log("MISSING LEVEL", level, level_attach, parent)
                // }
                // console.log("LEVELS", level_attach, level)
                const node =
                    level_attach === level - 1
                        ? {
                              ...common_props,
                              ...props,
                              title: title || slug,
                              component
                          }
                        : {
                              ...common_props,
                              title: slug
                          }

                parent.children.push(node)
                // console.log("ADD", node, "AT", slug, "TO", { ...parent })
                return node
                // }
            }

            path.reduce((q, slug, level) => {
                // console.log("find slug", slug)
                return q.children.find(o => o.slug === slug) || add(q, slug, level)
            }, r)
            return r
        },
        { path: "", children: [] } as Node
    ).children[0]

// console.log("ROOT", root)
const all = Array.from(walk(root))

for (const node of all) {
    node.children.sort(sortFn)
}

type NavContextType = {}

const navContext = createContext<NavContextType>(null)

export const NavProvider: FC = ({ children }) => {
    return <navContext.Provider value={{}}>{children}</navContext.Provider>
}

export function useOuterNav(path: string): [Node, Node] {
    // console.log("Find nav for", path, "in", all)
    const node = all.find(n => n.path === path)
    if (node.parent.parent.section) {
        return [node, node.parent.parent]
    }
    return [node, node.parent]
}

export function useRootNav() {
    return root
}

// console.log("ALL", all)

export function useRoutes() {
    // all routes are created even for paths not of type "page", because we can navigate to things like the homepage at "/"
    // and use _meta.ts to control the rendering, eg. layout component
    return all
}
