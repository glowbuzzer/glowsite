/**
 * Used by dev server and when generating static site
 */

import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {App} from './App'
// import {ServerStyleSheet} from "styled-components";
import {Helmet} from "react-helmet";

// we use styled-components magic to avoid FOUC in dev mode (see server.js for more info)
// const sheet = new ServerStyleSheet()

export function render(url, context) {
    const html = ReactDOMServer.renderToString(
        // sheet.collectStyles(
            <StaticRouter location={url} context={context}>
                <App/>
            </StaticRouter>
        // )
    );
    const helmet = Helmet.renderStatic();
    // map over helmet keys and exec the toString method into new map
    const helmetData = Object.fromEntries(Object.entries(helmet).map(([k, v]) => [k, v.toString()]));

    return {html, /*styles: sheet.getStyleTags(), */helmetData}
}
