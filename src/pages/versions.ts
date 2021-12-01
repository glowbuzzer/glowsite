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
        name: "Glowbuzzer React (GBR)",
        github: "gbr",
        releases: [
            {
                tag: "0.0.1-alpha-1",
                description: "Fixes and new features"
            }
        ]
    },
    {
        name: "Glowbuzzer Control (GBC) - evaluation versions (time limited running)",
        base: "gbc",
        defaultFiles: [
            {
                name: "gbc-linux",
                description: "GBC for Linux amd64",
                type: "tgz"
            }
        ],
        releases: [
            {
                tag: "0.0.1-alpha-1",
                description: "Fixes and new features",
                files: [
                    {
                        name: "gbc-linux-amd64",
                        description: "GBC for am64 (normal Linux)",
                        size: 12345,
                        type: "tgz",
                        checksum: "123abc456def"
                    },
                    {
                        name: "gbc-linux-armv7",
                        description: "GBC for armv7 (Raspberry Pi)",
                        size: 3145,
                        type: "tgz",
                        checksum: "123ab"
                    }
                ]
            }
        ]
    },
    {
        name: "Glowbuzzer EtherCAT Master (GBEM)",
        base: "gbem",
        releases: [
            {
                tag: "0.0.1-alpha-1",
                description: "First release of GBEM"
            }
        ]
    },
    {
        name: "Glowbuzzer Step Master (GBSM)",
        base: "gbsm",
        releases: [
            {
                tag: "0.0.1-alpha-1",
                description: "First release of the GBSM"
            }
        ]
    },
    {
        name: "Raspberry Pi RT image",
        base: "pi_rt_img",
        defaultFiles: [
            {
                type: "gz"
            }
        ],
        releases: [
            {
                tag: "0.0.1-alpha-1",
                description: "Initial release",
                files: [
                    {
                        name: "rpi_rt",
                        description: "Raspberry Pi RT image",
                        size: 12345,
                        type: "gz",
                        checksum: "12c456def"
                    }
                ]
            }
        ]
    }
]
