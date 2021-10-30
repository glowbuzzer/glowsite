const defaultPresets = {
    default: {widths: [300, 800, 1200]}
}

export function glowsiteImageToolsPresets(pluginConfig) {
    const presets = pluginConfig?.presets || defaultPresets

    return function (config) {
        const glowsite_config = config.find(([key]) => key === "glowsite")
        if (glowsite_config) {
            const [, [value]] = glowsite_config
            const preset_name = value.trim().length ? value.trim() : "default"
            const preset = presets[preset_name] || defaultPresets.default
            const widths = preset.widths

            return widths.map(width => ({
                width,
                webp: ""
            }))
        }
    }
}
