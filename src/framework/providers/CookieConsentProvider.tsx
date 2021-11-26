import { createContext, useContext, useMemo } from "react"

export enum CookieConsentState {
    ACCEPT = "accept",
    REJECT = "reject"
}

type CookieConsentContextType = {
    state: CookieConsentState
    accept(): void
    reject(): void
}

const cookieConsentContext = createContext<CookieConsentContextType>(null)

export const CookieConsentProvider = ({ children }) => {
    const state = localStorage.getItem("cookie-consent") as CookieConsentState

    const context = useMemo<CookieConsentContextType>(
        () => ({
            state,
            accept() {
                localStorage.setItem("cookie-consent", CookieConsentState.ACCEPT)
                window.location.reload()
            },
            reject() {
                localStorage.setItem("cookie-consent", CookieConsentState.REJECT)
                window.location.reload()
            }
        }),
        [state]
    )
    return <cookieConsentContext.Provider value={context}>{children}</cookieConsentContext.Provider>
}

export function useCookieConsent() {
    return useContext(cookieConsentContext)
}
