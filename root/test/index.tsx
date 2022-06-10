import * as React from "react"
import { createRoot } from "react-dom/client"

// @ts-ignore
import docs from "react-docgen:@glowbuzzer/controls"

console.log("DOCS", docs)

const root = createRoot(document.getElementById("app"))

root.render(<div>SIMPLE TEST APP</div>)
