import { Table } from "antd"
import * as React from "react"
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import styled from "styled-components"

const gcode_support = [
    ["G0, G1", "Linear motion", true],
    ["G2, G3", "Arc and helical motion", true, "Helical moves not supported"],
    ["G4", "Dwell", true],
    ["G5", "Cubic B-splines", false, "No support for moves along B-splines"],
    ["G7", "Lathe diameter mode", false, "No current support but we can add if needed by customers"],
    ["G8", "Lathe radius mode", false, "No current support but we can add if needed by customers"],
    ["G10 L2, G10 L20", "Set work offset coordinates", false, "No current support but we can add if needed by customers"],
    ["G17, G18, G19", "Plane selection", false, "This is supported by adding rotation to frames in your configuration"],
    ["G20, G21", "Units", true],
    ["G28, G30", "Go to pre-defined position", false],
    ["G28.1, G30.1", "Set pre-defined position", false],
    ["G38.2, G38.3, G38.4, G38.5", "Probing", false],
    ["G40, G41, G42", "Cutter compensation", false, "Most CAM tools do the cutter compensation for you"],
    ["G43, G49", "Tool length selection", true],
    ["G52", "Local co-ordinate system offset", false, "No current support but we can add if needed by customers"],
    ["G53", "Move in machine co-ordinates", false, "No current support but we can add if needed by customers"],
    ["G54 etc.", "Select co-ordinate system", true],
    ["G61", "Exact path mode", true],
    ["G64", "Path blending", true],
    ["G90, G91", "Absolute and relative positioning (Distance mode)", true],
    ["G92", "Co-ordinate system offsets", true],
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
            <Table
                dataSource={gcode_support}
                columns={columns}
                pagination={false}
                rowKey={r => r[0] as string}
            />
        </StyledDiv>
    )
}
