import * as React from "react"
import { Section } from "../framework/components/Section"
import { Table } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import { File, Project, projects, Release } from "./versions"

export default () => {
    function make_table(project: Project, release: Release) {
        return release.files
            .map(file => ({
                ...(project.defaultFiles.find(f => f.name === file.name) || {}),
                ...file
            }))
            .map((file: File) => ({
                key: file.name,
                name: file.name,
                description: file.description,
                type: file.type,
                size: file.size,
                checksum: file.checksum,
                link: (
                    <a
                        href={`https://downloads.glowbuzzer.com/${project.base}/${release.tag}/${file.name}.${file.type}`}
                    >
                        <DownloadOutlined />
                    </a>
                )
            }))
    }

    const file_columns = ["Name", "Description", "Type", "Size", "Checksum", "Link"].map(c => ({
        title: c,
        dataIndex: c.toLowerCase(),
        key: c.toLowerCase()
    }))

    return (
        <Section>
            <h1>Toolkit releases & downloads</h1>
            <p>Here we highlight the latest releases of the glowbuzzer toolkit's components.</p>
            <p>
                Components like GBR (React components), GBEM (EtherCAT Master), GBSM (Step Master)
                are supplied as source code and you need to download and compile these yourself from
                Github.
            </p>
            <p>
                GBC, the core real-time control, is the closed source licensed component of the
                toolkit and an evaluation version (time limited) is available for download.
            </p>
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
                            {r.files && (
                                <Table
                                    pagination={false}
                                    columns={file_columns}
                                    dataSource={make_table(project, r)}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </Section>
    )
}
