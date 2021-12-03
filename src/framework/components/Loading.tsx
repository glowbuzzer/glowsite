import styled from "styled-components"
import { Spin } from "antd"
import * as React from "react"
import { useEffect, useState } from "react"

const StyledSpin = styled(Spin)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    height: 100%;
    text-align: center;
`
export const Loading = () => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    return show ? <StyledSpin size="large" /> : null
}
