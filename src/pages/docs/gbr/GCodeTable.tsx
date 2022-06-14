import { Table } from "antd"
import { Markdown } from "../../../framework/components/Markdown"
import * as React from "react"
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import styled from "styled-components"

const gcode_support = [
    ["G0, G1", "Linear motion", true],
    ["G2, G3", "Arc and helical motion", true, "Helical moves not supported"],
    ["G4", "Dwell", true],
    ["G10 L2, G10 L20", "Set work offset coordinates", false],
    ["G17, G18, G19", "Plane selection", false, "Add rotation to frames in your configuration"],
    ["G20, G21", "Units", true],
    ["G28, G30", "Go to pre-defined position", false],
    ["G28.1, G30.1", "Set pre-defined position", false],
    ["G38.2, G38.3, G38.4, G38.5", "Probing", false],
    ["G40, G41, G42", "Cutter compensation", false],
    ["G43, G49", "Tool length selection", true],
    ["G90, G91", "Absolute and relative positioning", true],
    ["M0", "Pause program", true],
    ["M1", "Pause program (if stop switch active)", false],
    ["M2", "Program end", true],
    ["M7, M8, M9", "Coolant control", false],
    ["M200", "Set digital output", true, "glowbuzzer extension"],
    ["M201", "Set analog output", true, "glowbuzzer extension"],
    ["M202", "Set integer output", true, "glowbuzzer extension"]
]

const StyledDiv = styled.div`
    .supported-col {
        text-align: center;
    }

    svg {
        width: 30px;
        height: 18px;
    }

    .supported {
        path {
            fill: green;
        }
    }

    .unsupported {
        path {
            fill: red;
        }
    }
`

export const GCodeTable = () => {
    const columns = [
        {
            title: "G-Code",
            dataIndex: 0,
            key: "name"
        },
        {
            title: "Description",
            dataIndex: 1,
            key: "desc"
        },
        {
            title: "Supported",
            dataIndex: 2,
            key: "supported",
            className: "supported-col",
            render: value =>
                value ? (
                    <CheckCircleOutlined className="supported" />
                ) : (
                    <CloseCircleOutlined className="unsupported" />
                )
        },
        {
            title: "Notes",
            dataIndex: 3,
            key: "notes"
        }
    ]

    return (
        <StyledDiv>
            <Table dataSource={gcode_support} columns={columns} pagination={false} />
        </StyledDiv>
    )
}
