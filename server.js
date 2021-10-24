// @ts-check
const fs = require('fs')
const path = require('path')
const express = require('express')
const {ServerStyleSheet} = require("styled-components");
const {renderToString} = require("react-dom/server");

/**
 * This file is based on ssr-react project in playground of vite main project. Removed the isProd code as we will never run
 * an express server in prod, it is just for dev!
 *
 * Main other change was to resolve FOUC issue using styled-components (see comments inline)
 */

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

async function createServer(
    root = process.cwd()
) {
    const resolve = (p) => path.resolve(__dirname, p)

    const app = express()

    /**
     * @type {import('vite').ViteDevServer}
     */
    const vite = await require('vite').createServer({
        root,
        logLevel: isTest ? 'error' : 'info',
        server: {
            middlewareMode: 'ssr',
            watch: {
                // During tests we edit the files too fast and sometimes chokidar
                // misses change events, so enforce polling for consistency
                usePolling: true,
                interval: 100
            }
        }
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)

    app.use('*', async (req, res) => {
        try {
            const url = req.originalUrl

            const template = await vite.transformIndexHtml(url, fs.readFileSync(resolve('index.html'), 'utf-8'))

            // entry-server.jsx provides our render method
            const render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render

            const context = {}
            // the render method returns the rendered html plus the styled-components generated stylesheet (see https://styled-components.com/docs/advanced#server-side-rendering)
            // this avoids FOUC in dev mode when page is loaded (surprisingly annoying!)
            const {html: appHtml, styles} = render(url, context)

            if (context.url) {
                // Somewhere a `<Redirect>` was rendered
                return res.redirect(301, context.url)
            }

            const html = template
                .replace(`<!--app-css-->`, styles) // replace css
                .replace(`<!--app-html-->`, appHtml) // replace body

            res.status(200).set({'Content-Type': 'text/html'}).end(html)
        } catch (e) {
            vite.ssrFixStacktrace(e)
            console.log(e.stack)
            res.status(500).end(e.stack)
        }
    })

    return {app, vite}
}

if (!isTest) {
    createServer().then(({app}) =>
        app.listen(4000, () => {
            console.log('http://localhost:4000')
        })
    )
}

// for test use
exports.createServer = createServer
