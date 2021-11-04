import mdx from "@mdx-js/rollup"

// wrap the mdx rollup plugin so we can catch errors and report the mdx file that caused it
export function mdxWrapper(options) {
    const { transform, ...rest } = mdx(options)

    return {
        ...rest,
        transform: async (code, id) => {
            try {
                return await transform(code, id)
            } catch (e) {
                console.log("Error transforming:", id, e)
                return transform("# MDX transform failed\n\nSee process console log for details", id)
            }
        }
    }
}
