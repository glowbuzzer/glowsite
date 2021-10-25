/**
 * Scans files in src/pages and creates slugs to pre-render.
 * This is only used by build prerender script. Pages are also scanned in App.tsx using vite's import.meta.globEager for client routing
 */

import fg from "fast-glob"

const prefix = "./src/pages"
const exts = ["jsx", "tsx", "mdx"]

const entries = fg.sync(prefix + "/**/*.{jsx,tsx,mdx}")

const pages = entries.map(e => {
    const slug = e.substr(prefix.length).replace(/\.(jsx|tsx|mdx)$/, '')
    return {slug}

})

export default {
    pages
}
