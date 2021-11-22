import {Avatar, Card} from "antd"
import styled from "@emotion/styled"

import { ReactComponent as PdoIcon } from "./images/pdo_icon.svg?inline"
const { Meta } = Card

type PdoCardProps = {
    name: string
    byte_number: string
    value: string
    notes?: string
}

const StyledDiv = styled.div`
    .ant-card-meta-title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: 1.4em;
        font-weight: bold;
        align-items: center;
    }
    margin-bottom: 20px !important;
`

export const PdoCard = ({ name, byte_number, value, notes }: PdoCardProps) => (
    <StyledDiv>
        <Card size="small" bodyStyle={{ paddingLeft: "50px" }}>
            <Meta avatar={<Avatar icon={<PdoIcon />} size={"large"} />} title={name} />
            <p />
            <p>
                <b>Index:</b> {byte_number}
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
