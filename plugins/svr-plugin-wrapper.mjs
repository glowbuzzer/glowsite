import svgr from "@svgr/rollup"

// intercept the svgr wrapper because we only want it to handle svgs with the 'inline' query param
export function svgWrapper(options) {
    const { transform, ...rest } = svgr.default(options)

    return {
        ...rest,
        transform: (code, id) => {
            if (id.endsWith(".svg?inline")) {
                const path = id.substr(0, id.length - 7)
                return transform(code, path)
            }
        }
    }
}
