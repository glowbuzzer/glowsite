import { ScrollOnMount } from "../../framework/components/ScrollOnMount"
import { useLocation } from "react-router-dom"
import { BaseLayout } from "../../framework/layouts/BaseLayout"
import { Section } from "../../framework/components/Section"
import { Card, CardLayout } from "../../framework/components/CardLayout"

const Services = () => {
    const { hash } = useLocation()
    return (
        <BaseLayout>
            <Section>
                <ScrollOnMount on={[hash]} anchor />
                <CardLayout>
                    <Card
                        title="Consulting for New Machine Designs"
                        content="Collaboration during machine development to select architecture, motion hardware, and control strategies that reduce risk and accelerate time to market"
                    />
                    <Card
                        title="Machine Integration"
                        content="End-to-end support in bringing your hardware online, from drive tuning and encoder setup to motion configuration and safety validation"
                    />
                    <Card
                        title="Custom Development"
                        content="Tailored extensions to firmware, API, or HMI framework to meet unique machine requirements or integrate with proprietary workflows"
                    />
                    <Card
                        title="OEM Branding and HMI Design"
                        content="Delivery of branded, production-ready operator interfaces using our React-based framework, including theming, layout, and custom widget development"
                    />
                    <Card
                        title="Performance Tuning"
                        content="On-site or remote optimization of motion planning, drive synchronization, and cycle times to achieve reliable throughput"
                    />
                    <Card
                        title="Training and Knowledge Transfer"
                        content="Structured sessions for engineering teams covering configuration, diagnostics, advanced features, and best practices"
                    />
                    <Card
                        title="Long-Term Support"
                        content="Service-level agreements with guaranteed response times, version maintenance, and access to expert assistance for production-critical systems"
                    />
                </CardLayout>
            </Section>
        </BaseLayout>
    )
}

export default Services
