/**
 * Script to update package.json using dependencies from ../gbr/package.json
 *
 * Assumes you have the gbr project alongside glowsite!
 *
 * Copyright (c) 2022. Glowbuzzer. All rights reserved
 */

import fs from "fs"

const [, , save_arg] = process.argv

const save = save_arg === "--save"

const gbr = JSON.parse(fs.readFileSync("../gbr/package.json").toString())
const local = JSON.parse(fs.readFileSync("./package.json").toString())

for (const [name, version] of Object.entries(local.dependencies)) {
    if (name.startsWith("@glowbuzzer")) {
        if (version !== gbr.version) {
            console.log("Version change for", name, "from", version, "to", gbr.version)
        }
        local.dependencies[name] = gbr.version
        continue
    }
    if (gbr.dependencies[name] && version !== gbr.dependencies[name]) {
        console.log("Version change for", name, "from", version, "to", gbr.dependencies[name])
        local.dependencies[name] = gbr.dependencies[name]
    }
}

if (save) {
    console.log("Writing package.json")
    fs.writeFileSync("./package.json", JSON.stringify(local, null, 2))
}