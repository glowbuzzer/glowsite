// Pre-render the app into static HTML.
// run `yarn generate` and then `dist/static` can be served as a static site.

import fs from "fs"
import path from "path"
import {render} from "./dist/server/_render.js"

import * as slugs from "./plugins/data/index.mjs"

const toAbsolute = (p) => path.resolve(process.cwd(), p)

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')

const routesToPrerender = Object.keys(slugs)
    .flatMap(s => slugs[s].default.pages)
    .map(p => p.slug)

// // determine routes to pre-render from src/pages
// const routesToPrerender = fs
//     .readdirSync(toAbsolute('src/pages'))
//     .map((file) => {
//         const name = file.replace(/\.(jsx|tsx|mdx)$/, '').toLowerCase()
//         return `/${name}`
//     })

routesToPrerender.push("/")

;(async () => {
    // pre-render each route...
    for (const url of routesToPrerender) {
        // our render method generates html and CSS
        const {html: appHtml, /*styles, */helmetData} = await render(url, {})

        const html = template
            .replace(`<!--app-title-->`, helmetData.title || "glowbuzzer") // TODO: externalise default title
            .replace(`<!--app-css-->`, "")
            .replace(`<!--app-html-->`, appHtml)

        const filePath = `dist/static${url === '/' ? '/index' : (url.toLowerCase() + "/index")}.html`

        const dir = path.dirname(filePath)
        fs.mkdirSync(dir, {recursive: true})
        fs.writeFileSync(toAbsolute(filePath), html)

        console.log('pre-rendered:', filePath)
    }
})()
