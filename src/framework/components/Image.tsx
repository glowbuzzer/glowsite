// const AntdBreaks = {
//     xs: 480,
//     sm: 576,
//     md: 768,
//     lg: 992,
//     xl: 1200,
//     xxl: 1600
// }

// const scale = (factor: number): typeof AntdBreaks =>
//     Object.fromEntries(
//         Object.entries(AntdBreaks).map(([key, width]) => [key, width * factor])
//     ) as typeof AntdBreaks

type ImagePreset = "wide" | "narrow" | "default"

type PresetOptions = {
    [Property in ImagePreset]: number
}

const presets: PresetOptions = {
    default: 1.4,
    wide: 1,
    narrow: 1.4 * 2
}

type ImageProps = {
    meta: any[]
    maxWidth?: number
    alt: string
    preset?: ImagePreset
}

export const Image = ({ meta, maxWidth, alt, preset = "default" }: ImageProps) => {
    if (!meta?.[0]?.src) {
        console.log("Invalid image metadata: ", meta)
        return <div>INVALID META FOR IMAGE</div>
    }

    const srcset = meta.map(m => `${m.src} ${Math.round(m.width * presets[preset])}w`).join(", ")

    return (
        // <picture>
        //     <source srcSet={srcset} type="image/webp" width={maxWidth || "100%"} />
            <img srcSet={srcset} width={maxWidth || "100%"} alt={alt} />
        // </picture>
    )
}
