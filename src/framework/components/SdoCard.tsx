import { Card, Avatar } from "antd"
import styled from "styled-components"

import { ReactComponent as SdoIcon } from "./images/sdo_icon.svg?inline"
const { Meta } = Card

type SdoCardProps = {
    name: string
    index: string
    subindex: string
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

export const SdoCard = ({ name, index, subindex, value, notes }: SdoCardProps) => (
    <StyledDiv>
        <Card size="small" bodyStyle={{ paddingLeft: "50px" }}>
            <Meta avatar={<Avatar icon={<SdoIcon />} size={"large"} />} title={name} />
            <p />
            <p>
                <b>Index:</b> {index}
            </p>
            <p>
                <b>Sub-index:</b> {subindex}
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
