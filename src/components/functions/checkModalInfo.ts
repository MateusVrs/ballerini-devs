import { FormEvent } from "react"
import { DevInfoType } from "../../types/components/devsmodal"
import { DevsModalContextType } from "../../types/pages/devspage"

import toast from "react-hot-toast"

export async function checkModalInfo({devContextValue, event}: {event: FormEvent, devContextValue: DevsModalContextType}) {
    const { stateDevInfo } = devContextValue
    const [devInfo] = stateDevInfo

    var enableAddDev = true
    event.preventDefault()
    Object.keys(devInfo).find((key) => {
        if (!devInfo[key as keyof DevInfoType]) {
            if (key === 'name' || key === 'role' || key === 'avatar') {
                enableAddDev = false
                return toast.error('Complete: Nome, Cargo e Avatar')
            }
        }
        return null
    })

    if (enableAddDev) {
        return true
    } else {
        throw new Error('Missing informations')
    }
}