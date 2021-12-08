import * as React from "react"
import styled from "styled-components"
import { Table } from "antd"
import { Link } from "react-router-dom"
import { typedocHookFilter, useTypedoc } from "../../../typedoc/typedoc-hooks"

const StyledDiv = styled.div``

export default function HooksTypedoc() {
    const hooks = useTypedoc(typedocHookFilter)

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: name => <Link to={"./hooks/"+name}>{name}</Link>
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        }
    ]

    const data = hooks
        .map(({ name, signatures }) => ({
            name,
            description: signatures?.[0].comment?.shortText
        }))
        .sort((a, b) => a.name.localeCompare(b.name))

    return (
        <StyledDiv>
            <h1>GBR Hooks</h1>
            <p>Hooks in React let you use state and other React features without writing a class.</p>

            <p>This is pretty handy in machine control applications where many of your (and the components in &gbr) are stateful.</p>

            <Table dataSource={data} columns={columns} pagination={false} />

            {hooks.map(hook => {
                return (
                    <div key={hook.name}>
                        <h2>{hook.name}</h2>
                        <pre>{JSON.stringify(hook, null, 2)}</pre>
                    </div>
                )
            })}
        </StyledDiv>
    )
}
