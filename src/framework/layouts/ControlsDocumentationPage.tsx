import * as React from "react"
import { useEffect } from "react"
import { DefaultDocumentationPage } from "./DocumentationPage"
import {
    configSlice,
    ConnectionState,
    GlowbuzzerConfig,
    KinematicsConfigurationConfig,
    MachineState,
    MACHINETARGET,
    rootReducer,
    TASK_STATE,
    tasksSlice,
    TaskStatus,
    usePreview
} from "@glowbuzzer/store"

import "dseg/css/dseg.css"
import "flexlayout-react/style/light.css"

import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { sample_config } from "../store/config"
import { ComponentProp, ComponentProps } from "../components/ComponentProps"

import reactDocgenControls from "react-docgen:@glowbuzzer/controls"
import { Markdown } from "../components/Markdown"
import { GithubSourceLink } from "../components"
import { ScrollToTopOnMount } from "../components/ScrollToTopOnMount"
import { dino } from "../store/dino"

const GlowbuzzerCustomApp = ({ children }) => {
    const preview = usePreview()
    useEffect(() => {
        setTimeout(() => preview.setGCode(dino), 1000)
    }, [])

    return children
}

export const ControlsDocumentationPage = ({ children, slug, displayProps }) => {
    const middleware = getDefault => {
        return getDefault({ immutableCheck: false, serializableCheck: false })
    }

    // here we mimic up some state in the store to make the controls work nicely
    const enhancer = createStore => {
        return rootReducer => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const store = createStore(rootReducer)
            const initial_state = store.getState()
            const kc: KinematicsConfigurationConfig = {
                name: "Machine",
                participatingJoints: [0, 1, 2]
            }
            const state = {
                ...initial_state,
                config: {
                    ...initial_state.config,
                    value: {
                        ...initial_state.config.value,
                        tool: [
                            { name: "Default", translation: { x: 0, y: 0, z: 10 } },
                            { name: "Roughing", translation: { x: 0, y: 0, z: 20 } }
                        ],
                        frames: [
                            { name: "World" },
                            {
                                name: "Table",
                                translation: { x: 100, y: 0, z: 0 },
                                absRel: 1,
                                parent: 0
                            },
                            {
                                name: "Robot",
                                translation: { x: 20, y: 20, z: 0 },
                                absRel: 1,
                                parent: 1
                            },
                            {
                                name: "Part",
                                translation: { x: 10, y: 10, z: 20 },
                                absRel: 1,
                                parent: 1
                            }
                        ],
                        points: [
                            {
                                name: "Point 1",
                                translation: { x: 100, y: 0, z: 0 },
                                absRel: 1,
                                parent: 0
                            },
                            {
                                name: "Point 2",
                                translation: { x: 20, y: 20, z: 0 },
                                absRel: 1,
                                parent: 1
                            }
                        ],
                        spindle: [{ name: "Spindle 1" }],
                        joint: [
                            { name: "J1" },
                            { name: "J2" },
                            { name: "J3" },
                            {
                                name: "J4",
                                jointType: 0,
                                negLimit: 0,
                                posLimit: 500,
                                finiteContinuous: 0
                            },
                            {
                                name: "J5",
                                jointType: 0,
                                negLimit: 0,
                                posLimit: 500,
                                finiteContinuous: 0
                            },
                            {
                                name: "J6",
                                jointType: 0,
                                negLimit: 0,
                                posLimit: 500,
                                finiteContinuous: 0
                            }
                        ],
                        kinematicsConfiguration: [kc],
                        ain: [{ name: "Current Temp" }],
                        aout: [{ name: "Target Temp" }, { name: "Rotor Speed" }],
                        din: [{ name: "Light Beam" }],
                        dout: [{ name: "Coolant" }, { name: "Laser" }],
                        iin: [{ name: "Piece Count" }],
                        iout: [{ name: "Model Number" }, { name: "Serial Number" }],
                        task: [
                            {
                                name: "Task 1",
                                activityCount: 1,
                                firstActivityIndex: 0
                            }
                        ],
                        activity: [
                            {
                                name: "Activity 1",
                            }
                        ]
                    } as GlowbuzzerConfig
                },
                connection: {
                    ...initial_state.connection,
                    state: ConnectionState.CONNECTED
                },
                machine: {
                    ...initial_state.machine,
                    actualTarget: MACHINETARGET.MACHINETARGET_SIMULATION,
                    statusWord: 0b100111,
                    currentState: MachineState.OPERATION_ENABLED
                },
                kinematics: [
                    {
                        froTarget: 1,
                        froActual: 1,
                        position: {
                            translation: { x: 0, y: 0, z: 0 },
                            rotation: { x: 0, y: 0, z: 0, w: 1 }
                        },
                        offset: {
                            translation: { x: 0, y: 0, z: 0 },
                            rotation: { x: 0, y: 0, z: 0, w: 1 }
                        }
                    }
                ],
                ain: [123.45],
                aout: [
                    { effectiveValue: 100.76 },
                    { effectiveValue: 54, override: true, setValue: 21 }
                ],
                din: [true],
                iin: [42],
                joints: [
                    {
                        actPos: 100
                    },
                    {
                        actPos: 200
                    },
                    {
                        actPos: 300
                    },
                    {
                        actPos: 400
                    },
                    {
                        actPos: 500
                    },
                    {
                        actPos: 600
                    }
                ]
            }

            return {
                ...store,
                getState() {
                    return state
                }
            }
        }
    }

    const store = configureStore({
        reducer: rootReducer,
        middleware,
        enhancers: [enhancer]
    })

    useEffect(() => {
        store.dispatch(configSlice.actions.setConfig(sample_config))
        store.dispatch(
            tasksSlice.actions.status([
                { taskState: TASK_STATE.TASK_RUNNING, currentActivityIndex: 0 },
                { taskState: TASK_STATE.TASK_FINISHED, currentActivityIndex: 0 }
            ] as TaskStatus[])
        )
    }, [])

    /**
     * We attempt to get the generated documentation, but if not found we just set everything to undefined and
     * expect an mdx file to exist which will render and have the content (eg. overview page within the section)
     *
     * In addition, any mdx content is rendered between the generated synopsis and component props. This
     * will generally contain a demo/example because I can't figure out how to support these in the code comments
     * (generated docs).
     *
     */

    const [source, { props, displayName, description }] = Object.entries<any>(
        reactDocgenControls
    ).find(([, p]) => p.displayName === slug) || [undefined, {}]

    const properties: ComponentProp[] =
        props &&
        Object.entries<any>(props).map(([name, info]) => ({
            key: name,
            name: {
                name,
                required: info.required
            },
            type: info.tsType?.raw || info.tsType?.name,
            description: info.description,
            default: info.defaultValue?.value
        }))

    return (
        <Provider store={store}>
            <GlowbuzzerCustomApp>
                <DefaultDocumentationPage>
                    <ScrollToTopOnMount on={[window.location.pathname]} />

                    {displayName && <h1>{displayName}</h1>}

                    {source && (
                        <GithubSourceLink
                            project="gbr"
                            lib="controls"
                            path={source.split(`\\`).slice(5).join("/")}
                        />
                    )}

                    {description && <Markdown>{description}</Markdown>}

                    {children}

                    {displayProps && properties?.length > 0 && (
                        <ComponentProps
                            displayName={slug}
                            showDefaults={true}
                            properties={properties}
                        />
                    )}
                </DefaultDocumentationPage>
            </GlowbuzzerCustomApp>
        </Provider>
    )
}
