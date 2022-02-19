import { ReactNode } from "react"

export type UserContextType = {
    id: string
    name: string
    avatar: string
}

export type AuthContextType = {
    user: UserContextType | undefined | null
    signInWithGithub: (value: string) => Promise<void>
}

export type AuthContextProviderProps = {
    children: ReactNode
}