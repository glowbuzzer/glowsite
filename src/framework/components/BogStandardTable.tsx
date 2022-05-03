import styled from "styled-components"
import { Row, Col } from "antd"
import { ColProps as AntColProps } from "antd/lib/col/index"
import { RowProps as AntRowProps } from "antd/lib/row/index"

import Tooltip from "antd/lib/tooltip"

export const StandardHeaderRowStyled = styled(Row)`
    background: #efdbff;
    font-weight: bold;
    margin-top: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 5px;
    padding-right: 5px;
`
export const StandardRowStyled = styled(Row)`
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
`

export const ColStyled = styled(Col)``

export type ColProps = AntColProps & {
    tooltipTitle?: React.ReactNode
}

export type RowProps = AntRowProps & {
    tooltipTitle?: React.ReactNode
}

export const BogStandardCol = ({ tooltipTitle, ...props }: ColProps) => {
    const col = <ColStyled {...props} />
    if (tooltipTitle) {
        return <Tooltip title={tooltipTitle}>{col}</Tooltip>
    }
    return col
}

export const BogStandardRow = ({ tooltipTitle, ...props }: RowProps) => {
    const standardRow = <StandardRowStyled {...props} />
    if (tooltipTitle) {
        return <Tooltip title={tooltipTitle}>{standardRow}</Tooltip>
    }
    return standardRow
}

export const BogStandardHeaderRow = ({ tooltipTitle, ...props }: RowProps) => {
    const standardHeaderRow = <StandardHeaderRowStyled {...props} />
    if (tooltipTitle) {
        return <Tooltip title={tooltipTitle}>{standardHeaderRow}</Tooltip>
    }
    return standardHeaderRow
}
