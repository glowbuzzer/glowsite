// const PREFIX = "@vite-plugin-virtual:";

const virtualFileId = '@my-virtual-file'

export default function VitePluginVirtual(resolvers) {
    // console.log("RESOLVERS", resolvers)
    // if ( !resolvers ) {
    //     resolvers={}
    // }

    return {
        name: "vite-test",
        resolveId(id) {
            console.log("RESOLVE", id)
            if ( id === virtualFileId ) {
                return virtualFileId
            }
        },
        load(id) {
            if ( id === virtualFileId ) {
                console.log("LOAD", id)
                return "export default msg='Hello'"
            }
            // if (id.startsWith(PREFIX)) {
            //     const [resolver, arg] = id.substr(PREFIX.length)
            //     const result = resolvers[resolver](arg)
            //     if (typeof result === "object") {
            //         return `export default value=${JSON.stringify(result)}`
            //     }
            // }


            // console.log("LOAD ID", id)
            // if (id === "@__glowbuzzer") {
            //     return `export const msg="This is from virtual file!!"`
            // }
        }
    }
}
