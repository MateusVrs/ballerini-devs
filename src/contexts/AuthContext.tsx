import { User } from '@supabase/supabase-js'
import { checkIfDevCardExists } from "../components/functions/checkIfDevCardExists";

import { createContext, useEffect, useState } from "react";
import { useLoading } from "../hooks/useLoading";

import { AuthContextProviderProps, AuthContextType, UserContextType } from "../types/contexts/authcontext";

import anonymousImg from '../assets/images/anonymous.png'
import { useDevsPage } from "../hooks/useDevsPage";
import { supabase } from "../services/supabse";

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserContextType | null>(null)
    const { setIsLoading } = useLoading()

    const { stateIsDevsModalOpen, stateIsDevsModalToEdit, stateDevInfo } = useDevsPage()

    const [, setIsDevsModalOpen] = stateIsDevsModalOpen
    const [, setIsDevsModalToEdit] = stateIsDevsModalToEdit
    const [devInfo, setDevInfo] = stateDevInfo

    useEffect(() => {

        function handleUserInfo(user: User | null | undefined) {
            if (user) {
                checkIfDevCardExists(user, devInfo, setIsDevsModalOpen, setIsDevsModalToEdit, setDevInfo)

                const { id, user_metadata } = user

                const newUser: UserContextType = {
                    id: id,
                    avatar: user_metadata.avatar_url ? user_metadata.avatar_url : anonymousImg,
                    name: user_metadata.name ? user_metadata.name : 'Someone'
                }

                setUser(newUser)
                setIsLoading(false)
            } else {
                setUser(null)
                setIsLoading(false)
            }
        }
    
        function checkUserSignIn() {
            const user = supabase.auth.user()
            handleUserInfo(user)
        }

        checkUserSignIn()

        const { data: unsubscribeSupabase } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                const user = session.user
                handleUserInfo(user)
            } else if (event === 'SIGNED_OUT') {
                const user = session?.user
                handleUserInfo(user)
            }
        })

        return () => {
            unsubscribeSupabase?.unsubscribe()
        }

    }, [setIsLoading, setIsDevsModalOpen, setIsDevsModalToEdit, setDevInfo])

    async function signInWithGithub(redirect: string) {
        await supabase.auth.signIn({ provider: 'github' }, { redirectTo: `https://ballerinidevs.web.app/${redirect}/` })
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGithub }}>
            {children}
        </AuthContext.Provider>
    )
}

export async function signInAnonymouslySupabase() {
    await supabase.auth.signIn({email: process.env.REACT_APP_ANONYMOUS_EMAIL, password: process.env.REACT_APP_ANONYMOUS_PASSWORD})
}