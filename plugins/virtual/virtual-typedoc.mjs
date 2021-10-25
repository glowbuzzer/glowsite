/**
 * Uses typedoc lib to produce json metadata from a given typescript file (ie. gbc.ts)
 *
 * This is then passed to vite-plugin-virtual to expose to client code (see vite.config.mjs)
 */
import {Application, TSConfigReader, TypeDocReader} from "typedoc"

export default function loadTypedoc(entryPoint, tsconfig = "tsconfig.doc.json") {
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
