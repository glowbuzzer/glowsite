function polarToCartesian(cx, cy, r, angle) {
    const rad = ((angle - 90) * Math.PI) / 180
    return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad)
    }
}

function arcArrowPath(cx, cy, innerR, outerR, startAngle, endAngle) {
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    const midR = (innerR + outerR) / 2
    const arrowAngleStart = startAngle + 10
    const arrowAngleEnd = endAngle + 10

    const outerStart = polarToCartesian(cx, cy, outerR, startAngle)
    const outerEnd = polarToCartesian(cx, cy, outerR, endAngle)
    const innerEnd = polarToCartesian(cx, cy, innerR, endAngle)
    const arrowStart = polarToCartesian(cx, cy, midR, arrowAngleStart)
    const arrowEnd = polarToCartesian(cx, cy, midR, arrowAngleEnd)
    const innerStart = polarToCartesian(cx, cy, innerR, startAngle)

    return [
        "M",
        outerStart.x,
        outerStart.y,
        "A",
        outerR,
        outerR,
        0,
        largeArc,
        1,
        outerEnd.x,
        outerEnd.y,
        "L",
        arrowEnd.x,
        arrowEnd.y,
        "L",
        innerEnd.x,
        innerEnd.y,
        "A",
        innerR,
        innerR,
        0,
        largeArc,
        0,
        innerStart.x,
        innerStart.y,
        "L",
        arrowStart.x,
        arrowStart.y,
        "Z"
    ].join(" ")
}

const pastelColors = [
    "#ff99aa",
    "#88e2ec",
    "#ffe066",
    "#a9e88d",
    "#c29fff",
    "#f7a07c",
    "#bde26a",
    "#ffc266"
]

const describeLabelArc = (cx, cy, r, startAngle, endAngle, id) => {
    const start = polarToCartesian(cx, cy, r, startAngle)
    const end = polarToCartesian(cx, cy, r, endAngle)
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    return (
        <path
            id={`label-arc-${id}`}
            d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`}
            fill="none"
            stroke="none"
        />
    )
}

export const CycleDiagram = ({
    segments = 5,
    labels = ["Design", "Develop", "Test", "Deploy", "Support"],
    width = 300,
    height = 300,
    outerRadius = 150,
    innerRadius = 90
}) => {
    const cx = width / 2
    const cy = height / 2
    const angleStep = 360 / segments
    const textRadius = (outerRadius + innerRadius) * 0.475

    return (
        <svg width={width} height={height}>
            {Array.from({ length: segments }).map((_, i) => {
                const startAngle = i * angleStep
                const endAngle = startAngle + angleStep
                const midAngle = (startAngle + endAngle) / 2

                return (
                    <g key={i}>
                        <path
                            d={arcArrowPath(cx, cy, innerRadius, outerRadius, startAngle, endAngle)}
                            className="cycle-segment"
                            fill={pastelColors[i % pastelColors.length]}
                            stroke="none"
                        />
                        {describeLabelArc(cx, cy, textRadius, startAngle, endAngle, i)}
                        <text className="cycle-label" fontSize="20">
                            <textPath
                                href={`#label-arc-${i}`}
                                startOffset="55%"
                                textAnchor="middle"
                            >
                                {labels[i] || ""}
                            </textPath>
                        </text>
                    </g>
                )
            })}
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="20">
                <tspan x={cx} dy="-6px">
                    glowbuzzer
                </tspan>
                <tspan x={cx} dy="22px">
                    Lifecycle
                </tspan>
            </text>
        </svg>
    )
}
