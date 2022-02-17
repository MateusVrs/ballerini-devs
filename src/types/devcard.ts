export type DevDataType = {
    photo: string,
    name: string,
    role: string,
    githubURL: string,
    linkedinURL: string,
    updateDate: string,
    about: string,
    techs: string
}

export type DevCardProps = {
    devId: string,
    photoURL?: string | null,
    devData: DevDataType
}