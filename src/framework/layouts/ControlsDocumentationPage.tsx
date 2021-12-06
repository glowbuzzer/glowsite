import { DefaultDocumentationPage } from "./DocumentationPage"
import {
    configSlice,
    rootReducer,
    TASK_STATE,
    tasksSlice,
    TaskStatus,
    usePreview
} from "@glowbuzzer/store"

import "dseg/css/dseg.css"
import { configureStore } from "@reduxjs/toolkit"
import { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { dino } from "../store/dino"
import { sample_config } from "../store/config"
import { ComponentProp, ComponentProps } from "../components/ComponentProps"

const GlowbuzzerCustomApp = ({ children }) => {
    const preview = usePreview()
    useEffect(() => {
        preview.setGCode(dino)
    }, [])

    return children
}

export const ControlsDocumentationPage = ({ children, ...other }) => {
    const [props, setProps] = useState<{ [index: string]: any }>()

    useEffect(() => {
        // @ts-ignore (complete hack because vite won't import using module name)
        import("../../../node_modules/@glowbuzzer/controls/component-docs.json").then(module =>
            setProps(module.default)
        )
    }, [])

    const middleware = getDefault => {
        return getDefault({ immutableCheck: false, serializableCheck: false })
    }

    const store = configureStore({
        reducer: rootReducer,
        middleware
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

    const raw_props=props && Object.values(props)
        .find(p => p.displayName === other.slug)?.props

    const properties:ComponentProp[] = raw_props && Object.entries<any>(raw_props).map(([name, info])=>({
        key: name,
        name: {
            name, required: info.required
        },
        type: info.tsType.raw || info.tsType.name,
        description: info.description,
        default: info.defaultValue?.value
    }))

    return (
        <Provider store={store}>
            <GlowbuzzerCustomApp>
                <DefaultDocumentationPage>
                    {children}
                    {props && other.displayProps && (
                        <ComponentProps
                            displayName={other.slug}
                            showDefaults={true}
                            properties={properties}
                        />
                    )}
                </DefaultDocumentationPage>
            </GlowbuzzerCustomApp>
        </Provider>
    )
}
