import { createContext, useState } from "react";

import { DevInfoType } from "../types/components/devsmodal";
import { DevsModalContextProviderProps } from "../types/contexts/devsmodalcontext";
import { DevsModalContextType } from "../types/pages/devspage";

export const devInfoDefault: DevInfoType = {
    name: null,
    photo: null,
    role: null,
    githubURL: null,
    linkedinURL: null,
    updateDate: null,
    about: null,
    techs: null
}

export const DevsModalContext = createContext({} as DevsModalContextType)

export function DevsModalContextProvider(props: DevsModalContextProviderProps) {
    const stateDevInfo = useState(devInfoDefault as DevInfoType)

    const stateIsDevsModalOpen = useState(false)
    const stateIsDevsModalToEdit = useState(false)

    const stateIsDeleteModalOpen = useState(false)
    const stateDevToHandleId = useState(null as string | null)

    const stateIsDevInfoModalOpen = useState(false)

    return (
        <DevsModalContext.Provider value={{
            stateDevInfo,
            stateIsDevsModalOpen,
            stateIsDevsModalToEdit,
            stateIsDeleteModalOpen,
            stateDevToHandleId,
            stateIsDevInfoModalOpen
        }}>
            {props.children}
        </DevsModalContext.Provider>
    )

}