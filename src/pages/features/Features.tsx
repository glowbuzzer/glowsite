import { ScrollOnMount } from "../../framework/components/ScrollOnMount"
import { useLocation } from "react-router-dom"
import { BaseLayout } from "../../framework/layouts/BaseLayout"
import { Section } from "../../framework/components/Section"
import { Card, CardLayout } from "../../framework/components/CardLayout"

const Features = () => {
    const { hash } = useLocation()
    return (
        <BaseLayout>
            <Section>
                <ScrollOnMount on={[hash]} anchor />
                <CardLayout>
                    <Card
                        title="Multi-Axis Motion Control"
                        content="Coordinate up to 6 axes with deterministic precision. Our motion planner delivers smooth trajectory execution with stable velocity control, suitable for CNC, robotics, and automation equipment"
                    />
                    <Card
                        title="Stepper and Servo Drive Support"
                        content="Run TMC stepper drivers or EtherCAT servo drives. Choose the most suitable and cost effective solution for your machine without compromise"
                    />
                    <Card
                        title="Absolute Encoders and Homing"
                        content="Support for absolute encoders ensures machines always know their position, even after power loss. Flexible homing strategies: switch-based, encoder-based, or hybrid allow fast, reliable machine initialization"
                    />
                    <Card
                        title="Advanced Motion Planning"
                        content="Our planner supports jerk-limited trajectories, lookahead, and feedrate optimization. Complex toolpaths are executed with smooth motion, reduced vibration, and consistent path following"
                    />
                    <Card
                        title="G-Code Execution"
                        content="Our G-code interpreter supports a comprehensive selection of codes, with the option to extend to new dialects or requirements. Compatible with leading CAM workflows, enabling straightforward integration into production processes"
                    />
                    <Card
                        title="High-Level API (including language bindings)"
                        content="Control your machine using a structured API designed for integration. Beyond G-code, the API supports adaptive machining, robot guidance, or sensor-driven motion. Integrate with external software, vision systems, or custom user interfaces"
                    />
                    <Card
                        title="React-Based Customisable HMI Framework"
                        content="A React framework for building tailored machine interfaces. Includes reusable widgets, real-time data binding, and control over motion, jobs, and I/O. Layouts, themes, and extensions are configurable, allowing OEMs to deliver branded, maintainable HMIs quickly"
                    />
                    <Card
                        title="Configurable I/O"
                        content="Digital and analog I/O fully assignable via configuration. Supports homing sensors, encoders, safety interlocks, coolant, spindle control, probing, and tool changers without custom firmware"
                    />
                    <Card
                        title="Web-Based Control and Diagnostics"
                        content="Access configuration, monitoring, and job management through a browser. Real-time dashboards, jog controls, and fault logs simplify commissioning, tuning, and maintenance"
                    />
                    <Card
                        title="Safety and Fault Handling"
                        content="Continuous monitoring of limits, encoder feedback, and drive status. Integrated fault detection and safe stop modes protect equipment and operators while ensuring fast recovery"
                    />
                    <Card
                        title="Modular, File-Based Configuration"
                        content="Machine setup defined in a single configuration file. Hardware swaps, kinematic changes, and parameter updates require no recompilation, accelerating deployment and reducing maintenance overhead"
                    />
                </CardLayout>
            </Section>
        </BaseLayout>
    )
}

export default Features
