import { useEffect } from "react"

declare const gtag

export const ChatlioFirstMessageConversion = () => {
    useEffect(() => {
        const listener = () => {
            console.log("chatlio first message")
            gtag("event", "chatlio_start", {})
        }

        document.addEventListener("chatlio.firstMessageSent", listener)
        // document.addEventListener("chatlio.messageSent", listener)
        return () => document.removeEventListener("chatlio.firstMessageSent", listener)
        // return () => document.removeEventListener("chatlio.messageSent", listener)
    }, [])

    return null
}
