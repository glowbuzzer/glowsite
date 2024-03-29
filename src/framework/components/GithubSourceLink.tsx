import * as React from "react"
import {GithubOutlined} from "@ant-design/icons";

type GithubSourceLinkProps = {
    project: string
    lib?: string
    path: string
}

export const GithubSourceLink = ({ project, lib, path }: GithubSourceLinkProps) => {
    const url = ["https://www.github.com/glowbuzzer", project, "blob/main", lib && "libs", lib, "src", path]
        .filter(p => p)
        .join("/")

    return <a className="markdown-link" href={url}><GithubOutlined/> Source code</a>
}
