import { DevInfoType } from "../../types/components/devsmodal"
import { DevsModalContextType } from "../../types/pages/devspage"

import toast from "react-hot-toast"
import { isValidHttpUrl } from "./isValidHttpUrl"

export async function checkModalInfo(devContextValue: DevsModalContextType) {
    const { stateDevInfo, stateIsDevsModalToEdit } = devContextValue
    const [devInfo] = stateDevInfo
    const [isDevsModalToEdit] = stateIsDevsModalToEdit

    var enableAddDev = true
    Object.keys(devInfo).find((key) => {
        if (!devInfo[key as keyof DevInfoType]) {
            if (key === 'name' || key === 'role' || key === (isDevsModalToEdit ? null : 'photo')) {
                enableAddDev = false
                return toast.error('Complete: Nome, Avatar e Cargo')
            }
        }
        if (key === 'githubURL' || key === 'linkedinURL') {
            if (!isValidHttpUrl(devInfo[key]) && devInfo[key] !== null && devInfo[key] !== '') {
                enableAddDev = false
                return toast.error("Coloque uma URL válida")
            }
        }
    })

    if (enableAddDev) {
        return true
    } else {
        throw new Error('Missing informations')
    }
}