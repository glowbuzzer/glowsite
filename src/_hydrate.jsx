/**
 * This is only used during the static site build/generate
 */

import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {App} from './App'

import "antd/dist/antd.css"

ReactDOM.hydrate(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('app')
)
