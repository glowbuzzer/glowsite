import fs from 'fs'
import svgr from "@svgr/core"
import esbuild from "esbuild"

export function glowsiteSvgrPlugin() {
    return {
        name: 'vite:gb:svgr',
        async transform(code, id) {
            if (id.endsWith('.svg?inline')) {
                const path = id.substr(0, id.length - 7);
                const svg = await fs.promises.readFile(path, 'utf8')

                const componentCode = await svgr.default(
                    svg,
                    {},
                    {componentName: 'ReactComponent'}
                ).then((res) => {
                    return res.replace(
                        'export default ReactComponent',
                        `export { ReactComponent }`
                    )
                })

                const res = await esbuild.transform(componentCode + '\n' + code, {
                    loader: 'jsx',
                })

                return {
                    code: res.code,
                    map: null
                }
            }
        },
    }
}
