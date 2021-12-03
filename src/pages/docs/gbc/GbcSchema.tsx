import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

export const title = "GBC Schema"

const StyledDiv = styled.div`
    .group {
        column-count: 4;
        column-width: 250px;
    }
`

type GbcSchemaItem = {
    kindString: string
    name: string
    slug: string
}

export default function GbcSchema() {
    const [groups, setGroups] = useState({})

    useEffect(() => {
        // @ts-ignore
        import("virtual:gbcschema").then(r => {
            console.log("RESULT", r.default)
            const groups = {
                Enumeration: [] as GbcSchemaItem[],
                "Type alias": [] as GbcSchemaItem[]
            }

            r.default.forEach(source => groups[source.kindString]?.push(source))
            setGroups(groups)
        })
    }, [])

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
                                <Link to={"/docs/gbc/schema/" + item.name}>{item.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </StyledDiv>
    )
}
