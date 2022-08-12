import {LATEST_VERSIONS} from "../versions.mjs";

export type File = {
    arch?: string
    name: string
    description: string
    type: string
}
export type Release = {
    tag: string
    description: string
    files?: Partial<File>[]
}
export type Project = {
    name: string
    github?: string // main project in github
    basename?: string // base for downloads
    defaultFiles?: Partial<File>[]
    releases: Release[]
}

export const projects: Project[] = [
    {
        name: "Glowbuzzer React (GBR)",
        github: "gbr",
        releases: [
            {
                tag: "v1.0.0",
                description: "First release of GBR"
            }
        ]
    },
    {
        name: "Glowbuzzer Control (GBC) - evaluation versions (time limited running)",
        basename: "gbc",
        defaultFiles: [
            {
                name: "gbc-linux-amd64",
                arch: "linux-amd64",
                description: "GBC for amd64 (normal Linux)",
                type: "tgz"
            },
            {
                name: "gbc-linux-armv7",
                arch: "rpi",
                description: "GBC for armv7 (Raspberry Pi)",
                type: "tgz"
            }
        ],
        releases: [
            // copy below and hard code version number for each release
            {
                tag: LATEST_VERSIONS.gbc_version,
                description: "Latest release",
                files: [
                    {
                        name: "gbc-linux-amd64"
                    },
                    {
                        name: "gbc-linux-armv7"
                    }
                ]
            }
        ]
    },
    {
        name: "Glowbuzzer EtherCAT Master (GBEM)",
        github: "gbem",
        releases: [
            {
                tag: LATEST_VERSIONS.gbem_version,
                description: "Latest release of GBEM"
            }
        ]
    },
    {
        name: "Glowbuzzer Step Master (GBSM)",
        github: "gbsm",
        releases: [
            {
                tag: LATEST_VERSIONS.gbsm_version,
                description: "Latest release of GBSM"
            }
        ]
    }
    /*
        {
            name: "Raspberry Pi RT image",
            basename: "pi_rt_img",
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
    */
]
