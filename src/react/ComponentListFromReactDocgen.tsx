import * as React from "react"
import styled from "styled-components"
import { Table } from "antd"
import { Link } from "react-router-dom"
import { reactDocgenTileFilter, useReactDocgen } from "./react-docgen-hooks"
import { relative_path } from "../typedoc/util"
import { Markdown } from "../framework/components/Markdown"

const StyledDiv = styled.div`
    p {
        margin: 0;
    }
`

export default function ComponentListFromReactDocgen({ title, filter }) {
    const docs = useReactDocgen(filter)

    console.log("FILTERED", docs)

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: name => <Link to={relative_path(name)}>{name}</Link>
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: description => <Markdown>{description}</Markdown>
        }
    ]

    const data = docs
        .map(({ displayName: name, description }) => ({
            key: name,
            name,
            description: description.split("\n").shift(1)
        }))
        .sort((a, b) => a.name.localeCompare(b.name))

    return (
        <StyledDiv>
            <h1>{title}</h1>
            <Table dataSource={data} columns={columns} pagination={false} />
        </StyledDiv>
    )
}
