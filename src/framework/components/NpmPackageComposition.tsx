import * as React from "react"
import { Table, Tag } from "antd"
import styled from "styled-components";

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
            "AnalogInputsTileHelp",
            "AnalogOutputsTile",
            "AnalogOutputsTileHelp",
            "BasicRobot",
            "BitFieldDisplay",
            "CartesianDro",
            "CartesianDroTile",
            "CartesianDroTileHelp",
            "ConnectSettings",
            "ConnectTabButtons",
            "ConnectTile",
            "ConnectTileHelp",
            "CylindricalTool",
            "DefaultGridHelper",
            "DefaultLighting",
            "DefaultPerspectiveCamera",
            "DefaultViewCube",
            "DigitalInputsTile",
            "DigitalInputsTileHelp",
            "DigitalOutputsTile",
            "DigitalOutputsTileHelp",
            "DockLayout",
            "DockLayoutContext",
            "DockLayoutProvider",
            "DockPerspectiveLayoutProvider",
            "DockTileDefinitionBuilder",
            "DockViewMenu",
            "DroItem",
            "FeedRateTile",
            "FeedRateTileHelp",
            "FramesDisplay",
            "Frustum",
            "GCodeTile",
            "GCodeTileHelp",
            "GlowbuzzerApp",
            "GlowbuzzerTileDefinitionList",
            "GlowbuzzerTileDefinitions",
            "GlowbuzzerTileIdentifiers",
            "IntegerInputsTile",
            "IntegerInputsTileHelp",
            "IntegerOutputsTile",
            "IntegerOutputsTileHelp",
            "JogCartesianTile",
            "JogJointsTile",
            "JointDro",
            "JointDroTile",
            "JointDroTileHelp",
            "LoadConfigDialog",
            "MotorDro",
            "PreferencesDialog",
            "PreviewPath",
            "RobotConfigurationDro",
            "ScaleProvider",
            "SegmentDisplay",
            "ShowConfigDialog",
            "StateMachineToolsTile",
            "StateMachineToolsTileHelp",
            "TasksTile",
            "TasksTileHelp",
            "TelemetryTile",
            "TelemetryTileSettings",
            "ThreeDimensionalSceneTile",
            "ThreeDimensionalSceneTileHelp",
            "TileEmptyMessage",
            "ToolPath",
            "ToolsTile",
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
        exports: ["ConnectSettings", "ConnectTabButtons", "ConnectTile", "ConnectTileHelp"]
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
        exports: ["TasksTile", "TasksTileHelp"]
    },
    {
        module: "./io",
        import: "@glowbuzzer/controls/io",
        dependencies: ["@ant-design/icons", "antd", "react", "styled-components", "three"],
        exports: [
            "AnalogInputsTile",
            "AnalogInputsTileHelp",
            "AnalogOutputsTile",
            "AnalogOutputsTileHelp",
            "DigitalInputsTile",
            "DigitalInputsTileHelp",
            "DigitalOutputsTile",
            "DigitalOutputsTileHelp",
            "IntegerInputsTile",
            "IntegerInputsTileHelp",
            "IntegerOutputsTile",
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
        exports: ["TelemetryTile", "TelemetryTileSettings"]
    },
    {
        module: "./dev",
        import: "@glowbuzzer/controls/dev",
        dependencies: ["antd", "react", "styled-components"],
        exports: ["StateMachineToolsTile", "StateMachineToolsTileHelp"]
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
        exports: ["GCodeTile", "GCodeTileHelp"]
    },
    {
        module: "./feedrate",
        import: "@glowbuzzer/controls/feedrate",
        dependencies: ["@ant-design/icons", "antd", "react", "styled-components"],
        exports: ["FeedRateTile", "FeedRateTileHelp"]
    },
    {
        module: "./jogging",
        import: "@glowbuzzer/controls/jogging",
        dependencies: ["@ant-design/icons", "antd", "react", "styled-components", "three"],
        exports: ["JogCartesianTile", "JogJointsTile"]
    },
    {
        module: "./dro",
        import: "@glowbuzzer/controls/dro",
        dependencies: ["@ant-design/icons", "antd", "react", "styled-components", "three"],
        exports: [
            "BitFieldDisplay",
            "CartesianDro",
            "CartesianDroTile",
            "CartesianDroTileHelp",
            "DroItem",
            "JointDro",
            "JointDroTile",
            "JointDroTileHelp",
            "MotorDro",
            "RobotConfigurationDro",
            "SegmentDisplay"
        ]
    }
]

const StyledTable=styled(Table)`
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
    return <StyledTable dataSource={dataSource} columns={columns} pagination={false}/>
}
