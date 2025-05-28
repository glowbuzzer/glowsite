import { Node } from "./framework/providers/NavProvider"
import { HomePage } from "./pages/home/HomePage"
import {
    DefaultDocumentationPage,
    TypedocPage,
    TypedocPageDetached
} from "./framework/layouts/DocumentationPage"
import { ControlsDocumentationPage } from "./framework/layouts/ControlsDocumentationPage"
import { SimpleLayout } from "./framework/layouts/SimpleLayout"
import { reactDocgenDockFilter, reactDocgenTileFilter } from "./react/react-docgen-hooks"

import reactDocgenControls from "react-docgen:@glowbuzzer/controls"
import typedoc from "typedoc:@glowbuzzer/store"
import { typedocHookFilter } from "./typedoc/typedoc-hooks"
import { LandingPageLayout } from "./framework/layouts/LandingPageLayout"
import { BaseLayout } from "./framework/layouts/BaseLayout"

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

const auto_item = ([path, component], displayProps) => {
    const name = path.split("/").pop().split(".")[0]
    return {
        slug: name,
        title: name,
        path,
        displayProps, // indicates component props should be displayed
        component
    }
}

function auto(imports, displayProps) {
    return Object.entries(imports)
        .filter(([path]) => !path.endsWith("overview.mdx")) // little hack to avoid treating overview pages as auto-content
        .map(i => auto_item(i, displayProps))
}

function merge(imports, filter) {
    const autoDocs = Object.entries(reactDocgenControls).filter(([, doc]) => filter(doc))

    return autoDocs
        .map(([, item]) => {
            const { displayName } = item as any
            const manual =
                imports &&
                Object.entries(imports).find(([path]) => {
                    const name = path.split("/").pop().split(".")[0]
                    return name === displayName
                })
            if (manual) {
                return {
                    ...auto_item(manual, true)
                }
            }
            return {
                slug: `${displayName}`,
                title: displayName,
                displayProps: true,
                include: true // include in sitemap
                // component: () => import("./react/ReactDocgenItem")
            }
        })
        .filter(e => e) // filter empty results
        .sort((a, b) => a.slug.localeCompare(b.slug))
}

const nav = {
    slug: "",
    title: "Glowbuzzer: Web-stack machine motion",
    description:
        "Control robots and machines with a web-stack. Build complex machine control applications with React. Integrated with a real-time core connected to EtherCAT.",
    layout: HomePage,
    children: [
        {
            slug: "overview",
            title: "Overview",
            layout: DefaultDocumentationPage,
            children: [
                {
                    slug: "what-we-do",
                    title: "What we do",
                    component: () => import("./pages/overview/what-we-do.mdx")
                },
                {
                    slug: "software-stack",
                    title: "Our software",
                    component: () => import("./pages/overview/SoftwareStack")
                },
                {
                    slug: "simulation",
                    title: "Simulation and digital twin",
                    component: () => import("./pages/overview/simulation.mdx")
                },
                {
                    slug: "embedded",
                    title: "Embedded and white-labelled",
                    component: () => import("./pages/overview/embedded.mdx")
                },
                {
                    slug: "how-we-work",
                    title: "How we work with customers",
                    component: () => import("./pages/overview/how-we-work.mdx")
                }
            ]
        },
        /*        {
            slug: "get-started",
            title: "Getting started",
            section: true,
            layout: DefaultDocumentationPage,
            children: [
                {
                    slug: "simulation",
                    title: "Quick start - no hardware",
                    subtitle: "Get started without hardware",
                    component: () => import("./pages/get-started/simulation.mdx")
                },
                {
                    slug: "kits",
                    title: "Hardware starter kits",
                    subtitle: "How to assemble the getting started hardware",
                    children: [
                        {
                            slug: "overview",
                            title: "Overview",
                            subtitle: "Starter kits and recommended hardware",
                            component: () => import("./pages/get-started/hardware.mdx")
                        },
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
                    slug: "qs-hardware",
                    title: "Quick start - with hardware",
                    subtitle: "Get started with hardware - How to get a drive moving",
                    component: () => import("./pages/get-started/software.mdx")
                },
                {
                    slug: "frontend",
                    title: "Creating a React user interface",
                    subtitle: "Easily create a React machine control",
                    component: () => import("./pages/get-started/front-end.mdx")
                },
                {
                    slug: "how-to-buy",
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
        },*/
        {
            slug: "docs",
            title: "Documentation",
            layout: DefaultDocumentationPage,
            children: [
                {
                    slug: "gbc",
                    title: "Core Control (GBC)",
                    section: true,
                    subtitle: "Core control documentation",
                    children: [
                        {
                            slug: "overview",
                            title: "Overview",
                            subtitle: "Technical overview of GBC (Core Control)",
                            component: () => import("./pages/docs/gbc/overview.mdx")
                        },
                        {
                            slug: "running",
                            title: "Install & Run",
                            subtitle: "Steps needed to install and run GBC",
                            component: () => import("./pages/docs/gbc/install_and_run.mdx")
                        },
                        {
                            slug: "command_line",
                            title: "Command line options",
                            subtitle: "GBC command line options",
                            component: () => import("./pages/docs/gbc/command_line.mdx")
                        },
                        {
                            slug: "configuration",
                            title: "Configuration",
                            section: true,
                            subtitle: "Configuration of GBC",
                            children: [
                                {
                                    slug: "config_overview",
                                    title: "Overview",
                                    subtitle: "Overview of the GBC configuration file",
                                    component: () => import("./pages/docs/gbc/config_overview.mdx")
                                },
                                {
                                    slug: "config_machine",
                                    title: "Machine configuration",
                                    subtitle: "GBC machine configuration",
                                    component: () => import("./pages/docs/gbc/config_machine.mdx")
                                },
                                {
                                    slug: "config_joints_and_kinematics",
                                    title: "Joints and kinematics configuration",
                                    subtitle: "GBC joints and kinematics configuration",
                                    component: () =>
                                        import("./pages/docs/gbc/config_joints_and_kinematics.mdx")
                                },
                                {
                                    slug: "config_io",
                                    title: "IO configuration",
                                    subtitle: "GBC IO configuration",
                                    component: () => import("./pages/docs/gbc/config_io.mdx")
                                },
                                {
                                    slug: "config_spindle",
                                    title: "Spindle configuration",
                                    subtitle: "GBC spindle configuration",
                                    component: () => import("./pages/docs/gbc/config_spindle.mdx")
                                },
                                {
                                    slug: "config_tool",
                                    title: "Tool configuration",
                                    subtitle: "GBC tool configuration",
                                    component: () => import("./pages/docs/gbc/config_tool.mdx")
                                },
                                {
                                    slug: "config_frames",
                                    title: "Frames configuration",
                                    subtitle: "GBC frames configuration",
                                    component: () => import("./pages/docs/gbc/config_frames.mdx")
                                },
                                {
                                    slug: "config_fieldbus",
                                    title: "Fieldbus configuration",
                                    subtitle: "GBC fieldbus configuration",
                                    component: () => import("./pages/docs/gbc/config_fieldbus.mdx")
                                },
                                {
                                    slug: "config_streams_and_activities",
                                    title: "Streams and activities configuration",
                                    subtitle: "GBC streams and activities configuration",
                                    component: () =>
                                        import("./pages/docs/gbc/config_streams_and_activities.mdx")
                                },
                                {
                                    slug: "config_advanced",
                                    title: "Advanced configuration",
                                    subtitle: "GBC advanced configuration",
                                    component: () => import("./pages/docs/gbc/config_advanced.mdx")
                                }
                            ]
                        },

                        {
                            slug: "schema",
                            title: "GBC schema",
                            subtitle: "GBC Schema (data model)",
                            component: () => import("./pages/docs/gbc/GbcSchema")
                        },
                        {
                            slug: "status_messages",
                            title: "Status messages",
                            subtitle: "Status messages produced by GBC",
                            component: () => import("./pages/docs/gbc/status_messages.mdx")
                        },
                        {
                            slug: "motion_primitives",
                            title: "Motion primitives",
                            subtitle: "Motion primitives in GBC - making things move",
                            component: () => import("./pages/docs/gbc/motion_primitives.mdx")
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
                        }
                    ]
                },
                {
                    slug: "gbem",
                    title: "EtherCAT Master (GBEM)",
                    section: true,
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
                            // description: "This is the meta description. Short description of the page. Will be used in search results.",
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
                                        "Review and integration of the Oriental Motor AZD3A-KED",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/om_azd3a_ked.mdx")
                                },
                                {
                                    slug: "om_azd_ked",
                                    title: "Oriental Motor AZD-KED",
                                    subtitle:
                                        "Review and integration of the Oriental Motor AZD-KED",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/om_azd_ked.mdx")
                                },
                                {
                                    slug: "omron_accurax_g5",
                                    title: "OMRON ACCURAX G5",
                                    subtitle: "Review and integration of the OMRON ACCURAX G5",
                                    component: () =>
                                        import(
                                            "./pages/docs/gbem/drive_support/omron_accurax_g5.mdx"
                                        )
                                    /*
                                },
                                {
                                    slug: "jvl_mis",
                                    title: "JVL MIS",
                                    subtitle: "Integration of the JVL MIS",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/jvl_mis.mdx")
*/
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
                            subtitle: "Adding a new slave in GBEM",
                            component: () => import("./pages/docs/gbem/adding_a_new_slave.mdx")
                        },
                        {
                            slug: "adding_a_new_drive",
                            title: "Adding a new drive",
                            subtitle: "Adding a new drive in GBEM",
                            component: () => import("./pages/docs/gbem/adding_a_new_drive.mdx")
                        },
                        // {
                        //     slug: "getting_started_with_hardware",
                        //     title: "Getting started with hardware",
                        //     subtitle: "Getting started with hardware",
                        //     component: () =>
                        //         import("./pages/docs/gbem/getting_started_with_hardware.mdx")
                        // },
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
                    section: true,
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
                    slug: "gbr",
                    title: "React (GBR)",
                    section: true,
                    subtitle: "React component documentation",
                    layout: ControlsDocumentationPage, // so that Redux context is created
                    children: [
                        {
                            slug: "overview",
                            title: "Overview",
                            subtitle: "Overview of glowbuzzer React (GBR)",
                            component: () => import("./pages/docs/gbr/overview.mdx")
                        },
                        {
                            slug: "dock",
                            title: "GBR docking layout",
                            children: [
                                {
                                    slug: "overview",
                                    title: "Overview",
                                    subtitle: "Overview of the GBR docking layout",
                                    component: () => import("./pages/docs/gbr/dock/overview.mdx")
                                },
                                ...merge(
                                    // @ts-ignore
                                    import.meta.glob("./pages/docs/gbr/dock/*.mdx"),
                                    reactDocgenDockFilter
                                )
                            ]
                        },
                        {
                            slug: "tiles",
                            title: "GBR tiles",
                            children: [
                                {
                                    slug: "overview",
                                    title: "Overview",
                                    subtitle: "Overview of the GBR tiles",
                                    component: () => import("./pages/docs/gbr/tiles/overview.mdx")
                                },
                                ...merge(
                                    // @ts-ignore
                                    import.meta.glob("./pages/docs/gbr/tiles/*.mdx"),
                                    reactDocgenTileFilter
                                )
                            ]
                        },
                        {
                            slug: "hooks",
                            title: "GBR hooks",
                            children: [
                                {
                                    slug: "overview",
                                    title: "Overview",
                                    subtitle: "Overview of the GBR hooks",
                                    component: () => import("./pages/docs/gbr/hooks/overview.mdx")
                                },
                                ...typedoc.children.filter(typedocHookFilter).map(t => ({
                                    slug: t.name,
                                    title: t.name,
                                    layout: TypedocPage,
                                    component: () => import("./typedoc/TypedocItem")
                                }))
                            ]
                        },
                        {
                            slug: "connecting",
                            title: "Connecting to GBC from GBR",
                            subtitle: "Connect to GBC and enable machine operation",
                            component: () => import("./pages/docs/gbr/connection.mdx")
                        },
                        {
                            slug: "solo",
                            title: "The solo activity API",
                            subtitle: "Executing activities using the solo activity API",
                            component: () => import("./pages/docs/gbr/solo.mdx")
                        },
                        {
                            slug: "streaming",
                            title: "The streaming activity API",
                            subtitle: "Executing activities using the streaming activity API",
                            component: () => import("./pages/docs/gbr/streaming.mdx")
                        },
                        {
                            slug: "gcode",
                            title: "G-Code",
                            subtitle: "Executing G-Code using the useGCode hook",
                            component: () => import("./pages/docs/gbr/gcode.mdx")
                        },
                        {
                            slug: "redux",
                            title: "Redux store customisation",
                            subtitle: "How to use and change the GBR low-level Redux store",
                            component: () => import("./pages/docs/gbr/redux.mdx")
                        },
                        {
                            slug: "state_machine",
                            title: "GBR state machine",
                            subtitle: "Creating a simple state machine to control activities",
                            component: () => import("./pages/docs/gbr/state_machine.mdx")
                        },
                        {
                            slug: "minimal",
                            title: "Managing dependencies",
                            subtitle: "Create a GBR application with minimal dependencies",
                            component: () => import("./pages/docs/gbr/minimal.mdx")
                        }
                    ]
                },
                {
                    slug: "gbp",
                    title: "Python API (GBP)",
                    section: true,
                    subtitle: "Python API documentation",
                    children: [
                        {
                            slug: "overview",
                            title: "Overview",
                            subtitle: "Overview of the Python API (GBP)",
                            component: () => import("./pages/docs/gbp/overview.mdx")
                        }
                    ]
                },
                /*
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
                },
                */
                {
                    slug: "types",
                    title: "Types",
                    standaloneTypes: true,
                    unlinked: true,
                    children: typedoc.children
                        .filter(i => !typedocHookFilter(i))
                        .map(t => ({
                            slug: t.name,
                            title: t.name,
                            layout: TypedocPageDetached,
                            component: () => import("./typedoc/TypedocItem")
                        }))
                }
            ]
        } /*,
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
                            description:
                                "How to use React Native to create device based user interfaces for the glowbuzzer toolkit",
                            tags: ["web-dev", "React", "HMI", "Android", "React Native", "iOS"],
                            component: () => import("./pages/blogs/webdev/react_native.mdx")
                        },
                        {
                            slug: "adding_kinematics_visualisations",
                            title: "Adding kinematics visualisations",
                            subtitle: "Adding kinematics visualisations with react-three-fibre ",
                            description: "Using react-three-fibre",
                            tags: ["web-dev", "React", "R3F"],
                            component: () =>
                                import("./pages/blogs/webdev/adding_kinematics_visualisations.mdx")
                        },
                        {
                            slug: "threejs",
                            title: "three.js",
                            subtitle: "Introduction to three.js",
                            description:
                                "An introduction on how to use three.js to create 3D visualisations for glowbuzzer applications",
                            tags: ["web-dev", "React"],
                            component: () => import("./pages/blogs/webdev/threejs.mdx")
                        },
                        {
                            slug: "opcua",
                            title: "OPC/UA",
                            subtitle: "Working with OPC/UA",
                            description: "How to use OPC/UA with the glowbuzzer toolkit",
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
                            slug: "jvl_mis_blow_by_blow",
                            title: "Integrating the JVL MIS drive - blow-by-blow",
                            subtitle: "Integration of the JVL MIS - a detailled step-by-step guide",
                            component: () => import("./pages/blogs/drives/adding_jvl_mis_drive.mdx")
                        },
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
                            tags: ["Embedded", "EtherCAT", "Linux"],
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
                            slug: "custom_kinematics",
                            title: "Adding custom kinematics",
                            subtitle: "Adding custom kinematics functions - two-link arm example",
                            tags: ["kinematics", "robotics"],
                            component: () => import("./pages/blogs/robotics/custom_kinematics.mdx")
                        },
                        {
                            slug: "staubli_wiring",
                            title: "Commissioning a Stabli TX robot",
                            subtitle: "Wiring up a Staubli TX robot",
                            tags: ["Robotics", "Staubli"],
                            component: () => import("./pages/blogs/robotics/staubli_wiring.mdx")
                        },
                        {
                            slug: "igus_pick_and_place",
                            title: "Igus pick-and-place",
                            subtitle: "Simple pick-and-place operations with the Igus 5-DOF arm",
                            tags: ["Pick-and-place", "Robotics", "Igus"],
                            component: () =>
                                import("./pages/blogs/robotics/igus_pick_and_place.mdx")
                        }
                    ]
                },
                {
                    slug: "using_glowbuzzer",
                    title: "Using the glowbuzzer toolkit ",
                    subtitle: "Using the glowbuzzer toolkit - scenarios",
                    children: [
                        {
                            slug: "cam",
                            title: "Using CAM with the glowbuzzer toolkit",
                            subtitle: "Integrating CAM tools with the glowbuzzer toolkit",
                            tags: ["gcode", "CAM"],
                            component: () => import("./pages/blogs/using/cam.mdx")
                        }
                    ]
                }
            ]
        }*/,
        {
            slug: "about",
            title: "About",
            layout: DefaultDocumentationPage,
            children: [
                {
                    slug: "vision",
                    title: "Our vision",
                    subtitle: "What we want to achieve (vision)",
                    component: () => import("./pages/about/vision.mdx")
                },
                /*
                                {
                                    slug: "values",
                                    title: "Values",
                                    subtitle: "What we stand for (values)",
                                    component: () => import("./pages/about/values.mdx")
                                },
                */
                {
                    slug: "contact",
                    title: "Contact",
                    subtitle: "How to contact glowbuzzer",
                    component: () => import("./pages/about/contact")
                }
            ]
        },
        // @ts-ignore
        import.meta.env.VITE_GLOWBUZZER_VERSION
            ? null // don't include playground in release builds
            : {
                  slug: "playground",
                  title: "Playground",
                  layout: ControlsDocumentationPage, // so that Redux context is created
                  children: auto(
                      // @ts-ignore
                      import.meta.glob("./pages/playground/*.{jsx,tsx,md,mdx,ts}"),
                      false
                  )
              },
        {
            slug: "privacy",
            title: "Privacy",
            layout: SimpleLayout,
            unlinked: true,
            component: () => import("./pages/privacy.mdx")
        },
        {
            slug: "legal",
            title: "Legal",
            layout: SimpleLayout,
            unlinked: true,
            component: () => import("./pages/legal.mdx")
        },
        {
            slug: "downloads",
            title: "Downloads",
            layout: SimpleLayout,
            unlinked: true,
            component: () => import("./pages/DownloadsPage")
        },
        {
            slug: "sitemap",
            title: "Sitemap",
            layout: SimpleLayout,
            unlinked: true,
            component: () => import("./pages/SitemapPage")
        },
        {
            slug: "landing",
            title: "Landing",
            layout: LandingPageLayout,
            unlinked: true, // inherited by children, remove from nav and sitemap
            landing: true, // hides the top nav
            children: [
                {
                    slug: "test",
                    title: "Test Landing Page",
                    component: () => import("./landing/TestLandingPage")
                },
                {
                    slug: "viz",
                    title: "Creating visualisations",
                    component: () => import("./landing/viz/VizLanding")
                },
                {
                    slug: "ros",
                    title: "Why glowbuzzer is better than ROS",
                    component: () => import("./landing/ros/RosLanding")
                },
                {
                    slug: "generic",
                    title: "glowbuzzer the basis for your machine/robot control",
                    component: () => import("./landing/generic/GenericLanding")
                },
                {
                    slug: "ethercat",
                    title: "Controlling EtherCAT devices from web-applications",
                    component: () => import("./landing/ethercat/EthercatLanding")
                },
                {
                    slug: "embedded",
                    title: "Controlling machines and robots with an embedded motion control",
                    component: () => import("./landing/embedded/EmbeddedLanding")
                },
                {
                    slug: "drives",
                    title: "Control EtherCAT drives from web-stack motion control",
                    component: () => import("./landing/drives/DrivesLanding")
                },
                {
                    slug: "robot",
                    title: "Control robots with a web-stack motion control",
                    component: () => import("./landing/robot/RobotLanding")
                }
            ]
        }

        // {
        //     slug: "docs/types/:name",
        //     layout: TypedocPageDetached,
        //     title: "GBC Types",
        //     // filter: c => c.sources?.some(s => s.fileName === "gbc.ts" || s.fileName === "gbc.d.ts"), // for left nav build
        //     filter: c => true,
        //     component: () => import("./typedoc/TypedocItem")
        // }
    ].filter(n => n) // filter empty (conditional) nodes
}

export const root: Node = process(nav, [], null)
