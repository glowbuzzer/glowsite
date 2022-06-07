import * as React from "react"
import styled from "styled-components"

const StyledReadingTime = styled.div`
    font-size: 0.7em;
    text-align: right;
`

export const ReadingTime = ({ time }) => {
    return (
        <StyledReadingTime>
            <p>Reading time: {time} minutes</p>
        </StyledReadingTime>
    )
}
