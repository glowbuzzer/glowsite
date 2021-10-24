// Pre-render the app into static HTML.
// run `yarn generate` and then `dist/static` can be served as a static site.

const fs = require('fs')
const path = require('path')

const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const {render} = require('./dist/server/entry-server.js')

// determine routes to pre-render from src/pages
const routesToPrerender = fs
    .readdirSync(toAbsolute('src/pages'))
    .map((file) => {
        const name = file.replace(/\.(jsx|tsx|mdx)$/, '').toLowerCase()
        return `/${name}`
    })

;(async () => {
    // pre-render each route...
    for (const url of routesToPrerender) {
        const context = {}
        // our render method generates html and CSS
        const {html: appHtml} = await render(url, context)

        const html = template
            .replace(`<!--app-css-->`, "") // in prod this is added by vite
            .replace(`<!--app-html-->`, appHtml)

        const filePath = `dist/static${url === '/' ? '/index' : url}.html`
        fs.writeFileSync(toAbsolute(filePath), html)
        console.log('pre-rendered:', filePath)
    }
})()
