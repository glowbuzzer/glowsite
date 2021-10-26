import * as React from "react"
import {Link} from "react-router-dom"
import styled from "styled-components";
import {useEffect, useState} from "react";

export const title="GBC Schema Doc"

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
    const [groups, setGroups]=useState({})

    useEffect(() => {
        // @ts-ignore
        import("virtual:gbcschema").then(r => {
            console.log("RESULT", r.default)
            const groups = {
                Enumeration: [] as GbcSchemaItem[],
                "Type alias": [] as GbcSchemaItem[]
            }

            r.default.forEach((source) => groups[source.kindString]?.push(source))
            setGroups(groups)
        })
    }, [])

    console.log("GROUPS", groups)

    return (
        <StyledDiv>
            {Object.keys(groups).map(k => (
                <div key={k}>
                    <h2>{k}</h2>
                    <div className="group">
                        {groups[k].map(item => (
                            <div className="item" key={item.name}>
                                <Link to={item.slug}>{item.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </StyledDiv>
    )

}
