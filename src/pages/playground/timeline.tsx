import {Timeline} from "antd";

export default () => {
    return (
        <Timeline>
            <Timeline.Item>
                Develop your machine control application using our web stack based toolkit of
                components (React)
            </Timeline.Item>
            <Timeline.Item>
                Your application talks over websockets to GBC which performs the real time control
                functions
            </Timeline.Item>
            <Timeline.Item>
                GBC runs on an either a microcontroller or embedded Linux SoC
            </Timeline.Item>
            <Timeline.Item>
                GBEM or GBSEM is either integrated with embedded drives in your electronics or
                connects to packaged EtherCAT drives in your machine
            </Timeline.Item>
        </Timeline>
    )
}
