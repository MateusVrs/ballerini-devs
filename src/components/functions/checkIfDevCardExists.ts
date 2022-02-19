import { User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, database } from "../../services/firebase"
import { DevInfoType } from "../../types/components/devsmodal"

export function checkIfDevCardExists(
    user: User, devInfo: DevInfoType,
    setIsDevsModalOpen: (value: boolean) => void,
    setIsDevsModalToEdit: (value: boolean) => void,
    setDevInfo: (value: DevInfoType) => void) {

    getDoc(doc(database, `devs/${auth.currentUser?.uid}`)).then(async docSnap => {
        if (!docSnap.exists() && user?.uid !== undefined) {
            setIsDevsModalOpen(true)
            setIsDevsModalToEdit(false)
            await fetch(`https://api.github.com/user/${user.providerData[0].uid}`).then(response => response.json()).then(data => {
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