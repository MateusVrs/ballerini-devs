import { ReactNode } from "react"

export type User = {
    id: string
    name: string
    avatar: string
}

export type AuthContextType = {
    user: User | undefined | null
    signInWithGithub: () => Promise<void>
}

export type AuthContextProviderProps = {
    children: ReactNode
}