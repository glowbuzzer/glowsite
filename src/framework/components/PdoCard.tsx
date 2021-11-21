import { Card } from "antd"
import styled from "@emotion/styled"

type PdoCardProps = {
    name: string
    byte_number: string
    value: string
    notes?: string
}

const StyledDiv = styled.div`
    .ant-card-head-title {
        font-size: 1.2em;
        font-weight: bold;
    }
    margin-bottom: 20px !important;
`

export const PdoCard = ({ name, byte_number, value, notes }: PdoCardProps) => (
    <StyledDiv>
        <Card size="small" title={"PDO: " + name}>
            <p>
                <b>Byte number:</b> {byte_number}
            </p>
            <p>
                <b>Value:</b> {value}
            </p>
            <p>
                <b>Notes:</b> {notes}
            </p>
        </Card>
    </StyledDiv>
)
