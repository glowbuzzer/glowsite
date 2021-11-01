import {metadataFormat} from "imagetools-core";

// if presets not specified in vite.config.js we will use these
const defaultPresets = {
    default: {widths: [300, 800, 1200]}
}

/**
 * Imagetools plugin to handle our custom format
 *
 * @param pluginConfig Optional config containing presets property
 * @returns a function that imagetools will call to handle each image
 */
export function glowsiteImageToolsPresets(pluginConfig) {
    const presets = pluginConfig?.presets || defaultPresets

    return function (config) {
        // look for 'glowsite' in the import name
        const glowsite_config = config.find(([key]) => key === "glowsite")
        if (glowsite_config) {
            // get the preset if specified
            const [, [value]] = glowsite_config
            const preset_name = value.trim().length ? value.trim() : "default"
            // use default preset if not specified or not recognised
            const preset = presets[preset_name] || defaultPresets.default

            // spit out the widths from the preset
            const widths = preset.widths
            const custom = widths.map((width, index) => ({
                width,
                webp: index === 0 ? undefined : "", // the first width is expected to be the placeholder, so we don't webp it
                // glowsite: [""] // ensure metadata is returned
            }));
            return custom
        }
    }
}

export function glowsiteOutputFormats(builtinOutputFormats) {
    // all this does is ensure that when we write image.png?glowsite we get the metadata back not the urls
    // (it means we don't have to write image.png?glowsite&meta all the time)
    //
    // we also filter out a lot of the redundant metadata from the json as it ends up in the bundle
    return {
        ...builtinOutputFormats, glowsite: () => {
            const defaultFormat = metadataFormat()
            return (metadatas) => {
                // just return the metadata we need
                return defaultFormat(metadatas).map(({format, width, height, src}) => ({format, width, height, src}))
            }
        }
    }
}
