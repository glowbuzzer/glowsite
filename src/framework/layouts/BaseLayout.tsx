import { TopNav } from "../nav/TopNav"

export const BaseLayout = ({ children }) => (
    <div>
        <TopNav />
        {children}
    </div>
)
