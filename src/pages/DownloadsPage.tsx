import * as React from "react"
import { Section } from "../framework/components/Section"
import { Table } from "antd"
import { DownloadOutlined, GithubOutlined } from "@ant-design/icons"
import { File, Project, projects, Release } from "./version_history"
import { useEffect, useState } from "react"

const FileSizeDynamic = ({ url }) => {
    const [size, setSize] = useState(null)

    useEffect(() => {
        fetch(url, {
            method: "HEAD"
        }).then(r => {
            setSize(r.headers.get("content-length"))
        })
    }, [])

    return <>{size}</>
}

const FileChecksum = ({ url }) => {
    const [checksum, setChecksum] = useState(null)

    useEffect(() => {
        fetch(url + ".md5sum", {
            method: "GET"
        })
            .then(r => r.text())
            .then(text => setChecksum(text.split(" ").shift()))
    }, [])

    return <>{checksum}</>
}

export default () => {
    function changelog_url(project: Project, release: Release) {
        if (project.github) {
            return `https://github.com/glowbuzzer/${project.github}/tree/${release.tag}/CHANGELOG.md`
        }

        return [
            "https://downloads.glowbuzzer.com/releases",
            project.basename,
            release.files[0].arch || project.defaultFiles[0].arch,
            null,
            release.tag,
            "CHANGELOG.md"
        ]
            .filter(p => p)
            .join("/")
    }

    function make_table(project: Project, release: Release) {
        return release.files
            .map(file => ({
                ...(project.defaultFiles.find(f => f.name === file.name) || {}),
                ...file
            }))
            .map((file: File) => {
                const path_elements = [
                    "https://downloads.glowbuzzer.com/releases",
                    project.basename,
                    file.arch,
                    null,
                    release.tag,
                    `${project.basename}-${release.tag}.${file.type}`
                ].filter(p => p)
                const artifact_url = path_elements.join("/")

                return {
                    key: file.name,
                    name: file.name,
                    description: file.description,
                    type: file.type,
                    size: <FileSizeDynamic url={artifact_url} />,
                    checksum: <FileChecksum url={artifact_url} />,
                    link: (
                        <a href={artifact_url}>
                            <DownloadOutlined />
                        </a>
                    )
                }
            })
    }

    const file_columns = ["Name", "Description", "Type", "Size", "Checksum (MD5)", "Link"].map(
        c => ({
            title: c,
            dataIndex: c.split(" ").shift().toLowerCase(),
            key: c.toLowerCase()
        })
    )

    return (
        <Section>
            <div className="content">
                <h1>Toolkit releases & downloads</h1>
                <p>Here we highlight the latest releases of the glowbuzzer toolkit's components.</p>
                <p>
                    Components like GBR (React components), GBEM (EtherCAT Master), GBSM (Step
                    Master) are supplied as source code and you need to download and compile these
                    yourself from Github.
                </p>
                <p>
                    GBC, the core real-time control, is the closed source licensed component of the
                    toolkit and an evaluation version (time limited) is available for download.
                </p>
                {projects.map(project => (
                    <div key={project.github || project.name}>
                        <h2>
                            {project.basename ? (
                                <DownloadOutlined style={{ marginRight: "10px" }} />
                            ) : (
                                <GithubOutlined style={{ marginRight: "10px" }} />
                            )}
                            {project.name}
                        </h2>
                        {project.releases.map(r => (
                            <div key={r.tag}>
                                <h3>
                                    {r.tag}
                                    {project.noChangeLog ? null : (
                                        <>
                                            {" "}
                                            <span>
                                                <a href={changelog_url(project, r)}>changelog</a>
                                            </span>
                                        </>
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
            </div>
        </Section>
    )
}
