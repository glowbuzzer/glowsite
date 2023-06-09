import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { typedocGbcSchemaFilter, useTypedocGrouped } from "../../../typedoc/typedoc-hooks"

export const title = "GBC Schema"

const StyledDiv = styled.div`
    .group {
        column-count: 3;
        column-width: 250px;
    }
`

export default function GbcSchema() {
    const groups = useTypedocGrouped(typedocGbcSchemaFilter)

    return (
        <StyledDiv>
            <h1>GBC Schema (data model)</h1>
            <p>
                This schema describes the wire data format for communication between the front-end
                application and GBC (over websockets).
            </p>
            <p>
                It is essential information if you want to communicated with GBC by creating your
                own websockets messages (not using the SoloActivity or ActivityStream helper
                components).
            </p>
            <p>It is also useful information when creating Tasks in the config.</p>

            {Object.keys(groups).map(k => (
                <div key={k}>
                    <h2>{k}</h2>
                    <div className="group">
                        {groups[k].map(item => (
                            <div className="item" key={item.name}>
                                <Link className="markdown-link" to={"/docs/types/" + item.name}>{item.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </StyledDiv>
    )
}
