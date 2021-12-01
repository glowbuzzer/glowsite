import * as React from "react"
import { Section } from "../framework/components/Section"
import { Table } from "antd"
import {DownloadOutlined} from "@ant-design/icons";

type File = {
    name: string
    description: string
    type: string
    size: number
    checksum: string
}

type Release = {
    tag: string
    description: string
    files?: Partial<File>[]
}

type Project = {
    name: string
    github?: string // main project in github
    base?: string // base for downloads
    defaultFiles?: Partial<File>[]
    releases: Release[]
}

const projects: Project[] = [
    {
        name: "Glowbuzzer for React",
        github: "gbr",
        releases: [
            {
                tag: "0.0.1-alpha-1",
                description: "First release of React libs"
            }
        ]
    },
    {
        name: "Glowbuzzer Control",
        base: "gbc",
        defaultFiles: [
            {
                name: "gbc-linux",
                description: "Glowbuzzer for Linux amd64",
                type: "tgz"
            }
        ],
        releases: [
            {
                tag: "0.0.1-alpha-1",
                description: "First release of the Glowbuzzer Control",
                files: [
                    {
                        name: "gbc-linux",
                        size: 12345,
                        checksum: "123abc456def"
                    }
                ]
            }
        ]
    }
]

export default () => {
    function make_table(project: Project, release: Release) {
        return release.files
            .map(file => ({
                ...project.defaultFiles.find(f => f.name === file.name),
                ...file
            }))
            .map((file: File) => ({
                key: file.name,
                name: file.name,
                description: file.description,
                type: file.type,
                size: file.size,
                checksum: file.checksum,
                link: <a href={`https://downloads.glowbuzzer.com/${project.base}/${release.tag}/${file.name}.${file.type}`}><DownloadOutlined/></a>
            }))
    }

    const file_columns=["Name", "Description", "Type", "Size", "Checksum", "Link"].map(c => ({
        title: c, dataIndex: c.toLowerCase(), key: c.toLowerCase()
    }))

    return (
        <Section>
            <h1>Glowbuzzer Releases</h1>
            <p>Blah blah</p>
            {projects.map(project => (
                <div key={project.github || project.name}>
                    <h2>{project.name}</h2>
                    {project.releases.map(r => (
                        <div key={r.tag}>
                            <h3>
                                {r.tag}{" "}
                                {project.github && (
                                    <span>
                                        (
                                        <a
                                            href={`https://github.com/glowbuzzer/${project.github}/tree/${r.tag}/CHANGELOG.md`}
                                        >
                                            changelog
                                        </a>
                                        )
                                    </span>
                                )}
                                {project.base && (
                                    <span>
                                        (
                                        <a
                                            href={`https://downloads.glowbuzzer.com/${project.base}/${r.tag}/CHANGELOG.md`}
                                        >
                                            changelog
                                        </a>
                                        )
                                    </span>
                                )}
                            </h3>
                            <p>{r.description}</p>
                            {r.files && <Table pagination={false} columns={file_columns} dataSource={make_table(project, r)} />}
                        </div>
                    ))}
                </div>
            ))}
        </Section>
    )
}
