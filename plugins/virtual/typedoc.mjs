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
            return {}
        }
    } catch (error) {
        throw error
    }
}
