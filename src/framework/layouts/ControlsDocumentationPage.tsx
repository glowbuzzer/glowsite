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
import { useEffect } from "react"
import { Provider } from "react-redux"
import { dino } from "../store/dino"
import { sample_config } from "../store/config"

const GlowbuzzerCustomApp = ({ children }) => {
    const preview = usePreview()
    useEffect(() => {
        preview.setGCode(dino)
    }, [])

    return children
}

export const ControlsDocumentationPage = ({ children }) => {
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

    return (
        <Provider store={store}>
            <GlowbuzzerCustomApp>
                <DefaultDocumentationPage>{children}</DefaultDocumentationPage>
            </GlowbuzzerCustomApp>
        </Provider>
    )
}
