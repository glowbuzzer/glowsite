/**
 * Super simple static file server that mimics what cloudfront will do
 */
const express = require('express')
const app = express()
app.use(express.static('dist/static'))
app.listen(5000, () => {
    console.log('http://localhost:5000')
})
