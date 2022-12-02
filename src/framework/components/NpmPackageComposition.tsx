import * as React from "react"
import { Table } from "antd"
import styled from "styled-components"

// TODO: M: read this from modules.json in the package
const ref = [
    {
        module: ".",
        import: "@glowbuzzer/controls",
        dependencies: [
            "@ant-design/icons",
            "@react-three/drei",
            "@react-three/fiber",
            "@reduxjs/toolkit",
            "ace-builds",
            "antd",
            "d3",
            "flexlayout-react",
            "react",
            "react-ace",
            "react-redux",
            "styled-components",
            "three",
            "three-stdlib"
        ],
        exports: [
            "AnalogInputsTile",
            "AnalogInputsTileDefinition",
            "AnalogInputsTileHelp",
            "AnalogOutputsTile",
            "AnalogOutputsTileDefinition",
            "AnalogOutputsTileHelp",
            "BasicRobot",
            "BitFieldDisplay",
            "CartesianDro",
            "CartesianDroClipboardOption",
            "CartesianDroTile",
            "CartesianDroTileDefinition",
            "CartesianDroTileHelp",
            "CartesianJogTile",
            "CartesianJogTileDefinition",
            "ConfigEditTile",
            "ConfigEditTileDefinition",
            "ConnectSettings",
            "ConnectTabButtons",
            "ConnectTile",
            "ConnectTileDefinition",
            "ConnectTileHelp",
            "CylindricalTool",
            "DefaultGridHelper",
            "DefaultLighting",
            "DefaultPerspectiveCamera",
            "DefaultViewCube",
            "DigitalInputsTile",
            "DigitalInputsTileDefinition",
            "DigitalInputsTileHelp",
            "DigitalOutputsTile",
            "DigitalOutputsTileDefinition",
            "DigitalOutputsTileHelp",
            "DockLayout",
            "DockLayoutContext",
            "DockLayoutProvider",
            "DockPerspectiveLayoutProvider",
            "DockTileDefinitionBuilder",
            "DockViewMenu",
            "DroItem",
            "FeedRateTile",
            "FeedRateTileDefinition",
            "FeedRateTileHelp",
            "FramesDisplay",
            "FramesDropdown",
            "FramesTile",
            "FramesTileDefinition",
            "Frustum",
            "GCodeTile",
            "GCodeTileDefinition",
            "GCodeTileHelp",
            "GlowbuzzerApp",
            "GlowbuzzerTileDefinitionList",
            "GlowbuzzerTileIdentifiers",
            "IntegerInputsTile",
            "IntegerInputsTileDefinition",
            "IntegerInputsTileHelp",
            "IntegerOutputsTile",
            "IntegerOutputsTileDefinition",
            "IntegerOutputsTileHelp",
            "JointDro",
            "JointDroTile",
            "JointDroTileDefinition",
            "JointDroTileHelp",
            "JointJogTile",
            "JointJogTileDefinition",
            "MotorDro",
            "PointsTile",
            "PointsTileDefinition",
            "PreferencesDialog",
            "PreviewPath",
            "RobotConfigurationDro",
            "ScaleProvider",
            "SegmentDisplay",
            "SpindleTile",
            "SpindleTileDefinition",
            "StateMachineToolsTile",
            "StateMachineToolsTileDefinition",
            "StateMachineToolsTileHelp",
            "TasksTile",
            "TasksTileDefinition",
            "TasksTileHelp",
            "TelemetryTile",
            "TelemetryTileDefinition",
            "TelemetryTileSettings",
            "ThreeDimensionalSceneTile",
            "ThreeDimensionalSceneTileDefinition",
            "ThreeDimensionalSceneTileHelp",
            "TileEmptyMessage",
            "ToolPath",
            "ToolsTile",
            "ToolsTileDefinition",
            "ToolsTileHelp",
            "TrackPosition",
            "TriadHelper",
            "UnitSelector",
            "triadArrowColors",
            "triadArrowVectors",
            "useDockContext",
            "useDockLayoutContext",
            "useDockTiles",
            "useScale"
        ]
    },
    {
        module: "./app",
        import: "@glowbuzzer/controls/app",
        dependencies: [
            "@ant-design/icons",
            "@reduxjs/toolkit",
            "antd",
            "react",
            "react-redux",
            "styled-components"
        ],
        exports: ["GlowbuzzerApp"]
    },
    {
        module: "./connect",
        import: "@glowbuzzer/controls/connect",
        dependencies: ["antd", "react", "styled-components"],
        exports: [
            "ConnectSettings",
            "ConnectTabButtons",
            "ConnectTile",
            "ConnectTileDefinition",
            "ConnectTileHelp"
        ]
    },
    {
        module: "./scene",
        import: "@glowbuzzer/controls/scene",
        dependencies: [
            "@react-three/drei",
            "@react-three/fiber",
            "antd",
            "react",
            "react-redux",
            "styled-components",
            "three",
            "three-stdlib"
        ],
        exports: [
            "BasicRobot",
            "CylindricalTool",
            "DefaultGridHelper",
            "DefaultLighting",
            "DefaultPerspectiveCamera",
            "DefaultViewCube",
            "FramesDisplay",
            "Frustum",
            "PreviewPath",
            "ScaleProvider",
            "ThreeDimensionalSceneTile",
            "ThreeDimensionalSceneTileDefinition",
            "ThreeDimensionalSceneTileHelp",
            "ToolPath",
            "TrackPosition",
            "TriadHelper",
            "triadArrowColors",
            "triadArrowVectors",
            "useScale"
        ]
    },
    {
        module: "./tasks",
        import: "@glowbuzzer/controls/tasks",
        dependencies: ["@ant-design/icons", "antd", "react", "styled-components"],
        exports: ["TasksTile", "TasksTileDefinition", "TasksTileHelp"]
    },
    {
        module: "./io",
        import: "@glowbuzzer/controls/io",
        dependencies: ["@ant-design/icons", "antd", "react", "styled-components", "three"],
        exports: [
            "AnalogInputsTile",
            "AnalogInputsTileDefinition",
            "AnalogInputsTileHelp",
            "AnalogOutputsTile",
            "AnalogOutputsTileDefinition",
            "AnalogOutputsTileHelp",
            "DigitalInputsTile",
            "DigitalInputsTileDefinition",
            "DigitalInputsTileHelp",
            "DigitalOutputsTile",
            "DigitalOutputsTileDefinition",
            "DigitalOutputsTileHelp",
            "IntegerInputsTile",
            "IntegerInputsTileDefinition",
            "IntegerInputsTileHelp",
            "IntegerOutputsTile",
            "IntegerOutputsTileDefinition",
            "IntegerOutputsTileHelp"
        ]
    },
    {
        module: "./prefs",
        import: "@glowbuzzer/controls/prefs",
        dependencies: ["antd", "react"],
        exports: ["PreferencesDialog", "UnitSelector"]
    },
    {
        module: "./telemetry",
        import: "@glowbuzzer/controls/telemetry",
        dependencies: ["antd", "d3", "react", "react-redux", "styled-components"],
        exports: ["TelemetryTile", "TelemetryTileDefinition", "TelemetryTileSettings"]
    },
    {
        module: "./dev",
        import: "@glowbuzzer/controls/dev",
        dependencies: ["antd", "react", "styled-components"],
        exports: [
            "StateMachineToolsTile",
            "StateMachineToolsTileDefinition",
            "StateMachineToolsTileHelp"
        ]
    },
    {
        module: "./gcode",
        import: "@glowbuzzer/controls/gcode",
        dependencies: [
            "@ant-design/icons",
            "ace-builds",
            "antd",
            "react",
            "react-ace",
            "styled-components"
        ],
        exports: ["GCodeTile", "GCodeTileDefinition", "GCodeTileHelp"]
    },
    {
        module: "./feedrate",
        import: "@glowbuzzer/controls/feedrate",
        dependencies: ["@ant-design/icons", "antd", "react", "styled-components"],
        exports: ["FeedRateTile", "FeedRateTileDefinition", "FeedRateTileHelp"]
    },
    {
        module: "./jogging",
        import: "@glowbuzzer/controls/jogging",
        dependencies: ["@ant-design/icons", "antd", "react", "styled-components", "three"],
        exports: [
            "CartesianJogTile",
            "CartesianJogTileDefinition",
            "JointJogTile",
            "JointJogTileDefinition"
        ]
    },
    {
        module: "./dro",
        import: "@glowbuzzer/controls/dro",
        dependencies: ["@ant-design/icons", "antd", "react", "styled-components", "three"],
        exports: [
            "BitFieldDisplay",
            "CartesianDro",
            "CartesianDroClipboardOption",
            "CartesianDroTile",
            "CartesianDroTileDefinition",
            "CartesianDroTileHelp",
            "DroItem",
            "JointDro",
            "JointDroTile",
            "JointDroTileDefinition",
            "JointDroTileHelp",
            "MotorDro",
            "RobotConfigurationDro",
            "SegmentDisplay"
        ]
    }
]

const StyledTable = styled(Table)`
    td {
        vertical-align: top;
    }
`

export const NpmPackageComposition = () => {
    const columns = [
        { title: "Import", dataIndex: "name", key: "name" },
        { title: "Exports", dataIndex: "exports", key: "exports" },
        { title: "Dependencies", dataIndex: "dependencies", key: "dependencies" }
    ]
    const dataSource = ref.map(item => ({
        key: item.module,
        name: <code>{item.import}</code>,
        exports: item.exports.map(e => (
            <div>
                <code>{e}</code>
            </div>
        )),
        dependencies: item.dependencies.map(d => (
            <div>
                <code>{d}</code>
            </div>
        ))
    }))
    return <StyledTable dataSource={dataSource} columns={columns} pagination={false} />
}
