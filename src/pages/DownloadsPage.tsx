import * as React from "react"
import { Section } from "../framework/components/Section"

type Project = {
    name: string
    github?: string
    releases: {
        tag: string
        description: string
    }[]
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
    }
]

export default () => {
    return (
        <Section>
            <h1>Glowbuzzer Downloads</h1>
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
                            </h3>
                            <p>{r.description}</p>
                        </div>
                    ))}
                </div>
            ))}
        </Section>
    )
}
