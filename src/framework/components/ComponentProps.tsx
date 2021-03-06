import * as React from "react"
import { Table } from "antd"
import styled from "styled-components"
import { Markdown } from "./Markdown"

const StyledDiv = styled.div`
    p {
        font-size: 14px;
        margin: auto;
    }

    .props-table {
        max-width: 800px;

        .prop-name {
            font-family: monospace;
        }

        .prop-type,
        .prop-default {
            .prop-cell-inner {
                font-family: monospace;
                font-size: 0.9em;
                padding: 2px 4px;
                color: #7878bf;
                border: 1px solid #7878bf;
                border-radius: 4px;
            }
        }

        .prop-type {
            white-space: nowrap;
        }
    }
`

function render_cell_inner(value) {
    return value ? <span className="prop-cell-inner">{value}</span> : null
}

export type ComponentProp = {
    key: string
    name: { name: string; required: boolean }
    type: string
    description: string
    default?: string
}

type ComponentPropsProps = {
    displayName: string
    showDefaults?: boolean
    showValues?: boolean
    properties: ComponentProp[]
}

export const ComponentProps = ({
    displayName,
    properties,
    showDefaults,
    showValues
}: ComponentPropsProps) => {
    const columns = [
        {
            title: "Property",
            dataIndex: "name",
            key: "name",
            render({ name, required }) {
                return (
                    <>
                        <span className="prop-name">{name}</span>
                        <span className="prop-required">{required && "*"}</span>
                    </>
                )
            }
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            className: "prop-type",
            render: render_cell_inner
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            className: "prop-description",
            render: value => (
                <span className="prop-cell-inner">
                    <Markdown>{value}</Markdown>
                </span>
            )
        }
    ]
    if (showDefaults) {
        columns.push({
            title: "Default",
            dataIndex: "default",
            key: "default",
            className: "prop-default",
            render: render_cell_inner
        })
    }
    if (showValues) {
        columns.push({
            title: "Value",
            dataIndex: "value",
            key: "value",
            className: "prop-description",
            render: render_cell_inner
        })
    }

    return (
        <StyledDiv>
            <h2>Properties of {displayName}</h2>
            <Table
                className="props-table"
                columns={columns}
                dataSource={properties}
                pagination={false}
                size="small"
            />
        </StyledDiv>
    )
}
