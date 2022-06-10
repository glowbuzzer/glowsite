// inspired by https://github.com/patak-js/vite-plugin-virtual

import {resolve} from "path"
import chokidar from "chokidar"
import {Application, TSConfigReader, TypeDocReader} from "typedoc"

const VIRTUAL_PREFIX = "/@typedoc:vite-plugin-typedoc/"

function loadTypedoc(entryPoint, tsconfig) {
    const app = new Application()
    app.options.addReader(new TypeDocReader())
    app.options.addReader(new TSConfigReader())

    app.bootstrap({
        entryPoints: [entryPoint],
        tsconfig
    })

    try {
        const project = app.convert()

        if (project) {
            return app.serializer.toObject(project)
        } else {
            console.log("No typedoc generated!")
            return {
                children: []
            }
        }
    } catch (error) {
        throw error
    }
}

function typedoc(mode) {
    // TODO: L: move module def to vite config and pass as param
    const modules = {
        "typedoc:@glowbuzzer/store":
            mode === "development"
                ? {
                    entryPoint: "../gbr/libs/store/src/index.ts",
                    tsconfig: "../gbr/tsconfig.doc.json",
                    watch: "../gbr/libs/store/src/**/*.{ts,tsx}"
                }
                : {
                    entryPoint: "./node_modules/@glowbuzzer/store/types/index.d.ts",
                    tsconfig: "./tsconfig.doc.json"
                }
    }

    return {
        name: "vite-plugin-typedoc",
        enforce: "pre",
        configureServer({moduleGraph, ws}) {
            for (const [module, {watch}] of Object.entries(modules)) {
                if (!watch) {
                    // ie. not in development mode
                    continue
                }
                // spin up watcher
                console.log("CONFIGURING PATH", watch)
                chokidar
                    .watch(resolve(watch), {
                        ignoreInitial: true
                    })
                    .on("all", () => {
                        // invalidate module on change
                        const existing_module = moduleGraph.getModuleById(VIRTUAL_PREFIX + module)
                        console.log("INVALIDATE TYPEDOC", module)
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

                console.log("Generate typedoc for", resolved)
                const {entryPoint, tsconfig} = modules[resolved]
                const typedoc = loadTypedoc(entryPoint, tsconfig)

                console.log("Typedoc complete")
                return "export default " + JSON.stringify(typedoc)
            }
            return null
        }
    }
}

export default typedoc
