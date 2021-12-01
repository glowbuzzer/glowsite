import { Node } from "./framework/providers/NavProvider"
import { HomePage } from "./framework/layouts/HomePage"
import { DefaultDocumentationPage } from "./framework/layouts/DocumentationPage"
import { ControlsDocumentationPage } from "./framework/layouts/ControlsDocumentationPage"
import { BaseLayout } from "./framework/layouts/BaseLayout"
import { SimpleLayout } from "./framework/layouts/SimpleLayout"
import {DownloadsPage} from "./pages/DownloadsPage";

function process(node: Omit<Node, "path">, parentPaths: string[], parent: Node): Node {
    const slug = node.slug
    const component = node.component

    const path = [...parentPaths, slug]
    const thisNode: Node = {
        ...parent,
        ...node,
        path: path.length > 1 ? path.join("/") : "/",
        parent,
        component
    } as unknown as Node

    thisNode.children = node.children?.map(n => process(n, path, thisNode)) || []
    return thisNode
}

function auto(imports) {
    return Object.entries(imports).map(([path, component]) => {
        const name = path.split("/").pop().split(".")[0]
        return {
            slug: name,
            title: name,
            component
        }
    })
}

const nav = {
    slug: "",
    title: "Home",
    layout: HomePage,
    children: [
        {
            slug: "how-it-works",
            title: "How it works",
            layout: DefaultDocumentationPage,
            children: [
                {
                    slug: "basics",
                    title: "Basics",
                    subtitle: "Basically, how does it work?",
                    component: () => import("./pages/how-it-works/basics.mdx")
                },
                {
                    slug: "detail",
                    title: "More detail",
                    subtitle: "A little, more technical detail...",
                    component: () => import("./pages/how-it-works/detail.mdx")
                },
                {
                    slug: "platforms",
                    title: "Platforms",
                    subtitle: "What platforms does the glowbuzzer toolkit run on?",
                    component: () => import("./pages/how-it-works/platforms.mdx")
                },
                {
                    slug: "drives",
                    title: "Drives",
                    subtitle: "How does it integrate with drives?",
                    component: () => import("./pages/how-it-works/drives.mdx")
                },
                {
                    slug: "embedded",
                    title: "Embedded",
                    subtitle: "Developing embedded machine controls with the toolkit",
                    component: () => import("./pages/how-it-works/embedded.mdx")
                },
                {
                    slug: "fieldbus",
                    title: "Fieldbus",
                    subtitle: "How does it integrate with a fieldbus?",
                    component: () => import("./pages/how-it-works/fieldbus.mdx")
                },
                {
                    slug: "real_time",
                    title: "Real-time communication",
                    subtitle: "How we get fast reaction to events?",
                    component: () => import("./pages/how-it-works/real_time.mdx")
                },
                {
                    slug: "front_end_components",
                    title: "Front-end components",
                    subtitle: "Building a machine control in React",
                    component: () => import("./pages/how-it-works/front_end_components.mdx")
                },
                {
                    slug: "motion",
                    title: "Motion - trajectory planning",
                    subtitle: "The algorithms to make things move",
                    component: () => import("./pages/how-it-works/motion.mdx")
                }
            ]
        },
        {
            slug: "get-started",
            title: "Getting started",
            layout: DefaultDocumentationPage,
            children: [
                {
                    slug: "hardware",
                    title: "Hardware",
                    subtitle: "Starter kits and recommended hardware",
                    component: () => import("./pages/get-started/hardware.mdx")
                },
                {
                    slug: "kits",
                    title: "Assembling the hardware",
                    subtitle: "How to assemble the getting started hardware",
                    children: [
                        {
                            slug: "single-axis",
                            title: "Single axis starter kit",
                            subtitle: "Assembling the single axis starter kit",
                            component: () =>
                                import("./pages/get-started/building_hardware/single_axis.mdx")
                        },
                        {
                            slug: "three-axis",
                            title: "Three axis starter kit",
                            subtitle: "Assembling the three axis starter kit",
                            component: () =>
                                import("./pages/get-started/building_hardware/three_axis.mdx")
                        },
                        {
                            slug: "embedded-linux",
                            title: "Embedded linux starter kit",
                            subtitle: "Assembling the embedded Linux starter kit",
                            component: () =>
                                import("./pages/get-started/building_hardware/embedded_linux.mdx")
                        }
                    ]
                },
                {
                    slug: "simulation",
                    title: "Simulation mode",
                    subtitle: "The no-hardware route to get going",
                    component: () => import("./pages/get-started/simulation.mdx")
                },
                {
                    slug: "motion",
                    title: "Motion",
                    subtitle: "How to get a drive moving",
                    component: () => import("./pages/get-started/motion.mdx")
                },
                {
                    slug: "frontend",
                    title: "Front-end",
                    subtitle: "Easy create a front-end React machine controls",
                    component: () => import("./pages/get-started/front-end.mdx")
                },
                {
                    slug: "how_to-buy",
                    title: "How to buy",
                    subtitle: "How to buy the Glowbuzzer toolkit",
                    component: () => import("./pages/get-started/how_to_buy.mdx")
                },
                {
                    slug: "services",
                    title: "Glowbuzzer services",
                    subtitle: "How we can help - glowbuzzer professional services",
                    component: () => import("./pages/get-started/services.mdx")
                }
            ]
        },
        {
            slug: "docs",
            title: "Documentation",
            layout: DefaultDocumentationPage,
            children: [
                {
                    slug: "gbc",
                    title: "Core Control (GBC)",
                    subtitle: "Core control documentation",
                    children: [
                        {
                            slug: "overview",
                            title: "Overview of GBC",
                            subtitle: "Technical overview of GBC (Core Control)",
                            component: () => import("./pages/docs/gbc/overview.mdx")
                        },
                        {
                            slug: "running",
                            title: "Running GBC",
                            subtitle: "Steps to run GBC on Linux",
                            component: () => import("./pages/docs/gbc/running.mdx")
                        },
                        {
                            slug: "configuration",
                            title: "Configuration of GBC",
                            subtitle: "Configuration of GBC",
                            component: () => import("./pages/docs/gbc/configuration.mdx")
                        },
                        {
                            slug: "schema",
                            title: "GBC schema",
                            subtitle: "GBC Schema (data model)",
                            component: () => import("./pages/docs/gbc/GbcSchema")
                        },
                        {
                            slug: "concepts",
                            title: "GBC concepts",
                            subtitle: "Concepts in GBC",
                            component: () => import("./pages/docs/gbc/concepts.mdx")
                        },
                        {
                            slug: "tasks_and_activities",
                            title: "Tasks and activities",
                            subtitle: "Tasks and activities in GBC",
                            component: () => import("./pages/docs/gbc/tasks_and_activities.mdx")
                        },
                        {
                            slug: "motion",
                            title: "Motion in GBC",
                            subtitle: "Motion in GBC",
                            component: () => import("./pages/docs/gbc/motion.mdx")
                        },
                        {
                            slug: "orientation",
                            title: "Orientation in 3D space",
                            subtitle: "How GBC handles orientation in 3D space",
                            component: () => import("./pages/docs/gbc/orientation.mdx")
                        },
                        {
                            slug: "response_times",
                            title: "Response times",
                            subtitle: "Response times in GBC",
                            component: () => import("./pages/docs/gbc/response_times.mdx")
                        },
                        {
                            slug: "scaling",
                            title: "Scaling",
                            subtitle: "Scaling in GBC",
                            component: () => import("./pages/docs/gbc/scaling.mdx")
                        },
                        {
                            slug: "gcode",
                            title: "GCode in GBC",
                            subtitle: "GCode in GBC",
                            component: () => import("./pages/docs/gbc/gcode.mdx")
                        },
                        {
                            slug: "io",
                            title: "IO in GBC",
                            subtitle: "IO in GBC",
                            component: () => import("./pages/docs/gbc/io.mdx")
                        },
                        {
                            slug: "frames",
                            title: "Frames in GBC",
                            subtitle: "Frames in GBC",
                            component: () => import("./pages/docs/gbc/frames.mdx")
                        },
                        {
                            slug: "kinematics_configuration",
                            title: "Kinematics configurations",
                            subtitle: "Kinematics configurations in GBC",
                            component: () => import("./pages/docs/gbc/kinematics_configuration.mdx")
                        }
                    ]
                },
                {
                    slug: "gbem",
                    title: "EtherCAT Master (GBEM)",
                    subtitle: "EtherCAT Master documentation",
                    children: [
                        {
                            slug: "overview",
                            title: "Overview of GBEM",
                            subtitle: "Technical overview of GBEM (EtherCAT master)",
                            component: () => import("./pages/docs/gbem/overview.mdx")
                        },
                        {
                            slug: "compiling_and_running",
                            title: "Compiling and running",
                            subtitle: "Compiling and running GBEM",
                            component: () => import("./pages/docs/gbem/compiling_and_running.mdx")
                        },
                        {
                            slug: "drive_support_overview",
                            title: "Supported drives overview",
                            subtitle: "What drives are supported by GBEM?",
                            component: () => import("./pages/docs/gbem/drive_support_overview.mdx")
                        },
                        {
                            slug: "drive_support",
                            title: "Drive specifics",
                            subtitle: "Details of supported drives",
                            children: [
                                {
                                    slug: "beckhoff_ax5101",
                                    title: "Beckhoff AX5101",
                                    subtitle: "Review and integration of the Beckhoff AX5101",
                                    component: () =>
                                        import(
                                            "./pages/docs/gbem/drive_support/beckhoff_ax5101.mdx"
                                        )
                                },
                                {
                                    slug: "cannon_automata_smc3",
                                    title: "Cannon Automata SMC3",
                                    subtitle: "Review and integration of the Cannon Automata SMC3",
                                    component: () =>
                                        import(
                                            "./pages/docs/gbem/drive_support/cannon_automata_smc3.mdx"
                                        )
                                },
                                {
                                    slug: "delta_asd-a2",
                                    title: "Delta ASD-A2",
                                    subtitle: "Review and integration of the Delta ASD-A23",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/delta_asd-a2.mdx")
                                },
                                {
                                    slug: "EL2522",
                                    title: "EL2522",
                                    subtitle: "Review and integration of the Beckhoff EL2522",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/EL2522.mdx")
                                },
                                {
                                    slug: "EL7031",
                                    title: "EL7031",
                                    subtitle: "Review and integration of the Beckhoff EL7031",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/EL7031.mdx")
                                },
                                {
                                    slug: "EL7037",
                                    title: "EL7037",
                                    subtitle: "Review and integration of the Beckhoff EL7037",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/EL7037.mdx")
                                },
                                {
                                    slug: "EL7041",
                                    title: "EL7041",
                                    subtitle: "Review and integration of the Beckhoff EL7041",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/EL7041.mdx")
                                },
                                {
                                    slug: "EL7211",
                                    title: "EL7211",
                                    subtitle: "Review and integration of the Beckhoff EL7211",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/el7211.mdx")
                                },
                                {
                                    slug: "invertek_optidrive_p2",
                                    title: "Invertek Optidrive P2",
                                    subtitle: "Review and integration of the Invertek Optidrive P2",
                                    component: () =>
                                        import(
                                            "./pages/docs/gbem/drive_support/invertek_optidrive_p2.mdx"
                                        )
                                },
                                {
                                    slug: "kollmorgen_akd",
                                    title: "Kollmorgen AKD",
                                    subtitle: "Review and integration of the Kollmorgen AKD",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/kollmorgen_akd.mdx")
                                },
                                {
                                    slug: "nanotec_n5",
                                    title: "Nanotec N5",
                                    subtitle: "Review and integration of the Nanotec N5",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/nanotec_n5.mdx")
                                },
                                {
                                    slug: "om_azd3a_ked",
                                    title: "Oriental Motor AZD3A-KED",
                                    subtitle:
                                        'Review and integration of the Oriental Motor AZD3A-KED"',
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/om_azd3a_ked.mdx")
                                },
                                {
                                    slug: "omron_accurax_g5",
                                    title: "OMRON ACCURAX G5",
                                    subtitle: "Review and integration of the OMRON ACCURAX G5",
                                    component: () =>
                                        import(
                                            "./pages/docs/gbem/drive_support/omron_accurax_g5.mdx"
                                        )
                                },
                                {
                                    slug: "jvl_mis",
                                    title: "JVL MIS",
                                    subtitle: "Integration of the JVL MIS",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/jvl_mis.mdx")
                                }
                            ]
                        },
                        {
                            slug: "slave_support_overview",
                            title: "Supported slaves overview",
                            subtitle: "Overview of slaves supported by GBEM",
                            component: () => import("./pages/docs/gbem/slave_support_overview.mdx")
                        },
                        {
                            slug: "which_files_do_i_edit",
                            title: "Which files do I edit",
                            subtitle: "Which files do I edit in GBEM?",
                            component: () => import("./pages/docs/gbem/which_files_do_i_edit.mdx")
                        },
                        {
                            slug: "gbem_config",
                            title: "Configuration files",
                            subtitle: "GBEM's configuration files",
                            component: () => import("./pages/docs/gbem/gbem_config.mdx")
                        },
                        {
                            slug: "configuring_machines",
                            title: "Configuring machines",
                            subtitle: "Configuring machines in GBEM",
                            component: () => import("./pages/docs/gbem/configuring_machines.mdx")
                        },
                        {
                            slug: "adding_a_new_slave",
                            title: "Adding a new slave",
                            subtitle: "Adding a new slave in GBCEM",
                            component: () => import("./pages/docs/gbem/adding_a_new_slave.mdx")
                        },
                        {
                            slug: "adding_a_new_drive",
                            title: "Adding a new drive",
                            subtitle: "Adding a new drive in GBEM",
                            component: () => import("./pages/docs/gbem/adding_a_new_drive.mdx")
                        },
                        {
                            slug: "adding_jvl_mis_drive",
                            title: "Detailed guide to adding a JVL MIS drive",
                            subtitle: "Detailed guide to adding a JVL MIS drive - blow-by-blow",
                            component: () => import("./pages/docs/gbem/adding_jvl_mis_drive.mdx")
                        },
                        {
                            slug: "getting_started_with_example_hardware",
                            title: "Getting started with example hardware",
                            subtitle: "Getting started with the example hardware",
                            component: () =>
                                import(
                                    "./pages/docs/gbem/getting_started_with_example_hardware.mdx"
                                )
                        },
                        {
                            slug: "plc",
                            title: "PLC functions",
                            subtitle: "PLC functions in GBEM",
                            component: () => import("./pages/docs/gbem/plc.mdx")
                        },
                        {
                            slug: "emstat",
                            title: "Status messages (EMSTAT)",
                            subtitle: "Reading the status of GBEM (EMSTAT)",
                            component: () => import("./pages/docs/gbem/emstat.mdx")
                        },
                        {
                            slug: "internals",
                            title: "GBEM internals",
                            subtitle: "GBEM internals on Linux",
                            component: () => import("./pages/docs/gbem/internals.mdx")
                        },
                        {
                            slug: "troubleshooting",
                            title: "Troubleshooting GBEM",
                            subtitle: "Troubleshooting GBEM",
                            component: () => import("./pages/docs/gbem/troubleshooting.mdx")
                        },
                        {
                            slug: "faq",
                            title: "FAQ",
                            subtitle: "FAQ",
                            component: () => import("./pages/docs/gbem/faq.mdx")
                        },
                        {
                            slug: "terminology_guide",
                            title: "Terminology guide for GBEM",
                            subtitle: "Terminology guide for GBEM",
                            component: () => import("./pages/docs/gbem/terminology_guide.mdx")
                        }
                    ]
                },
                {
                    slug: "gbsm",
                    title: "Step Master (GBSM)",
                    subtitle: "Step master documentation (step/dir control)",
                    children: [
                        {
                            slug: "overview",
                            title: "Overview of GBSM",
                            subtitle: "Technical overview of GBSM (Step-master)",
                            component: () => import("./pages/docs/gbsm/overview.mdx")
                        },
                        {
                            slug: "tmc4361_and_tmc5160",
                            title: "TMC4361 & TMC5160",
                            subtitle: "The TMC4361 & TMC5160 motors driver ICs",
                            component: () => import("./pages/docs/gbsm/tmc4361_and_tmc5160.mdx")
                        },
                        {
                            slug: "compiling",
                            title: "Compiling GBSM",
                            subtitle: "Compiling GBSM",
                            component: () => import("./pages/docs/gbsm/compiling.mdx")
                        },
                        {
                            slug: "running",
                            title: "Running GBSM",
                            subtitle: "Running GBSM",
                            component: () => import("./pages/docs/gbsm/running.mdx")
                        },
                        {
                            slug: "organisation_of_code",
                            title: "Organisation of the code",
                            subtitle: "Organisation of the GBSM code",
                            component: () => import("./pages/docs/gbsm/organisation_of_code.mdx")
                        },
                        {
                            slug: "gbsm_config",
                            title: "Configuration files",
                            subtitle: "GBSM configuration files",
                            component: () => import("./pages/docs/gbsm/gbsm_config.mdx")
                        },
                        {
                            slug: "gpio_and_spi_on_linux",
                            title: "GPIO and SPI on Linux",
                            subtitle: "Using GPIO and SPI on Linux",
                            component: () => import("./pages/docs/gbsm/gpio_and_spi_on_linux.mdx")
                        },
                        {
                            slug: "io",
                            title: "IO in GBSM",
                            subtitle: "IO in GBSM",
                            component: () => import("./pages/docs/gbsm/io.mdx")
                        },
                        {
                            slug: "prototyping",
                            title: "Prototyping with TMC4361A & TMC5160",
                            subtitle: "Prototyping with TMC4361A & TMC5160 motor drive ICs",
                            component: () => import("./pages/docs/gbsm/prototyping.mdx")
                        },
                        {
                            slug: "timing",
                            title: "GBSM timing",
                            subtitle: "GBSM timing considerations",
                            component: () => import("./pages/docs/gbsm/timing.mdx")
                        },
                        {
                            slug: "evolving_into_production",
                            title: "Evolving into production",
                            subtitle:
                                "Evolving a prototype TMC4361A & TMC5160 design into production machine control",
                            component: () =>
                                import("./pages/docs/gbsm/evolving_into_production.mdx")
                        }
                    ]
                },
                {
                    slug: "ui",
                    title: "Front-end",
                    subtitle: "React component documentation",
                    layout: ControlsDocumentationPage, // so that Redux context is created
                    children: [
                        {
                            slug: "overview",
                            title: "Overview of front-end components",
                            subtitle: "Overview of the toolkit's front-end components",
                            component: () => import("./pages/docs/ui/overview.mdx")
                        },
                        {
                            slug: "starter_project",
                            title: "Creating a starter project",
                            subtitle: "Creating a React starter project",
                            component: () => import("./pages/docs/ui/starter_project.mdx")
                        },
                        {
                            slug: "controls",
                            title: "Front-end controls",
                            children: auto(
                                // @ts-ignore
                                import.meta.glob("./pages/docs/ui/controls/*.mdx")
                            )
                        },
                        {
                            slug: "tiles",
                            title: "Front-end tiles",
                            children: auto(
                                // @ts-ignore
                                import.meta.glob("./pages/docs/ui/tiles/*.mdx")
                            )
                        },
                        {
                            slug: "imports",
                            title: "Imports",
                            subtitle: "Imported components in the front-end",
                            component: () => import("./pages/docs/ui/imports.mdx")
                        }
                    ]
                },
                {
                    slug: "tutorials",
                    title: "Tutorials",
                    subtitle: "Step-by-step guidance for key topics",
                    children: [
                        {
                            slug: "conveyor_object_sorter_tutorial",
                            title: "Conveyor object sorter tutorial",
                            subtitle: "Conveyor object sorter tutorial",
                            component: () =>
                                import("./pages/docs/tutorials/conveyor_object_sorter_tutorial.mdx")
                        },
                        {
                            slug: "robot_pick_and_place",
                            title: "Robot pick-and-place tutorial",
                            subtitle: "Robot pick-and-place tutorial",
                            component: () =>
                                import("./pages/docs/tutorials/robot_pick_and_place.mdx")
                        }
                    ]
                }
            ]
        },
        {
            slug: "blogs",
            title: "Blogs",
            layout: DefaultDocumentationPage,
            featured: ["webdev/react_native", "drives/invertek_optidrive_p2", "embedded/netx"],
            children: [
                {
                    slug: "webdev",
                    title: "Web-dev",
                    subtitle: "Blogs about web development",
                    children: [
                        {
                            slug: "react_native",
                            title: "React native",
                            subtitle: "Getting started with React Native",
                            tags: ["web-dev", "React", "HMI", "Android", "React Native", "iOS"],
                            component: () => import("./pages/blogs/webdev/react_native.mdx")
                        },
                        {
                            slug: "threejs",
                            title: "three.js",
                            subtitle: "Introduction to three.js",
                            tags: ["web-dev", "React"],
                            component: () => import("./pages/blogs/webdev/threejs.mdx")
                        },
                        {
                            slug: "opcua",
                            title: "OPC/UA",
                            subtitle: "Working with OPC/UA",
                            tags: ["web-dev", "OPC-UA", "node.js", "PLC", "pub/sub"],
                            component: () => import("./pages/blogs/webdev/opcua.mdx")
                        }
                    ]
                },
                {
                    slug: "drives",
                    title: "Drives",
                    subtitle: "Blogs about drives",
                    children: [
                        {
                            slug: "invertek_optidrive_p2",
                            title: "Invertek Optidrive P2",
                            subtitle: "Getting the Invertek Optidrive P2 VFD working",
                            description:
                                "The Optidrive P2 is a variable frequency drive (VFD) for controlling 3-phase AC motors. It has an EtherCAT communications option and we use this to control the drive's start/stop speed etc.",
                            tags: ["drives", "Invertek", "Optidrive", "VFD", "Inverter"],
                            component: () =>
                                import("./pages/blogs/drives/invertek_optidrive_p2.mdx")
                        },
                        {
                            slug: "maxon_epos4",
                            title: "Maxon EPOS 4",
                            subtitle:
                                "Firing up the Maxon EPOS4 positioning controller for brushed and brushless DC motors",
                            description:
                                "The Maxon EPOS4 is EtherCAT drive for brushed DC and BLDC motors upto 250W. In this blog we commission the drive using EPOS/IDX software explore its features and integrate into our EtherCAT master.",
                            tags: ["drives", "maxon", "BLDC"],
                            component: () => import("./pages/blogs/drives/maxon_epos4.mdx")
                        }
                    ]
                },
                {
                    slug: "embedded",
                    title: "Embedded development",
                    subtitle: "Blogs about embedded development",
                    children: [
                        {
                            slug: "netx",
                            title: "Hilscher netX 51 & the glowbuzzer toolkit",
                            subtitle: "Exploring the Hilscher netX 51 multi-protocol slave",
                            description:
                                "The Hilscher netX 51 is a real-Time Ethernet network controller IC. In this blog we integrate the netX chip with our software over SPI to exchange data with an EtherCAT master.",
                            tags: [
                                "Embedded",
                                "EtherCAT Slave",
                                "Ethernet/IP Slave",
                                "Fieldbus",
                                "Hilscher"
                            ],
                            component: () => import("./pages/blogs/embedded/netx.mdx")
                        },
                        {
                            slug: "lan9252",
                            title: "LAN9252 investigation",
                            subtitle: "Investigating the Microchip LAN9252/53 EtherCAT slave IC",
                            tags: ["Embedded", "EtherCAT Slave", "Fieldbus", "Microchip"],
                            description:
                                "The Microchip LAN925253 chip is an EtherCAT slave controller that presents a relatively easy to use interface over SPI. Here we get the chip up and running and integrated with our software to communicate with an EtherCAT master.",
                            component: () => import("./pages/blogs/embedded/lan9252.mdx")
                        },
                        {
                            slug: "torizon",
                            title: "Linux on a Toradex iMX8M Plus",
                            subtitle:
                                "Using the Toradex iMX8M Plus as a platform for the glowbuzzer toolkit",
                            tags: [
                                "Embedded",
                                "SoM",
                                "Toradex",
                                "Verizon",
                                "Linux",
                                "NXP",
                                "iMX8M Plus",
                                "Arm",
                                "Yocto"
                            ],
                            component: () => import("./pages/blogs/embedded/torizon.mdx")
                        },
                        {
                            slug: "soes",
                            title: "Simple Open EtherCAT slave (SOES)",
                            subtitle: "Working with the Simple Open EtherCAT Slave (SOES)",
                            component: () => import("./pages/blogs/embedded/soes.mdx")
                        }
                    ]
                },
                {
                    slug: "robotics",
                    title: "Robotics",
                    subtitle: "Blogs about robotics",
                    children: [
                        {
                            slug: "staubli_wiring",
                            title: "Commissioning a Stabli TX robot",
                            subtitle: "Wiring up a Staubli TX robot",
                            component: () => import("./pages/blogs/robotics/staubli_wiring.mdx")
                        }
                    ]
                }
            ]
        },

        {
            slug: "about",
            title: "About",
            layout: DefaultDocumentationPage,
            children: [
                {
                    slug: "vision",
                    title: "Vision",
                    subtitle: "What we want to achieve (vision)",
                    component: () => import("./pages/about/vision.mdx")
                },
                {
                    slug: "values",
                    title: "Values",
                    subtitle: "What we stand for (values)",
                    component: () => import("./pages/about/values.mdx")
                },
                {
                    slug: "contact",
                    title: "Contact",
                    subtitle: "How to contact glowbuzzer",
                    component: () => import("./pages/about/contact.mdx")
                }
            ]
        },
        {
            slug: "playground",
            title: "Playground",
            layout: ControlsDocumentationPage, // so that Redux context is created
            children: auto(
                // @ts-ignore
                import.meta.glob("./pages/playground/*.{jsx,tsx,md,mdx,ts}")
            )
        },
        {
            slug: "privacy",
            layout: SimpleLayout,
            component: () => import("./pages/privacy.mdx")
        },
        {
            slug: "legal",
            layout: SimpleLayout,
            component: () => import("./pages/legal.mdx")
        },
        {
            slug: "downloads",
            layout: SimpleLayout,
            component: () => import("./pages/DownloadsPage")
        }
    ]
}

export const root: Node = process(nav, [], null)
