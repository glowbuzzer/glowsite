export type File = {
    name: string
    description: string
    type: string
    size: number
    checksum: string
}
export type Release = {
    tag: string
    description: string
    files?: Partial<File>[]
}
export type Project = {
    name: string
    github?: string // main project in github
    base?: string // base for downloads
    defaultFiles?: Partial<File>[]
    releases: Release[]
}

export const projects: Project[] = [
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
