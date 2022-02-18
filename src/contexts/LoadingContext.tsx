import { createContext, useState } from "react";
import { LoandingContextProviderProps, LoandingContextType } from "../types/contexts/loandingcontext";

export const LoandingContext = createContext({} as LoandingContextType)

export function LoandingContextProvider({ children }: LoandingContextProviderProps) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <LoandingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoandingContext.Provider>
    )
}