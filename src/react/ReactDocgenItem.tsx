import * as React from "react"
import { useReactDocgenItem } from "./react-docgen-hooks"
import { Markdown } from "../framework/components/Markdown"

export default ({ title, filter }) => {
    const name = title
    const item = useReactDocgenItem(name)

    if (!item) {
        console.log("NOT FOUND", name)
        return null
    }

    console.log(item)

    return (
        <>
            <h1>{name}</h1>
            <Markdown>{item.description}</Markdown>
        </>
    )
}
