import * as React from "react"
import { Image } from "./Image"

export const TitleImage = props => (
    <div style={{ width: 300, float: "right", margin: "0 10px 0 20px" }}>
        <Image meta={props.image} alt={props.alt} />
    </div>
)
