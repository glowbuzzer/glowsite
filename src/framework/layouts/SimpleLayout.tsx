import { BaseLayout } from "./BaseLayout"
import { Section } from "../components/Section"

export const SimpleLayout = ({ children }) => (
    <BaseLayout>
        <Section expand background="White">
            <div>{children}</div>
        </Section>
    </BaseLayout>
)
