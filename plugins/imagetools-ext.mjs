import { metadataFormat, resolveConfigs as builtinResolveConfigs } from "imagetools-core"

// if presets not specified in vite.config.js we will use these
const defaultPresets = {
    default: { widths: [300, 800, 1200] }
}

/**
 * Imagetools plugin to handle our custom format
 *
 * @param pluginConfig Optional config containing presets property
 * @returns a function that imagetools will call to handle each image
 */
export function glowsiteImageToolsPresets(pluginConfig) {
    const presets = pluginConfig?.presets || defaultPresets

    return function (entries, outputFormats) {
        // look for 'glowsite' in the import name
        const glowsite_config = entries.find(([key]) => key === "glowsite")
        if (glowsite_config) {
            // get the preset if specified
            const [, [value]] = glowsite_config
            const preset_name = value.trim().length ? value.trim() : "default"
            // use default preset if not specified or not recognised
            const preset = presets[preset_name] || defaultPresets.default

            // spit out the widths from the preset
            const widths = preset.widths

            return widths.map(width => ({
                w: String(width),
                format: "webp"
            }))
        }
        // Fall back to builtin resolveConfigs for non-glowsite images
        return builtinResolveConfigs(entries, outputFormats)
    }
}

export function glowsiteOutputFormats(builtinOutputFormats) {
    // all this does is ensure that when we write image.png?glowsite we get the metadata back not the urls
    // (it means we don't have to write image.png?glowsite&meta all the time)
    //
    // we also filter out a lot of the redundant metadata from the json as it ends up in the bundle
    return {
        ...builtinOutputFormats,
        glowsite: () => {
            const defaultFormat = metadataFormat()
            return metadatas => {
                // just return the metadata we need (src and width for Image.tsx)
                const formatted = defaultFormat(metadatas)
                // Ensure we always have an array (defaultFormat may return single object for single image)
                const formattedArray = Array.isArray(formatted) ? formatted : [formatted]
                // Always return array of objects with src and width for Image.tsx compatibility
                return formattedArray.map(({ width, src }) => ({
                    src,
                    width
                }))
            }
        }
    }
}
