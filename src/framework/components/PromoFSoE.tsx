import * as React from "react"
import { Section } from "./Section"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"

const StyledDiv = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px 0;
    align-items: center;
    
    .new {
        color: ${props=>props.theme.colorSuccess};
    }
    
    .more {
        display: inline-block;
        margin-left: 10px;
        outline: 1px solid ${props=>props.theme.colorSuccess};
        padding: 2px 10px;
        font-size: 0.8em;
        cursor: pointer;
    }
`

export const PromoFSoE = () => {
    const navigate=useNavigate()

    function go() {
        navigate("/how-it-works/fsoe")
    }

    return <Section>
        <StyledDiv>
            <div className="new">New</div>
            <div className="content">Functional Safety with FSoE and BBH Safety PLC</div>
            <div className="more" onClick={go}>
                Read More
            </div>
        </StyledDiv>
    </Section>
}