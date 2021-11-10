import * as React from "react"

import { Tag } from "antd"
import styled from "@emotion/styled"

const StyledPageTag = styled.div``

let tagColors: string[] = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple"
]

export const PageTag = ({ tags }) => {
    return (
        <StyledPageTag>
            {tags.map(
                (tag, index) =>
                    index <= 10 && (
                        <Tag key={index} color={tagColors[index]}>
                            {" "}
                            {tag}
                        </Tag>
                    )
            )}
        </StyledPageTag>
    )
}
