import * as React from "react"
import {useGbcSchema} from "../hooks/typedoc";
import {Link} from "react-router-dom"
import styled from "styled-components/macro";

export const title="GBC Schema Doc"

const StyledDiv = styled.div`
    .group {
        column-count: 4;
        column-width: 250px;
    }
`

export default function GbcSchema() {
    const groups = useGbcSchema()

    return (
        <StyledDiv>
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
