import { BaseLayout } from "./BaseLayout"

export const FallbackLayout = ({ children }) => {
    return (
        <BaseLayout>
            <h1>THIS IS THE FALLBACK LAYOUT AND PROBABLY NOT WHAT YOU WANT</h1>
            {children}
        </BaseLayout>
    )
}
