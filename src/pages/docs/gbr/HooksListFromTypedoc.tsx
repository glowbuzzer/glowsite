import * as React from "react"
import styled from "styled-components"
import { Table } from "antd"
import { Link } from "react-router-dom"
import { typedocHookFilter, useTypedoc } from "../../../typedoc/typedoc-hooks"
import Synopsis from "./hooks.mdx"
import { relative_path } from "../../../typedoc/util"

const StyledDiv = styled.div``

export default function HooksListFromTypedoc() {
    const hooks = useTypedoc(typedocHookFilter)

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: name => <Link to={relative_path("hooks/"+name)}>{name}</Link>
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        }
    ]

    const data = hooks
        .map(({ name, signatures }) => ({
            key: name,
            name,
            description: signatures?.[0].comment?.shortText
        }))
        .sort((a, b) => a.name.localeCompare(b.name))

    return (
        <StyledDiv>
            <h1>List of GBR Hooks</h1>

            <Synopsis />

            <Table dataSource={data} columns={columns} pagination={false} />

            {/*
            {hooks.map(hook => {
                return (
                    <div key={hook.name}>
                        <h2>{hook.name}</h2>
                        <pre>{JSON.stringify(hook, null, 2)}</pre>
                    </div>
                )
            })}
*/}
        </StyledDiv>
    )
}
