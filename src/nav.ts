import { Node } from "./framework/providers/NavProvider"
import { HomePage } from "./framework/layouts/HomePage"
import { DefaultDocumentationPage } from "./framework/layouts/DocumentationPage"
import { ControlsDocumentationPage } from "./framework/layouts/ControlsDocumentationPage"

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
                    subtitle: "How it all fits together",
                    component: () => import("./pages/how-it-works/basics.mdx")
                },
                {
                    slug: "detail",
                    title: "Detail",
                    subtitle: "More technical details on the toolkit",
                    component: () => import("./pages/how-it-works/detail.mdx")
                },
                {
                    slug: "platforms",
                    title: "Platforms",
                    subtitle: "What platforms does it run on",
                    component: () => import("./pages/how-it-works/platforms.mdx")
                },
                {
                    slug: "drives",
                    title: "Drives",
                    subtitle: "How does it integrate with drives",
                    component: () => import("./pages/how-it-works/drives.mdx")
                },
                {
                    slug: "embedded",
                    title: "Embedded",
                    subtitle: "Run on embedded Linux or microcontroller",
                    component: () => import("./pages/how-it-works/embedded.mdx")
                },
                {
                    slug: "fieldbus",
                    title: "Fieldbus",
                    subtitle: "How does the fieldbus interface work",
                    component: () => import("./pages/how-it-works/fieldbus.mdx")
                },
                {
                    slug: "realtime",
                    title: "Real-time communications",
                    subtitle: "How we get fast reaction to events",
                    component: () => import("./pages/how-it-works/real_time.mdx")
                },
                {
                    slug: "frontend",
                    title: "Front-end components",
                    subtitle: "Building a machine control in React",
                    component: () => import("./pages/how-it-works/front_end_components.mdx")
                },
                {
                    slug: "otp",
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
                            component: () =>
                                import("./pages/get-started/building_hardware/single_axis.mdx")
                        },
                        {
                            slug: "three-axis",
                            title: "Three axis starter kit",
                            component: () =>
                                import("./pages/get-started/building_hardware/three_axis.mdx")
                        },
                        {
                            slug: "embedded-linux",
                            title: "Embedded linux starter kit",
                            component: () =>
                                import("./pages/get-started/building_hardware/embedded_linux.mdx")
                        }
                    ]
                },
                {
                    slug: "simulation",
                    title: "Simulation mode",
                    subtitle: "No hardware route to get going",
                    component: () => import("./pages/get-started/simulation.mdx")
                },
                {
                    slug: "motion",
                    title: "Motion",
                    subtitle: "Get a drive moving",
                    component: () => import("./pages/get-started/motion.mdx")
                },
                {
                    slug: "frontend",
                    title: "Front-end",
                    subtitle: "Clone and modify a front-end React template",
                    component: () => import("./pages/get-started/front-end.mdx")
                },
                {
                    slug: "pricing",
                    title: "How to buy",
                    subtitle: "How to buy the Glowbuzzer toolkit",
                    component: () => import("./pages/get-started/how_to_buy.mdx")
                },
                {
                    slug: "services",
                    title: "Glowbuzzer services",
                    subtitle: "How we can help with your project",
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
                            component: () => import("./pages/docs/gbc/overview.mdx")
                        },
                        {
                            slug: "running",
                            title: "Running GBC",
                            component: () => import("./pages/docs/gbc/running.mdx")
                        },
                        {
                            slug: "activities",
                            title: "Activities",
                            children: [
                                {
                                    slug: "intro",
                                    title: "Introduction",
                                    component: () => import("./pages/docs/gbc/activities/intro.mdx")
                                }
                            ]
                        },
                        {
                            slug: "configuration",
                            title: "Configuration of GBC",
                            component: () => import("./pages/docs/gbc/configuration.mdx")
                        },
                        {
                            slug: "schema",
                            title: "GBC schema",
                            component: () => import("./pages/docs/gbc/GbcSchema")
                        },
                        {
                            slug: "concepts",
                            title: "GBC concepts",
                            component: () => import("./pages/docs/gbc/concepts.mdx")
                        },
                        {
                            slug: "tasks-activities",
                            title: "Tasks and activities",
                            component: () => import("./pages/docs/gbc/tasks_and_activities.mdx")
                        },
                        {
                            slug: "motion",
                            title: "Motion in GBC",
                            component: () => import("./pages/docs/gbc/motion.mdx")
                        },
                        {
                            slug: "orientation",
                            title: "Orientation in 3d space",
                            component: () => import("./pages/docs/gbc/orientation.mdx")
                        },
                        {
                            slug: "response-times",
                            title: "Response times",
                            component: () => import("./pages/docs/gbc/response_times.mdx")
                        },
                        {
                            slug: "scaling",
                            title: "Scaling",
                            component: () => import("./pages/docs/gbc/scaling.mdx")
                        },
                        {
                            slug: "gcode",
                            title: "GCode in GBC",
                            component: () => import("./pages/docs/gbc/gcode.mdx")
                        },
                        {
                            slug: "io",
                            title: "IO in GBC",
                            component: () => import("./pages/docs/gbc/io.mdx")
                        },
                        {
                            slug: "frames",
                            title: "Frames in GBC",
                            component: () => import("./pages/docs/gbc/frames.mdx")
                        },
                        {
                            slug: "kinematics",
                            title: "Kinematics configurations",
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
                            component: () => import("./pages/docs/gbem/introduction.mdx")
                        },
                        {
                            slug: "compiling_and_running",
                            title: "Compiling and running",
                            component: () => import("./pages/docs/gbem/compiling_and_running.mdx")
                        },
                        {
                            slug: "drive_support_overview",
                            title: "Supported drives overview",
                            component: () => import("./pages/docs/gbem/drive_support_overview.mdx")
                        },
                        {
                            slug: "drive_support",
                            title: "Drive specifics",
                            children: [
                                {
                                    slug: "beckhoff_ax5101",
                                    title: "Beckhoff AX5101",
                                    component: () =>
                                        import(
                                            "./pages/docs/gbem/drive_support/beckhoff_ax5101.mdx"
                                        )
                                },
                                {
                                    slug: "cannon_automata_smc3",
                                    title: "Cannon automata SMC3",
                                    component: () =>
                                        import(
                                            "./pages/docs/gbem/drive_support/cannon_automata_smc3.mdx"
                                        )
                                },
                                {
                                    slug: "delta_asd-a2",
                                    title: "Delta ASD-A2",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/delta_asd-a2.mdx")
                                },
                                {
                                    slug: "EL2522",
                                    title: "EL2522",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/EL2522.mdx")
                                },
                                {
                                    slug: "EL7031",
                                    title: "EL7031",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/EL7031.mdx")
                                },
                                {
                                    slug: "EL7037",
                                    title: "EL7037",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/EL7037.mdx")
                                },
                                {
                                    slug: "EL7041",
                                    title: "EL7041",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/EL7041.mdx")
                                },
                                {
                                    slug: "EL7211",
                                    title: "EL7211",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/el7211.mdx")
                                },
                                {
                                    slug: "invertek_optidrive_p2",
                                    title: "Invertek Optidrive P2",
                                    component: () =>
                                        import(
                                            "./pages/docs/gbem/drive_support/invertek_optidrive_p2.mdx"
                                        )
                                },
                                {
                                    slug: "kollmorgen_akd",
                                    title: "Kollmorgen AKD",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/kollmorgen_akd.mdx")
                                },
                                {
                                    slug: "nanotec_n5",
                                    title: "Nanotec N5",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/nanotec_n5.mdx")
                                },
                                {
                                    slug: "om_azd3a_ked",
                                    title: "Oriental Motor AZD3A-KED",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/om_azd3a_ked.mdx")
                                },
                                {
                                    slug: "omron_accurax_g5",
                                    title: "OMRON ACCURAX G5",
                                    component: () =>
                                        import(
                                            "./pages/docs/gbem/drive_support/omron_accurax_g5.mdx"
                                        )
                                },
                                {
                                    slug: "jvl_mis",
                                    title: "JVL MIS",
                                    component: () =>
                                        import("./pages/docs/gbem/drive_support/jvl_mis.mdx")
                                }
                            ]
                        },
                        {
                            slug: "slave_support_overview",
                            title: "Supported slaves overview",
                            component: () => import("./pages/docs/gbem/slave_support_overview.mdx")
                        },
                        {
                            slug: "which_files_do_i_edit",
                            title: "Which files do I edit",
                            component: () => import("./pages/docs/gbem/which_files_do_i_edit.mdx")
                        },
                        {
                            slug: "gbem_config",
                            title: "Configuration files",
                            component: () => import("./pages/docs/gbem/gbem_config.mdx")
                        },
                        {
                            slug: "configuring_machines",
                            title: "Configuring machines",
                            component: () => import("./pages/docs/gbem/configuring_machines.mdx")
                        },
                        {
                            slug: "adding_a_new_slave",
                            title: "Adding a new slave",
                            component: () => import("./pages/docs/gbem/adding_a_new_slave.mdx")
                        },
                        {
                            slug: "adding_a_new_drive",
                            title: "Adding a new drive",
                            component: () => import("./pages/docs/gbem/adding_a_new_drive.mdx")
                        },
                        {
                            slug: "adding_jvl_mis_drive",
                            title: "Detailed guide to adding a JVL MIS drive",
                            component: () => import("./pages/docs/gbem/adding_jvl_mis_drive.mdx")
                        },
                        {
                            slug: "getting_started_with_example_hardware",
                            title: "Getting started with example hardware",
                            component: () =>
                                import(
                                    "./pages/docs/gbem/getting_started_with_example_hardware.mdx"
                                )
                        },
                        {
                            slug: "plc",
                            title: "Adding PLC functions",
                            component: () => import("./pages/docs/gbem/plc.mdx")
                        },
                        {
                            slug: "emstat",
                            title: "Status messages (EMSTAT)",
                            component: () => import("./pages/docs/gbem/emstat.mdx")
                        },
                        {
                            slug: "internals",
                            title: "GBEM internals",
                            component: () => import("./pages/docs/gbem/internals.mdx")
                        },
                        {
                            slug: "troubleshooting",
                            title: "Troubleshooting",
                            component: () => import("./pages/docs/gbem/troubleshooting.mdx")
                        },
                        {
                            slug: "faq",
                            title: "FAQ",
                            component: () => import("./pages/docs/gbem/faq.mdx")
                        },
                        {
                            slug: "terminology_guide",
                            title: "Terminology",
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
                            component: () => import("./pages/docs/gbsm/introduction.mdx")
                        },
                        {
                            slug: "tmc4361_and_tmc5160",
                            title: "TMC4361 & TMC5160",
                            component: () => import("./pages/docs/gbsm/tmc4361_and_tmc5160.mdx")
                        },
                        {
                            slug: "compiling",
                            title: "Compiling GBSM",
                            component: () => import("./pages/docs/gbsm/compiling.mdx")
                        },
                        {
                            slug: "running",
                            title: "Running GBSM",
                            component: () => import("./pages/docs/gbsm/running.mdx")
                        },
                        {
                            slug: "organisation_of_code",
                            title: "Organisation of the GBSM code",
                            component: () => import("./pages/docs/gbsm/organisation_of_code.mdx")
                        },
                        {
                            slug: "gbsm_config",
                            title: "Configuration files",
                            component: () => import("./pages/docs/gbsm/gbsm_config.mdx")
                        },
                        {
                            slug: "io",
                            title: "IO in GBSM",
                            component: () => import("./pages/docs/gbsm/io.mdx")
                        },
                        {
                            slug: "prototyping",
                            title: "Prototyping with TMC4361A & TMC5160",
                            component: () => import("./pages/docs/gbsm/prototyping.mdx")
                        },
                        {
                            slug: "timing",
                            title: "GBSM timing",
                            component: () => import("./pages/docs/gbsm/timing.mdx")
                        },
                        {
                            slug: "evolving_into_production",
                            title: "Evolving into production",
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
                            component: () => import("./pages/docs/ui/introduction.mdx")
                        },
                        {
                            slug: "starter_project",
                            title: "Creating a starter project",
                            component: () => import("./pages/docs/ui/getting_started.mdx")
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
                            component: () =>
                                import("./pages/docs/tutorials/conveyor_object_sorter_tutorial.mdx")
                        },
                        {
                            slug: "robot_pick_and_place",
                            title: "Robot pick-and-place tutorial",
                            component: () =>
                                import("./pages/docs/tutorials/robot_pick_and_place.mdx")
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
                    title: "Values",
                    subtitle: "What we want to achieve",
                    component: () => import("./pages/about/vision.mdx")
                },
                {
                    slug: "values",
                    title: "Values",
                    subtitle: "What we stand for",
                    component: () => import("./pages/about/values.mdx")
                },
                {
                    slug: "contact",
                    title: "Contact",
                    subtitle: "How to get in touch",
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
        }
    ]
}

export const root: Node = process(nav, [], null)
