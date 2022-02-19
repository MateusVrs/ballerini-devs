import { GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../services/firebase";
import { checkIfDevCardExists } from "../components/functions/checkIfDevCardExists";

import { createContext, useEffect, useState } from "react";
import { useLoading } from "../hooks/useLoading";

import { AuthContextProviderProps, AuthContextType, User } from "../types/contexts/authcontext";

import anonymousImg from '../assets/images/anonymous.png'
import { useDevsPage } from "../hooks/useDevsPage";

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const { setIsLoading } = useLoading()

    const { stateIsDevsModalOpen, stateIsDevsModalToEdit, stateDevInfo } = useDevsPage()

    const [, setIsDevsModalOpen] = stateIsDevsModalOpen
    const [, setIsDevsModalToEdit] = stateIsDevsModalToEdit
    const [devInfo, setDevInfo] = stateDevInfo

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                if (user.providerData.length) {
                    checkIfDevCardExists(user, devInfo, setIsDevsModalOpen, setIsDevsModalToEdit, setDevInfo)
                }

                const { uid, displayName, photoURL } = user

                const newUser: User = {
                    id: uid,
                    avatar: photoURL ? photoURL : anonymousImg,
                    name: displayName ? displayName : 'Someone'
                }

                setUser(newUser)
                setIsLoading(false)
            } else {
                setUser(null)
                setIsLoading(false)
            }
        })

        return () => {
            unsubscribe()
        }

    }, [setIsLoading, setIsDevsModalOpen, setIsDevsModalToEdit, setDevInfo])

    async function signInWithGithub() {
        const provider = new GithubAuthProvider()

        await signInWithRedirect(auth, provider)
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGithub }}>
            {children}
        </AuthContext.Provider>
    )
}