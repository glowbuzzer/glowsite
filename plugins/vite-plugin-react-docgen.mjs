import chokidar from "chokidar";
import {resolve, join} from "path"
import {stat, readdir, readFile} from "fs/promises"
import {parse} from "react-docgen"

const VIRTUAL_PREFIX = "/@react-docgen:vite-plugin-react-docgen/"

async function loadDocgen(path) {
    const results = []
    const files = await readdir(path)
    for (const f of files) {
        const next = join(path, f)
        const info = await stat(next)
        if (info.isDirectory()) {
            results.push(...await loadDocgen(next))
        } else if (next.endsWith(".tsx")) {
            const src = await readFile(next)
            try {
                const r = parse(src, null, null, {filename: next})
                results.push([next, {...r}])
            } catch (e) {
                console.error(next, e)
            }
        }
    }
    return results
}

function react_docgen(mode) {
    const modules = {
        "react-docgen:@glowbuzzer/controls":
            mode === "development"
                ? {
                    watch: "../gbr/libs/controls/src"
                }
                : {
                    result: readFile("./node_modules/@glowbuzzer/controls/component-docs.json").then(r => JSON.parse(r.toString()))
                }
    }

    return {
        name: "vite-plugin-react-docgen",
        enforce: "pre",
        configureServer({moduleGraph, ws}) {
            for (const [module, {watch}] of Object.entries(modules)) {
                if (!watch) {
                    // ie. not in development mode
                    continue
                }
                // spin up watcher
                chokidar
                    .watch(resolve(watch + "/**/*.tsx"), {
                        ignoreInitial: true
                    })
                    .on("all", () => {
                        // invalidate module on change
                        const existing_module = moduleGraph.getModuleById(VIRTUAL_PREFIX + module)
                        if (existing_module) {
                            moduleGraph.invalidateModule(existing_module)
                            if (ws) {
                                ws.send({
                                    type: "full-reload",
                                    path: "*"
                                })
                            }
                        }
                    })
            }
        },
        resolveId(id, importer) {
            if (id in modules) {
                return VIRTUAL_PREFIX + id
            }
            return null
        },
        load(id) {
            if (id.startsWith(VIRTUAL_PREFIX)) {
                const resolved = id.slice(VIRTUAL_PREFIX.length)

                console.log("Generate react-docgen for", resolved)
                if (modules[resolved].result) {
                    // result is a promise returned from dynamic import
                    return modules[resolved].result
                        .then(r => "export default " + JSON.stringify(r))
                }

                return loadDocgen(modules[resolved].watch)
                    .then(r => {
                        return "export default " + JSON.stringify(Object.fromEntries(r));
                    })
            }
            return null
        }
    }
}

export default react_docgen