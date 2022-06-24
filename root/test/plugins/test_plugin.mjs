export function testPlugin(options) {
    return {
        name: "vite-plugin-test",
        // enforce: "pre",
        transform: (code, id) => {
            console.log("TRANSFORM", id)
        }
    }
}
