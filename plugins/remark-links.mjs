import {visit} from "unist-util-visit";
import {createElement, createImport} from "./util/mdast-util.mjs";

// alias the Link component to avoid clash with existing imports in mdx files
const LOCAL_LINK_COMPONENT_NAME = "MarkdownTransformedLink";

export function remarkLinks() {
    return tree => {
        // always add an import to (aliased) Link component at top of the file (we only want one)
        const link_import = createImport("GlowsiteLink", "@glowsite", LOCAL_LINK_COMPONENT_NAME)
        tree.children.splice(0, 0, link_import)

        visit(tree, ["link"], (node, index, parent) => {
            if (node.url && !node.url.startsWith("http") && !node.url.startsWith("mailto")) {
                parent.children[index] = createElement(LOCAL_LINK_COMPONENT_NAME, {
                    to: node.url
                }, node.children)
            }
        })
    }
}
