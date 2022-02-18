import { GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../services/firebase";

import { createContext, useEffect, useState } from "react";

import { AuthContextProviderProps, AuthContextType, User } from "../types/contexts/authcontext";

import anonymousImg from '../assets/images/anonymous.png'
import { useLoading } from "../hooks/useLoading";

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({children}: AuthContextProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const { setIsLoading } = useLoading()

    async function signInWithGithub() {
        const provider = new GithubAuthProvider()

        await signInWithRedirect(auth, provider)
    }

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
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

    }, [setIsLoading])

    return (
        <AuthContext.Provider value={{ user, signInWithGithub }}>
            {children}
        </AuthContext.Provider>
    )
}