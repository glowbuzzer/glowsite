import { DefaultDocumentationPage } from "./DocumentationPage"
import { GlowbuzzerApp } from "@glowbuzzer/controls/app"

import "dseg/css/dseg.css"

export const ControlsDocumentationPage = ({ children }) => (
    <GlowbuzzerApp minWidth={"1px"}>
        <DefaultDocumentationPage>{children}</DefaultDocumentationPage>
    </GlowbuzzerApp>
)
