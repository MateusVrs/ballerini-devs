import { DevInfoType } from "../components/devsmodal"


export type DevsModalContextType = {
    stateDevInfo: [DevInfoType, React.Dispatch<React.SetStateAction<DevInfoType>>]
    stateIsDevsModalOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    stateIsDevsModalToEdit: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    stateIsDeleteModalOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    stateDevToHandleId: [string | null, React.Dispatch<React.SetStateAction<string | null>>]
    stateIsDevInfoModalOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export type EachDevInPageDataType = {
    githubURL: string
    linkedinURL: string
    name: string
    photo: string
    role: string,
    updateDate: string,
    about: string,
    techs: string
}

export type DevsInPageType = {
    [key: string]: {
        devId: string,
        photoURL: string
        devData: EachDevInPageDataType
    }
}