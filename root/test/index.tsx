import * as React from "react"
import { createRoot } from "react-dom/client"

// @ts-ignore
import docs from "react-docgen:@glowbuzzer/controls"
import {GlowbuzzerTileDefinitionList, GlowbuzzerTileDefinitions} from "@glowbuzzer/controls"

console.log("GL", GlowbuzzerTileDefinitionList)

const root = createRoot(document.getElementById("app"))

root.render(<div>SIMPLE TEST APP</div>)
