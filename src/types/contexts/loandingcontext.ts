import { ReactNode } from "react";

export type LoandingContextProviderProps = {
    children: ReactNode
}

export type LoandingContextType = {
    isLoading: boolean
    setIsLoading: (value: boolean) => void
}