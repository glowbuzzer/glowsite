import { ScrollOnMount } from "../../framework/components/ScrollOnMount"
import { useLocation } from "react-router-dom"
import { BaseLayout } from "../../framework/layouts/BaseLayout"
import { Section } from "../../framework/components/Section"
import styled from "styled-components"

const SolutionContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 20px 0;
`

const SolutionSection = styled.div<{ $alternate?: boolean }>`
    position: relative;
    padding: 48px 0;
    border-bottom: 1px solid ${props => props.theme.colorBorderSecondary};

    &:last-child {
        border-bottom: none;
    }

    @media (max-width: 767px) {
        padding: 32px 0;
    }
`

const SectionHeader = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 24px;

    @media (max-width: 767px) {
        flex-direction: column;
        gap: 16px;
    }
`

const IconWrapper = styled.div`
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background: ${props => props.theme.colorPrimaryBg};

    svg {
        width: 36px;
        height: 36px;
        color: ${props => props.theme.colorPrimary};
    }

    @media (max-width: 767px) {
        width: 56px;
        height: 56px;

        svg {
            width: 30px;
            height: 30px;
        }
    }
`

const SectionTitle = styled.h2`
    font-size: 1.8em;
    font-weight: 600;
    margin: 0;
    color: ${props => props.theme.colorText};
    line-height: 1.3;

    @media (max-width: 767px) {
        font-size: 1.5em;
    }
`

const SectionContent = styled.div`
    font-size: 1.1em;
    line-height: 1.8;
    color: ${props => props.theme.colorText};

    p {
        margin: 0 0 16px 0;
    }

    strong {
        color: ${props => props.theme.colorText};
        font-weight: 600;
    }

    @media (max-width: 767px) {
        font-size: 1em;
    }
`

const FeatureGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 32px;
    margin: 20px 0;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        gap: 8px;
    }
`

const FeatureItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 1em;
    line-height: 1.6;
    color: ${props => props.theme.colorText};

    &::before {
        content: "";
        flex-shrink: 0;
        width: 6px;
        height: 6px;
        margin-top: 10px;
        border-radius: 50%;
        background: ${props => props.theme.colorPrimary};
    }
`

const Highlight = styled.div`
    margin-top: 24px;
    padding: 20px 24px;
    background: linear-gradient(
        135deg,
        ${props => props.theme.colorPrimaryBg} 0%,
        rgba(255, 255, 255, 0.5) 100%
    );
    border-left: 4px solid ${props => props.theme.colorPrimary};
    border-radius: 0 12px 12px 0;
    font-size: 1.05em;
    line-height: 1.7;
    color: ${props => props.theme.colorText};

    strong {
        font-weight: 600;
    }
`

const ArchitectureList = styled.div`
    margin: 16px 0;
`

const ArchitectureItem = styled.div`
    margin-bottom: 12px;

    .arch-title {
        font-weight: 600;
        color: ${props => props.theme.colorPrimary};
        margin-bottom: 4px;
    }

    .arch-desc {
        color: ${props => props.theme.colorTextSecondary};
        font-size: 0.95em;
    }
`

const BenefitsList = styled.ul`
    margin: 16px 0;
    padding-left: 0;
    list-style: none;

    li {
        position: relative;
        padding-left: 28px;
        margin-bottom: 10px;
        line-height: 1.6;

        &::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: ${props => props.theme.colorPrimary};
            font-weight: 600;
        }
    }
`

// SVG Icons
const ElectronicsIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
        <circle cx="12" cy="12" r="3" />
    </svg>
)

const FirmwareIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
    </svg>
)

const MotionIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
    </svg>
)

const DigitalTwinIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 10l3 3 7-7" />
    </svg>
)

const ServicesIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
)

const Solution = () => {
    const { hash } = useLocation()
    return (
        <Section>
            <ScrollOnMount on={[hash]} anchor />
            <SolutionContainer>
                {/* Electronics Section */}
                <SolutionSection id="electronics">
                    <SectionHeader>
                        <IconWrapper>
                            <ElectronicsIcon />
                        </IconWrapper>
                        <SectionTitle>Electronics Reference Designs</SectionTitle>
                    </SectionHeader>
                    <SectionContent>
                        <p>
                            We provide fully engineered <strong>reference hardware</strong> for
                            multi-axis stepper motor control, supporting both:
                        </p>
                        <ArchitectureList>
                            <ArchitectureItem>
                                <div className="arch-title">Centralised architectures</div>
                                <div className="arch-desc">
                                    A single controller board driving multiple motors
                                </div>
                            </ArchitectureItem>
                            <ArchitectureItem>
                                <div className="arch-title">
                                    Decentralised / distributed architectures
                                </div>
                                <div className="arch-desc">
                                    Compact motor-drive modules embedded near each joint or actuator
                                </div>
                            </ArchitectureItem>
                        </ArchitectureList>
                        <p>
                            Our designs cover the complete electrical chain required for a robotic
                            axis:
                        </p>
                        <FeatureGrid>
                            <FeatureItem>Power input and protection</FeatureItem>
                            <FeatureItem>DC bus management</FeatureItem>
                            <FeatureItem>MOSFET power stage</FeatureItem>
                            <FeatureItem>Gate drive and current sensing</FeatureItem>
                            <FeatureItem>TMC5160 smart power driver</FeatureItem>
                            <FeatureItem>TMC4361 motion controller</FeatureItem>
                            <FeatureItem>Encoder and reference-switch interfaces</FeatureItem>
                            <FeatureItem>Safety-related inputs (STO / SS1 support)</FeatureItem>
                            <FeatureItem>
                                Communications (SPI, GPIO, Ethernet, fieldbus via Linux host)
                            </FeatureItem>
                        </FeatureGrid>
                        <p>
                            To accelerate development, we supply{" "}
                            <strong>general-purpose multi-axis controller boards</strong> combining
                            Trinamic motion-control ICs, a full power stage, and an embedded Linux
                            host.
                        </p>
                        <Highlight>
                            These boards allow mechanical and systems engineers to get real hardware
                            moving early in the development cycle. As a product matures, this
                            platform transitions naturally into{" "}
                            <strong>custom, product-specific electronics</strong>, while the
                            underlying firmware and software stack remains largely unchanged.
                        </Highlight>
                    </SectionContent>
                </SolutionSection>

                {/* Firmware Section */}
                <SolutionSection id="firmware">
                    <SectionHeader>
                        <IconWrapper>
                            <FirmwareIcon />
                        </IconWrapper>
                        <SectionTitle>Firmware and Real-Time Control</SectionTitle>
                    </SectionHeader>
                    <SectionContent>
                        <p>
                            glowbuzzer supplies a <strong>production-grade firmware layer</strong>{" "}
                            for the Trinamic TMC4361/TMC5160 family, providing:
                        </p>
                        <FeatureGrid>
                            <FeatureItem>
                                Configuration and management of all drive parameters
                            </FeatureItem>
                            <FeatureItem>Closed-loop encoder handling</FeatureItem>
                            <FeatureItem>Homing and reference strategies</FeatureItem>
                            <FeatureItem>
                                Error detection, stall monitoring, and recovery
                            </FeatureItem>
                            <FeatureItem>
                                Safety-related state handling (SS0 / SS1 / STO coordination)
                            </FeatureItem>
                        </FeatureGrid>
                        <Highlight>
                            This firmware abstracts the complexity of the Trinamic devices into a
                            clean, deterministic real-time control layer, suitable for{" "}
                            <strong>safety-critical and multi-axis robotic systems</strong>.
                        </Highlight>
                    </SectionContent>
                </SolutionSection>

                {/* Motion Section */}
                <SolutionSection id="motion">
                    <SectionHeader>
                        <IconWrapper>
                            <MotionIcon />
                        </IconWrapper>
                        <SectionTitle>High-Level Motion and System Control</SectionTitle>
                    </SectionHeader>
                    <SectionContent>
                        <p>
                            On top of the real-time layer, glowbuzzer provides a Linux-based control
                            stack that implements:
                        </p>
                        <FeatureGrid>
                            <FeatureItem>Trajectory planning and motion blending</FeatureItem>
                            <FeatureItem>Multi-axis coordination</FeatureItem>
                            <FeatureItem>Kinematics and transforms</FeatureItem>
                            <FeatureItem>G-code and robot-level command interfaces</FeatureItem>
                            <FeatureItem>Application-level logic and sequencing</FeatureItem>
                        </FeatureGrid>
                        <Highlight>
                            This architecture separates{" "}
                            <strong>hard real-time motor control</strong> from{" "}
                            <strong>high-level robot behaviour</strong>, enabling sophisticated
                            motion planning while preserving deterministic low-level timing.
                        </Highlight>
                    </SectionContent>
                </SolutionSection>

                {/* Digital Twin Section */}
                <SolutionSection id="sim">
                    <SectionHeader>
                        <IconWrapper>
                            <DigitalTwinIcon />
                        </IconWrapper>
                        <SectionTitle>Digital Twin and Simulation</SectionTitle>
                    </SectionHeader>
                    <SectionContent>
                        <p>
                            The same software stack used to drive physical hardware also supports a{" "}
                            <strong>digital twin</strong> of the machine:
                        </p>
                        <FeatureGrid>
                            <FeatureItem>Virtual motors, axes, switches and kinematics</FeatureItem>
                            <FeatureItem>Identical motion planning and control code</FeatureItem>
                            <FeatureItem>
                                Visualisation of positions, velocities, and limits
                            </FeatureItem>
                        </FeatureGrid>
                        <p>This allows:</p>
                        <BenefitsList>
                            <li>Offline testing of motion programs</li>
                            <li>Debugging and optimisation before hardware is available</li>
                            <li>Reduced commissioning time on real machines</li>
                        </BenefitsList>
                    </SectionContent>
                </SolutionSection>

                {/* Services Section */}
                <SolutionSection id="services">
                    <SectionHeader>
                        <IconWrapper>
                            <ServicesIcon />
                        </IconWrapper>
                        <SectionTitle>Engineering Services</SectionTitle>
                    </SectionHeader>
                    <SectionContent>
                        <p>
                            glowbuzzer combines this platform with hands-on engineering support,
                            including:
                        </p>
                        <FeatureGrid>
                            <FeatureItem>Architecture selection</FeatureItem>
                            <FeatureItem>Motor and gearbox sizing</FeatureItem>
                            <FeatureItem>Inertia and dynamic analysis</FeatureItem>
                            <FeatureItem>Motor tuning</FeatureItem>
                            <FeatureItem>Safety concept design (SS0, SS1, STO)</FeatureItem>
                            <FeatureItem>Guidance on electronics design</FeatureItem>
                            <FeatureItem>
                                Transition from prototype to production electronics
                            </FeatureItem>
                        </FeatureGrid>
                        <Highlight>
                            For companies building robotic products rather than one-off machines,
                            this combination of{" "}
                            <strong>
                                reference designs, production-ready software, and deep engineering
                                expertise
                            </strong>{" "}
                            dramatically reduces development risk and time-to-market.
                        </Highlight>
                    </SectionContent>
                </SolutionSection>
            </SolutionContainer>
        </Section>
    )
}

export default Solution
