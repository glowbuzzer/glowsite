import * as React from "react"
import {
    DockLayoutContext,
    DockLayoutContextType,
    DockLayout,
    DockTileDefinition,
    DockTileDefinitionBuilder
} from "@glowbuzzer/controls"
import { Model } from "flexlayout-react"
import styled from "styled-components"
import { useMemo } from "react"

const StyledLayout = styled.div`
    > div {
        outline: 1px solid ${props => props.theme.colorBorder};
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 100%;
    }
`

// noinspection JSUnusedGlobalSymbols
export const DockExampleLayout = ({ tile: baseTile }: { tile: DockTileDefinition }) => {
    return useMemo(() => {
        const tile = DockTileDefinitionBuilder(baseTile).placement(0, 0).build()

        const nullRender = () => null

        const context: DockLayoutContextType = {
            appName: "glowsite",
            factory: tile.render,
            buttonsFactory: tile.renderButtons || nullRender,
            headerFactory: tile.renderHeader || nullRender,
            helpFactory: tile.renderHelp || nullRender,
            tiles: [tile],
            showTile() {},
            changePerspective() {},
            currentPerspective: "default",
            settingsFactory: () => tile.renderSettings?.(),
            updateModel() {},
            model: Model.fromJson({
                global: {},
                layout: {
                    id: "root",
                    type: "row",
                    children: [
                        {
                            type: "tabset",
                            children: [
                                {
                                    id: tile.id,
                                    name: tile.name,
                                    enableClose: false
                                }
                            ]
                        }
                    ]
                }
            }),
            perspectives: [
                {
                    id: "default",
                    name: "Default",
                    defaultVisible: [tile.id]
                }
            ],
            resetLayout() {}
        }

        return (
            <StyledLayout>
                <DockLayoutContext.Provider value={context}>
                    <DockLayout />
                </DockLayoutContext.Provider>
            </StyledLayout>
        )
    }, [baseTile])
}
