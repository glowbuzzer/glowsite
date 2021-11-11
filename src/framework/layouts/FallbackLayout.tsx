import { BaseLayout } from "./BaseLayout"
import {Section} from "../components/Section";

export const FallbackLayout = ({ children }) => {
    return (
        <BaseLayout>
            <Section>
                <h1>THIS IS THE FALLBACK LAYOUT AND PROBABLY NOT WHAT YOU WANT</h1>
                {children}
            </Section>
        </BaseLayout>
    )
}
