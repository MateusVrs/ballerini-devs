import { User } from '@supabase/supabase-js'
import { doc, getDoc } from "firebase/firestore"
import { database } from "../../services/firebase"
import { supabase } from '../../services/supabse'
import { DevInfoType } from "../../types/components/devsmodal"

export function checkIfDevCardExists(
    user: User, devInfo: DevInfoType,
    setIsDevsModalOpen: (value: boolean) => void,
    setIsDevsModalToEdit: (value: boolean) => void,
    setDevInfo: (value: DevInfoType) => void) {
    
    if(user.email === process.env.REACT_APP_ANONYMOUS_EMAIL) {
        return null
    }

    getDoc(doc(database, `devs/${supabase.auth.user()?.id}`)).then(async docSnap => {
        if (!docSnap.exists() && user?.id !== undefined) {
            setIsDevsModalOpen(true)
            setIsDevsModalToEdit(false)
            await fetch(`https://api.github.com/user/${user.user_metadata.sub}`).then(response => response.json()).then(data => {
                setDevInfo({
                    ...devInfo,
                    name: data.name,
                    about: data.bio,
                    githubURL: data.html_url
                })
            })
        }
    })
}