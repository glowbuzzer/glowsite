import crypto from "crypto"
import path from "path"
import fs from "fs"

/**
 * Util function that creates cache dir on instantiation and then returns a function that can be used
 * to look up in cache based on hash of source content and perform (optional) transformation before
 * putting result to the cache.
 *
 * @param name Name passed to crypto
 * @param location Cache directory (created automatically)
 * @param extension Appended to cached files
 * @returns function To be used when doing cache lookups
 */
export function createCache(name, location, extension) {
    fs.mkdirSync(location, {recursive: true})

    return async (source, sourcePath, transformer) => {
        const unique = crypto.createHmac("sha1", name).update(source).digest("hex")

        const sourceFilename = path.parse(sourcePath).name
        const outputFilename = `${sourceFilename}-${unique}.${extension}`
        const outputPath = path.join(location, outputFilename)

        if (!fs.existsSync(outputPath)) {
            // Transform (if provided) and write out the result
            const data = transformer ? await transformer(source) : source
            await fs.promises.writeFile(outputPath, data)
        }

        const relative = path.relative(sourcePath, outputPath).replace(/\\/g, "/").substr(3)

        return {outputPath, relative, unique}
    }
}
