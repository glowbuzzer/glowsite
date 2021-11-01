const AntdBreaks = {
    xs: 480,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600
}

const scale = (factor: number): typeof AntdBreaks =>
    Object.fromEntries(
        Object.entries(AntdBreaks).map(([key, width]) => [key, width * factor])
    ) as typeof AntdBreaks

type ImagePreset = "fullwidth" | "body" | "col2" | "col3"

type PresetOptions = {
    [Property in ImagePreset]: typeof AntdBreaks
}

const presets: PresetOptions = {
    fullwidth: AntdBreaks,
    body: scale(0.7),
    col2: scale(0.7 * 0.5), // assumes col2 is used in body
    col3: scale(0.7 * 0.333) // assumes col3 is used in body
}

type ImageProps = {
    meta: any[]
    width?: number | string
    alt: string
    preset: ImagePreset
}

export const Image = ({ meta, width, alt, preset = "body" }: ImageProps) => {
    if (!meta?.[0]?.src) {
        console.log("Invalid image metadata: ", meta)
        return <div>INVALID META FOR IMAGE</div>
    }

    const [placeholder, ...others] = meta
    const srcset = others.map(meta => `${meta.src} ${meta.width}w`).join(", ")

    const preset_sizes = presets[preset]

    const sizes = Object.entries(AntdBreaks)
        .map(([key, width]) => `(max-width: ${width}px) ${preset_sizes[key]}px`)
        .join(", ")

    return (
        <picture>
            <source srcSet={srcset} type="image/webp" width={width} sizes={sizes} />
            <img
                src={placeholder.src}
                width={placeholder.width}
                height={placeholder.height}
                alt={alt}
            />
        </picture>
    )
}
