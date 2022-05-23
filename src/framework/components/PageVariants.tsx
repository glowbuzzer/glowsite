import * as React from "react"
import { createContext, FC, useContext, useState } from "react"
import { Tabs } from "antd"
import styled from "styled-components"

type PageVariantProps = {
    variants: string[]
}

type PageVariantContextType = {
    current: string
    setCurrent(string)
}

const pageVariantContext = createContext<PageVariantContextType>(null)

export const PageVariantProvider: FC<PageVariantProps> = ({ variants, children }) => {
    const [current, setCurrent] = useState(variants[0])
    const context = { current, setCurrent }
    return <pageVariantContext.Provider value={context}>{children}</pageVariantContext.Provider>
}

const StyledTabs = styled(Tabs)`
    border: 1px solid grey;
    padding: 0 10px;

    .ant-tabs-nav {
        margin: 0 !important;
    }
`

export const PageVariantTabs = ({ children }) => {
    const context = useContext(pageVariantContext)

    function change(key) {
        context.setCurrent(key)
    }

    return (
        <StyledTabs activeKey={context.current} onChange={change}>
            {children}
        </StyledTabs>
    )
}
