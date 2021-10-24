import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {App} from './App'
import {ServerStyleSheet} from "styled-components";

// we use styled-components magic to avoid FOUC in dev mode (see server.js for more info)
const sheet = new ServerStyleSheet()

export function render(url, context) {
    const html = ReactDOMServer.renderToString(
        sheet.collectStyles(
            <StaticRouter location={url} context={context}>
                <App/>
            </StaticRouter>
        )
    );
    return {html, styles: sheet.getStyleTags()}
}
