export type DevInfoType = {
    name: string | null,
    photo: File | null | string,
    role: string | null,
    githubURL: string | null,
    linkedinURL: string | null,
    updateDate: string | null,
    about: string | null,
    techs: string | null
}

export type DevsModalProps = {
    isModalOpen: boolean,
    isEditModal: boolean,
    devId?: string | null
}